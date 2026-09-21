/* ---- i18n (ported verbatim from the working build) ---- */
var LANGS=['en','ko','ja'];
/* 소셜 URL만 넣으면 됩니다. 비우면 맨 위로 튀지 않습니다. */
var SOCIAL={
  linkedin:'',
  instagram:''
};
var I18N={
  "heroH1": {"en": "<span class=\"hero-copy-line\">Good design starts with</span><span class=\"hero-copy-line\"><em>the people it&apos;s for.</em></span>", "ko": "<span class=\"hero-copy-line\">디자인이 좋은지보다,</span><span class=\"hero-copy-line\"><em>사람에게 맞는지를</em></span><span class=\"hero-copy-line\">먼저 생각합니다.</span>", "ja": "<span class=\"hero-copy-line\">良いデザインかどうかより、</span><span class=\"hero-copy-line\"><em>使う人に合っているかを</em></span><span class=\"hero-copy-line\">まず考えます。</span>"},
  "heroIntro": {"en": "<span class=\"lede-line\">Complexity itself isn’t the problem.</span><span class=\"lede-line\">What we need to remove is the complexity that confuses people.</span>", "ko": "<span class=\"lede-line\">복잡함 자체가 문제는 아닙니다.</span><span class=\"lede-line\">우리가 제거해야 할 것은 사람을 혼란스럽게 만드는 복잡함입니다.</span>", "ja": "<span class=\"lede-line\">複雑さそのものが問題ではありません。</span><span class=\"lede-line\">取り除くべきなのは、人を混乱させる複雑さです。</span>"},
  "wkKick": {"en": "Selected Projects", "ko": "주요 프로젝트", "ja": "代表プロジェクト"},
  "r1Stmt": {"en": "A biennale visitor guide you open without installing an app.", "ko": "설치 없이 바로 여는 비엔날레 관람 가이드.", "ja": "インストールなしですぐ開ける、ビエンナーレ観覧ガイド。"},
  "r1M1": {"en": "Research & UX/UI", "ko": "리서치 & UX/UI", "ja": "リサーチ & UX/UI"},
  "r1M2": {"en": "Web App", "ko": "웹 앱", "ja": "Webアプリ"},
  "r1Badge": {"en": "140k visitors", "ko": "14만 명", "ja": "14万人"},
  "r2Stmt": {"en": "A vocabulary tool that holds words with spaced repetition.", "ko": "간격 반복으로 단어를 오래 붙잡는 학습 도구.", "ja": "分散学習で語彙を定着させる学習ツール。"},
  "r2M1": {"en": "Design & Development", "ko": "디자인 & 개발", "ja": "デザイン & 開発"},
  "r2Badge": {"en": "Side Project", "ko": "사이드 프로젝트", "ja": "サイドプロジェクト"},
  "r3Stmt": {"en": "A wellbeing tool that makes the pull of notifications visible.", "ko": "알림의 끌림을 보이게 만든 디지털 웰빙 도구.", "ja": "通知の引力を可視化するデジタルウェルビーイングツール。"},
  "r3M1": {"en": "Research & Flutter", "ko": "리서치 & Flutter", "ja": "リサーチ & Flutter"},
  "r3Badge": {"en": "Coursework", "ko": "수업 프로젝트", "ja": "コースワーク"},
  "viewLink": {"en": "Take a closer look →", "ko": "자세히 보기 →", "ja": "詳しく見る →"},
  "abKick": {"en": "About Me", "ko": "소개", "ja": "私について"},
  "abP1": {"en": "I don’t erase complexity by default. I structure it around people’s situations and how they understand.", "ko": "저는 복잡함을 무조건 없애기보다 사람의 상황과 이해 방식에 맞게 구조화합니다.", "ja": "私は複雑さをむやみになくすのではなく、<br>その人の状況と理解の仕方に<span class=\"nowrap\">合わせて構造化します。</span>"},
  "abP2": {"en": "I keep necessary complexity, and reduce the uncertainty that makes people hesitate.", "ko": "필요한 복잡성은 남기고, 다음 행동을 망설이게 하는 불확실성은 줄입니다.", "ja": "必要な複雑さは残し、次の行動をためらわせる不確かさは減らします。"},
  "abP3": {"en": "With AI, I design experiences where simplicity and confidence carry through the whole service.", "ko": "서비스 전체에 단순함과 확신이 끝까지 이어지는 경험을, AI와 함께 디자인합니다.", "ja": "サービス全体にシンプルさと確信が最後まで続く体験を、AIとともにデザインします。"},
  "abCollabK": {"en": "For clients & teams", "ko": "클라이언트와 팀에게", "ja": "クライアント・チームのために"},
  "abCollab": {"en": "I form and test assumptions within the realities of people and teams. We build and refine until it’s a product they take up and keep using.", "ko": "사람과 조직이 놓인 현실 안에서 가설을 만들고 검증합니다. 사람들이 받아들이고 계속 쓸 수 있는 제품이 될 때까지 함께 만들고 다듬습니다.", "ja": "人と組織が置かれた現実のなかで、仮説を立てて検証します。人に受け入れられ、使い続けられるプロダクトになるまで、ともにつくり、磨きます。"},
  "abLocK": {"en": "Current Location", "ko": "활동 기반", "ja": "現在地"},
  "abLoc": {"en": "Born in Seoul, currently based and working in Tokyo.", "ko": "한국에서 나고 자라, 지금은 도쿄에서 디자인하고 있습니다.", "ja": "韓国で生まれ育ち、いまは東京でデザインしています。"},
  "abSocK": {"en": "Social", "ko": "소셜", "ja": "ソーシャル"},
  "ctKick": {"en": "Get in Touch", "ko": "연락하기", "ja": "お問い合わせ"},
  "ctH2v": {"en": "<span class=\"ct-line\">Even if the answer isn’t clear yet,</span><span class=\"ct-line\">we can start.</span>", "ko": "<span class=\"ct-line\">아직 답이 선명하지 않아도,</span><span class=\"ct-line\">함께 시작할 수 있습니다.</span>", "ja": "<span class=\"ct-line\">まだ答えがはっきりしていなくても、</span><span class=\"ct-line\">一緒に始められます。</span>"},
  "footL": {"en": "© 2026 Juun Ree · Seoul · Tokyo", "ko": "© 2026 Juun Ree · 서울 · 도쿄", "ja": "© 2026 Juun Ree · ソウル · 東京"},
  "footR": {"en": "Designed by me, coded with AI.", "ko": "직접 디자인하고, AI와 함께 코딩했습니다.", "ja": "デザインは自分で、コーディングはAIと共に。"},
  "csBack": {"en": "All work", "ko": "전체 작업", "ja": "ワーク一覧"},
  "csRole": {"en": "Role", "ko": "역할", "ja": "役割"},
  "csTeam": {"en": "Team", "ko": "팀", "ja": "チーム"},
  "csTime": {"en": "Timeline", "ko": "기간", "ja": "期間"},
  "csPlat": {"en": "Platform", "ko": "플랫폼", "ja": "プラットフォーム"},
  "csH1": {"en": "Context", "ko": "배경", "ja": "背景"},
  "csH2": {"en": "The problem", "ko": "문제", "ja": "問題"},
  "csH3": {"en": "Research", "ko": "리서치", "ja": "リサーチ"},
  "csH4": {"en": "Exploration", "ko": "탐색", "ja": "探索"},
  "csH5": {"en": "Final design", "ko": "최종 디자인", "ja": "最終デザイン"},
  "csH6": {"en": "Impact", "ko": "결과", "ja": "結果"},
  "csH7": {"en": "Reflection", "ko": "회고", "ja": "振り返り"},
  "csKill": {"en": "Killed", "ko": "폐기한 안", "ja": "ボツにした案"},
  "csHow": {"en": "How we measured", "ko": "측정 방법", "ja": "測定方法"},
  "csWork": {"en": "What worked", "ko": "잘 된 것", "ja": "うまくいったこと"},
  "csDiff": {"en": "What I'd do differently", "ko": "다르게 할 것", "ja": "次は変えること"},
  "csNext": {"en": "Next project", "ko": "다음 프로젝트", "ja": "次のプロジェクト"},
  "slotBadge": {"en": "Template", "ko": "템플릿", "ja": "テンプレート"},
  "slotSub": {"en": "Placeholder case. Copy templates/case.html and replace this copy.", "ko": "자리만 잡아 둔 케이스입니다. templates/case.html을 복사해 이 글을 바꿉니다.", "ja": "プレースホルダーです。templates/case.htmlをコピーして、この文を置き換えてください。"},
  "slotMeta": {"en": "Template · — · — · Web", "ko": "템플릿 · — · — · 웹", "ja": "テンプレート · — · — · Web"},
  "slotStat1n": {"en": "—", "ko": "—", "ja": "—"},
  "slotStat1l": {"en": "To be measured", "ko": "측정 예정", "ja": "測定予定"},
  "slotStat2n": {"en": "—", "ko": "—", "ja": "—"},
  "slotStat2l": {"en": "To be measured", "ko": "측정 예정", "ja": "測定予定"},
  "slotCtx": {"en": "This slot exists so All work can grow without inventing a new layout. Replace the title, figures, and copy; keep the section order.", "ko": "전체 작업이 늘어나도 레이아웃을 새로 만들지 않도록 자리를 열어 둔 칸입니다. 제목, 그림, 카피만 바꾸고 섹션 순서는 유지합니다.", "ja": "All workが増えてもレイアウトを新しく作らないための枠です。タイトル・図・コピーを差し替え、セクション順は保ちます。"},
  "slotProb": {"en": "<span class=\"cv-lead\">The page is ready.</span>The project is not written yet.", "ko": "<span class=\"cv-lead\">페이지는 준비되어 있습니다.</span>프로젝트 글은 아직 없습니다.", "ja": "<span class=\"cv-lead\">ページは用意してあります。</span>プロジェクトの本文はまだありません。"},
  "slotProbE": {"en": "Keep the Quiet Editorial Index. Do not add extra cards, badges, or colors.", "ko": "Quiet Editorial Index를 유지합니다. 카드, 배지, 색을 덧붙이지 않습니다.", "ja": "Quiet Editorial Indexを保ちます。カードやバッジ、色は足しません。"},
  "slotRes": {"en": "—", "ko": "—", "ja": "—"},
  "slotI1": {"en": "Write the observation first.<span class=\"cv-then\">So the teal line is the decision, not a label.</span>", "ko": "관찰을 먼저 적습니다.<span class=\"cv-then\">그래서 틸 문장은 라벨이 아니라 결정입니다.</span>", "ja": "観察を先に書く。<span class=\"cv-then\">ティールの一文はラベルではなく、判断。</span>"},
  "slotI2": {"en": "Keep one problem in the hero.<span class=\"cv-then\">So the rest of the page has a job.</span>", "ko": "히어로에는 문제를 하나만 둡니다.<span class=\"cv-then\">그래서 나머지 페이지에 할 일이 생깁니다.</span>", "ja": "ヒーローには問題を一つだけ。<span class=\"cv-then\">だから残りのページに役割ができる。"},
  "slotI3": {"en": "Kill one direction in public.<span class=\"cv-then\">So the final work is a choice, not a pile.</span>", "ko": "버린 안을 드러냅니다.<span class=\"cv-then\">그래서 최종안은 더미가 아니라 선택입니다.</span>", "ja": "捨てた案を公開する。<span class=\"cv-then\">最終案は山ではなく選択になる。"},
  "slotExp": {"en": "Three directions belong here. Name what shipped and what did not.", "ko": "여기에는 방향 세 가지를 둡니다. 낸 것과 내지 않은 것을 적습니다.", "ja": "ここに方向を三つ置く。出した案と出さなかった案を書く。"},
  "slotKill": {"en": "Replace this killed line with the direction you did not ship, and why.", "ko": "내지 않은 방향과 이유를 이 줄에 적습니다.", "ja": "出さなかった方向と理由を、この行に書く。"},
  "slotF1": {"en": "First feature — one sentence on what it does.", "ko": "첫 기능 — 무엇을 하는지 한 문장.", "ja": "最初の機能 — 何をするかを一文で。"},
  "slotF2": {"en": "Second feature — one sentence on what it does.", "ko": "둘째 기능 — 무엇을 하는지 한 문장.", "ja": "二つ目の機能 — 何をするかを一文で。"},
  "slotF3": {"en": "Third feature — one sentence on what it does.", "ko": "셋째 기능 — 무엇을 하는지 한 문장.", "ja": "三つ目の機能 — 何をするかを一文で。"},
  "slotImpHow": {"en": "Say how you will measure this when the work is real.", "ko": "실제 작업이 되면 어떻게 측정할지 적습니다.", "ja": "実プロジェクトになったとき、どう測るかを書く。"},
  "slotRefW": {"en": "What worked will go here.", "ko": "잘 된 점을 여기 적습니다.", "ja": "うまくいったことをここに書く。"},
  "slotRefD": {"en": "What you'd do differently will go here.", "ko": "다르게 할 점을 여기 적습니다.", "ja": "次は変えることをここに書く。"},
  "bKick": {"en": "Concept · 2025 · Seoul Museum of Art", "ko": "콘셉트 · 2025 · 서울시립미술관", "ja": "コンセプト · 2025 · ソウル市立美術館"},
  "bSub": {"en": "A biennale guide designed to live in the browser — because 90% of museum apps are used by fewer than 3% of the people walking through the door.", "ko": "브라우저에서 살도록 만든 비엔날레 가이드 — 미술관 앱의 90%는 입구를 통과하는 사람 중 3% 미만만 쓰기 때문입니다.", "ja": "ブラウザの中で生きるビエンナーレガイド — 美術館アプリの90%は、入口を通る人の3%未満しか使わないからです。"},
  "bStat1n": {"en": "3/10 → 9/10", "ko": "3/10 → 9/10", "ja": "3/10 → 9/10"},
  "bStat1l": {"en": "Task completion in moderated tests", "ko": "모더레이티드 테스트 태스크 완료", "ja": "モデレートテストのタスク完了"},
  "bStat2n": {"en": "6 min → 40 sec", "ko": "6분 → 40초", "ja": "6分 → 40秒"},
  "bStat2l": {"en": "Time to the first artwork", "ko": "첫 작품까지", "ja": "最初の作品まで"},
  "bStat3n": {"en": "0 installs", "ko": "설치 0", "ja": "0インストール"},
  "bStat3l": {"en": "Distribution constraint, treated as the product", "ko": "배포 제약을 제품으로 다룸", "ja": "配布の制約をプロダクトとして扱う"},
  "bMk1": {"en": "Role", "ko": "역할", "ja": "役割"},
  "bMv1": {"en": "Solo · Research + UX/UI", "ko": "단독 · 리서치 + UX/UI", "ja": "個人 · リサーチ + UX/UI"},
  "bMk2": {"en": "Span", "ko": "기간", "ja": "期間"},
  "bMv2": {"en": "8 weeks", "ko": "8주", "ja": "8週間"},
  "bMk3": {"en": "Surface", "ko": "매체", "ja": "媒体"},
  "bMv3": {"en": "Mobile web", "ko": "모바일 웹", "ja": "モバイルWeb"},
  "bMk4": {"en": "Context", "ko": "맥락", "ja": "文脈"},
  "bMv4": {"en": "13th Seoul Mediacity Biennale · 140,000 visitors", "ko": "제13회 서울미디어시티비엔날레 · 관람객 14만", "ja": "第13回ソウル・メディアシティ・ビエンナーレ · 来場者14万人"},
  "bCtxH": {"en": "A three-month event.<br>One chance at the door.", "ko": "석 달짜리 행사.<br>입구에서의 기회는 한 번.", "ja": "3か月のイベント。<br>入口での機会は一度きり。"},
  "bCtx": {"en": "The 13th Seoul Mediacity Biennale spread across multiple venues and expected 140,000 visitors. The constraint was visible on day one: there was no budget to push an app install. The exhibition would last three months. A visitor standing at the entrance with their own phone would get one attempt — not a second session after they went home and downloaded something.", "ko": "제13회 서울미디어시티비엔날레는 여러 전시장에 걸쳐 14만 명의 관람객을 예상했습니다. 제약은 첫날부터 보였습니다. 앱 설치를 밀어붙일 예산이 없었습니다. 전시는 석 달이었습니다. 입구에서 자기 휴대폰을 든 관람객에게 기회는 한 번뿐입니다. 집에 가서 받은 뒤의 두 번째 세션은 없습니다.", "ja": "第13回ソウル・メディアシティ・ビエンナーレは複数会場に広がり、来場者14万人を見込んでいました。制約は初日に見えていました。アプリのインストールを促す予算はない。会期は3か月。入口で自分のスマホを持つ来場者に試せる機会は一度きりで、帰宅してダウンロードしたあとの二度目のセッションはありません。"},
  "bCtx2": {"en": "Most museum products still behave as if the visitor has already committed. They haven’t. They are tired, late, holding a ticket, and asking a smaller question than the institution wants to answer.", "ko": "대부분의 미술관 제품은 관람객이 이미 마음을 정한 것처럼 행동합니다. 그렇지 않습니다. 지쳐 있고, 늦었고, 티켓을 들고 있으며, 기관이 답하고 싶은 것보다 작은 질문을 하고 있습니다.", "ja": "多くの美術館プロダクトは、来場者がすでに決断済みであるかのように振る舞います。そうではありません。疲れ、遅れ、チケットを持ち、機関が答えたい問いより小さな問いをしています。"},
  "bProbLead": {"en": "Visitors could not answer one ordinary question.", "ko": "관람객은 평범한 질문 하나에 답하지 못했습니다.", "ja": "来場者は、ごく普通の問いひとつに答えられませんでした。"},
  "bProbQ": {"en": "다음에 무엇을 봐야 할까?", "ko": "다음에 무엇을 봐야 할까?", "ja": "다음에 무엇을 봐야 할까?"},
  "bProbCite": {"en": "What should I see next? — the sentence that never left the entrance.", "ko": "What should I see next? — 입구를 떠나지 못한 문장.", "ja": "What should I see next? — 入口を離れなかった一文。"},
  "bProb": {"en": "Museum apps try to unpack information. What people needed at the door was direction. Information volume was not the scarce resource. Time, attention, and the courage to take a first step were.", "ko": "미술관 앱은 정보를 풀어내려 합니다. 입구에서 필요했던 것은 방향이었습니다. 부족한 것은 정보량이 아니었습니다. 시간, 주의, 그리고 첫걸음을 뗄 용기였습니다.", "ja": "美術館アプリは情報を解こうとします。入口で必要だったのは方向でした。足りないのは情報量ではない。時間、注意、そして最初の一歩を踏み出す勇気でした。"},
  "bProbE": {"en": "140,000 visitors · SeMA 2025 · existing museum-app usage under 3%", "ko": "관람객 140,000명 · SeMA 2025 · 기존 미술관 앱 이용 3% 미만", "ja": "来場者 140,000人 · SeMA 2025 · 既存の美術館アプリ利用率 3%未満"},
  "bResH": {"en": "Eight interviews. Three days at the door.<br>One analog map taken apart.", "ko": "인터뷰 여덟. 입구에서 사흘.<br>종이 지도를 한 장 분해했습니다.", "ja": "インタビュー8件。入口で3日。<br>紙のマップを1枚、分解した。"},
  "bRes": {"en": "I did not start with screens. I stood at the entrance and watched the first five minutes — the moment anxiety peaks and the official app is still a store listing. Interviews confirmed what observation made obvious: people would not install software for a temporary exhibition. They would open a URL if it answered the next ten metres.", "ko": "화면부터 그리지 않았습니다. 입구에 서서 첫 5분을 봤습니다. 불안이 최고조인 그 순간, 공식 앱은 아직 스토어 목록입니다. 인터뷰는 관찰이 이미 보여 준 것을 확인했습니다. 임시 전시에 소프트웨어를 설치하지 않습니다. 다음 10미터를 답하는 URL이라면 엽니다.", "ja": "画面から始めませんでした。入口に立ち、最初の5分を見ました。不安がピークになるその瞬間、公式アプリはまだストアの一覧です。インタビューは観察がすでに示していたことを確かめました。会期限定の展覧会のためにソフトを入れない。次の10メートルに答えるURLなら開く。"},
  "bI1": {"en": "<p class=\"cv-why\">Almost no one installs an app for a three-month event.</p><p class=\"cv-then\">So the URL is the product. Browser-first. No install.</p>", "ko": "<p class=\"cv-why\">석 달짜리 행사에 앱을 설치하는 사람은 거의 없습니다.</p><p class=\"cv-then\">그래서 URL이 제품입니다. 브라우저 퍼스트. 설치 없음.</p>", "ja": "<p class=\"cv-why\">3か月のイベントのためにアプリを入れる人は、ほとんどいない。</p><p class=\"cv-then\">だからURLがプロダクト。ブラウザファースト。インストールなし。</p>"},
  "bI2": {"en": "<p class=\"cv-why\">Anxiety peaks in the first five minutes at the entrance.</p><p class=\"cv-then\">So the first screen only answers what you can see in 40 / 90 / 180 minutes.</p>", "ko": "<p class=\"cv-why\">불안은 입구 첫 5분에 최고조입니다.</p><p class=\"cv-then\">그래서 첫 화면은 40 / 90 / 180분 안에 무엇을 볼 수 있는지만 답합니다.</p>", "ja": "<p class=\"cv-why\">不安は入口の最初の5分でピークになる。</p><p class=\"cv-then\">だから最初の画面は、40 / 90 / 180分で見られるものだけに答える。</p>"},
  "bI3": {"en": "<p class=\"cv-why\">A map teaches place. It does not teach what matters today.</p><p class=\"cv-then\">So I designed curated routes — not a floor map of everything.</p>", "ko": "<p class=\"cv-why\">지도는 장소를 가르칩니다. 오늘 무엇이 중요한지는 가르치지 않습니다.</p><p class=\"cv-then\">그래서 전부를 그린 평면이 아니라, 큐레이션한 동선을 설계했습니다.</p>", "ja": "<p class=\"cv-why\">マップは場所を教える。今日何が大事かは教えない。</p><p class=\"cv-then\">だから全部を描いたフロアマップではなく、キュレーションしたルートを設計した。</p>"},
  "bH2": {"en": "Problem", "ko": "문제", "ja": "問題"},
  "bH4": {"en": "The fork", "ko": "갈림길", "ja": "分岐"},
  "bExpH": {"en": "Three directions. One criterion.", "ko": "방향은 셋. 기준은 하나.", "ja": "方向は3つ。基準はひとつ。"},
  "bExp": {"en": "The decision was not “which interface is richer.” It was: what survives install load, time-to-first-use, and a three-month lifespan when the institution will not spend to acquire the app.", "ko": "결정은 “어느 화면이 더 풍부한가”가 아니었습니다. 기관이 앱 확보에 돈을 쓰지 않을 때, 설치 부하와 첫 사용까지 시간, 석 달의 수명을 견디는 것이 무엇인가였습니다.", "ja": "判断は「どの画面がより豊かか」ではない。機関がアプリ獲得に金を使わないとき、インストール負荷・初回利用までの時間・3か月の寿命を生き延びるものは何か、だった。"},
  "bOptAt": {"en": "A · Rejected", "ko": "A · 폐기", "ja": "A · 不採用"},
  "bOptAh": {"en": "Native app", "ko": "네이티브 앱", "ja": "ネイティブアプリ"},
  "bOptAb": {"en": "Richest container. Dead on arrival. The install itself was the problem we were hired, conceptually, to remove.", "ko": "가장 풍부한 그릇. 도착과 동시에 끝입니다. 설치 자체가, 개념적으로, 없애야 할 문제였습니다.", "ja": "いちばん豊かな器。到着時点で終わっている。インストールそのものが、概念上、取り除くべき問題だった。"},
  "bOptBt": {"en": "B · Shipped as concept", "ko": "B · 콘셉트로 냄", "ja": "B · コンセプトとして提出"},
  "bOptBh": {"en": "Browser guide", "ko": "브라우저 가이드", "ja": "ブラウザガイド"},
  "bOptBb": {"en": "QR at the ticket desk opens a URL. No store, no account. Depth is the price. First use at the door is the bet.", "ko": "매표소 QR이 URL을 엽니다. 스토어 없음, 계정 없음. 대가는 깊이. 입구에서의 첫 사용이 내기입니다.", "ja": "チケット売り場のQRがURLを開く。ストアなし、アカウントなし。代償は深さ。入口での初回利用が賭け。"},
  "bOptCt": {"en": "C · Fallback, not product", "ko": "C · 폴백, 제품 아님", "ja": "C · フォールバックであり、プロダクトではない"},
  "bOptCh": {"en": "Paper map + QR", "ko": "종이 지도 + QR", "ja": "紙マップ + QR"},
  "bOptCb": {"en": "Useful as a backup when signal dies. Not a product. It cannot curate a route or update when a room closes.", "ko": "신호가 끊길 때의 백업으로는 쓸모 있습니다. 제품은 아닙니다. 동선을 큐레이션하거나, 방이 닫혔을 때 갱신하지 못합니다.", "ja": "電波が死んだときのバックアップにはなる。プロダクトではない。ルートを編めないし、部屋が閉まったときに更新できない。"},
  "bDesH": {"en": "Three product moments.<br>Not a map of the whole building.", "ko": "제품의 순간 셋.<br>건물 전체의 지도가 아닙니다.", "ja": "プロダクトの瞬間は3つ。<br>建物全体のマップではない。"},
  "bF1t": {"en": "Time is the navigation.", "ko": "시간이 내비게이션입니다.", "ja": "時間がナビゲーション。"},
  "bF1": {"en": "Choose 40, 90, or 180 minutes. Only the route that fits that window appears. Completeness was rejected. A visitor with forty minutes should not be shown ninety works and asked to be responsible.", "ko": "40, 90, 180분 중 고릅니다. 그 시간에 맞는 동선만 나옵니다. 완전함은 버렸습니다. 40분인 관람객에게 작품 90개를 보여 주고 책임을 지울 수 없습니다.", "ja": "40・90・180分から選ぶ。その時間に合うルートだけが出る。完全さは捨てた。40分の来場者に90点を見せて責任を負わせてはいけない。"},
  "bF2t": {"en": "From where you are standing.", "ko": "지금 서 있는 곳에서.", "ja": "今立っている場所から。"},
  "bF2": {"en": "Nearby works, walking time, what is next — not a caption to be read in place. The screen is for the next action. Location is a means, not the exhibit.", "ko": "가까운 작품, 걷는 시간, 다음 — 그 자리에서 읽는 캡션이 아닙니다. 화면은 다음 행동을 위한 것입니다. 위치는 전시가 아니라 수단입니다.", "ja": "近い作品、歩く時間、次 — その場で読むキャプションではない。画面は次の行動のため。場所は展示ではなく手段。"},
  "bF3t": {"en": "The ticket desk is the onboarding.", "ko": "매표소가 온보딩입니다.", "ja": "チケット売り場がオンボーディング。"},
  "bF3": {"en": "QR at the counter opens the guide in the browser. No App Store. No account. If first use does not start at the entrance, the product does not exist — regardless of how complete the information architecture is.", "ko": "창구 QR이 브라우저에서 가이드를 엽니다. 앱스토어 없음. 계정 없음. 첫 사용이 입구에서 시작되지 않으면 제품은 없는 것과 같습니다. 정보 구조가 얼마나 완전한지는 상관없습니다.", "ja": "窓口のQRがブラウザでガイドを開く。App Storeなし。アカウントなし。初回利用が入口で始まらなければ、プロダクトは存在しない — 情報設計がどれほど完全でも。"},
  "bH6": {"en": "Result", "ko": "결과", "ja": "結果"},
  "bImpH": {"en": "A concept, tested as if it had to ship at the door.", "ko": "입구에서 나가야 하는 것처럼 시험한 콘셉트.", "ja": "入口で出荷しなければいけないものとして試したコンセプト。"},
  "bImp": {"en": "This is a concept project. The final prototype was tested against the existing museum app in moderated usability sessions (n=10). Task completion moved from 3/10 to 9/10. Time to the first artwork moved from about six minutes to forty seconds — mostly because the first screen stopped offering a building and started offering a next step.", "ko": "콘셉트 프로젝트입니다. 최종 프로토타입을 기존 미술관 앱과 모더레이티드 사용성 세션(n=10)에서 비교했습니다. 태스크 완료는 3/10에서 9/10으로. 첫 작품까지는 약 6분에서 40초로. 첫 화면이 건물을 내놓지 않고 다음 한 걸음을 내놓기 시작했기 때문입니다.", "ja": "コンセプトプロジェクトです。最終プロトタイプを既存の美術館アプリと、モデレート型ユーザビリティ(n=10)で比べました。タスク完了は3/10から9/10へ。最初の作品までは約6分から40秒へ。最初の画面が建物を出さず、次の一歩を出し始めたからです。"},
  "bImpHow": {"en": "There is no launch telemetry. That limit is part of the case, not a footnote to hide. The lab is not the lobby. What the tests proved is the decision sequence, not a market.", "ko": "출시 텔레메트리는 없습니다. 그 한계는 숨길 각주가 아니라 케이스의 일부입니다. 실험실은 로비가 아닙니다. 테스트가 증명한 것은 시장이 아니라 결정의 순서입니다.", "ja": "ローンチのテレメトリはない。その限界は隠す脚注ではなく、ケースの一部です。ラボはロビーではない。テストが証明したのは市場ではなく、判断の順序です。"},
  "bNote": {"en": "Honesty clause — concept project. Prototype vs. existing app. Moderated usability, n=10. No live Biennale instrumentation. Venue Wi-Fi remains an unresolved operational risk.", "ko": "정직 조항 — 콘셉트 프로젝트. 프로토타입 대 기존 앱. 모더레이티드 사용성 n=10. 비엔날레 현장 계측 없음. 전시장 Wi-Fi는 아직 풀리지 않은 운영 리스크입니다.", "ja": "正直条項 — コンセプトプロジェクト。プロトタイプ対既存アプリ。モデレート型ユーザビリティ n=10。ビエンナーレ現場の計測なし。会場Wi-Fiは未解決の運用リスク。"},
  "bH7": {"en": "Retrospective", "ko": "회고", "ja": "振り返り"},
  "bRefWh": {"en": "What held", "ko": "버틴 것", "ja": "持ったもの"},
  "bRefW": {"en": "Browser-first stopped being a platform preference and became a design criterion. Every feature had to justify itself without an install. That constraint did more editorial work than any moodboard.", "ko": "브라우저 퍼스트는 플랫폼 취향이 아니라 디자인 기준이 됐습니다. 모든 기능이 설치 없이 스스로를 증명해야 했습니다. 그 제약이 무드보드보다 편집을 더 많이 했습니다.", "ja": "ブラウザファーストは、プラットフォームの好みではなくデザインの基準になった。すべての機能がインストールなしで自らを証明しなければいけなかった。その制約は、ムードボードより多く編集した。"},
  "bRefDh": {"en": "What I would do earlier", "ko": "더 일찍 할 것", "ja": "もっと早くやること"},
  "bRefD": {"en": "Test the offline path in week one, not week six. An assumption about venue Wi-Fi nearly broke the entrance flow — the only flow that matters. Distribution failures belong in research, not in QA.", "ko": "오프라인 경로는 6주가 아니라 1주에 시험합니다. 전시장 Wi-Fi 가정이 입구 흐름을 거의 깨뜨렸습니다. 유일하게 중요한 흐름입니다. 배포 실패는 QA가 아니라 리서치에 속합니다.", "ja": "オフライン経路は6週目ではなく1週目に試す。会場Wi-Fiの前提が入口フローを壊しかけた — 唯一重要なフローだ。配布の失敗はQAではなくリサーチに属する。"},
  "bPh1": {"en": "<p class=\"cv-ui-kicker\">SeMA · Seosomun</p><p class=\"cv-ui-title\">How long<br>do you have?</p><div class=\"cv-ui-chips\"><span class=\"cv-ui-chip is-on\">40 min</span><span class=\"cv-ui-chip\">90</span><span class=\"cv-ui-chip\">180</span></div><div class=\"cv-ui-row\"><b>01 · Entrance hall</b><span>2 min</span></div><div class=\"cv-ui-bar\"><i style=\"width:18%\"></i></div><div class=\"cv-ui-row\"><b>02 · Seance room</b><span>8 min</span></div><div class=\"cv-ui-bar\"><i style=\"width:40%\"></i></div><div class=\"cv-ui-row\"><b>03 · Media corridor</b><span>11 min</span></div><div class=\"cv-ui-bar\"><i style=\"width:55%\"></i></div><div class=\"cv-ui-row\"><b>04 · Archive bay</b><span>7 min</span></div><div class=\"cv-ui-bar\"><i style=\"width:32%\"></i></div>", "ko": "<p class=\"cv-ui-kicker\">SeMA · 서소문</p><p class=\"cv-ui-title\">얼마나<br>있나요?</p><div class=\"cv-ui-chips\"><span class=\"cv-ui-chip is-on\">40분</span><span class=\"cv-ui-chip\">90</span><span class=\"cv-ui-chip\">180</span></div><div class=\"cv-ui-row\"><b>01 · 입구 홀</b><span>2분</span></div><div class=\"cv-ui-bar\"><i style=\"width:18%\"></i></div><div class=\"cv-ui-row\"><b>02 · 세앙스 룸</b><span>8분</span></div><div class=\"cv-ui-bar\"><i style=\"width:40%\"></i></div><div class=\"cv-ui-row\"><b>03 · 미디어 복도</b><span>11분</span></div><div class=\"cv-ui-bar\"><i style=\"width:55%\"></i></div><div class=\"cv-ui-row\"><b>04 · 아카이브</b><span>7분</span></div><div class=\"cv-ui-bar\"><i style=\"width:32%\"></i></div>", "ja": "<p class=\"cv-ui-kicker\">SeMA · 西小門</p><p class=\"cv-ui-title\">どれくらい<br>ありますか？</p><div class=\"cv-ui-chips\"><span class=\"cv-ui-chip is-on\">40分</span><span class=\"cv-ui-chip\">90</span><span class=\"cv-ui-chip\">180</span></div><div class=\"cv-ui-row\"><b>01 · エントランス</b><span>2分</span></div><div class=\"cv-ui-bar\"><i style=\"width:18%\"></i></div><div class=\"cv-ui-row\"><b>02 · セアンスルーム</b><span>8分</span></div><div class=\"cv-ui-bar\"><i style=\"width:40%\"></i></div><div class=\"cv-ui-row\"><b>03 · メディア廊下</b><span>11分</span></div><div class=\"cv-ui-bar\"><i style=\"width:55%\"></i></div><div class=\"cv-ui-row\"><b>04 · アーカイブ</b><span>7分</span></div><div class=\"cv-ui-bar\"><i style=\"width:32%\"></i></div>"},
  "bPh2": {"en": "<p class=\"cv-ui-kicker\">Now · 12 min left on 40</p><p class=\"cv-ui-title\">Next, 40m walk</p><div class=\"cv-ui-row\"><b>Wing Po So</b><span>2 min walk</span></div><p class=\"cv-ui-cap\">Room 3 · standing work · quiet</p><div class=\"cv-ui-row\"><b>Yin-ju Chen</b><span>5 min walk</span></div><p class=\"cv-ui-cap\">Lower hall · 8 min to see</p><div class=\"cv-ui-row\"><b>Skip to archive</b><span>if tired</span></div>", "ko": "<p class=\"cv-ui-kicker\">지금 · 40분 중 12분 남음</p><p class=\"cv-ui-title\">다음, 도보 40m</p><div class=\"cv-ui-row\"><b>Wing Po So</b><span>도보 2분</span></div><p class=\"cv-ui-cap\">3전시실 · 서서 보는 작품 · 조용</p><div class=\"cv-ui-row\"><b>Yin-ju Chen</b><span>도보 5분</span></div><p class=\"cv-ui-cap\">하부 홀 · 관람 8분</p><div class=\"cv-ui-row\"><b>아카이브로 건너뛰기</b><span>지치면</span></div>", "ja": "<p class=\"cv-ui-kicker\">いま · 40分のうち12分残り</p><p class=\"cv-ui-title\">次、徒歩40m</p><div class=\"cv-ui-row\"><b>Wing Po So</b><span>徒歩2分</span></div><p class=\"cv-ui-cap\">第3室 · 立って見る作品 · 静か</p><div class=\"cv-ui-row\"><b>Yin-ju Chen</b><span>徒歩5分</span></div><p class=\"cv-ui-cap\">下部ホール · 鑑賞8分</p><div class=\"cv-ui-row\"><b>アーカイブへ飛ばす</b><span>疲れたら</span></div>"},
  "bPh3": {"en": "<p class=\"cv-ui-kicker\">Opened from ticket QR</p><p class=\"cv-ui-title\">You’re in.<br>No install.</p><p class=\"cv-ui-cap\">Seosomun Main Branch · 13th Seoul Mediacity Biennale</p><div class=\"cv-ui-chip is-on cv-ui-chip--solo\">Start 40-min route</div><div class=\"cv-ui-row\"><b>Works today</b><span>28 on this path</span></div><div class=\"cv-ui-row\"><b>Language</b><span>KR · EN · JP</span></div><div class=\"cv-ui-row\"><b>Offline later</b><span>cache after load</span></div>", "ko": "<p class=\"cv-ui-kicker\">매표 QR에서 열림</p><p class=\"cv-ui-title\">들어왔습니다.<br>설치 없음.</p><p class=\"cv-ui-cap\">서소문본관 · 제13회 서울미디어시티비엔날레</p><div class=\"cv-ui-chip is-on cv-ui-chip--solo\">40분 동선 시작</div><div class=\"cv-ui-row\"><b>오늘의 작품</b><span>이 길 28점</span></div><div class=\"cv-ui-row\"><b>언어</b><span>KR · EN · JP</span></div><div class=\"cv-ui-row\"><b>오프라인은 나중에</b><span>로드 후 캐시</span></div>", "ja": "<p class=\"cv-ui-kicker\">チケットQRから開く</p><p class=\"cv-ui-title\">入れました。<br>インストールなし。</p><p class=\"cv-ui-cap\">西小門本館 · 第13回ソウル・メディアシティ・ビエンナーレ</p><div class=\"cv-ui-chip is-on cv-ui-chip--solo\">40分ルートを始める</div><div class=\"cv-ui-row\"><b>今日の作品</b><span>この道28点</span></div><div class=\"cv-ui-row\"><b>言語</b><span>KR · EN · JP</span></div><div class=\"cv-ui-row\"><b>オフラインは後で</b><span>読み込み後にキャッシュ</span></div>"},
  "lSub": {"en": "Vocabulary review timed to the forgetting curve — we lose ~70% of new words within 24 hours unless review is spaced.", "ko": "망각 곡선에 맞춰 복습 시점을 알려 주는 단어 학습 도구 — 복습을 나누지 않으면 새 단어의 ~70%가 24시간 안에 사라집니다.", "ja": "忘却曲線に合わせて復習のタイミングを整える単語学習ツール — 復習を分けないと、新しい単語の約70%は24時間で消える。"},
  "lRole": {"en": "Design + build — solo", "ko": "디자인 + 구현 — 개인", "ja": "デザイン + 実装 — 個人"},
  "lTeam": {"en": "Side project", "ko": "사이드 프로젝트", "ja": "サイドプロジェクト"},
  "lTime": {"en": "6 weeks · 2024", "ko": "6주 · 2024", "ja": "6週間 · 2024"},
  "lPlat": {"en": "Web app · PWA", "ko": "웹 앱 · PWA", "ja": "Webアプリ · PWA"},
  "lMeta": {"en": "Design + build · Solo · 6 weeks · 2024 · PWA", "ko": "디자인 + 구현 · 단독 · 6주 · 2024 · PWA", "ja": "デザイン + 実装 · 個人 · 6週間 · 2024 · PWA"},
  "lStat1n": {"en": "+20%", "ko": "+20%", "ja": "+20%"},
  "lStat1l": {"en": "Recall vs. list review", "ko": "기억률 (목록 복습 대비)", "ja": "想起率（リスト復習比）"},
  "lStat2n": {"en": "9 / 12", "ko": "9 / 12", "ja": "9 / 12"},
  "lStat2l": {"en": "Came back in 7 days", "ko": "7일 후 재방문", "ja": "7日後の再訪"},
  "lCtx": {"en": "A side project built end to end — research, design, and code. The constraint was attention itself: the tool had to work in the 30 seconds between things, with no streaks or guilt mechanics to come back to.", "ko": "리서치, 디자인, 코드까지 혼자 완성한 사이드 프로젝트입니다. 핵심 제약은 주의력을 빼앗지 않는 것이었습니다 — 일과 일 사이의 30초에 작동해야 했고, 스트릭이나 죄책감 장치는 두지 않기로 했습니다.", "ja": "リサーチ、デザイン、コードまで一人で作り切ったサイドプロジェクトです。制約は、ユーザーの注意を奪わないことでした — 合間の30秒で動くこと。ストリークや罪悪感の仕掛けはなし。"},
  "lProbHook": {"en": "People don't fail to learn words; they fail to return.", "ko": "사람들은 단어를 못 외우는 게 아니라, 돌아오지 못합니다.", "ja": "人は単語を覚えられないのではなく、戻ってこられない。"},
  "lProb": {"en": "Review apps treat memory as the problem — but ~70% of new words are gone within 24 hours only because nobody comes back at the right time.", "ko": "복습 앱은 기억을 문제로 보지만, 24시간 안에 ~70%가 사라지는 건 아무도 맞는 시간에 돌아오지 않기 때문입니다.", "ja": "復習アプリは記憶力の問題として扱いがちです。24時間で約70%が消えるのは、誰も正しい時間に戻ってこないからだ。"},
  "lProbE": {"en": "~70% forgotten within 24h (Ebbinghaus; Murre & Dros, 2015) · ~20% better retention with spaced review (Carpenter et al., 2018)", "ko": "24시간 내 ~70% 망각 (Ebbinghaus; Murre & Dros, 2015) · 분산 복습 시 유지율 ~20% 향상 (Carpenter et al., 2018)", "ja": "24時間で約70%を忘却(Ebbinghaus; Murre & Dros, 2015) · 分散復習で保持率約20%向上(Carpenter et al., 2018)"},
  "lRes": {"en": "12 learner interviews · forgetting-curve literature review · audit of 5 SRS apps", "ko": "학습자 인터뷰 12건 · 망각 곡선 문헌 검토 · SRS 앱 5종 리뷰", "ja": "学習者インタビュー12件 · 忘却曲線の文献レビュー · SRSアプリ5つのレビュー"},
  "lI1": {"en": "<p class=\"cv-why\">People review when they remember to — so they don't.</p><p class=\"cv-then\">So the schedule pings you. The app never waits for motivation.</p>", "ko": "<p class=\"cv-why\">사람들은 생각날 때 복습합니다 — 즉, 하지 않습니다.</p><p class=\"cv-then\">그래서 스케줄이 먼저 알려 줍니다. 앱은 동기를 기다리지 않습니다.</p>", "ja": "<p class=\"cv-why\">人は思い出した時に復習する — つまり、しない。</p><p class=\"cv-then\">だからスケジュールが先に知らせる。アプリはやる気を待たない。</p>"},
  "lI2": {"en": "<p class=\"cv-why\">Word lists bury what you almost know.</p><p class=\"cv-then\">So the queue surfaces only due words — nothing else is visible.</p>", "ko": "<p class=\"cv-why\">단어 목록은 '거의 아는 단어'를 묻어버립니다.</p><p class=\"cv-then\">그래서 큐에는 복습 시점이 온 단어만. 나머지는 보이지 않습니다.</p>", "ja": "<p class=\"cv-why\">単語リストは、覚えかけの単語を埋もれさせる。</p><p class=\"cv-then\">だからキューには期限の来た単語だけ。他は見せない。</p>"},
  "lI3": {"en": "<p class=\"cv-why\">Streak guilt kills return.</p><p class=\"cv-then\">So no streaks, no flames — only '3 words, 30 seconds.'</p>", "ko": "<p class=\"cv-why\">스트릭에서 오는 죄책감은 재방문을 막습니다.</p><p class=\"cv-then\">그래서 스트릭도 불꽃도 없이 — '3개, 30초'뿐입니다.</p>", "ja": "<p class=\"cv-why\">ストリークの罪悪感は、再訪を遠ざける。</p><p class=\"cv-then\">だからストリークも炎もなし — 「3語、30秒」だけ。</p>"},
  "lExp": {"en": "Three directions were considered: A — a gamified SRS, B — a minimal, schedule-led tool, C — widget-first.", "ko": "세 가지 방향을 검토했습니다: A 게임화 SRS · B 미니멀한 스케줄 중심 도구 · C 위젯 우선.", "ja": "3つの方向を検討しました: A ゲーム化SRS · B 最小限で、スケジュール主導のツール · C ウィジェットファースト。"},
  "lKill": {"en": "Gamified streaks. They optimized for opening the app, not for remembering — the metric users actually came for.", "ko": "게임화 스트릭. 기억이 아니라 '앱 열기'에 최적화되어 있었습니다 — 사용자가 진짜로 온 목적이 아니었어요.", "ja": "ゲーム化された連続記録（ストリーク）。記憶ではなく「開くこと」に最適化されていた — ユーザーが本当に来た目的ではない。"},
  "lF1": {"en": "The due queue — only the words your memory is about to drop. Nothing else appears.", "ko": "복습 큐 — 기억에서 사라지기 직전인 단어만 보여 줍니다. 그 외에는 나오지 않습니다.", "ja": "デューキュー — 記憶から抜け落ちる直前の単語だけが並ぶ。それ以外は出ない。"},
  "lF2": {"en": "30-second sessions — a review fits between things, not on a to-do list.", "ko": "30초 세션 — 복습은 할 일 목록이 아니라, 일 사이의 틈에 들어갑니다.", "ja": "30秒セッション — 復習はToDoリストではなく、合間に収まる。"},
  "lF3": {"en": "SM-2 under the hood — intervals stretch as words stick. No settings to learn.", "ko": "내부는 SM-2 — 외워지는 단어일수록 간격이 늘어납니다. 따로 익혀야 할 설정은 없습니다.", "ja": "内部はSM-2 — 覚えた単語ほど間隔が伸びる。設定を覚える必要はありません。"},
  "lImp": {"en": "Recall +20% vs. list review · 7-day return: 9 of 12 testers", "ko": "기억률 +20% (목록 복습 대비) · 7일 후 재방문 12명 중 9명", "ja": "想起率 +20%(リスト復習比) · 7日後の再訪 12人中9人"},
  "lImpHow": {"en": "Coursework-scale evidence: a 7-day pilot with 12 learners, recall-tested against their usual list method (Carpenter et al., 2018 as the reference benchmark). Small n — stated honestly.", "ko": "수업 프로젝트 규모의 검증입니다 — 학습자 12명의 7일 파일럿에서, 평소 목록 방식과 기억률을 비교했습니다(기준 벤치마크: Carpenter et al., 2018). n이 작다는 점을 명시합니다.", "ja": "授業課題としての検証です。学習者12名による7日間のパイロットで、いつものリスト方式との想起テストを比較しました（参照ベンチマーク: Carpenter et al., 2018）。小さなnであることを明記しています。"},
  "lRefW": {"en": "Building it myself kept the loop honest — every notification decision shipped and got tested the same day.", "ko": "직접 만들었기에 개발과 검증의 루프를 짧고 정직하게 유지할 수 있었습니다 — 알림 결정은 전부 당일에 출시하고 당일에 테스트했어요.", "ja": "自分で作ったからこそ、開発と検証のループを短く保てました — 通知の決定はすべてその日に出して、その日に試せた。"},
  "lRefD": {"en": "Separate 'new words' from 'due words' harder — early testers mixed the two anxieties.", "ko": "'새 단어'와 '복습 단어'를 더 분명히 나눌 것입니다 — 초기 테스터들은 두 가지 부담을 혼동했습니다.", "ja": "『新しい単語』と『復習する単語』をもっと明確に分けます。初期テスターは2つの迷いを混同していました。"},
  "oSub": {"en": "A focus tool that makes the phone's pull visible first — we check our phones 205 times a day, once every five minutes awake.", "ko": "스마트폰을 확인하고 싶어지는 충동을 먼저 보이게 하는 포커스 도구 — 우리는 하루 205번, 깨어있는 동안 5분마다 폰을 확인합니다.", "ja": "スマホを手に取りたくなる衝動を、まず見える化するフォーカスツール — 私たちは1日205回、起きている間は5分おきにスマホを確認している。"},
  "oRole": {"en": "Research, UX/UI", "ko": "리서치, UX/UI", "ja": "リサーチ・UX/UI"},
  "oTeam": {"en": "Coursework — duo", "ko": "코스워크 — 2인", "ja": "コースワーク — 2名"},
  "oTime": {"en": "5 weeks · 2024", "ko": "5주 · 2024", "ja": "5週間 · 2024"},
  "oPlat": {"en": "Android · Flutter", "ko": "Android · Flutter", "ja": "Android · Flutter"},
  "oMeta": {"en": "Research, UX/UI · Duo · 5 weeks · 2024 · Android", "ko": "리서치, UX/UI · 2인 · 5주 · 2024 · Android", "ja": "リサーチ・UX/UI · 2名 · 5週間 · 2024 · Android"},
  "oStat1n": {"en": "−18%", "ko": "−18%", "ja": "−18%"},
  "oStat1l": {"en": "Checks in week 2", "ko": "2주차 확인 횟수", "ja": "2週目の確認回数"},
  "oStat2n": {"en": "5 / 6", "ko": "5 / 6", "ja": "5 / 6"},
  "oStat2l": {"en": "Kept it installed", "ko": "계속 설치해 둠", "ja": "継続インストール"},
  "oCtx": {"en": "Coursework for a wellbeing brief, built with one engineer. Fixed constraints: Android only, Flutter, and no dark patterns — the tool couldn't fight the phone by becoming another thing pulling at you.", "ko": "디지털 웰빙을 주제로 한 수업 프로젝트로, 엔지니어 한 명과 만들었습니다. 고정 제약은 Android 전용, Flutter, 다크 패턴 금지였습니다 — 도구가 '또 다른 끌림'이 되면 안 됐습니다.", "ja": "ウェルビーイングを題材にした授業課題で、エンジニア1名と制作しました。固定の制約は、Androidのみ・Flutter・ダークパターン禁止でした — ツールが『もう一つの引力』になってはいけなかった。"},
  "oProb": {"en": "Screen-time tools report the damage after the fact. But checking is pre-conscious — 205 times a day, once every five minutes awake — so a weekly report arrives too late to matter.", "ko": "스크린타임 도구는 영향을 사후에 보여 줍니다. 하지만 확인은 무의식적인 반응입니다 — 하루 205번, 5분마다. 주간 리포트는 너무 늦게 도착합니다.", "ja": "スクリーンタイムのツールは、影響を事後に示す。しかし確認は、ほとんど反射的な行動だ — 1日205回、5分おき。週次レポートでは遅すぎる。"},
  "oProbE": {"en": "205 phone checks/day (Reviews.org, 2024) · 6h 40m daily screen time (DataReportal, 2025)", "ko": "하루 폰 확인 205회 (Reviews.org, 2024) · 하루 스크린타임 6시간 40분 (DataReportal, 2025)", "ja": "スマホ確認 205回/日(Reviews.org, 2024) · 1日のスクリーンタイム 6時間40分(DataReportal, 2025)"},
  "oRes": {"en": "Diary study with 6 participants · 5-day phone-log audit · 2 guerrilla tests", "ko": "6명 다이어리 스터디 · 5일 사용 로그 감사 · 게릴라 테스트 2회", "ja": "6名の日記研究 · 5日間の利用ログ監査 · ゲリラテスト2回"},
  "oI1": {"en": "Checking is a reflex, not a decision. → Design decision: interrupt the reflex, not the report — a live counter on the home screen.", "ko": "스마트폰 확인은 판단이 아니라 반사적인 행동입니다. → 디자인 결정: 리포트가 아니라 반사를 끊습니다 — 홈 화면의 라이브 카운터.", "ja": "確認は判断ではなく反射。→ デザインの決定: レポートではなく反射を止める — ホーム画面のライブカウンター。"},
  "oI2": {"en": "Numbers alone numb fast. → Design decision: pair the count with what it displaced — '12 checks before your first sentence of work.'", "ko": "숫자만으로는 금방 무감각해집니다. → 디자인 결정: 횟수와 무엇이 중단됐는지를 함께 보여 줍니다 — '오늘 첫 작업 문장 전에 12번'.", "ja": "数字だけではすぐ麻痺する。→ デザインの決定: 回数と、そのために何が中断されたかを組み合わせます — 『仕事の最初の一文までに12回』。"},
  "oI3": {"en": "Limits get dismissed in one tap. → Design decision: friction, not walls — a 5-second pause you can override, and remember overriding.", "ko": "제한은 한 번의 탭으로 해제됩니다. → 디자인 결정: 벽이 아니라 마찰 — 5초 멈춤. 건너뛸 수는 있지만, 건너뛴 사실은 남습니다.", "ja": "制限は1タップで解除される。→ デザインの決定: 壁ではなく摩擦 — 5秒の一時停止。スキップはできますが、その選択は残ります。"},
  "oExp": {"en": "Three directions: A — a hard blocker, B — an ambient mirror (chosen), C — a notification digest.", "ko": "세 가지 방향: A 하드 블로커 · B 일상 속 거울(채택) · C 알림 다이제스트.", "ja": "3つの方向: A ハードブロッカー · B 日常を映すミラー（採用） · C 通知ダイジェスト。"},
  "oKill": {"en": "The hard blocker. Testers uninstalled it within 48 hours — a tool you remove can't change anything.", "ko": "하드 블로커. 테스터들이 48시간 안에 삭제했습니다 — 사용자가 지워버리는 도구는 아무것도 바꿀 수 없습니다.", "ja": "ハードブロッカー。テスターは48時間以内にアンインストールした — アンインストールされるツールは、何も変えられません。"},
  "oF1": {"en": "The live counter — today's checks, always one glance away on the home screen.", "ko": "라이브 카운터 — 오늘의 확인 횟수가 홈 화면에서 바로 보입니다.", "ja": "ライブカウンター — 今日の確認回数が、ホーム画面ですぐ見える。"},
  "oF2": {"en": "Displacement framing — not '2 hours wasted' but what those minutes interrupted.", "ko": "관점 전환 — '2시간을 낭비했다'가 아니라, 그 시간이 무엇을 중단했는지 보여 줍니다.", "ja": "見方を変えるフレーミング — 『2時間の無駄』ではなく、その時間が何を中断したかを見る。"},
  "oF3": {"en": "The 5-second pause — open a flagged app and take one breath. Just enough to choose again.", "ko": "5초 멈춤 — 제한을 설정한 앱을 열면 5초간 멈춥니다. 다시 선택하기에 충분한 길이입니다.", "ja": "5秒の一時停止 — 対象にしたアプリを開くと、5秒間立ち止まる。選び直すには十分な長さ。"},
  "oImp": {"en": "Self-reported checks −18% in week 2 · 5 of 6 diary participants kept it installed", "ko": "자가 보고 확인 횟수 2주차 −18% · 다이어리 참가자 6명 중 5명이 계속 설치해 두었습니다.", "ja": "自己申告の確認回数 2週目に−18% · 日記参加者6名中5名が継続利用"},
  "oImpHow": {"en": "Small diary study (n=6, 2 weeks): self-reported check counts plus retention of the tool itself. A directional signal, not proof — labeled as such on purpose.", "ko": "소규모 다이어리 스터디(n=6, 2주). 자가 보고 확인 횟수와 도구 자체의 유지율입니다. 가능성을 보여 주는 신호일 뿐, 증명은 아닙니다.", "ja": "小規模な日記研究(n=6・2週間)。自己申告の確認回数と、ツール自体の継続率。傾向を示す手がかりであって、証明ではありません。"},
  "oRefW": {"en": "The no-dark-patterns constraint produced the idea: visibility first, control second.", "ko": "다크 패턴을 쓰지 않겠다는 제약이 아이디어의 출발점이 됐습니다 — 먼저 보이게 하고, 제어는 그 다음.", "ja": "ダークパターン禁止という制約が、アイデアの出発点になりました — まず見える化、制御はその後。"},
  "oRefD": {"en": "Instrument real usage logs from day one — self-reported counts drifted more than I expected.", "ko": "첫날부터 실제 사용 로그를 수집할 것입니다 — 자가 보고 횟수는 예상보다 크게 흔들렸습니다.", "ja": "最初から実利用ログを取ります — 自己申告の回数は思ったより大きくずれた。"},
  "p2Badge": {"en": "Concept · 2025", "ko": "콘셉트 · 2025", "ja": "コンセプト · 2025"},
  "p3Badge": {"en": "Side project · 2024", "ko": "사이드 프로젝트 · 2024", "ja": "サイドプロジェクト · 2024"},
  "oBadge": {"en": "Coursework · 2024", "ko": "수업 프로젝트 · 2024", "ja": "コースワーク · 2024"},
};
function syncLanguageIndicators(instant){
  document.querySelectorAll('.sb-lang, .scroll-topbar__lang').forEach(function(group){
    var indicator=group.querySelector('.indicator'),activeBtn=null;
    group.querySelectorAll('button').forEach(function(b){if(b.classList.contains('on'))activeBtn=b;});
    if(!indicator||!activeBtn)return;
    var groupRect=group.getBoundingClientRect(),btnRect=activeBtn.getBoundingClientRect();
    if(!groupRect.width||!btnRect.width)return;
    var cs=getComputedStyle(group);
    var borderL=parseFloat(cs.borderLeftWidth)||0;
    var borderT=parseFloat(cs.borderTopWidth)||0;
    var x=btnRect.left-groupRect.left-borderL;
    var y=btnRect.top-groupRect.top-borderT;
    if(instant)indicator.style.transition='none';
    indicator.style.width=Math.round(btnRect.width)+'px';
    indicator.style.height=Math.round(btnRect.height)+'px';
    indicator.style.top='0px';
    indicator.style.left='0px';
    indicator.style.bottom='auto';
    indicator.style.transform='translate3d('+x.toFixed(2)+'px,'+y.toFixed(2)+'px,0)';
    if(instant){indicator.offsetWidth;indicator.style.transition='';}
  });
}
/* Atomic language commit: never expose fallback-font Japanese or half-updated
   content. The previous language stays visible until the target dictionary and
   the glyph-bearing font are both ready, then one synchronous DOM commit runs. */
var pendingLangToken=0,languageReadyPromise=null;
function prepareLanguage(l){
  var token=++pendingLangToken;
  var fontPromise=Promise.resolve();
  if(document.fonts){
    var samples=l==='ja'?'日本語の見出しと本文':l==='ko'?'한국어 제목과 본문':'English heading and body';
    fontPromise=Promise.all([
      document.fonts.load("400 17px 'Wanted Sans Variable'",samples),
      document.fonts.load("800 80px 'Wanted Sans Variable'",samples),
      l==='ja'?document.fonts.load("400 17px 'Pretendard JP'",samples):Promise.resolve()
    ]).catch(function(){return [];});
  }
  return fontPromise.then(function(){
    if(token!==pendingLangToken)return false;
    return document.fonts&&document.fonts.ready?document.fonts.ready.then(function(){return token===pendingLangToken;}):true;
  });
}
function commitLang(l,instant){
  document.documentElement.lang=l;
  try{localStorage.setItem('jr-lang',l);}catch(e){}
  document.querySelectorAll('[data-i18n]').forEach(function(el){
    /* Preserve the original English chrome: brand, sidebar/nav, and compact
       or scroll-return headers never participate in content localization. */
    if(el.closest('.sb, #scrollTopbar, .case-lang'))return;
    var d=I18N[el.getAttribute('data-i18n')];
    if(d&&d[l]!=null)el.innerHTML=d[l];
  });
  document.querySelectorAll('[data-i18n-aria]').forEach(function(el){
    var d=I18N[el.getAttribute('data-i18n-aria')];
    if(d&&d[l]!=null)el.setAttribute('aria-label',d[l]);
  });
  document.querySelectorAll('.sb-lang button, .scroll-topbar__lang button').forEach(function(b){
    var on=b.getAttribute('data-lang')===l;
    b.classList.toggle('on',on);
    b.setAttribute('aria-pressed',on?'true':'false');
  });
  syncLanguageIndicators(instant===true);
}
function setLang(l,instant){
  if(LANGS.indexOf(l)<0)l='en';
  var requested=l;
  /* User gestures must commit in the same turn. fonts.ready is a first-paint
     barrier: it resets whenever any face starts loading (split CJK subsets,
     Pretendard JP, Wanted Sans), so waiting on it after a click makes the
     control look dead or discards the click via pendingLangToken. */
  if(instant!==true){
    if(requested===document.documentElement.lang)return Promise.resolve(true);
    pendingLangToken++;
    commitLang(requested,false);
    return Promise.resolve(true);
  }
  languageReadyPromise=prepareLanguage(requested).then(function(ready){
    if(ready===false)return false;
    commitLang(requested,true);
    return true;
  });
  return languageReadyPromise;
}
var initLang='';
try{initLang=localStorage.getItem('jr-lang')||'';}catch(e){}
if(!initLang){var nl=(navigator.language||'en').toLowerCase().slice(0,2);initLang=(nl==='ko'||nl==='ja')?nl:'en';}
setLang(initLang,true).then(function(){
  document.documentElement.classList.remove('i18n-pending');
  window.requestAnimationFrame(function(){syncLanguageIndicators(true);});
});
window.setTimeout(function(){syncLanguageIndicators(true);},0);
window.addEventListener('resize',function(){
  /* PC keeps the original instant recalculation; compact controls preserve
     an in-flight transform transition during mobile/tablet viewport changes. */
  syncLanguageIndicators(window.matchMedia('(min-width: 1080px)').matches);
});
if(document.fonts&&document.fonts.ready){
  document.fonts.ready.then(function(){
    syncLanguageIndicators(window.matchMedia('(min-width: 1080px)').matches);
  });
}
document.querySelectorAll('.sb-lang button, .scroll-topbar__lang button').forEach(function(b){
  b.addEventListener('click',function(){setLang(b.getAttribute('data-lang'),false);});
});
(function(){
  document.querySelectorAll('[data-social]').forEach(function(a){
    var href=SOCIAL[a.getAttribute('data-social')];
    if(href){
      a.href=href;
      a.target='_blank';
      a.rel='me noopener noreferrer';
    }else{
      a.removeAttribute('href');
      a.addEventListener('click',function(e){e.preventDefault();});
    }
  });
}());

