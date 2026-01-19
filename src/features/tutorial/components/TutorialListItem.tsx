import { Body2, MiddleTitle } from '@/src/core/Txt';
import { Image } from 'expo-image';
import type { CarouselRenderItemInfo } from 'react-native-reanimated-carousel/lib/typescript/types';
import styled from 'styled-components/native';
import type { TUTORIAL_LIST_DATA } from '../constants';

type Props = CarouselRenderItemInfo<(typeof TUTORIAL_LIST_DATA)[number]>;

const TutorialListItem = ({ item }: Props) => {
  const { title, description, image } = item;

  return (
    <Slide>
      <SlideImage source={image} resizeMode="contain" />
      <TextContainer>
        <StyledMiddleTitle color="title">{title}</StyledMiddleTitle>
        <StyledBody2 color="sub1">{description}</StyledBody2>
      </TextContainer>
    </Slide>
  );
};

export default TutorialListItem;

const Slide = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const SlideImage = styled(Image)`
  flex: 1;
  width: 100%;
`;

const TextContainer = styled.View`
  padding: 24px 20px;
  align-items: center;
  gap: 8px;
`;

const StyledMiddleTitle = styled(MiddleTitle)`
  text-align: center;
  margin-bottom: 4px;
`;

const StyledBody2 = styled(Body2)`
  text-align: center;
  line-height: 20px;
`;
