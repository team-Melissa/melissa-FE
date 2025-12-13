import responsiveToPx from '@/src/utils/responsiveToPx';
import { useState } from 'react';
import type { LayoutChangeEvent } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import styled from 'styled-components/native';
import type { CharacterId } from '../types';
import CharacterCard from './CharacterCard';

type Props = {
  onSelectChange: (aiProfileId: CharacterId) => void;
};

const CHARACTER_ID_LIST = [1, 2, 3, 4, 5] satisfies CharacterId[];

const CharacterList = ({ onSelectChange }: Props) => {
  const [width, setWidth] = useState<number | null>(null);

  const getListWidth = (e: LayoutChangeEvent) => {
    setWidth(e.nativeEvent.layout.width);
  };

  const handleSnapToItem = (index: number) => {
    onSelectChange(CHARACTER_ID_LIST[index]);
  };

  return (
    <Container onLayout={getListWidth}>
      {width && (
        <Carousel
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
    </Container>
  );
};

export default CharacterList;

const Container = styled.View`
  width: 100%;
  height: ${responsiveToPx('345px')};
`;
