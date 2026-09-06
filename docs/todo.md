# Project TODO

- [x] 일본어 언어 전환에서 사전·일본어 폰트를 미리 로드하고 원자적으로 커밋
- [x] 최초 진입과 EN·KR·JP 전환에서 부분 렌더링·레이아웃 shift 회귀 검증

- [x] JP를 초기 언어(localStorage 또는 navigator.language=ja)로 설정한 최초 진입을 검증
- [x] EN·KR·JP 전체 전환 조합에서 commit 전후 언어·본문 상태를 검증
- [x] 언어 전환 전후 header·본문 주요 bounding box의 layout shift를 검증
- [x] verify-japanese-complete에서 hero/lede 본문 delta를 허용 기준과 함께 명시적으로 계산
- [x] header/body layout 검증 결과에 pass/fail 요약을 기록
- [x] hero·lede 각각의 x/y anchor 및 width/height 허용 기준을 명시하고 pass/fail 계산
- [x] header와 body의 pass/fail을 분리해 수치 기준과 함께 검증 요약에 기록
- [x] hero·lede width와 height 허용치를 별도 threshold로 추가
- [x] hero·lede별 x·y·w·h 기준·실측·pass/fail을 검증 요약에 명시
