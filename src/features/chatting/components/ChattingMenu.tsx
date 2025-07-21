import { theme } from "@/src/constants/theme";
import responsiveToPx from "@/src/utils/responsiveToPx";
import BottomSheet, { BottomSheetBackdrop, type BottomSheetBackdropProps } from "@gorhom/bottom-sheet";
import { forwardRef, useEffect, useRef } from "react";
import { StyleProp, ViewStyle } from "react-native";
import styled from "styled-components/native";
import { RECENT_AI_PROFILE_ID_QUERY_KEY, useRecentAiProfileIdQuery } from "../hooks/queries/useRecentAiProfileIdQuery";
import { mergeRefs } from "@/src/utils/mergeRefs";
import { useRemoveAiProfileMutation } from "../hooks/mutations/useRemoveAiProfileMutation";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";

const ChattingMenu = forwardRef<BottomSheet, object>((_, ref) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const innerRef = useRef<BottomSheet>(null);
  const { data: recentAiProfileId } = useRecentAiProfileIdQuery();
  const { mutate: removeAiMutate } = useRemoveAiProfileMutation();

  const handleRemoveAiClick = () => {
    if (!recentAiProfileId) return;
    removeAiMutate(recentAiProfileId);
    innerRef.current?.close();
  };

  const handleDuplicateAiClick = () => {
    if (!recentAiProfileId) return;
    console.log(recentAiProfileId);
    return router.push(`/(app)/make-assistant?aiProfileId=${recentAiProfileId}`);
  };

  // ! 현재 대화하는 AI가 아니라, 이전에 대화한 AI가 삭제되는 캐싱 이슈 대응용
  // Todo: refetchOnMount 옵션으로 대응하면 코드가 더 깔끔해질 듯
  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: [RECENT_AI_PROFILE_ID_QUERY_KEY] });
  }, [queryClient]);

  return (
    <BottomSheet
      ref={mergeRefs(ref, innerRef)}
      index={-1}
      handleStyle={bottomSheetShadow}
      handleIndicatorStyle={indicatorStyle}
      backdropComponent={Backdrop}
      snapPoints={["20%"]}
      enableDynamicSizing={false}
      enableContentPanningGesture={false}
      enableHandlePanningGesture={false}
      enablePanDownToClose={true}
    >
      <BottomSheetLayout>
        <MenuButton onPress={handleRemoveAiClick}>
          <MenuText>서포터 삭제하기</MenuText>
        </MenuButton>
        <MenuButton onPress={handleDuplicateAiClick}>
          <MenuText>서포터 복제하기</MenuText>
        </MenuButton>
      </BottomSheetLayout>
    </BottomSheet>
  );
});

ChattingMenu.displayName = "ChattingMenu";

export default ChattingMenu;

const Backdrop = (props: BottomSheetBackdropProps) => {
  return <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />;
};

const indicatorStyle = {
  display: "none",
  backgroundColor: theme.colors.settingSubText,
} satisfies StyleProp<ViewStyle>;

const bottomSheetShadow = {
  boxShadow: "0 -2 10 0 #ffffff",
  borderRadius: "100%",
} satisfies StyleProp<ViewStyle>;

const BottomSheetLayout = styled.View`
  flex: 1;
  padding: 0px ${responsiveToPx("25px")};
`;

const MenuButton = styled.TouchableOpacity`
  width: 100%;
  height: ${responsiveToPx("50px")};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MenuText = styled.Text`
  font-family: ${({ theme }) => theme.fontFamily.nsRegular};
  font-size: ${({ theme }) => theme.fontSize.lg};
  color: ${({ theme }) => theme.colors.black};
`;
