import type { DiaryDetailDTO } from '@/src/apis/_generated/serverAPI.schemas';
import { COLOR } from '@/src/constants/theme';
import { forwardRef, useState } from 'react';
import { useWindowDimensions, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import styled from 'styled-components/native';
import type { TDate } from '../../types';
import ShareDiaryDetail from './ShareDiaryDetail';
import ShareDiaryThumbnail from './ShareDiaryThumbnail';

type Props = {
  date: TDate;
  diaryData: Required<DiaryDetailDTO>;
};

const ShareDiaryList = forwardRef<View, Props>(({ date, diaryData }, ref) => {
  const { width } = useWindowDimensions();
  const [index, setIndex] = useState<number>(0);

  const pages = [ShareDiaryThumbnail, ShareDiaryDetail];

  return (
    <Wrapper>
      <View ref={ref} collapsable={false}>
        <Carousel
          width={width}
          height={width}
          data={pages}
          loop={false}
          onSnapToItem={setIndex}
          renderItem={({ item: Page }) => <Page date={date} diaryData={diaryData} />}
          onConfigurePanGesture={(gestureChain) => gestureChain.activeOffsetX([-10, 10])}
        />
      </View>
      <Indicator>
        {pages.map((_, idx) => (
          <Dot key={idx} $active={idx === index} />
        ))}
      </Indicator>
    </Wrapper>
  );
});

ShareDiaryList.displayName = 'ShareDiaryList';

export default ShareDiaryList;

const Wrapper = styled.View`
  gap: 20px;
`;

const Indicator = styled.View`
  flex-direction: row;
  justify-content: center;
  gap: 8px;
  margin-top: 10px;
`;

const Dot = styled.View<{ $active: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: ${({ $active }) => ($active ? COLOR.main : '#DDD')};
`;
