# Biennale Guide — 타이포 · 색

01 작업(`#cv-biennale`, `biennale.html`)의 글과 색만 다룬다.  
인덱스의 Quiet Editorial 팔레트는 여기에 적지 않고, 바꾸지 않는다.

소스 오브 트루스: `css/site.css`의 `.case-view` / `html.page-case` 토큰과 `#cv-biennale` 규칙.  
이 파일이 CSS와 어긋나면 CSS가 이긴다. 여기 값을 고치면 CSS도 같이 고친다.

역할 이름으로 쓴다. 본문에 hex를 흩뿌리지 않는다.

---

## 원칙

1. **종이와 잉크.** 지면은 크림, 본문은 거의 검정. 중간 회색으로 위계를 만들지 않는다. 위계는 크기·무게·간격이다.
2. **초록은 신호다.** `--teal`은 지표 숫자, 결정문(`So …`), 선택된 안, 제품 목업의 on 칩에만 쓴다. 제목·본문·인용·SeMA 마크·뒤로·다음 작업에는 쓰지 않는다.
3. **역할을 늘리지 않는다.** 새 회색, 새 초록, 새 앰버를 만들지 않는다. 필요한 대비는 기존 역할의 값을 옮긴다.
4. **무게는 600이 천장이다.** 본문 400, 인용 500, 디스플레이·섹션·결정 600. 800은 이 페이지에서 쓰지 않는다. (제품 목업 화면 안 칩만 예외.)
5. **폭은 타입 역할이 아니다.** 크기·무게·행간·자간만 타입 표에 둔다. 페이지 폭은 레이아웃이다.

Carbon이 본문 색을 중성으로 두고 액션에만 색을 쓰는 것과 같다. 색은 장식이 아니다.

---

## 토큰

상세 페이지에서만 잉크가 더 검다. `:root`의 인덱스 값은 그대로 둔다.

| 역할 | 토큰 | 상세 페이지 | 쓰는 곳 |
|---|---|---|---|
| Paper | `--bg` | `#F1EDE8` | 지면 |
| Card | `--card` | `#F9F7F4` | 거의 안 씀. 채운 카드 금지 |
| Ink | `--ink` | `#111111` | 제목, 본문, 리드, 인용, 마크, 서수 |
| Sub | `--sub` | `#161616` | 본문과 같게 읽히게. 새 회색이 아님 |
| Faint | `--faint` | `#3A3A3A` | 라벨, 캡션, 메타. 무채. 난색 회색 금지 |
| Accent | `--teal` | `#0C3024` | 신호만 |
| Accent dim | `--teal-soft` | `rgba(12,48,36,.07)` | 선택된 옵션 배경만 |
| Line | `--border-soft` | `#DED3C8` | 헤어라인 |
| Focus | `--focus` | `#007AFF` | 키보드 포커스만. 브랜드 색이 아님 |

`--amber`는 이 페이지에서 쓰지 않는다.

대비 (지면 `#F1EDE8` 기준, 근사)

| 쌍 | 비율 | 기준 |
|---|---|---|
| Ink / paper | ~16:1 | AAA 본문 |
| Faint / paper | ~10:1 | AAA 캡션 |
| Teal / paper | ~12:1 | AAA. 그래도 본문 색으로 쓰지 않음 |

---

## 서체

```
Wanted Sans Variable, Wanted Sans, Pretendard JP, Inter, system-ui
```

한 가족이다. 세리프를 섞지 않는다. Variable이므로 무게는 `font-weight`로만 준다.

- 본문 기본: 17px / 1.6, `-webkit-font-smoothing: antialiased`, `text-rendering: optimizeLegibility`
- KO 큰 제목·인용·마크: `word-break: keep-all`, tracking `-0.02em`
- JA 큰 제목·인용: tracking `-0.02em`
- KO 섹션 라벨 tracking `0.08em` (영문 `0.18em`보다 좁힘)
- JA 섹션 라벨 tracking `0.18em`

인코딩은 UTF-8만. CJK를 다시 인코딩하지 않는다.

---

## 타입 역할

크기·무게·행간·자간·색·클래스. 폭은 이 표에 넣지 않는다.  
`clamp`는 최소 / 선호 / 최대. 데스크톱 기준은 최대값.

| 역할 | 크기 | 무게 | 행간 | 자간 | 색 | 클래스 |
|---|---|---|---|---|---|---|
| Mark | clamp(72px, 16vw, **180px**) | 600 | 0.8 | −0.06em | Ink | `.cv-mark` |
| Display | clamp(40px, 7vw, **84px**) | 600 | 0.95 | −0.035em | Ink | `.cv-title` |
| Quote | clamp(32px, 5vw, **52px**) | 500 | 1.2 | −0.03em | Ink | `.cv-quote` |
| Ask | clamp(28px, 4vw, **40px**) | 600 | 1.2 | −0.03em | Ink | `.cv-ask` |
| Metric | clamp(26px, 3.2vw, **40px**) | 600 | 1.1 | −0.04em, tabular | **Teal** | `.cv-stats b` |
| Ordinal | **72px** | 600 | 0.8 | −0.06em | Ink | `.cv-prod-n` |
| Lede | clamp(18px, 2.1vw, **22px**) | 400 | 1.5 | 0 | Ink | `.cv-sub` |
| Decision | clamp(18px, 2vw, **22px**) | 600 | 1.35 | −0.02em | **Teal** | `.cv-then` |
| Product title | **22px** | 600 | — | −0.02em | Ink | `.cv-prod-copy h3` |
| Option title | **18px** | 600 | — | −0.02em | Ink | `.cv-opt h3` |
| Body | **17px** | 400 | 1.65 | 0 | Ink | `.cv-blk p` `.cv-text` |
| Why | **16px** | 400 | 1.55 | 0 | Ink | `.cv-why` |
| Product body | **16px** | 400 | 1.6 | 0 | Ink | `.cv-prod-copy p` |
| Retro title | **15px** | 700 | — | 0 | Ink | `.cv-refl h3` |
| Retro body | **15px** | 400 | — | 0 | Ink | `.cv-refl p` |
| Option body | **14px** | 400 | 1.55 | 0 | Faint | `.cv-opt p` |
| Meta / cite | **13px** | 400 | 1.4–1.55 | 0 ~ 0.02em | Faint | `.cv-cite` `.cv-pairs` `.cv-stats span` `.cv-note` |
| Kicker | **12px** | 600 | — | 0.16em, caps | Faint | `.cv-kick` |
| Label | **11px** | 600 | — | 0.18em, caps | Faint | `.cv-blk h2` `.cv-opt-tag` |
| Chosen tag | **11px** | 600 | — | 0.14em, caps | **Teal** | `.cv-opt.is-on .cv-opt-tag` |

섹션 라벨(`.cv-blk h2`)은 본문 제목이 아니다. Ask가 제목이다.

---

## 초록을 쓰는 곳

| 쓴다 | 안 쓴다 |
|---|---|
| 히어로 지표 숫자 `.cv-stats b` | Display, Ask, Quote, Mark, Body |
| 결정문 `.cv-then` (`So the URL is the product…`) | 서수 01 / 02 / 03 |
| 선택된 옵션 테두리·연한 채움·태그 | 뒤로 버튼, 다음 작업 제목 |
| 폰 목업 안의 on 칩 (가짜 UI) | 인사이트 박스 전체 채움 |
| 스크러버 핸들 (위치 신호) | 섹션 라벨, 캡션, 인용 |

선택 옵션은 색만으로 구분하지 않는다. 테두리 + 채움 + 태그 문구가 같이 간다.

인사이트는 왼쪽 3px 틸 레일만. 배경 틴트는 없다. why는 Ink, so는 Teal.

---

## 레이아웃 (글에 붙는 것만)

| 이름 | 값 | 클래스 |
|---|---|---|
| Wrap | 1120px | `.cv-wrap` when Biennale |
| Body measure | 640px | `.cv-text` `.cv-blk p` `.cv-sub` |
| Product copy | 420px | `.cv-prod-copy p` |
| Section pad | 88px 0, 위 헤어라인 | `.cv-blk` |
| Product row | 140px 1fr 340px, 72px 세로 | `.cv-prod` |
| Phone / photo slot | 280px | `.jr-phone` `.cv-at` |
| Rhythm | 8 / 16 / 24 / 40 / 64 / 96 / 128 | — |
| ≤900px | 1열. 폰·사진 왼쪽 정렬 | — |

박스: 헤어라인. 둥근 채움 카드 없음. 옵션만 1px 테두리, 선택된 것만 틸.

---

## 하지 말 것

- 본문을 `--sub` 인덱스 값(`#4A4A4A`)이나 난색 회색(`#5E584E`)으로 되돌리지 않는다.
- 제목 무게를 800으로 올리지 않는다. 전부 고함이면 본문이 죽는다.
- SeMA 마크를 틸로 칠하지 않는다. 크기가 이미 강조다.
- 본문·리드·인용에 틸을 쓰지 않는다.
- 새 hex를 한 군데만 넣지 않는다. 토큰을 고친다.
- 본문 한 줄을 1120px 풀로 늘리지 않는다.
- 03 사진 스택 위에 이름·인용을 올리지 않는다. `<>`만 이미지 하단 중앙.

---

## 새 문장을 넣을 때

1. 역할 테이블에서 고른다. Ask / Body / Caption / Decision 중 하나.
2. 클래스를 붙인다. `style=`로 크기·색을 쓰지 않는다.
3. 세 언어는 `js/i18n.js`. 영어 리듬이 기준이다. KO/JA는 위에 적은 tracking만 보정한다.
4. 강조가 필요하면 문장을 `.cv-then`으로 빼거나 지표 칸에 숫자를 둔다. 본문 일부를 틸로 칠하지 않는다.

02 Loop는 같은 타입·색 역할을 쓴다 (`#cv-loop`). 페이지 폭은 원래 콘텐츠 wrap(890px)을 유지한다. 03 Off는 아직 이 표를 따르지 않는다.
