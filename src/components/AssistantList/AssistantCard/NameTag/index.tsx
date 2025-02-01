import * as S from "./styles";

interface Props {
  name: string;
  tag1: string;
  tag2: string;
}

function NameTag({ name, tag1, tag2 }: Props) {
  return (
    <S.NameTagBox>
      <S.NameText>{name}</S.NameText>
      <S.TagText>
        #{tag1} #{tag2}
      </S.TagText>
    </S.NameTagBox>
  );
}

export default NameTag;
