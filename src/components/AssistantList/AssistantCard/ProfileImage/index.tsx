import * as S from "./styles";

interface Props {
  url: string;
}

function ProfileImage({ url }: Props) {
  return (
    <S.ImageBox>
      <S.Image source={url} contentFit="contain" />
    </S.ImageBox>
  );
}

export default ProfileImage;
