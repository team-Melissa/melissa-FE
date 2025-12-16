import { CircleButton, PrimaryButton } from '@/src/core/Button';
import { IconDownload } from '@/src/icons';
import styled from 'styled-components/native';

type Props = {
  onDownloadClick: () => void;
  onShareClick: () => void;
};

const ShareActionButtons = ({ onDownloadClick, onShareClick }: Props) => {
  return (
    <Wrapper>
      <CircleButton size="medium" variant="secondary" onPress={onDownloadClick}>
        <IconDownload />
      </CircleButton>
      <PrimaryButton size="medium" onPress={onShareClick}>
        공유하기
      </PrimaryButton>
    </Wrapper>
  );
};

export default ShareActionButtons;

const Wrapper = styled.View`
  flex-direction: row;
  margin-top: 40px;
  gap: 10px;
`;
