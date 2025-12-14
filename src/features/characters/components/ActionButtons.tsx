import { COLOR } from '@/src/constants/theme';
import { PrimaryButton } from '@/src/core/Button';
import { Body2 } from '@/src/core/Txt';
import styled from 'styled-components/native';

type Props = {
  onChattingClick: () => void;
  onManualDiaryClick: () => void;
};

const ActionButtons = ({ onChattingClick, onManualDiaryClick }: Props) => {
  return (
    <ButtonWrapper>
      <PrimaryButton onPress={onChattingClick}>대화하며 일기 작성하기</PrimaryButton>
      <ManualDiaryButton hitSlop={5} onPress={onManualDiaryClick}>
        <Body2 color="sub1">직접 작성하기</Body2>
      </ManualDiaryButton>
    </ButtonWrapper>
  );
};

export default ActionButtons;

const ButtonWrapper = styled.View`
  width: 100%;
  align-items: center;
  margin-top: auto;
  gap: 15px;
  padding-bottom: 15px;
`;

const ManualDiaryButton = styled.TouchableOpacity`
  padding: 11px 15px;
  border-radius: 99px;
  background-color: ${COLOR.white};
`;
