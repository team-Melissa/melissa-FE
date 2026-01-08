import type { DiaryDetailDTO } from '@/src/apis/_generated/serverAPI.schemas';
import { COLOR } from '@/src/constants/theme';
import { useCarousel } from '@/src/hooks/useCarousel';
import { forwardRef } from 'react';
import { useWindowDimensions, View } from 'react-native';
import Carousel, { Pagination } from 'react-native-reanimated-carousel';
import styled from 'styled-components/native';
import type { TDate } from '../../types';
import ShareDiaryDetail from './ShareDiaryDetail';
import ShareDiaryThumbnail from './ShareDiaryThumbnail';

type Props = {
  date: TDate;
  diaryData: Required<DiaryDetailDTO>;
};

const pages = [ShareDiaryThumbnail, ShareDiaryDetail];

const ShareDiaryList = forwardRef<View, Props>(({ date, diaryData }, ref) => {
  const { width } = useWindowDimensions();
  const { progress, handleProgressChange } = useCarousel();

  return (
    <Wrapper>
      <View ref={ref} collapsable={false}>
        <Carousel
          width={width}
          height={width}
          data={pages}
          loop={false}
          onProgressChange={handleProgressChange}
          renderItem={({ item: Page }) => <Page date={date} diaryData={diaryData} />}
          onConfigurePanGesture={(gestureChain) => gestureChain.activeOffsetX([-10, 10])}
        />
      </View>
      <Pagination.Basic
        progress={progress}
        data={pages}
        dotStyle={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#DDD' }}
        activeDotStyle={{ backgroundColor: COLOR.main }}
        containerStyle={{ gap: 6 }}
      />
    </Wrapper>
  );
});

ShareDiaryList.displayName = 'ShareDiaryList';

export default ShareDiaryList;

const Wrapper = styled.View`
  gap: 20px;
`;
