import type { DiaryDetailDTO } from '@/src/apis/_generated/serverAPI.schemas';
import { IconX } from '@/src/icons';
import { ModalRoot } from '@/src/modules/modal';
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';
import { useRef } from 'react';
import { Alert, View } from 'react-native';
import { captureRef } from 'react-native-view-shot';
import styled from 'styled-components/native';
import type { TDate } from '../../types';
import ShareActionButtons from './ShareActionButtons';
import ShareDiaryList from './ShareDiaryList';

type Props = {
  isOpen: boolean;
  date: TDate;
  diaryData: Required<DiaryDetailDTO>;
  onClose: () => void;
};

const ShareModal = ({ isOpen, date, diaryData, onClose }: Props) => {
  const diaryViewRef = useRef<View>(null);

  const handleDownloadClick = async () => {
    try {
      const imageUri = await captureRef(diaryViewRef);
      if (imageUri) {
        await MediaLibrary.saveToLibraryAsync(imageUri);
        Alert.alert('갤러리에 저장되었습니다.');
      }
    } catch (e) {
      console.error(e);
      Alert.alert('저장에 실패했습니다.');
    }
  };

  const handleShareClick = async () => {
    try {
      const imageUri = await captureRef(diaryViewRef);
      await Sharing.shareAsync(imageUri);
    } catch (e) {
      console.error(e);
      Alert.alert('공유에 실패했습니다');
    }
  };

  return (
    <ModalRoot isOpen={isOpen} onClose={onClose} backdropOpacity={0.9}>
      <StyledView>
        <StyledBackButton hitSlop={5} onPress={onClose}>
          <IconX width={30} height={30} />
        </StyledBackButton>
        <ShareDiaryList ref={diaryViewRef} date={date} diaryData={diaryData} />
        <ShareActionButtons onDownloadClick={handleDownloadClick} onShareClick={handleShareClick} />
      </StyledView>
    </ModalRoot>
  );
};

export default ShareModal;

const StyledView = styled.View`
  width: 100%;
  height: 85%;
  justify-content: center;
  align-items: center;
`;

const StyledBackButton = styled.TouchableOpacity`
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 10;
`;
