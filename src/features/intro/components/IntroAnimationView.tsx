import LottieView from 'lottie-react-native';
import styled from 'styled-components/native';

type Props = {
  onFinish: () => void;
};

const IntroAnimationView = ({ onFinish }: Props) => {
  return (
    <StyledLottieView
      autoPlay
      loop={false}
      renderMode="SOFTWARE"
      source={require('@/assets/lotties/intro.json')}
      onAnimationFinish={onFinish}
    />
  );
};

export default IntroAnimationView;

const StyledLottieView = styled(LottieView)`
  width: 100%;
  aspect-ratio: 0.8;
`;
