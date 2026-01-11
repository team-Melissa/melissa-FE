import { PrimaryButton } from '@/src/core/Button';
import Spinner from '@/src/core/Loading/Spinner';
import { IconCheck } from '@/src/icons';
import responsiveToPx from '@/src/utils/responsiveToPx';
import styled from 'styled-components/native';

type Props = {
  isVisible: boolean;
  isLoading: boolean;
  onClick: () => void;
};

const GenerateDiaryButton = ({ isVisible, isLoading, onClick }: Props) => {
  if (!isVisible) return null;

  return (
    <StyledPrimaryButton
      size="small"
      icon={isLoading ? <Spinner size={20} /> : <IconCheck />}
      disabled={isLoading}
      onPress={onClick}
    >
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
