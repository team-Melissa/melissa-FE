import * as S from "./styles";

interface Props {
  feat1: string;
  feat2: string;
  feat3: string;
}

function Personality({ feat1, feat2, feat3 }: Props) {
  return (
    <S.PersonalityBox>
      <S.LineBox>
        <S.Title>성 격</S.Title>
        <S.Description>{feat1}</S.Description>
      </S.LineBox>
      <S.LineBox>
        <S.Title>성 격</S.Title>
        <S.Description>{feat2}</S.Description>
      </S.LineBox>
      <S.LineBox>
        <S.Title>성 격</S.Title>
        <S.Description>{feat3}</S.Description>
      </S.LineBox>
    </S.PersonalityBox>
  );
}

export default Personality;
