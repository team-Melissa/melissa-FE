import LottieView from 'lottie-react-native';
import styled from 'styled-components/native';

const IntroAnimationView = () => {
  return <StyledLottieView autoPlay renderMode="SOFTWARE" source={require('@/assets/lotties/intro.json')} />;
};

export default IntroAnimationView;

const StyledLottieView = styled(LottieView)`
  width: 100%;
  aspect-ratio: 0.8;
`;
