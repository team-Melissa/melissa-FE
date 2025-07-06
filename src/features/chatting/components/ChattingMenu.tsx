import { theme } from "@/src/constants/theme";
import responsiveToPx from "@/src/utils/responsiveToPx";
import BottomSheet, { BottomSheetBackdrop, type BottomSheetBackdropProps } from "@gorhom/bottom-sheet";
import { forwardRef, useRef } from "react";
import { StyleProp, ViewStyle } from "react-native";
import styled from "styled-components/native";
import { useAiProfileIdQuery } from "../hooks/queries/useAiProfileIdQuery";
import { mergeRefs } from "@/src/utils/mergeRefs";
import { useRemoveAssistantMutation } from "../hooks/mutations/useRemoveAssistantMutation";

const ChattingMenu = forwardRef<BottomSheet, object>((_, ref) => {
  const innerRef = useRef<BottomSheet>(null);
  const { data: aiProfileId } = useAiProfileIdQuery();
  const { mutate: removeAiMutate } = useRemoveAssistantMutation();

  const handleRemoveAiClick = () => {
    if (!aiProfileId) return;
    removeAiMutate(aiProfileId);
    innerRef.current?.close();
  };

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
        <DeleteAiButton onPress={handleRemoveAiClick}>
          <DeleteAiText>서포터 삭제하기</DeleteAiText>
        </DeleteAiButton>
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

const DeleteAiButton = styled.TouchableOpacity`
  width: 100%;
  height: ${responsiveToPx("50px")};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DeleteAiText = styled.Text`
  font-family: ${({ theme }) => theme.fontFamily.nsRegular};
  font-size: ${({ theme }) => theme.fontSize.lg};
  color: ${({ theme }) => theme.colors.black};
`;
