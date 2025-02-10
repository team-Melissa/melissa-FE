import { shadowProps } from "@/src/constants/shadowProps";
import * as S from "./styles";

interface Props {
  input: string;
}

function UserChatBox({ input }: Props): JSX.Element {
  return (
    <S.UserChatLayout style={shadowProps}>
      <S.UserChatText>{input}</S.UserChatText>
    </S.UserChatLayout>
  );
}

export default UserChatBox;
