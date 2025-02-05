import { useQuery } from "@tanstack/react-query";
import { ForwardedRef, forwardRef, useMemo } from "react";
import { useRouter } from "expo-router";
import BottomSheet, { BottomSheetBackdrop, BottomSheetBackdropProps } from "@gorhom/bottom-sheet";
import { DateData } from "react-native-calendars";
import { DiariesResult } from "@/src/types/calendarTypes";
import { shadowProps } from "@/src/constants/shadowProps";
import * as S from "./styles";

interface Props {
  pressedDate: Pick<DateData, "year" | "month" | "day">;
}

function DiaryBottomSheet({ pressedDate }: Props, ref: ForwardedRef<BottomSheet>): JSX.Element {
  const { year, month, day } = pressedDate;
  const router = useRouter();
  const snapPoints = useMemo(() => ["60%", "90%"], []);

  // queryFn을 넣지 않으면, 캐시되지 않은 데이터는 불러오지 않는다
  // 즉 오늘 날짜로 pressedDate가 잡혀있어 의미없는 api 요청이 하나 더 발생하지 않는다
  const { data } = useQuery<DiariesResult>({
    queryKey: ["diaries", year, month],
    staleTime: 5 * 60 * 1000,
  });

  // 읽기만 가능한 채팅방 렌더링을 위해 year, month, day를 쿼리스트링으로 전달
  const handlePressReadonlyChatting = () => {
    router.push(`/(app)/chatting?year=${year}&month=${month}&day=${day}`);
  };

  return (
    <BottomSheet
      ref={ref}
      index={-1}
      handleStyle={S.bottomSheetShadow}
      handleIndicatorStyle={S.indicatorStyle}
      snapPoints={snapPoints}
      enableDynamicSizing={false}
      enablePanDownToClose={true}
      backdropComponent={Backdrop}
    >
      {data && (
        <S.BottomSheetLayout>
          <S.ScrollBox showsVerticalScrollIndicator={false}>
            <S.ImageBox>
              <S.Image source={{ uri: data.result.find((d) => d.day === day)?.imageS3 }} />
            </S.ImageBox>
            <S.DateText>
              {data.result.find((d) => d.day === day)?.year}.{" "}
              {data.result.find((d) => d.day === day)?.month}.{" "}
              {data.result.find((d) => d.day === day)?.day}
            </S.DateText>
            <S.TitleText>{data.result.find((d) => d.day === day)?.summaryTitle}</S.TitleText>
            <S.ContentText>{data.result.find((d) => d.day === day)?.summaryContent}</S.ContentText>

            <S.TagText>
              {data.result.find((d) => d.day === day)?.hashTag1}{" "}
              {data.result.find((d) => d.day === day)?.hashTag2}
            </S.TagText>
            <S.ChatButtonBox>
              <S.ViewChatButton
                hitSlop={10}
                style={shadowProps}
                onPress={handlePressReadonlyChatting}
              >
                <S.ButtonText>전체 대화 보기</S.ButtonText>
              </S.ViewChatButton>
            </S.ChatButtonBox>
          </S.ScrollBox>
        </S.BottomSheetLayout>
      )}
    </BottomSheet>
  );
}

function Backdrop(props: BottomSheetBackdropProps) {
  return <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={1} />;
}

export default forwardRef(DiaryBottomSheet);
