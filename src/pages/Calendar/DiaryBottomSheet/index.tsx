import { useQuery } from "@tanstack/react-query";
import { ForwardedRef, forwardRef, useMemo } from "react";
import BottomSheet, { BottomSheetBackdrop, BottomSheetBackdropProps } from "@gorhom/bottom-sheet";
import { DateData } from "react-native-calendars";
import { DiaryResult } from "@/src/types/calendarTypes";
import { shadowProps } from "@/src/constants/shadowProps";
import * as S from "./styles";

interface Props {
  pressedDate: Pick<DateData, "year" | "month" | "day">;
}

function DiaryBottomSheet({ pressedDate }: Props, ref: ForwardedRef<BottomSheet>): JSX.Element {
  const snapPoints = useMemo(() => ["60%", "90%"], []);

  // queryFn을 넣지 않으면, 캐시되지 않은 데이터는 불러오지 않는다
  // 즉 오늘 날짜로 pressedDate가 잡혀있어 의미없는 api 요청이 하나 더 발생하지 않는다
  const { data } = useQuery<DiaryResult>({
    queryKey: ["diary", pressedDate.year, pressedDate.month, pressedDate.day],
    staleTime: 5 * 60 * 1000,
  });

  console.log(data?.result);

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
              <S.Image source={{ uri: data.result.imageS3 }} />
            </S.ImageBox>
            <S.DateText>
              {data.result.year}. {data.result.month}. {data.result.day}
            </S.DateText>
            <S.TitleText>{data.result.summaryTitle}</S.TitleText>
            <S.ContentText>{data.result.summaryContent}</S.ContentText>

            <S.TagText>#놀이공원 #롤러코스터</S.TagText>
            <S.ChatButtonBox>
              <S.ViewChatButton
                hitSlop={10}
                style={shadowProps}
                onPress={() => {
                  /* Todo: 버튼 클릭 시 채팅방 레이아웃에서 나눴던 채팅 읽기 */
                }}
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
