import { PrimaryButton } from '@/src/core/Button';
import { IconCheck } from '@/src/icons';
import responsiveToPx from '@/src/utils/responsiveToPx';
import styled from 'styled-components/native';

type Props = {
  isVisible: boolean;
  onClick: () => void;
};

const GenerateDiaryButton = ({ isVisible, onClick }: Props) => {
  if (!isVisible) return null;

  return (
    <StyledPrimaryButton size="small" icon={<IconCheck />} onPress={onClick}>
      일기 쓰기
    </StyledPrimaryButton>
  );
};

export default GenerateDiaryButton;

const StyledPrimaryButton = styled(PrimaryButton)`
  position: absolute;
  right: 0;
  bottom: ${responsiveToPx('72px')};
`;
