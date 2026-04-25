import { COLOR } from '@/src/constants/theme';
import { Description1 } from '@/src/core/Txt';
import type { CharacterId } from '@/src/modules/character';
import characters from '@/src/modules/character';
import responsiveToPx from '@/src/utils/responsiveToPx';
import LottieView from 'lottie-react-native';
import type { StyleProp, ViewStyle } from 'react-native';
import styled from 'styled-components/native';

type Props = {
  characterId: CharacterId;
  style?: StyleProp<ViewStyle>;
};

export const CharacterLoadingBubble = ({ characterId, style }: Props) => {
  const { name, face: Face, color } = characters[characterId];

  return (
    <Wrapper style={style}>
      <CharacterWrapper>
        <FaceWrapper $color={color}>
          <Face width={24} />
        </FaceWrapper>
        <Description1 color="title">{name}</Description1>
      </CharacterWrapper>
      <BubbleWrapper>
        <LoadingLottie source={require('@/assets/lotties/loading.json')} autoPlay loop />
      </BubbleWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.View`
  gap: 5px;
`;

const CharacterWrapper = styled.View`
  flex-direction: row;
  gap: 5px;
  align-items: center;
`;

const FaceWrapper = styled.View<{ $color: string }>`
  width: ${responsiveToPx('28px')};
  aspect-ratio: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ $color }) => $color};
  padding: 4px;
  border-radius: 99px;
`;

const BubbleWrapper = styled.View`
  align-self: flex-start;
  padding: 10px 12px;
  margin-left: ${responsiveToPx('28px')};
  border-radius: 13px;
  background-color: ${COLOR.white};
`;

const LoadingLottie = styled(LottieView)`
  width: ${responsiveToPx('40px')};
  aspect-ratio: 2;
`;
