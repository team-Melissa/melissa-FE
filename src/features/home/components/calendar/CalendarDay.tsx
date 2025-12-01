import { COLOR } from "@/src/constants/theme";
import { Description1 } from "@/src/core/Txt";
import type { DateData } from "react-native-calendars";
import type { BasicDayProps } from "react-native-calendars/src/calendar/day/basic";
import styled from "styled-components/native";
import { getTodayDateData } from "../../utils/getTodayDateData";

type Props = Omit<BasicDayProps, "date"> & {
  date?: DateData;
};

// TODO: 일기 있는 날이면 imageborderwrapper에 이미지 감싸서 렌더링하고, 없으면 emptybox만 렌더링한다.
// TODO: query hook을 감싸는 hook에서 fetch된 데이터에 툴팁 렌더링 유무 필드를 추가하고, setInterval로 랜덤하게 true false 왔다갔다 하도록 구현
// TODO: query data에서 툴팁 렌더링 유무 값이 변경되면, 약간의 딜레이 후 내부 state를 변경하는 방향으로 툴팁 렌더링에 fade animation 적용 (혹은 reanimated 고려)
const CalendarDay = ({ date, onPress }: Props) => {
  if (!date) return null;

  const today = getTodayDateData();

  const handleDayPress = () => {
    onPress?.(date);
  };

  return (
    <Wrapper onPress={handleDayPress}>
      <StyledDescription1 $isToday={today.dateString === date.dateString}>
        {date.day}
      </StyledDescription1>
      <ImageBorderWrapper>
        <EmptyBox />
      </ImageBorderWrapper>
    </Wrapper>
  );
};

export default CalendarDay;

const Wrapper = styled.TouchableOpacity`
  width: 100%;
  padding: 4px;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const StyledDescription1 = styled(Description1)<{ $isToday: boolean }>`
  padding: 3px 7px;
  background-color: ${({ $isToday }) => ($isToday ? COLOR.sub1 : "transparent")};
  color: ${({ $isToday }) => ($isToday ? COLOR.sub2 : COLOR.sub1)};
  border-radius: 12px;
`;

const ImageBorderWrapper = styled.View`
  padding: 2px;
  background-color: ${COLOR.white};
  border: 2px solid ${COLOR.sub1};
  border-radius: 19px;
`;

const EmptyBox = styled.View`
  width: 100%;
  aspect-ratio: 1;
  background-color: #c3e8e0;
  border-radius: 15px;
`;
