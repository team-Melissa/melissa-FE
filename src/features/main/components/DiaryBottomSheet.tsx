import { type Dispatch, type ForwardedRef, type SetStateAction, forwardRef, useMemo } from "react";
import styled from "styled-components/native";
import { useRouter } from "expo-router";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import type { DateData } from "react-native-calendars";
import CachedImage from "@/src/components/ui/CachedImage";
import { preventDoublePress } from "@/src/libs/esToolkit";
import responsiveToPx, { responsiveToPxByHeight } from "@/src/utils/responsiveToPx";
import { theme } from "@/src/constants/theme";
import { shadowProps } from "@/src/constants/shadowProps";
import { useDiariesQuery } from "../hooks/queries/useDiariesQuery";
import DiaryBottomSheetBackdrop from "./DiaryBottomSheetBackdrop";

type DiaryBottomSheetProps = {
  pressedDate: Pick<DateData, "year" | "month" | "day">;
  setIsBottomSheetOpen: Dispatch<SetStateAction<boolean>>;
};

export default forwardRef(function DiaryBottomSheet(
  { pressedDate, setIsBottomSheetOpen }: DiaryBottomSheetProps,
  ref: ForwardedRef<BottomSheet>
) {
  const router = useRouter();
  const snapPoints = useMemo(() => ["60%", "90%"], []);
  const { year, month, day } = pressedDate;
  const { data } = useDiariesQuery({ year, month });

  // 읽기만 가능한 채팅방 렌더링을 위해 year, month, day를 쿼리스트링으로 전달
  const handlePressReadonlyChatting = preventDoublePress(() =>
    router.push(`/(app)/chatting?year=${year}&month=${month}&day=${day}`)
  );

  const diary = data?.result.find((d) => d.day === day);

  return (
    <BottomSheet
      ref={ref}
      index={-1}
      handleStyle={bottomSheetShadow}
      handleIndicatorStyle={indicatorStyle}
      snapPoints={snapPoints}
      enableDynamicSizing={false}
      enablePanDownToClose={true}
      backdropComponent={DiaryBottomSheetBackdrop}
      onChange={(idx) => setIsBottomSheetOpen(idx > -1)}
    >
      {diary && (
        <BottomSheetLayout>
          <ScrollBox showsVerticalScrollIndicator={false}>
            <ImageBox>
              <Image src={diary.imageS3} />
            </ImageBox>
            <DateText>
              {diary.year}. {diary.month}. {diary.day}
            </DateText>
            <TitleText>{diary.summaryTitle}</TitleText>
            <ContentText>{diary.summaryContent}</ContentText>
            <TagText>
              {diary.hashTag1} {diary.hashTag2}
            </TagText>
            <ChatButtonBox>
              <ViewChatButton hitSlop={10} style={shadowProps} onPress={handlePressReadonlyChatting}>
                <ButtonText>전체 대화 보기</ButtonText>
              </ViewChatButton>
            </ChatButtonBox>
          </ScrollBox>
        </BottomSheetLayout>
      )}
    </BottomSheet>
  );
});

const indicatorStyle = {
  backgroundColor: theme.colors.settingSubText,
};

const bottomSheetShadow = {
  boxShadow: "0 -2 10 0 #ffffff",
  borderRadius: "100%",
};

const BottomSheetLayout = styled.View`
  flex: 1;
  padding: 0px ${responsiveToPx("25px")};
`;

const ImageBox = styled.View`
  width: ${responsiveToPx("380px")};
  height: ${responsiveToPx("380px")};
  border-radius: ${({ theme }) => theme.borderRadius.base};
  overflow: hidden;
`;

const Image = styled(CachedImage)`
  width: 100%;
  height: 100%;
`;

const ScrollBox = styled(BottomSheetScrollView)``;

const DateText = styled.Text`
  padding-top: ${responsiveToPx("13px")};
  font-family: ${({ theme }) => theme.fontFamily.podkovaRegular};
  font-size: ${({ theme }) => theme.fontSize.lg};
  color: ${({ theme }) => theme.colors.black};
`;

const TitleText = styled.Text`
  padding-top: ${responsiveToPx("13px")};
  font-family: ${({ theme }) => theme.fontFamily.nsBold};
  font-size: ${({ theme }) => theme.fontSize.lg};
  color: ${({ theme }) => theme.colors.black};
`;

const ContentText = styled.Text`
  padding-top: ${responsiveToPx("13px")};
  font-family: ${({ theme }) => theme.fontFamily.nsRegular};
  font-size: ${({ theme }) => theme.fontSize.base};
  color: ${({ theme }) => theme.colors.diaryText};
  line-height: ${responsiveToPxByHeight("24px")};
`;

const TagText = styled.Text`
  padding-top: ${responsiveToPx("13px")};
  font-family: ${({ theme }) => theme.fontFamily.nsBold};
  font-size: ${({ theme }) => theme.fontSize.base};
  color: ${({ theme }) => theme.colors.deepGreen};
`;

const ChatButtonBox = styled.View`
  width: 100%;
  padding: ${responsiveToPxByHeight("26px")};
  justify-content: center;
  align-items: center;
`;

const ViewChatButton = styled.TouchableOpacity`
  width: ${responsiveToPx("173px")};
  height: ${responsiveToPx("40px")};
  border-radius: ${({ theme }) => theme.borderRadius.base};
  background-color: ${({ theme }) => theme.colors.deepGreen};
  justify-content: center;
  align-items: center;
`;

const ButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fontFamily.nsBold};
  font-size: ${({ theme }) => theme.fontSize.md};
`;
