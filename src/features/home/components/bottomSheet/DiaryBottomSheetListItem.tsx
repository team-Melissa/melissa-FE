import type { DiaryDetailDTO } from '@/src/apis/_generated/serverAPI.schemas';
import PlaceholderImage from '@/src/core/PlaceholderImage';
import { Body2, Description2, Title } from '@/src/core/Txt';
import { IconShared } from '@/src/icons';
import { useModal } from '@/src/modules/modal';
import { Image } from 'expo-image';
import styled from 'styled-components/native';
import type { TDate } from '../../types';
import DiaryCreatedByInfo from '../DiaryCreatedByInfo';
import DiaryOptionsDropdown from '../DiaryOptionsDropdown';
import ShareModal from '../shareModal/ShareModal';

type Props = {
  date: TDate;
  diaryData: Required<DiaryDetailDTO>;
};

const DiaryBottomSheetListItem = ({ date, diaryData }: Props) => {
  const shareModal = useModal();

  const handleShareModalOpen = () => {
    shareModal.open(({ isOpen, exit }) => (
      <ShareModal isOpen={isOpen} date={date} diaryData={diaryData} onClose={exit} />
    ));
  };

  return (
    <Wrapper>
      <ImageWrapper>
        {diaryData.imageUrl ? <StyledImage source={{ uri: diaryData.imageUrl }} /> : <PlaceholderImage />}
      </ImageWrapper>
      <RelativeWrapper>
        <ActionButtonWrapper>
          <ShareButton hitSlop={5} onPress={handleShareModalOpen}>
            <IconShared />
          </ShareButton>
          <DiaryOptionsDropdown diaryId={diaryData.diaryId} year={date.year} month={date.month} day={date.day} />
        </ActionButtonWrapper>
        <StyledDateTxt color="title">
          {date.year}년 {date.month}월 {date.day}일
        </StyledDateTxt>
        <StyledTitleTxt color="title">{diaryData.title}</StyledTitleTxt>
        <StyledContentTxt color="sub1">{diaryData.content}</StyledContentTxt>
        <StyledHashtagTxt color="main">
          #{diaryData.hashtag1} #{diaryData.hashtag2}
        </StyledHashtagTxt>
        {diaryData.type === 'CHAT_BASED' && (
          <DiaryCreatedByInfo aiProfileId={diaryData.aiProfileId} createdAt={diaryData.createdAt} />
        )}
      </RelativeWrapper>
    </Wrapper>
  );
};

export default DiaryBottomSheetListItem;

const Wrapper = styled.View`
  padding: 0 15px 25px 15px;
  gap: 20px;
  border-radius: 40px;
`;

const ImageWrapper = styled.View`
  width: 100%;
  aspect-ratio: 1;
  border-radius: 25px;
  overflow: hidden;
`;

const StyledImage = styled(Image)`
  flex: 1;
`;

const RelativeWrapper = styled.View`
  position: relative;
`;

const ActionButtonWrapper = styled.View`
  position: absolute;
  top: 0;
  right: 0;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  z-index: 10;
`;

const ShareButton = styled.TouchableOpacity``;

const StyledDateTxt = styled(Description2)`
  line-height: 18px;
`;

const StyledTitleTxt = styled(Title)`
  line-height: 21px;
  margin-bottom: 10px;
`;

const StyledContentTxt = styled(Body2)`
  margin-bottom: 5px;
  line-height: 20px;
`;

const StyledHashtagTxt = styled(Body2)`
  margin-bottom: 32px;
  line-height: 20px;
`;
