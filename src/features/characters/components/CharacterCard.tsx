import { COLOR } from '@/src/constants/theme';
import { LargeTitle } from '@/src/core/Txt';
import characters from '@/src/modules/character';
import responsiveToPx from '@/src/utils/responsiveToPx';
import LottieView from 'lottie-react-native';
import styled from 'styled-components/native';
import type { CharacterId } from '../types';

type Props = {
  characterId: CharacterId;
};

const CharacterCard = ({ characterId }: Props) => {
  const { name, lottie } = characters[characterId];

  return (
    <Wrapper>
      <LottieWrapper>
        <StyledLottieView source={lottie} autoPlay loop renderMode="SOFTWARE" />
      </LottieWrapper>
      <TextWrapper>
        <LargeTitle color="title">{name}</LargeTitle>
      </TextWrapper>
    </Wrapper>
  );
};

export default CharacterCard;

const Wrapper = styled.View`
  width: ${responsiveToPx('255px')};
  margin: 0 auto;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 30px;
  overflow: hidden;
`;

const LottieWrapper = styled.View`
  width: 100%;
  aspect-ratio: 1;
  padding: 36px;
`;

const StyledLottieView = styled(LottieView)`
  flex: 1;
`;

const TextWrapper = styled.View`
  width: ${responsiveToPx('255px')};
  height: ${responsiveToPx('90px')};
  background-color: ${COLOR.white};
  padding: 20px;
  align-items: center;
`;
