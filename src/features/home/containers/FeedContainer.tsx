import { COLOR } from "@/src/constants/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import HomeHeader from "../components/header/HomeHeader";

const FeedContainer = () => {
  return (
    <SafeView>
      <Wrapper>
        <HomeHeader month={11} onChange={() => {}} />
      </Wrapper>
    </SafeView>
  );
};

export default FeedContainer;

const SafeView = styled(SafeAreaView)`
  flex: 1;
  background-color: ${COLOR.background};
`;

const Wrapper = styled.View`
  padding-inline: 15px;
`;
