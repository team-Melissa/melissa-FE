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
        <S.Description numberOfLines={1}>{feat1}</S.Description>
      </S.LineBox>
      <S.LineBox>
        <S.Title>성 격</S.Title>
        <S.Description numberOfLines={1}>{feat2}</S.Description>
      </S.LineBox>
      <S.LineBox>
        <S.Title>성 격</S.Title>
        <S.Description numberOfLines={1}>{feat3}</S.Description>
      </S.LineBox>
    </S.PersonalityBox>
  );
}

export default Personality;
