import Animated from "react-native-reanimated";
import { fadeIn, fadeOut } from "@/src/libs/animations";
import * as S from "./styles";

function Intro() {
  return (
    <S.CenteringBox>
      <Animated.View entering={fadeIn(0, 1000)} exiting={fadeOut()}>
        <S.InfoText>
          몇 가지 <S.Bold>질문</S.Bold>에 답변해주세요
        </S.InfoText>
      </Animated.View>

      <Animated.View entering={fadeIn(1500, 1000)} exiting={fadeOut()}>
        <S.InfoText>
          당신에게 맞는 <S.Bold>서포터</S.Bold>를 만들어드릴게요
        </S.InfoText>
      </Animated.View>
    </S.CenteringBox>
  );
}

export default Intro;
