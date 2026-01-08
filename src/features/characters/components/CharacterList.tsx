import { COLOR } from '@/src/constants/theme';
import { useCarousel } from '@/src/hooks/useCarousel';
import { type CharacterId } from '@/src/modules/character';
import responsiveToPx from '@/src/utils/responsiveToPx';
import { useRef, useState } from 'react';
import type { LayoutChangeEvent } from 'react-native';
import Carousel, { Pagination, type ICarouselInstance } from 'react-native-reanimated-carousel';
import styled from 'styled-components/native';
import CarouselButton from './CarouselButton';
import CharacterCard from './CharacterCard';

type Props = {
  selectedId: CharacterId;
  onSelectChange: (aiProfileId: CharacterId) => void;
};

const CHARACTER_ID_LIST = [1, 2, 3, 4, 5] satisfies CharacterId[];

const CharacterList = ({ selectedId, onSelectChange }: Props) => {
  const [width, setWidth] = useState<number | null>(null);
  const carouselRef = useRef<ICarouselInstance>(null);

  const { progress, handleProgressChange } = useCarousel((index) => onSelectChange(CHARACTER_ID_LIST[index]));
  const disabledPrevButton = selectedId === 1;
  const disabledNextButton = selectedId === CHARACTER_ID_LIST.length;

  const getListWidth = (e: LayoutChangeEvent) => {
    setWidth(e.nativeEvent.layout.width);
  };

  const handlePrevClick = () => {
    if (disabledPrevButton) return;
    carouselRef.current?.prev();
  };

  const handleNextClick = () => {
    if (disabledNextButton) return;
    carouselRef.current?.next();
  };

  return (
    <Container onLayout={getListWidth}>
      {width && (
        <Carousel
          ref={carouselRef}
          width={width}
          data={CHARACTER_ID_LIST}
          loop={false}
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 1,
            parallaxScrollingOffset: 70,
          }}
          onProgressChange={handleProgressChange}
          renderItem={({ item }) => <CharacterCard characterId={item} />}
        />
      )}
      <Pagination.Basic
        progress={progress}
        data={CHARACTER_ID_LIST}
        dotStyle={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#DDD' }}
        activeDotStyle={{ backgroundColor: COLOR.main }}
        containerStyle={{ gap: 6 }}
      />
      <CarouselButton direction="left" disabled={disabledPrevButton} onClick={handlePrevClick} />
      <CarouselButton direction="right" disabled={disabledNextButton} onClick={handleNextClick} />
    </Container>
  );
};

export default CharacterList;

const Container = styled.View`
  position: relative;
  width: 100%;
  justify-content: center;
  gap: 8px;
  height: ${responsiveToPx('366px')};
`;
