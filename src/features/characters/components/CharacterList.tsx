import { COLOR } from '@/src/constants/theme';
import { useCarousel } from '@/src/hooks/useCarousel';
import { type CharacterId } from '@/src/modules/character';
import { CHARACTER_ID_LIST } from '@/src/modules/character/constants/characters';
import { useRef, useState } from 'react';
import type { LayoutChangeEvent } from 'react-native';
import Carousel, { Pagination, type ICarouselInstance } from 'react-native-reanimated-carousel';
import styled from 'styled-components/native';
import CarouselButton from './CarouselButton';
import CharacterCard from './CharacterCard';

type Props = {
  selectedId: CharacterId;
  onSelectChange: (aiProfileId: CharacterId) => void;
  onCharacterClick: () => void;
};

const CharacterList = ({ selectedId, onSelectChange, onCharacterClick }: Props) => {
  const [size, setSize] = useState<{ width: number; height: number } | null>(null);
  const carouselRef = useRef<ICarouselInstance>(null);

  const { progress, handleProgressChange } = useCarousel((index) => onSelectChange(CHARACTER_ID_LIST[index]));
  const disabledPrevButton = selectedId === 1;
  const disabledNextButton = selectedId === CHARACTER_ID_LIST.length;

  const getListSize = (e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    setSize({ width, height });
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
    <Container onLayout={getListSize}>
      {size && (
        <Carousel
          ref={carouselRef}
          width={size.width}
          height={size.height}
          data={CHARACTER_ID_LIST}
          loop={false}
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 1,
            parallaxScrollingOffset: 70,
          }}
          onProgressChange={handleProgressChange}
          renderItem={({ item }) => (
            <CharacterCard characterId={item} onClick={item === selectedId ? onCharacterClick : undefined} />
          )}
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
  flex: 1;
`;
