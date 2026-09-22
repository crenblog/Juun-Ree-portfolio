/* GPU panel surface for the cylindrical work gallery. The DOM buttons remain
   the accessible hit targets. All surfaces remain rigid, without deformation. */
window.JuunRingsRenderer = class {
  constructor(host, projects) {
    this.canvas = document.createElement('canvas');
    this.canvas.className = 'rings__surfaces';
    this.canvas.setAttribute('aria-hidden', 'true');
    const gl = this.canvas.getContext('webgl', { alpha: true, antialias: true });
    if (!gl) return;
    this.gl = gl;
    const vertex = `
      attribute vec2 point;
      uniform vec2 panel;
      uniform vec2 viewport;
      uniform float angle, radius, rowY, camera, focal, scale;
      varying vec2 uv;
      varying float depth;
      void main() {
        uv = point + .5;
        vec2 local = point * panel * scale;
        vec3 world = vec3(cos(angle) * radius + sin(angle) * local.x,
                          rowY + local.y,
                          sin(angle) * radius - cos(angle) * local.x);
        depth = camera - world.z;
        float nearPlane = .1;
        float farPlane = 200.;
        float clipZ = ((farPlane + nearPlane) * depth - 2. * farPlane * nearPlane) / (farPlane - nearPlane);
        gl_Position = vec4(world.x * 2. * focal / viewport.x,
                           world.y * 2. * focal / viewport.y, clipZ, depth);
      }`;
    const fragment = `
      precision highp float;
      uniform sampler2D artwork;
      uniform float camera, emphasis, related, boundary;
      uniform vec2 crop;
      varying vec2 uv;
      varying float depth;
      void main() {
        // All panels use the same portrait geometry; preserve image proportions
        // with a centered cover crop, matching the existing project covers.
        vec2 sampleUV = .5 + (uv - .5) * crop;
        if (boundary > .5 && !gl_FrontFacing) sampleUV.x = 1. - sampleUV.x;
        vec4 color = texture2D(artwork, sampleUV);
        if (boundary > .5) {
          if (color.a < .5) discard;
          gl_FragColor = color;
          return;
        }
        float fog = smoothstep(camera * .58, camera * 1.85, depth);
        float gray = dot(color.rgb, vec3(.2126, .7152, .0722));
        color.rgb = mix(color.rgb, vec3(gray), fog * .12);
        color.rgb = mix(color.rgb, vec3(.945, .929, .910), fog * .22 * (1. - max(emphasis,related*.75)));
        float edge = min(min(uv.x, 1. - uv.x), min(uv.y, 1. - uv.y));
        float frame = 1. - smoothstep(.002, .005, edge);
        color.rgb = mix(color.rgb, vec3(.047, .188, .141), frame * emphasis * .65);
        gl_FragColor = color;
      }`;
    const compile = (type, source) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source); gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(shader));
      return shader;
    };
    try {
      this.program = gl.createProgram();
      gl.attachShader(this.program, compile(gl.VERTEX_SHADER, vertex));
      gl.attachShader(this.program, compile(gl.FRAGMENT_SHADER, fragment));
      gl.linkProgram(this.program);
      if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) throw new Error('Panel shader link failed');
    } catch (error) { console.warn('Rings surface fallback:', error.message); this.gl = null; return; }
    gl.useProgram(this.program);
    this.locations = {};
    for (const name of ['panel','viewport','angle','radius','rowY','camera','focal','scale','emphasis','related','boundary','artwork','crop']) {
      this.locations[name] = gl.getUniformLocation(this.program, name);
    }
    const vertices = [], columns = 1, rows = 1;
    for (let y=0; y<rows; y++) for (let x=0; x<columns; x++) {
      const l=x/columns-.5, r=(x+1)/columns-.5, b=y/rows-.5, t=(y+1)/rows-.5;
      vertices.push(l,b,r,b,r,t,l,b,r,t,l,t);
    }
    this.vertexCount = vertices.length / 2;
    const buffer = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(vertices),gl.STATIC_DRAW);
    const position = gl.getAttribLocation(this.program,'point');
    gl.enableVertexAttribArray(position); gl.vertexAttribPointer(position,2,gl.FLOAT,false,0,0);
    gl.enable(gl.DEPTH_TEST); gl.depthFunc(gl.LEQUAL);
    gl.uniform1i(this.locations.artwork,0);
    this.textures = new Map();
    // The marker belongs to the same depth buffer as the cards. DOM-only
    // markers otherwise paint on top of foreground GPU images, even from afar.
    this.markers={};
    for(const name of ['START','END']){
      const stamp=document.createElement('canvas');stamp.width=stamp.height=512;
      const ink=stamp.getContext('2d');ink.fillStyle='#0c3024';ink.beginPath();ink.arc(256,256,254,0,Math.PI*2);ink.fill();
      ink.fillStyle='#f1ede8';ink.font='500 62px sans-serif';ink.textAlign='center';ink.textBaseline='middle';ink.fillText(name,256,260);
      const texture=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,texture);gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,true);
      gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,stamp);
      gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
      this.markers[name]={texture,aspect:1};
    }
    for (const project of projects) {
      const image = new Image();
      image.onload = () => {
        const texture = gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,texture);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,true);
        gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,image);
        gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
        this.textures.set(project.src,{texture,aspect:image.naturalWidth/image.naturalHeight});
      };
      image.src=project.src;
    }
    this.canvas.addEventListener('webglcontextlost', event => {
      event.preventDefault(); this.gl=null; host.classList.remove('has-surfaces');
    });
    host.append(this.canvas);
    this.host=host;
  }
  resize(width,height) {
    if (!this.gl) return;
    const dpr=Math.min(devicePixelRatio || 1,2);
    this.canvas.width=Math.round(width*dpr);this.canvas.height=Math.round(height*dpr);
    this.gl.viewport(0,0,this.canvas.width,this.canvas.height);
    this.gl.uniform2f(this.locations.viewport,width,height);
  }
  draw(cards,config,focal) {
    const gl=this.gl;
    if (!gl || this.textures.size<new Set(cards.filter(c=>!c.boundary).map(c=>c.project.src)).size) return;
    this.host.classList.add('has-surfaces');
    gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
    const u=this.locations;
    gl.uniform2f(u.panel,config.w,config.h);
    for (const [name,value] of Object.entries({camera:config.camera,radius:config.radius,focal})) gl.uniform1f(u[name],value);
    for (const card of cards) {
      if (!card.visible) continue;
      const front=config.camera*Math.sin(card.theta)>config.radius;
      const asset=card.boundary?this.markers[front?'START':'END']:this.textures.get(card.project.src);
      const panelW=card.boundary?config.w*.68:config.w,panelH=card.boundary?panelW:config.h,ratio=(panelW/panelH)/asset.aspect;
      gl.uniform2f(u.panel,panelW,panelH);gl.uniform1f(u.boundary,card.boundary?1:0);
      gl.bindTexture(gl.TEXTURE_2D,asset.texture);
      gl.uniform2f(u.crop,Math.min(1,ratio),Math.min(1,1/ratio));
      gl.uniform1f(u.angle,card.theta);gl.uniform1f(u.rowY,card.worldY);
      gl.uniform1f(u.scale,card.scale);gl.uniform1f(u.emphasis,card.focus);
      gl.uniform1f(u.related,card.related||0);
      gl.drawArrays(gl.TRIANGLES,0,this.vertexCount);
    }
  }
};
