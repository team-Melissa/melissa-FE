import styled from "styled-components/native";
import Animated from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { fadeIn, fadeOut } from "@/src/libs/animations";
import responsiveToPx from "@/src/utils/responsiveToPx";

export default function Intro() {
  return (
    <CenteringBox>
      <Animated.View entering={fadeIn(0, 1000)} exiting={fadeOut()}>
        <InfoText>
          몇 가지 <Bold>질문</Bold>에 답변해주세요
        </InfoText>
      </Animated.View>
      <Animated.View entering={fadeIn(1500, 1000)} exiting={fadeOut()}>
        <InfoText>
          당신에게 맞는 <Bold>서포터</Bold>를 만들어드릴게요
        </InfoText>
      </Animated.View>
    </CenteringBox>
  );
}

const CenteringBox = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
  justify-content: center;
  align-items: center;
`;

const InfoText = styled.Text`
  font-family: ${({ theme }) => theme.fontFamily.nsRegular};
  font-size: ${({ theme }) => theme.fontSize.md};
  padding-bottom: ${responsiveToPx("30px")};
`;

const Bold = styled(InfoText)`
  font-family: ${({ theme }) => theme.fontFamily.nsBold};
`;
