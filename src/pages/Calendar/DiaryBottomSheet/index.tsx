import { useMemo, useRef } from "react";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import * as S from "./styles";

interface Props {
  year: string;
  month: string;
  day: string;
}

function DiaryBottomSheet({ year, month, day }: Props): JSX.Element {
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["30%", "50%", "70%"], []);

  return (
    <BottomSheet
      ref={sheetRef}
      index={-1}
      handleStyle={S.bottomSheetShadow}
      snapPoints={snapPoints}
      enableDynamicSizing={false}
      enablePanDownToClose={true}
      backdropComponent={Backdrop}
      handleIndicatorStyle={S.indicatorStyle}
    >
      <BottomSheetScrollView></BottomSheetScrollView>
    </BottomSheet>
  );
}

function Backdrop(props: BottomSheetBackdropProps) {
  return <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={1} />;
}

export default DiaryBottomSheet;
