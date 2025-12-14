import responsiveToPx from '@/src/utils/responsiveToPx';
import { useRef, useState } from 'react';
import type { LayoutChangeEvent } from 'react-native';
import Carousel, { type ICarouselInstance } from 'react-native-reanimated-carousel';
import styled from 'styled-components/native';
import type { CharacterId } from '../types';
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
  const disabledPrevButton = selectedId === 1;
  const disabledNextButton = selectedId === CHARACTER_ID_LIST.length;

  const getListWidth = (e: LayoutChangeEvent) => {
    setWidth(e.nativeEvent.layout.width);
  };

  const handleSnapToItem = (index: number) => {
    onSelectChange(CHARACTER_ID_LIST[index]);
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
          onSnapToItem={handleSnapToItem}
          renderItem={({ item }) => <CharacterCard characterId={item} />}
        />
      )}
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
  height: ${responsiveToPx('366px')};
`;
