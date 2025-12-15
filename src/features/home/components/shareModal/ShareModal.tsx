import type { DiaryDetailDTO } from '@/src/apis/_generated/serverAPI.schemas';
import { IconX } from '@/src/icons';
import { ModalRoot } from '@/src/modules/modal';
import styled from 'styled-components/native';
import type { TDate } from '../../types';
import ShareDiaryList from './ShareDiaryList';

type Props = {
  isOpen: boolean;
  date: TDate;
  diaryData: Required<DiaryDetailDTO>;
  onClose: () => void;
};

const ShareModal = ({ isOpen, date, diaryData, onClose }: Props) => {
  return (
    <ModalRoot isOpen={isOpen} onClose={onClose} backdropOpacity={0.9}>
      <StyledView>
        <StyledBackButton hitSlop={5} onPress={onClose}>
          <IconX width={30} height={30} />
        </StyledBackButton>
        <ShareDiaryList date={date} diaryData={diaryData} />
      </StyledView>
    </ModalRoot>
  );
};

export default ShareModal;

const StyledView = styled.View`
  width: 100%;
  height: 70%;
  justify-content: center;
  align-items: center;
`;

const StyledBackButton = styled.TouchableOpacity`
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 10;
`;
