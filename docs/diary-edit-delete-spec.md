# 일기 수정/삭제 기능 스펙 문서

## 개요

백엔드에 구현되어 있는 일기 수정/삭제 Mutation을 연동합니다.

**구현 디렉토리**: `src/features/write-diary`

---

## 1. 기능 요구사항

### 1.1 일기 수동 작성 페이지 UX 개선

**문제**: 키보드가 올라오면 저장 버튼을 찾기 어려움

**해결 방안**:

- `react-native-keyboard-controller` 활용하여 키보드 위에 저장 버튼이 보이도록 처리
- `ScrollView` 도입: Textarea + 해시태그 입력 영역이 커지므로 스크롤 가능하게 처리
- 키보드 dismiss 시 원래 위치로 복귀

**수용 조건**:

- [ ] 키보드가 올라와도 저장 버튼이 화면에 보여야 함
- [ ] 저장 버튼 클릭이 가능해야 함
- [ ] 키보드 dismiss 시 레이아웃이 자연스럽게 복귀해야 함
- [ ] 전체 폼 영역이 스크롤 가능해야 함

---

### 1.2 바텀시트/피드에 드롭다운 추가

**설명**: 일기 상세 화면(바텀시트) 또는 피드에서 수정/삭제 버튼 접근

**구현 내용**:

- `src/core/Dropdown` 컴파운드 컴포넌트 활용
- 메뉴 항목: "수정", "삭제"
- 수정 클릭 시: 일기 수정 페이지로 이동
- 삭제 클릭 시: 삭제 확인 모달 표시 후 삭제 API 호출

**Dropdown 컴포넌트 사용 예시**:

```tsx
import { Dropdown } from '@/src/core/Dropdown';
import { Txt } from '@/src/core/Txt';

const DiaryOptionsDropdown = ({ diaryId, year, month, day, onDeletePress }) => {
  const router = useRouter();

  const handleEdit = () => {
    // Tabs 내부에서 라우팅 시 navigate 사용 주의 (런타임 에러 가능)
    router.navigate(`/edit-diary?diaryId=${diaryId}&year=${year}&month=${month}&day=${day}`);
  };

  return (
    <Dropdown>
      <Dropdown.Trigger />
      {/* Trigger의 children이 없으면 기본 IconEllipsis(점 3개) 아이콘 렌더링 */}
      <Dropdown.Menu align="end">
        <Dropdown.Item onPress={handleEdit}>
          <Txt>수정</Txt>
        </Dropdown.Item>
        <Dropdown.Item onPress={onDeletePress}>
          <Txt>삭제</Txt>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};
```

**삭제 모달 구조** (`useModal` 훅 활용):

```tsx
// Container 레벨에서 모달 열기 함수 정의
const deleteModal = useModal();
const deleteMutation = useDeleteDiary({ ... });

const handleDeletePress = () => {
  deleteModal.open((close) => (
    <DeleteConfirmModal
      onCancel={close}
      onConfirm={() => {
        deleteMutation.mutate({ diaryId });
        close();
      }}
    />
  ));
};

// Dropdown의 onDeletePress props로 handleDeletePress 전달
<DiaryOptionsDropdown onDeletePress={handleDeletePress} ... />
```

**수용 조건**:

- [ ] 드롭다운 트리거 버튼(점 3개 아이콘)이 표시되어야 함
- [ ] 드롭다운 클릭 시 메뉴가 표시되어야 함
- [ ] 수정 클릭 시 `/edit-diary?diaryId={id}&year={y}&month={m}&day={d}` 로 이동
- [ ] 삭제 클릭 시 확인 모달이 표시되어야 함

---

### 1.3 해시태그 Input 컴포넌트 구현

**설명**: 일기 수정 시 해시태그를 입력받는 단일 필드 컴포넌트

**API 스펙** (`DiaryUpdateRequest`):

```typescript
hashtag1?: string | null;  // 예: "#수정"
hashtag2?: string | null;  // 예: "#일기"
```

**구현 내용**:

- **단일 해시태그 입력 필드 컴포넌트** (컨테이너에서 2개 렌더링)
- `#` 포함 최대 5글자 제한
- 빈 문자열은 `null`로 처리
- `#` prefix 자동 추가 또는 입력 시 포함 여부 결정

**컴포넌트 사용 예시**:

```tsx
// EditDiaryContainer에서 2개 렌더링
<DiaryHashtagInput
  value={hashtag1}
  onValueChange={setHashtag1}
  placeholder="#태그1"
/>
<DiaryHashtagInput
  value={hashtag2}
  onValueChange={setHashtag2}
  placeholder="#태그2"
/>
```

**수용 조건**:

- [ ] 단일 해시태그 입력 필드가 렌더링되어야 함
- [ ] `#` 포함 5자 이하로 제한되어야 함
- [ ] 입력값 변경 시 `onValueChange` 콜백이 호출되어야 함
- [ ] placeholder가 표시되어야 함

---

### 1.4 일기 수정 페이지 (별도 라우터/컨테이너 분리)

**설명**: 일기 수정 전용 페이지. 기존 일기 데이터를 불러와 폼에 채움

**라우팅**: `src/app/(app)/edit-diary.tsx`

**쿼리 파라미터** (모두 필수):

- `diaryId`: 수정할 일기의 ID
- `year`, `month`, `day`: 날짜 정보

**데이터 로드 방식**:

1. `useGetDailySummary({ year, month, day })` 호출
2. 응답의 `diaries` 배열에서 `diaryId`로 해당 일기 찾기
3. 찾은 데이터로 폼 초기값 설정

**구현 내용**:

1. 별도의 `EditDiaryContainer` 생성 (WriteDiaryContainer와 분리)
2. 별도의 `useEditDiaryQueryParams` 훅 생성 (diaryId 필수 파라미터로 처리)
3. 컴포넌트는 재사용: `DiaryTitleInput`, `DiaryContentInput`, `WriteDiaryHeader`
4. 해시태그 Input 컴포넌트 2개 렌더링
5. "저장" 버튼 클릭 시 `useUpdateDiary` mutation 호출
6. **저장 성공 시**: 캘린더/피드/스트릭 쿼리 무효화 후 `router.dismissAll()`

**수용 조건**:

- [ ] `diaryId` 파라미터가 없으면 에러 처리되어야 함
- [ ] 기존 데이터가 폼에 채워져야 함
- [ ] 해시태그 Input 2개가 표시되어야 함
- [ ] 저장 시 `updateDiary` API가 호출되어야 함
- [ ] 수정 성공 시 쿼리 무효화 및 `dismissAll()` 호출

---

### 1.5 일기 삭제 Mutation 연동

**API 스펙**:

```typescript
useDeleteDiary(diaryId: number)

// Response
DiaryDeleteResponse = {
  diaryId: number;
  message: string;
} | null
```

**구현 내용**:

- 삭제 확인 모달 표시 (useModal 훅 활용)
- 확인 시 `useDeleteDiary` mutation 호출
- 성공 시: 캘린더/피드/스트릭 쿼리 무효화, 바텀시트 닫기, 토스트 표시
- 실패 시: 에러 토스트 표시

**쿼리 무효화 대상**:

```typescript
queryClient.invalidateQueries({ queryKey: getGetCalendarViewQueryKey({ year, month }) });
queryClient.invalidateQueries({ queryKey: getGetFeedQueryKey() });
queryClient.invalidateQueries({ queryKey: getGetCurrentStreakQueryKey() });
```

**수용 조건**:

- [ ] 삭제 확인 모달이 표시되어야 함
- [ ] 확인 버튼 클릭 시 `deleteDiary` API가 호출되어야 함
- [ ] 삭제 성공 시 관련 쿼리가 무효화되어야 함
- [ ] 삭제 성공 시 바텀시트가 닫혀야 함
- [ ] 성공/실패 시 적절한 토스트 메시지가 표시되어야 함

---

## 2. API 인터페이스

### 2.0 일기 상세 조회 API (기존 데이터 로드용)

```typescript
// Hook
useGetDailySummary(params: GetDailySummaryParams, options?: { ... })

// Params
{
  year: number;
  month: number;
  day: number;
}

// Response: DailySummaryResponseDTO
{
  year: number;
  month: number;
  day: number;
  diaries: DiaryDetailDTO[];  // 최대 3개
}

// DiaryDetailDTO (수정 폼 초기값으로 사용)
{
  diaryId: number;
  aiProfileId: number;
  title?: string | null;
  content?: string | null;
  mood?: 'HAPPY' | 'SAD' | 'TIRED' | 'ANGRY' | 'RELAX' | null;
  type: 'MANUAL' | 'CHAT_BASED';
  hashtag1?: string | null;
  hashtag2?: string | null;
  imageUrl?: string | null;
  imageStatus?: 'NONE' | 'PENDING' | 'READY' | 'FAILED' | null;
  version: number;
  createdAt: string;
}
```

### 2.1 일기 수정 API

```typescript
// Hook
useUpdateDiary(options?: {
  mutation?: UseMutationOptions;
  request?: AxiosRequestConfig;
})

// 호출
mutation.mutate({
  diaryId: number,
  data: DiaryUpdateRequest
})

// DiaryUpdateRequest
{
  title?: string | null;       // 0-100자
  content?: string | null;     // 0-3000자
  mood?: 'HAPPY' | 'SAD' | 'TIRED' | 'ANGRY' | 'RELAX' | null;
  hashtag1?: string | null;    // # 포함 5자 (클라이언트 제한)
  hashtag2?: string | null;    // # 포함 5자 (클라이언트 제한)
  generateImage?: boolean;     // 이미지 재생성 여부 (기본값 false)
}
```

### 2.2 일기 삭제 API

```typescript
// Hook
useDeleteDiary(options?: {
  mutation?: UseMutationOptions;
  request?: AxiosRequestConfig;
})

// 호출
mutation.mutate({ diaryId: number })

// Response
DiaryDeleteResponse = {
  diaryId: number;
  message: string;
} | null
```

---

## 3. TDD 테스트 계획

TDD(테스트 주도 개발) 사이클을 엄격히 적용합니다:

1. **Red**: 실패하는 테스트 작성
2. **Green**: 테스트를 통과하는 최소한의 코드 구현
3. **Refactor**: 코드 품질 개선

### 3.1 테스트 파일 구조

```
src/features/write-diary/
├── __tests__/
│   ├── useWriteDiaryQueryParams.test.ts
│   ├── useEditDiaryQueryParams.test.ts      # 신규
│   ├── DiaryHashtagInput.test.tsx           # 신규
│   └── EditDiaryContainer.test.tsx          # 신규
├── components/
│   ├── DiaryTitleInput.tsx
│   ├── DiaryContentInput.tsx
│   ├── DiaryHashtagInput.tsx                # 신규
│   └── WriteDiaryHeader.tsx
├── containers/
│   ├── WriteDiaryContainer.tsx
│   └── EditDiaryContainer.tsx               # 신규
└── hooks/
    ├── useWriteDiaryQueryParams.ts
    └── useEditDiaryQueryParams.ts           # 신규
```

### 3.2 테스트 케이스

#### 3.2.1 `useEditDiaryQueryParams` (신규)

```typescript
describe('useEditDiaryQueryParams', () => {
  it('diaryId, year, month, day를 숫자로 변환하여 반환해야 함', () => {});
  it('diaryId가 없으면 에러를 throw해야 함', () => {});
  it('year, month, day 중 하나라도 없으면 에러를 throw해야 함', () => {});
  it('파라미터가 숫자가 아니면 에러를 throw해야 함', () => {});
});
```

#### 3.2.2 `DiaryHashtagInput` (신규)

```typescript
describe('DiaryHashtagInput', () => {
  it('해시태그 입력 필드가 렌더링되어야 함', () => {});
  it('입력값 변경 시 onValueChange가 호출되어야 함', () => {});
  it('# 포함 5자 이하로 제한되어야 함', () => {});
  it('placeholder가 올바르게 표시되어야 함', () => {});
  it('초기값이 올바르게 설정되어야 함', () => {});
});
```

#### 3.2.3 `EditDiaryContainer` (신규)

```typescript
describe('EditDiaryContainer', () => {
  it('로딩 중일 때 로딩 UI가 표시되어야 함', () => {});
  it('기존 일기 데이터로 폼이 채워져야 함', () => {});
  it('해시태그 입력 필드 2개가 렌더링되어야 함', () => {});
  it('저장 시 updateDiary가 호출되어야 함', () => {});
  it('저장 성공 시 토스트가 표시되어야 함', () => {});
  it('저장 성공 시 dismissAll이 호출되어야 함', () => {});
});
```

#### 3.2.4 일기 삭제 테스트

```typescript
describe('useDeleteDiaryMutation', () => {
  it('삭제 성공 시 관련 쿼리가 무효화되어야 함', () => {});
  it('삭제 성공 시 성공 토스트가 표시되어야 함', () => {});
  it('삭제 실패 시 에러 토스트가 표시되어야 함', () => {});
});

describe('DeleteConfirmModal', () => {
  it('모달이 열리면 확인 메시지가 표시되어야 함', () => {});
  it('취소 버튼 클릭 시 모달이 닫혀야 함', () => {});
  it('확인 버튼 클릭 시 삭제 mutation이 호출되어야 함', () => {});
});
```

#### 3.2.5 UX 테스트 (키보드)

```typescript
describe('WriteDiaryContainer UX', () => {
  it('키보드가 올라와도 저장 버튼이 보여야 함', () => {});
  it('전체 폼 영역이 스크롤 가능해야 함', () => {});
});
```

---

## 4. 구현 순서

TDD 원칙에 따라 각 기능별로 다음 순서로 진행합니다:

### Phase 1: 기반 작업

1. **테스트 환경 확인**
   - Jest 설정 확인 및 테스트 실행 가능 여부 확인
   - 테스트 유틸리티/헬퍼 설정

2. **write-diary feature 내 수정 관련 파일 구조 생성**

### Phase 2: useEditDiaryQueryParams 훅

1. `useEditDiaryQueryParams` 테스트 작성 (Red)
2. 훅 구현 (Green)
3. 리팩토링 (Refactor)

### Phase 3: DiaryHashtagInput 컴포넌트

1. 컴포넌트 테스트 작성 (Red)
2. 컴포넌트 구현 (Green)
3. 스타일 및 리팩토링 (Refactor)

### Phase 4: EditDiaryContainer

1. 컨테이너 테스트 작성 (Red)
2. 컨테이너 구현 (Green) - 기존 컴포넌트 재사용
3. app router 연결 (`src/app/(app)/edit-diary.tsx`)

### Phase 5: 삭제 기능

1. 삭제 모달 테스트 작성 (Red)
2. 삭제 모달 구현 (Green)
3. 삭제 mutation 연동 및 쿼리 무효화

### Phase 6: UX 개선 (write-diary)

1. 키보드 처리 테스트 작성 (Red)
2. `react-native-keyboard-controller` + `ScrollView` 적용 (Green)
3. 애니메이션 및 UX 개선 (Refactor)

### Phase 7: 드롭다운 메뉴 통합

1. 바텀시트/피드에 Dropdown 컴포넌트 통합
2. 수정/삭제 액션 연결

---

## 5. 파일 변경 목록 (예상)

### 신규 파일

```
src/features/write-diary/
├── __tests__/
│   ├── useEditDiaryQueryParams.test.ts
│   ├── DiaryHashtagInput.test.tsx
│   └── EditDiaryContainer.test.tsx
├── components/
│   └── DiaryHashtagInput.tsx
├── containers/
│   └── EditDiaryContainer.tsx
└── hooks/
    └── useEditDiaryQueryParams.ts

src/app/(app)/
└── edit-diary.tsx                           # 신규 라우터
```

### 수정 파일

- `src/features/write-diary/containers/WriteDiaryContainer.tsx` (ScrollView, 키보드 처리)
- 바텀시트/피드 관련 파일 (드롭다운 추가)

---

## 6. 의존성 및 고려사항

### 기술적 의존성

- `@tanstack/react-query`: 상태 관리 및 캐시 무효화
- `expo-router`: 네비게이션 및 쿼리 파라미터
- `react-native-keyboard-controller`: 키보드 처리 (이미 설치됨)
- `@gorhom/bottom-sheet`: 바텀시트 (이미 설치됨)
- `src/core/Dropdown`: 드롭다운 메뉴 (이미 구현됨)
- `src/modules/modal`: 모달 관리 (useModal 훅)

### 라우팅 주의사항

- Tabs 내부에서 `router.navigate` 사용 시 주의 (런타임 에러 가능)
- 수정/삭제 성공 후에는 `router.dismissAll()` 사용

### 고려사항

1. **낙관적 업데이트**: 삭제 시 UX를 위해 낙관적 업데이트 고려
2. **에러 처리**: 네트워크 오류, 권한 오류 등 예외 케이스 처리
3. **로딩 상태**: 수정/삭제 중 중복 요청 방지
4. **접근성**: 모달, 드롭다운의 접근성 고려

---

## 7. 참고 자료

### TDD Best Practices

- [Test-Driven Development with React and TypeScript](https://link.springer.com/book/10.1007/978-1-4842-9648-6)
- [Mastering TDD in React](https://trio.dev/mastering-tdd-in-react/)
- [React Test-driven Development: From User Story to Completion](https://www.toptal.com/react/tdd-react-user-stories-to-development)

### 프로젝트 내 참조

- `src/apis/_generated/serverAPI.ts`: 자동 생성된 API hooks (`useUpdateDiary`, `useDeleteDiary`, `useGetDailySummary`)
- `src/apis/_generated/serverAPI.schemas.ts`: 타입 정의 (`DiaryUpdateRequest`, `DiaryDeleteResponse`, `DiaryDetailDTO`)
- `src/core/Dropdown/`: 드롭다운 컴파운드 컴포넌트
- `src/modules/modal/`: 모달 관리 (useModal 훅)
- `src/features/write-diary/`: 작성/수정 관련 컴포넌트 및 컨테이너
