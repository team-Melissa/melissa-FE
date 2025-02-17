import { shadowProps } from "@/src/constants/shadowProps";
import * as S from "./styles";

interface Props {
  content: string;
  imageUrl: string;
}

function AiChatBox({ content, imageUrl }: Props): JSX.Element {
  return (
    <S.AiChatLayout>
      <S.Image src={imageUrl} />
      <S.AiChatBox style={shadowProps}>
        <S.AiChatText>{content}</S.AiChatText>
      </S.AiChatBox>
    </S.AiChatLayout>
  );
}

export default AiChatBox;
