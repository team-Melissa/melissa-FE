import { COLOR } from '@/src/constants/theme';
import { useCarousel } from '@/src/hooks/useCarousel';
import { forwardRef, useState } from 'react';
import type { LayoutChangeEvent } from 'react-native';
import Carousel, { Pagination, type ICarouselInstance } from 'react-native-reanimated-carousel';
import styled from 'styled-components/native';
import { TUTORIAL_LIST_DATA } from '../constants';
import TutorialListItem from './TutorialListItem';

type Props = {
  onIndexChange: (index: number) => void;
};

const TutorialList = forwardRef<ICarouselInstance, Props>(({ onIndexChange }, ref) => {
  const [width, setWidth] = useState<number | null>(null);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const { progress, handleProgressChange } = useCarousel((index) => {
    setCurrentIdx(index);
    onIndexChange(index);
  });

  const getLayout = (e: LayoutChangeEvent) => {
    setWidth(e.nativeEvent.layout.width);
  };

  return (
    <>
      <Wrapper onLayout={getLayout}>
        {width && (
          <Carousel
            ref={ref}
            width={width}
            data={TUTORIAL_LIST_DATA}
            loop={false}
            renderItem={(props) => <TutorialListItem {...props} isActive={props.index === currentIdx} />}
            onProgressChange={handleProgressChange}
          />
        )}
      </Wrapper>
      <Pagination.Basic
        progress={progress}
        data={TUTORIAL_LIST_DATA}
        dotStyle={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#DDD' }}
        activeDotStyle={{ backgroundColor: COLOR.main }}
        containerStyle={{ marginTop: 8, gap: 8 }}
      />
    </>
  );
});

TutorialList.displayName = 'TutorialList';

export default TutorialList;

const Wrapper = styled.View`
  flex: 1;
`;
