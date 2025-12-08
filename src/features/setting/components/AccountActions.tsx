import { SubButton } from '@/src/core/Button';
import { Body2 } from '@/src/core/Txt';
import styled from 'styled-components/native';

type Props = {
  onLogout: () => void;
  onDeleteAccount: () => void;
};

const AccountActions = ({ onLogout, onDeleteAccount }: Props) => {
  return (
    <Wrapper>
      <SubButton size="small" onPress={onLogout}>
        로그아웃
      </SubButton>
      <DeleteAccountButton hitSlop={5} onPress={onDeleteAccount}>
        <Body2 color="sub1">회원 탈퇴</Body2>
      </DeleteAccountButton>
    </Wrapper>
  );
};

export default AccountActions;

const Wrapper = styled.View`
  width: 100%;
  align-items: center;
  gap: 20px;
`;

const DeleteAccountButton = styled.TouchableOpacity`
  padding: 3px 6px;
`;
