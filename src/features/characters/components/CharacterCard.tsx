import { COLOR } from '@/src/constants/theme';
import { Body1, LargeTitle } from '@/src/core/Txt';
import characters, { type CharacterId } from '@/src/modules/character';
import responsiveToPx from '@/src/utils/responsiveToPx';
import LottieView from 'lottie-react-native';
import styled from 'styled-components/native';

type Props = {
  characterId: CharacterId;
  onClick?: () => void;
};

const CharacterCard = ({ characterId, onClick }: Props) => {
  const { name, description, lottie } = characters[characterId];

  return (
    <Wrapper onPress={onClick}>
      <LottieWrapper>
        <StyledLottieView source={lottie} autoPlay loop renderMode="SOFTWARE" />
      </LottieWrapper>
      <TextWrapper>
        <LargeTitle color="title">{name}</LargeTitle>
        <StyledBody1 color="sub1">{description}</StyledBody1>
      </TextWrapper>
    </Wrapper>
  );
};

export default CharacterCard;

const Wrapper = styled.TouchableOpacity`
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

  background-color: ${COLOR.white};
  padding: 20px;
  gap: 5px;
  align-items: center;
`;

const StyledBody1 = styled(Body1)`
  text-align: center;
`;
