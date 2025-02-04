import { useQuery } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useEffect, useMemo, useRef } from "react";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { DateData } from "react-native-calendars";
import { DiaryResult } from "@/src/types/calendarTypes";
import * as S from "./styles";

import { Text, View } from "react-native";

interface Props {
  pressedDate: Pick<DateData, "year" | "month" | "day">;
  isBottomSheetOpen: boolean;
  setIsBottomSheetOpen: Dispatch<SetStateAction<boolean>>;
}

function DiaryBottomSheet({
  pressedDate,
  isBottomSheetOpen,
  setIsBottomSheetOpen,
}: Props): JSX.Element {
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["50%", "70%"], []);

  // queryFn을 넣지 않으면, 캐시되지 않은 데이터는 불러오지 않는다
  // 즉 오늘 날짜로 pressedDate가 잡혀있어 의미없는 api 요청이 하나 더 발생하지 않는다
  const { data } = useQuery<DiaryResult>({
    queryKey: ["diary", pressedDate.year, pressedDate.month, pressedDate.day],
    staleTime: 5 * 60 * 1000,
    enabled: isBottomSheetOpen,
  });

  useEffect(() => {
    if (isBottomSheetOpen && sheetRef.current) {
      sheetRef.current.expand();
    }
  }, [isBottomSheetOpen]);

  const handleCloseBottomSheet = () => {
    if (sheetRef.current) {
      setIsBottomSheetOpen(false);
      sheetRef.current.close();
    }
  };

  console.log(data);

  return (
    <BottomSheet
      ref={sheetRef}
      index={-1}
      handleStyle={S.bottomSheetShadow}
      handleIndicatorStyle={S.indicatorStyle}
      snapPoints={snapPoints}
      enableDynamicSizing={false}
      enablePanDownToClose={true}
      backdropComponent={Backdrop}
      onClose={handleCloseBottomSheet}
    >
      <BottomSheetScrollView>
        <View style={{ flex: 1 }}>
          <Text style={{ color: "black", fontSize: 64 }}>{data?.message}</Text>
        </View>
      </BottomSheetScrollView>
    </BottomSheet>
  );
}

function Backdrop(props: BottomSheetBackdropProps) {
  return <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={1} />;
}

export default DiaryBottomSheet;
