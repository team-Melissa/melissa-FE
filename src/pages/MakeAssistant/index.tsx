import * as S from "./styles";

function MakeAssistantPage() {
  return (
    <S.SafeLayout>
      <Start />
    </S.SafeLayout>
  );
}

function Start() {
  return (
    <S.CenteringBox>
      <S.InfoText>
        몇 가지 <S.Bold>질문</S.Bold>에 답변해주세요
      </S.InfoText>
      <S.InfoText>
        당신에게 맞는 <S.Bold>서포터</S.Bold>를 만들어드릴게요
      </S.InfoText>
    </S.CenteringBox>
  );
}

export default MakeAssistantPage;
