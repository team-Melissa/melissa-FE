import type { DiaryDetailDTO } from '@/src/apis/_generated/serverAPI.schemas';
import PlaceholderImage from '@/src/core/PlaceholderImage';
import { ShareBody } from '@/src/core/Txt';
import { Image } from 'expo-image';
import styled from 'styled-components/native';

type Props = {
  diaryData: Required<DiaryDetailDTO>;
};

const ShareDiaryDetail = ({ diaryData }: Props) => {
  return (
    <Wrapper>
      {diaryData.imageUrl ? <StyledImage source={{ uri: diaryData.imageUrl }} blurRadius={30} /> : <PlaceholderImage />}
      <Overlay />
      <InfoWrapper>
        <ShareBody color="white">{diaryData.content}</ShareBody>
      </InfoWrapper>
    </Wrapper>
  );
};

export default ShareDiaryDetail;

const Wrapper = styled.View`
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  overflow: hidden;
`;

const StyledImage = styled(Image)`
  width: 100%;
  aspect-ratio: 1;
`;

const Overlay = styled.View`
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.3);
`;

const InfoWrapper = styled.View`
  position: absolute;
  flex: 1;
  padding: 20px;
  justify-content: center;
  align-items: center;
`;
