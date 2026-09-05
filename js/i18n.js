/* ---- i18n (ported verbatim from the working build) ---- */
var LANGS=['en','ko','ja'];
var I18N={
  "heroH1": {"en": "<span class=\"hero-copy-line\">Good design starts with</span><span class=\"hero-copy-line\"><em>the people it&apos;s for.</em></span>", "ko": "<span class=\"hero-copy-line\">디자인이 좋은지보다,</span><span class=\"hero-copy-line\"><em>사람에게 맞는지를</em></span><span class=\"hero-copy-line\">먼저 생각합니다.</span>", "ja": "<span class=\"hero-copy-line\">良いデザインかどうかより、</span><span class=\"hero-copy-line\"><em>使う人に合っているかを</em></span><span class=\"hero-copy-line\">まず考えます。</span>"},
  "heroIntro": {"en": "Right Design puts people before trends and context before taste. I start with how people actually behave, keep the complexity that matters, and clear away the confusion that gets in their way.", "ko": "맞는 디자인은 유행보다 사람을, 취향보다 맥락을 봅니다. 현장에서 사람의 행동을 이해하고, 필요한 복잡함은 남기되 목적을 흐리는 혼란은 걷어냅니다.", "ja": "流行や好みではなく、使う人と、その人を取り巻く状況から考えます。現場で人の行動を捉え、必要な複雑さは残し、迷わず目的にたどり着けるよう、混乱だけを取り除きます。"},
  "wkKick": {"en": "Selected Projects", "ko": "주요 프로젝트", "ja": "代表プロジェクト"},
  "r1Stmt": {"en": "A web-based visitor guide for a biennale with 140,000 visitors. Designed for zero-friction access because 97% of museum apps are never downloaded.", "ko": "14만 명이 찾은 비엔날레를 위한 웹 기반 관람 가이드. 미술관 앱의 97%가 다운로드되지 않기에, 별도 설치 없이 바로 접근할 수 있도록 설계했습니다.", "ja": "14万人が訪れたビエンナーレのためのWebベースの観覧ガイド。美術館アプリの97%がダウンロードされないからこそ、手間なく、すぐにアクセスできるよう設計しました。"},
  "r1M1": {"en": "Research & UX/UI", "ko": "리서치 & UX/UI", "ja": "リサーチ & UX/UI"},
  "r1M2": {"en": "Web App", "ko": "웹 앱", "ja": "Webアプリ"},
  "r1Badge": {"en": "Impact: 140k Users", "ko": "이용자 14만 명", "ja": "利用者 14万人"},
  "r2Stmt": {"en": "A cognitive science-backed tool for vocabulary retention. Built to combat the Ebbinghaus forgetting curve using spaced repetition algorithms.", "ko": "단어를 오래 기억하기 위한 인지과학 기반 도구. 간격 반복 알고리즘으로 에빙하우스 망각 곡선에 맞서도록 만들었습니다.", "ja": "語彙の定着を支える、認知科学に基づくツール。分散学習アルゴリズムでエビングハウスの忘却曲線に抗うよう構築。"},
  "r2M1": {"en": "Design & Development", "ko": "디자인 & 개발", "ja": "デザイン & 開発"},
  "r2Badge": {"en": "Side Project", "ko": "사이드 프로젝트", "ja": "サイドプロジェクト"},
  "r3Stmt": {"en": "A digital wellbeing tool that visualizes the psychological pull of smartphone notifications. Designed to reduce an average of 205 daily phone checks.", "ko": "스마트폰 알림의 심리적 끌림을 시각화하는 디지털 웰빙 도구. 하루 평균 205회에 이르는 스마트폰 확인을 줄이는 데 집중했습니다.", "ja": "スマートフォン通知の心理的な引力を可視化するデジタルウェルビーイングツール。1日平均205回に及ぶスマホの確認を減らすことに注力。"},
  "r3M1": {"en": "Research & Flutter", "ko": "리서치 & Flutter", "ja": "リサーチ & Flutter"},
  "r3Badge": {"en": "Coursework", "ko": "수업 프로젝트", "ja": "コースワーク"},
  "viewLink": {"en": "Take a closer look →", "ko": "자세히 보기 →", "ja": "詳しく見る →"},
  "abKick": {"en": "About Me", "ko": "소개", "ja": "私について"},
  "abP1": {"en": "I care first about whether design works for people, not just how it looks. Right Design helps people reach their goals naturally within their own contexts and constraints.", "ko": "저는 디자인이 좋은지보다 사람에게 맞는지를 먼저 생각합니다. 맞는 디자인은 각자의 환경과 제약 안에서 목적을 자연스럽게 이루도록 돕습니다.", "ja": "良いデザインかどうかより、使う人に合っているかをまず考えます。人に合うデザインは、それぞれの環境や制約のなかで、無理なく目的を達成できるようにするものです。"},
  "abP2": {"en": "I look at people before screens: their words, habits, hesitations, and familiar patterns. I follow neither convention blindly nor novelty for its own sake. I keep necessary information and complexity, clearing away uncertainty about what comes next.", "ko": "화면보다 사람을 먼저 봅니다. 말뿐 아니라 반복하는 행동, 멈추는 지점, 이미 익숙한 방식을 관찰합니다. 익숙함을 그대로 따르지도, 새로움을 위한 새로움을 만들지도 않습니다. 필요한 정보와 복잡함은 남기고, 다음 행동을 망설이게 하는 불확실성은 걷어냅니다.", "ja": "画面より先に、人を見ます。言葉だけでなく、繰り返す行動、手が止まる瞬間、すでに身についているやり方を観察します。慣れをそのまま正解にすることも、目新しさだけを追うこともしません。必要な情報と複雑さは残し、次の行動をためらわせる曖昧さだけを取り除きます。"},
  "abP3": {"en": "A good experience is more than a feature or a beautiful screen. Information order, voice, motion speed, feedback timing, and confidence in each choice must work as one flow. I design the whole flow.", "ko": "좋은 경험은 기능 하나나 예쁜 화면 하나로 완성되지 않습니다. 정보의 순서와 언어의 톤, 움직임의 속도와 피드백의 타이밍, 선택에 대한 확신이 하나의 흐름으로 이어져야 합니다. 저는 그 흐름 전체를 설계합니다.", "ja": "良い体験は、機能一つ、きれいな画面一つだけでは完成しません。情報の順序、言葉のトーン、動きの速さ、フィードバックのタイミング。それらが一つの流れとしてつながってこそ、使う人は自分の選択に確信を持てます。私は、その流れ全体を設計します。"},
  "abCollabK": {"en": "For clients & teams", "ko": "클라이언트와 팀에게", "ja": "クライアント・チームのために"},
  "abCollab": {"en": "The messier the problem, the less I rush to sketch an answer. I start by understanding people's real situations alongside the organization's constraints. Then I make, test, and refine hypotheses until the result is not only polished, but something people can adopt and keep using.", "ko": "복잡한 문제일수록 답을 성급히 정하지 않습니다. 먼저 사람들이 실제로 겪는 상황과 조직의 제약을 함께 이해합니다. 그 뒤 가설을 빠르게 만들고 검증해, 완성도 높은 결과물에 그치지 않고 사람들이 받아들이고 계속 쓸 수 있는 제품으로 이어지게 합니다.", "ja": "問題が複雑であるほど、答えを急いで形にすることはしません。まず、人々が実際に置かれている状況と、組織の制約をともに理解します。その後、仮説を素早く形にして検証し、見栄えだけの成果物にとどまらず、人々に受け入れられ、使い続けられるプロダクトへとつなげます。"},
  "abLocK": {"en": "Current Location", "ko": "활동 기반", "ja": "現在地"},
  "abLoc": {"en": "Born in Korea, currently based in Tokyo", "ko": "한국에서 나고 자라, 지금은 도쿄에서 디자인하고 있습니다.", "ja": "韓国生まれで、現在は東京を拠点に活動しています。"},
  "abSocK": {"en": "Social", "ko": "소셜", "ja": "ソーシャル"},
  "ctKick": {"en": "Get in Touch", "ko": "연락하기", "ja": "お問い合わせ"},
  "ctH2v": {"en": "<span class=\"ct-line\">Even if the answer isn't clear yet, </span><span class=\"ct-line\">we can start there.</span>", "ko": "<span class=\"ct-line\">답이 아직 선명하지 않다면,</span><span class=\"ct-line\">그 질문에서부터 함께 풀어가겠습니다.</span>", "ja": "<span class=\"ct-line\">まだ答えがはっきりしていなくても、</span><span class=\"ct-line\">そこから始められます。</span>"},
  "footL": {"en": "© 2026 Juun Ree · Seoul · Tokyo", "ko": "© 2026 Juun Ree · 서울 · 도쿄", "ja": "© 2026 Juun Ree · ソウル · 東京"},
  "footR": {"en": "Designed by me, coded with AI.", "ko": "직접 디자인하고, AI와 함께 코딩했습니다.", "ja": "デザインは自分で、コーディングはAIと共に。"},
  "csBack": {"en": "← All work", "ko": "← 전체 작업", "ja": "← ワーク一覧へ"},
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
  "bSub": {"en": "A biennale guide designed for the browser — because 90% of museum apps are used by fewer than 3% of visitors.", "ko": "브라우저에서 바로 쓰도록 설계한 비엔날레 가이드 — 미술관 앱의 90%는 관람객 3% 미만만 사용하기 때문입니다.", "ja": "ブラウザで使うことを前提に設計したビエンナーレガイド — 美術館アプリの90%は、来場者の3%未満しか利用しないからです。"},
  "bRole": {"en": "Research, UX/UI — solo", "ko": "리서치, UX/UI — 단독 진행", "ja": "リサーチ・UX/UI — 個人で担当"},
  "bTeam": {"en": "Solo project", "ko": "개인 프로젝트", "ja": "個人プロジェクト"},
  "bTime": {"en": "8 weeks · 2025", "ko": "8주 · 2025", "ja": "8週間 · 2025"},
  "bPlat": {"en": "Web app (no install)", "ko": "웹 앱 (설치 불필요)", "ja": "Webアプリ(インストール不要)"},
  "bCtx": {"en": "The 13th Seoul Mediacity Biennale drew 140,000 visitors across multiple venues. The constraints were fixed from the start: no app-install budget, a three-month run, and visitors who would give the guide exactly one chance — at the entrance, on their own phone.", "ko": "제13회 서울미디어시티비엔날레는 여러 장소에서 14만 명의 관람객을 맞이했습니다. 제약은 처음부터 분명했습니다. 앱 설치를 유도할 예산은 없었고, 행사는 3개월간 열렸습니다. 관람객은 입구에서 자기 휴대폰으로 가이드를 단 한 번 써볼 뿐이었습니다.", "ja": "第13回ソウル・メディアシティ・ビエンナーレは、複数会場で14万人を迎えました。制約は最初から明確でした。アプリのインストールを促す予算はない。会期は3か月。来場者が入口で自分のスマホからガイドを試す機会は、一度きりでした。"},
  "bProb": {"en": "Visitors couldn't answer a simple question: 'what should I see, and where is it?' The standard fix — a museum app — fails by default: fewer than 3% of visitors ever install one.", "ko": "관람객에게는 단순한 질문에 답하기 어려웠습니다 — '무엇을 봐야 하고, 어디에 있지?' 흔한 해법인 미술관 앱은 처음부터 잘 작동하기 어려웠습니다. 설치하는 관람객이 3% 미만이기 때문입니다.", "ja": "来場者にとっては、単純な問いに答えるのが難しかった。『何を見るべきで、それはどこにある？』定番の解決策である美術館アプリは、そもそも機能しにくい。インストールする来場者が3%未満だからです。"},
  "bProbE": {"en": "140,000 visitors (SeMA, 2025) · <3% museum-app adoption (nuseum.ai, 2025)", "ko": "관람객 140,000명 (SeMA, 2025) · 뮤지엄 앱 이용률 3% 미만 (nuseum.ai, 2025)", "ja": "来場者 140,000人(SeMA, 2025) · 美術館アプリ利用率 3%未満(nuseum.ai, 2025)"},
  "bRes": {"en": "Entrance observations over 3 days · 8 visitor interviews · venue-map audit", "ko": "3일간 입구 관찰 · 관람객 인터뷰 8건 · 동선 지도 검토", "ja": "3日間の入口観察 · 来場者インタビュー8件 · 動線マップのレビュー"},
  "bI1": {"en": "Nobody installs an app for a three-month event. → Design decision: browser-first, zero install — the URL is the product.", "ko": "3개월짜리 행사에 앱을 설치하는 사람은 거의 없습니다. → 디자인 결정: 브라우저 퍼스트, 무설치 — URL이 곧 제품입니다.", "ja": "3か月のイベントのためにアプリを入れる人は、ほとんどいない。→ デザインの決定: ブラウザファースト・インストール不要 — URLがそのままプロダクト。"},
  "bI2": {"en": "Anxiety peaks in the first five minutes at the entrance. → Design decision: the first screen answers 'what can I see in my time window' — 40 / 90 / 180 minutes.", "ko": "불안은 입구에서의 첫 5분에 최고조에 달합니다. → 디자인 결정: 첫 화면은 '내게 주어진 시간 안에 무엇을 볼 수 있는지'를 답합니다 — 40 / 90 / 180분.", "ja": "不安は入口の最初の5分でピークになる。→ デザインの決定: 最初の画面が『限られた時間で見られるもの』に答える — 40 / 90 / 180分。"},
  "bI3": {"en": "A map shows where things are, not what matters. → Design decision: curated routes over a floor map.", "ko": "지도는 위치를 알려줄 뿐, 무엇이 중요한지는 말해주지 않습니다. → 디자인 결정: 평면 지도 대신 큐레이션한 동선.", "ja": "マップは場所を教えるだけで、何が大事かは教えない。→ デザインの決定: フロアマップではなく、キュレーションしたルート。"},
  "bExp": {"en": "Three directions were on the table: A — a native app, B — a browser guide, C — a paper map with a QR layer.", "ko": "세 가지 방향을 검토했습니다: A 네이티브 앱 · B 브라우저 가이드 · C 종이 지도 + QR 레이어.", "ja": "3つの方向を検討しました: A ネイティブアプリ · B ブラウザガイド · C 紙マップ + QRレイヤー。"},
  "bKill": {"en": "The native app. Its install hurdle was the problem itself. Paper + QR survived only as a fallback layer, not the product.", "ko": "네이티브 앱. 설치 자체가 장벽이었습니다. 종이 + QR은 제품이 아니라 폴백 레이어로만 남겼습니다.", "ja": "ネイティブアプリ。インストールそのものが障壁でした。紙+QRはプロダクトではなくフォールバックとして残した。"},
  "bF1": {"en": "Time-window routes — pick 40, 90, or 180 minutes and get a route that actually fits it.", "ko": "시간에 맞춘 동선 — 40, 90, 180분 중 고르면 그 시간에 맞는 동선을 보여 줍니다.", "ja": "所要時間別ルート — 40・90・180分から選ぶと、その時間に合うルートを提案します。"},
  "bF2": {"en": "Near-you works — pieces sorted by walking time from where you're standing.", "ko": "지금 가까운 작품 — 서 있는 곳에서의 도보 시간 순으로 정렬됩니다.", "ja": "今いる場所から近い作品 — 立っている場所からの徒歩時間順に並ぶ。"},
  "bF3": {"en": "Zero-install entry — a QR at the ticket desk opens the guide in the browser. No store, no account.", "ko": "설치 없이 시작하기 — 매표소의 QR을 스캔하면 브라우저에서 가이드가 바로 열립니다. 스토어도, 계정도 없이.", "ja": "インストール不要で始める — チケット売り場のQRを読み取ると、ブラウザでガイドがすぐ開きます。ストアもアカウントも不要。"},
  "bImp": {"en": "Task success 3/10 → 9/10 · Time to first artwork 6 min → 40 sec", "ko": "태스크 성공률 3/10 → 9/10 · 첫 작품까지 걸린 시간 6분 → 40초", "ja": "タスク成功率 3/10 → 9/10 · 最初の作品までの時間 6分 → 40秒"},
  "bImpHow": {"en": "Concept project — measured with moderated usability tests (n=10) on the final prototype against the existing app-first flow. No launch data exists, so these are lab numbers, stated as such.", "ko": "컨셉 프로젝트 — 최종 프로토타입과 기존 앱 방식을 비교한 모더레이티드 사용성 테스트(n=10) 기준입니다. 출시 데이터가 없으므로, 이 수치는 실험실 환경의 결과임을 분명히 밝힙니다.", "ja": "コンセプトプロジェクト — 最終プロトタイプと既存アプリ方式を比較したモデレート型ユーザビリティテスト(n=10)の数値です。ローンチデータはないため、ラボ環境で得た数値であることを明記しています。"},
  "bRefW": {"en": "The browser-first constraint did the design work: every feature had to justify itself without an install.", "ko": "브라우저 퍼스트라는 제약이 디자인의 기준이 됐습니다 — 모든 기능이 설치 없이 스스로를 정당화해야 했으니까요.", "ja": "ブラウザファーストという制約が、デザインの判断基準になりました — すべての機能がインストールなしで自らを正当化する必要があった。"},
  "bRefD": {"en": "Test the offline path earlier — venue Wi-Fi assumptions nearly broke the entry flow.", "ko": "오프라인 경로를 더 일찍 테스트할 것입니다 — 전시장 Wi-Fi 가정이 입구 플로우를 거의 망가뜨릴 뻔했어요.", "ja": "オフライン経路をもっと早くテストする — 会場Wi-Fiの前提が入口フローを壊しかけた。"},
  "lSub": {"en": "Vocabulary review timed to the forgetting curve — we lose ~70% of new words within 24 hours unless review is spaced.", "ko": "망각 곡선에 맞춰 복습 시점을 알려 주는 단어 학습 도구 — 복습을 나누지 않으면 새 단어의 ~70%가 24시간 안에 사라집니다.", "ja": "忘却曲線に合わせて復習のタイミングを整える単語学習ツール — 復習を分けないと、新しい単語の約70%は24時間で消える。"},
  "lRole": {"en": "Design + build — solo", "ko": "디자인 + 구현 — 개인", "ja": "デザイン + 実装 — 個人"},
  "lTeam": {"en": "Side project", "ko": "사이드 프로젝트", "ja": "サイドプロジェクト"},
  "lTime": {"en": "6 weeks · 2024", "ko": "6주 · 2024", "ja": "6週間 · 2024"},
  "lPlat": {"en": "Web app · PWA", "ko": "웹 앱 · PWA", "ja": "Webアプリ · PWA"},
  "lCtx": {"en": "A side project built end to end — research, design, and code. The constraint was attention itself: the tool had to work in the 30 seconds between things, with no streaks or guilt mechanics to come back to.", "ko": "리서치, 디자인, 코드까지 혼자 완성한 사이드 프로젝트입니다. 핵심 제약은 주의력을 빼앗지 않는 것이었습니다 — 일과 일 사이의 30초에 작동해야 했고, 스트릭이나 죄책감 장치는 두지 않기로 했습니다.", "ja": "リサーチ、デザイン、コードまで一人で作り切ったサイドプロジェクトです。制約は、ユーザーの注意を奪わないことでした — 合間の30秒で動くこと。ストリークや罪悪感の仕掛けはなし。"},
  "lProb": {"en": "People don't fail to learn words; they fail to return. Review apps treat memory as the problem — but ~70% of new words are gone within 24 hours only because nobody comes back at the right time.", "ko": "사람들은 단어를 못 외우는 게 아니라, 돌아오지 못합니다. 복습 앱은 기억을 문제로 보지만, 24시간 안에 ~70%가 사라지는 건 아무도 맞는 시간에 돌아오지 않기 때문입니다.", "ja": "人は単語を覚えられないのではなく、戻ってこられない。復習アプリは記憶力の問題として扱いがちです。24時間で約70%が消えるのは、誰も正しい時間に戻ってこないからだ。"},
  "lProbE": {"en": "~70% forgotten within 24h (Ebbinghaus; Murre & Dros, 2015) · ~20% better retention with spaced review (Carpenter et al., 2018)", "ko": "24시간 내 ~70% 망각 (Ebbinghaus; Murre & Dros, 2015) · 분산 복습 시 유지율 ~20% 향상 (Carpenter et al., 2018)", "ja": "24時間で約70%を忘却(Ebbinghaus; Murre & Dros, 2015) · 分散復習で保持率約20%向上(Carpenter et al., 2018)"},
  "lRes": {"en": "12 learner interviews · forgetting-curve literature review · audit of 5 SRS apps", "ko": "학습자 인터뷰 12건 · 망각 곡선 문헌 검토 · SRS 앱 5종 리뷰", "ja": "学習者インタビュー12件 · 忘却曲線の文献レビュー · SRSアプリ5つのレビュー"},
  "lI1": {"en": "People review when they remember to — so they don't. → Design decision: the schedule pings you; the app never waits for motivation.", "ko": "사람들은 생각날 때 복습합니다 — 즉, 하지 않습니다. → 디자인 결정: 스케줄이 먼저 알려 줍니다. 앱은 동기를 기다리지 않습니다.", "ja": "人は思い出した時に復習する — つまり、しない。→ デザインの決定: スケジュールが先に知らせます。アプリはやる気を待ちません。"},
  "lI2": {"en": "Word lists bury what you almost know. → Design decision: the queue surfaces only due words — nothing else is visible.", "ko": "단어 목록은 '거의 아는 단어'를 묻어버립니다. → 디자인 결정: 큐에는 복습 시점이 온 단어만. 나머지는 보이지 않습니다.", "ja": "単語リストは、覚えかけの単語を埋もれさせる。→ デザインの決定: キューには期限の来た単語だけ。他は見せない。"},
  "lI3": {"en": "Streak guilt kills return. → Design decision: no streaks, no flames — only '3 words, 30 seconds.'", "ko": "스트릭에서 오는 죄책감은 재방문을 막습니다. → 디자인 결정: 스트릭도 불꽃도 없이 — '3개, 30초'뿐입니다.", "ja": "ストリークの罪悪感は、再訪を遠ざけます。→ デザインの決定: ストリークも炎もなし — 「3語、30秒」だけ。"},
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

