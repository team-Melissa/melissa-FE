import { ScrollView } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { useAiProfileListQuery } from "../hooks/queries/useAiProfileListQuery";
import AiProfile from "./AiProfile";
import { IconPlus } from "./icons";
import { useRouter } from "expo-router";
import { debounce } from "@/src/utils/debounce";

const BG_COLORS = ["#BDDFE8", "#F0D69C", "#F4CBD0"];

const AiProfileList = () => {
  const router = useRouter();
  const { data: aiProfileList } = useAiProfileListQuery();

  const goToMakeAiProfilePage = debounce(() => {
    return router.push("/(app)/make-assistant");
  });

  return (
    <>
      <HeaderWrapper>
        <StyledText>서포터 채팅</StyledText>
        <AddAiButton hitSlop={15} onPress={goToMakeAiProfilePage}>
          <IconPlus />
        </AddAiButton>
      </HeaderWrapper>
      <AiProfileScrollView horizontal showsHorizontalScrollIndicator={false}>
        {aiProfileList?.map((data, idx) => (
          <AiProfile
            key={`${data.aiProfileId}-${data.default}`}
            aiProfile={data}
            backgroundColor={BG_COLORS[idx % 3]}
          />
        ))}
      </AiProfileScrollView>
    </>
  );
};

export default AiProfileList;

const HeaderWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 15px;
  gap: ${({ theme }) => theme.gap.md};
`;

const StyledText = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-family: ${({ theme }) => theme.fontFamily.nsRegular};
`;

const AddAiButton = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AiProfileScrollView = styled(ScrollView)`
  margin-bottom: 20px;
`;
