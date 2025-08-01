## Melissa

"일기를 쓰는 것은 에너지가 많이 드는 작업이다. 그렇지만 기록을 하지 않는다면 오늘 경험했던 일들은 금방 잊혀지게 된다."

"만약 AI와 간단한 대화를 통해 일기가 자동으로 생성된다면, 기록에 대한 허들을 낮출 수 있지 않을까?"

라는 아이디어로부터 시작된 Melissa 프로젝트의 Frontend 레포지토리입니다.

- [App Store](https://apps.apple.com/kr/app/melissa/id6741430491) (IOS)
- [Play Store](https://play.google.com/store/apps/details?id=com.melissa.melissaFE&hl=ko) (Android)

## 기술 스택

### Core

- **Expo SDK 52, React Native**:
  - Android/IOS 크로스 플랫폼 배포를 위해 RN을 선택했습니다.
  - [react-native-cli](https://reactnative.dev/docs/getting-started-without-a-framework) 대신, 유지보수가 활발히 일어나고 있는 [Expo](https://docs.expo.dev/)를 활용했습니다.
- **React Query**:
  - 대표적인 서버 상태 관리 라이브러리입니다.
  - 클라이언트 측 캐싱/서버 요청 최소화, Optimistic update를 위해 사용했습니다.
- **EAS Build/Submit/Update**:
  - 배포 자동화를 위해 [Expo Application Services](https://docs.expo.dev/eas/)를 사용했습니다.
  - 상황에 맞게 앱 빌드/OTA 업데이트를 수행할 수 있도록, **Github Actions**를 통해 트리거를 커스터마이징 했습니다.
- **react-native-calendars**:
  - 메인 화면의 캘린더를 구현하기 위해 사용했습니다.
  - 커스텀 자유도가 높은 편이지만, 요구사항을 만족시키기 어려워 라이브러리 코드 일부를 수정해 해결했습니다. (pnpm patch)
- **react-native-sse**:
  - AI의 응답을 스트리밍 형태로 받아오기 위해 백엔드와 Server-Sent-Event(단방향 통신) 방식을 사용하기로 상의했습니다.
  - React Native에서는 Server-Sent-Event 응답을 바로 받을 수 없어, polypill과 interface를 제공해주는 라이브러리를 사용했습니다.
  - 백엔드에서 내려오는 DTO와 라이브러리의 내부 파싱 로직 간 충돌이 발생하며 띄어쓰기가 사라지는 이슈가 발생해, 라이브러리의 파싱 로직을 수정해 해결했습니다.

### ETC

- **@gorhom/bottom-sheet**:
  - 생성된 일기를 보여주는 바텀 시트를 구현하기 위해 사용했습니다.
  - 커스텀 자유도가 매우 높고, 사용자 수가 많은 라이브러리라 안정성이 높다고 판단해 선택했습니다.
- **styled-components**:
  - css 관리는 유지보수에 유리한 CSS-In-JS 방식을 채택했습니다.
  - (다만, 사용 도중 deprecated 되어.. 아쉽습니다)
- **husky**:
  - 커밋 전, 푸시 전과 같은 상황에 명령어를 실행해주는 라이브러리입니다.
  - 커밋 메시지에 이슈 번호를 누락하는 실수를 자주 해서 자동으로 검증해주는 명령어를 추가해 사용했습니다.
- **Sentry**:
  - 배포 후 특정 환경에서 하얀 화면만 보인다는 이슈를 제보받았으나 원인을 알 수 없어, 모니터링 시스템의 필요성을 느꼈습니다.
  - Sentry를 도입한 뒤, stacktrace와 replay 기능을 통해 원인을 파악하고 대응할 수 있었습니다.

## 주요 문제 해결 경험

- Refresh token 기반 로그인 유지를 위해 토큰 재발급 [Axios interceptor](https://github.com/team-Melissa/melissa-FE/blob/dev/src/libs/axiosInstance.ts) 구현
- pnpm patch를 활용해 일부 라이브러리(react-native-calendars, react-native-sse) 코드를 필요에 맞게 수정 ([관련 포스트](https://velog.io/@hyeonseong0305/react-native-calendars-%ED%97%A4%EB%8D%94-%EC%BB%A4%EC%8A%A4%ED%84%B0%EB%A7%88%EC%9D%B4%EC%A7%95%ED%95%98%EA%B8%B0-pnpm-patch))
- 빌드 타임에 네이티브 코드를 수정하기 위한 custom Expo plugin 구현 ([관련 포스트](https://velog.io/@hyeonseong0305/RN-Android-SDK-35-%EC%97%85%EB%8D%B0%EC%9D%B4%ED%8A%B8-%EC%9D%B4%ED%9B%84-%ED%82%A4%EB%B3%B4%EB%93%9C%EA%B0%80-%ED%99%94%EB%A9%B4%EC%9D%84-%EA%B0%80%EB%A6%AC%EB%8A%94-%EB%AC%B8%EC%A0%9C-%ED%95%B4%EA%B2%B0-Expo-plugin-%ED%99%9C%EC%9A%A9))
- Android, IOS 버전 업데이트 시 발생하는 다양한 이슈 트러블슈팅 경험
  - XCode 16.3에서 비표준 C++문법을 제거하며 발생한 이슈 [대응](https://github.com/team-Melissa/melissa-FE/pull/60)
  - Android SDK 35에서 도입된 edge-to-edge로 인한 키보드 레이아웃 이슈 [대응](https://github.com/team-Melissa/melissa-FE/pull/116)

## 스크린샷

> 준비중입니다.
