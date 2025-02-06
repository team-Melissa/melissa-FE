import * as S from "./styles";

interface Props {
  url: string;
}

function ProfileImage({ url }: Props) {
  return (
    <S.ImageBox>
      <S.Image source={{ uri: url }} />
    </S.ImageBox>
  );
}

export default ProfileImage;
