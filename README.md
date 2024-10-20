## 지원자 소개
- 이름 : 방진웅
- 지원 분야 : 프론트엔드
- 이메일 : jwbang.dev@gmail.com

## 프로젝트 실행

```bash
#1. 패키지 설치
npm install
# or
yarn

#2. 개발 서버 실행
npm run dev
# or
yarn dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 을 열어 결과를 확인하세요.

## 서비스 페이지
- [임시 메인 페이지 (http://localhost:3000)](http://localhost:3000)
- [과제 쇼츠 페이지 (http://localhost:3000/video/15000001)](http://localhost:3000/video/15000001)

## 폴더 구조

```bash
src
├── app
│   ├── api
│   │   ├── play (단일 영상 조회 Mock API)
│   │   ├── program (프로그램 조회 Mock API)
│   │   └── videos (영상 리스트 Mock API)
│   ├── layout.tsx
│   ├── page.tsx
│   └── video
│       ├── [programId] (테스트 programId : 15000001)
│       │   ├── component (페이지 내에서만 사용하는 컴포넌트)
│       │   │   ├── AlertModal.tsx
│       │   │   ├── ErrorModal.tsx
│       │   │   └── ProgramInfoProvider.tsx (비디오 플레이어 초기화 전 데이터 세팅 컴포넌트)
│       │   │   └── ShortsSwiper.tsx
│       │   ├── error.tsx
│       │   ├── layout.tsx
│       │   └── page.tsx (쇼츠 영상 페이지)
│       └── layout.tsx
├── components (공통 컴포넌트)
│   ├── VideoPlayer
│   │   ├── CoreVideoPlayer.tsx
│   │   ├── ProgressBar.tsx
│   │   ├── VideoPlayerCover.tsx
│   │   └── index.tsx
│   ├── button
│   │   ├── index.tsx
│   │   └── play.tsx
│   ├── loading
│   │   └── Loading.tsx
│   ├── modal
│   │   └── index.tsx
│   └── portal
│       └── index.tsx
├── constants (공통 상수)
│   └── error.ts
├── context (Provider & Context 컴포넌트)
│   ├── ReactQueryProvider.tsx
│   └── RecoilProvider.tsx
├── fetcher (API 호출 함수)
│   └── index.ts
├── hooks (커스텀 훅)
│   ├── useCommonQuery.ts
│   ├── useDebounce.ts
│   ├── useDoubleTab.ts
│   ├── useProgramQuery.ts
│   └── useVideoQuery.ts
├── libs (공통 라이브러리)
│   ├── ShakaPlayerController.ts
│   ├── common.ts
│   └── drm (DRM 라이브러리)
│       ├── DRM.ts
│       ├── DRMController.ts
│       ├── FairPlayDRM.ts
│       ├── PlayReadyDRM.ts
│       └── WidevineDRM.ts
├── mock (API 모킹 데이터)
├── models (API 응답 모델)
├── query (React Query)
│   └── index.ts
├── service (API 호출 서비스)
│   └── index.ts
├── store
│   ├── error (에러 상태 관리)
│   │   └── index.ts
│   ├── modal (모달 상태 관리)
│   │   └── index.ts
│   ├── program (프로그램 상태 관리)
│   │   └── index.ts
│   └── video (영상 상태 관리)
│       └── index.ts
└── types (공통 타입)
    ├── shaka-player.d.ts (Shaka Player 타입)
    └── response.ts (API 응답 타입)
```
## 사용 라이브러리

```json
{
    "@heroicons/react": "^2.1.5", // UI 아이콘
    "@tanstack/react-query": "^5.59.15", // React Query (API 비동기 호출 라이브러리)
    "axios": "^1.7.7", // API 호출 라이브러리 (fetch 대신 사용하였습니다.)
    "clsx": "^2.1.1", // UI Class 스타일 조합
    "next": "14.2.15", // Next.js (app router 사용)
    "recoil": "^0.7.7", // Recoil (상태 관리)
    "shaka-player": "^4.11.7", // Shaka Player (Streaming & DRM 라이브러리)
    "swiper": "^11.1.14" //  상하 스크롤(Swiper)을 위해 사용하였습니다.
}
```

## DRM 설명

- 현재 구현된 DRM은 Widevine, PlayReady, FairPlay 3가지 입니다.
- 각 DRM은 shaka-player 라이브러리를 통해 구현되었습니다.
- DRM 모듈의 폴더 구조는 아래와 같습니다.

```bash
./src/libs/drm
  ├── DRM.ts (DRM 인터페이스)
  ├── DRMController.ts (DRM 컨트롤러)
  ├── FairPlayDRM.ts (FairPlay DRM 모델링)
  ├── PlayReadyDRM.ts (PlayReady DRM 모델링)
  └── WidevineDRM.ts (Widevine DRM 모델링)
```

- 동작 워크플로우는 다음과 같습니다.
  - 플레이어 생성 -> DRM 컨트롤러 생성 및 설정 초기화 -> DRM 타입 결정 -> 타입에 맞는 DRM 모델 객체 생성 -> 플레이어에 DRM Config 설정 -> 플레이어 재생

