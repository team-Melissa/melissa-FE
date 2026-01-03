import { PrimaryButton } from '@/src/core/Button';
import { IconCheck } from '@/src/icons';
import responsiveToPx from '@/src/utils/responsiveToPx';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';

type Props = {
  isVisible: boolean;
  isLoading?: boolean;
  disabled: boolean;
  onClick: () => void;
};

const GenerateDiaryButton = ({ isVisible, isLoading, disabled, onClick }: Props) => {
  if (!isVisible) return null;

  return (
    <StyledPrimaryButton
      size="small"
      icon={isLoading ? <StyledLoadingIndicator /> : <IconCheck />}
      disabled={disabled}
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

const StyledLoadingIndicator = styled(ActivityIndicator)`
  width: 20px;
  height: 20px;
`;
