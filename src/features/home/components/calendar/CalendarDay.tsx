import { COLOR } from "@/src/constants/theme";
import { Description1 } from "@/src/core/Txt";
import type { DateData } from "react-native-calendars";
import type { BasicDayProps } from "react-native-calendars/src/calendar/day/basic";
import styled from "styled-components/native";

type Props = Omit<BasicDayProps, "date"> & {
  date?: DateData;
};

// TODO: 일기 있는 날이면 imageborderwrapper에 이미지 감싸서 렌더링하고, 없으면 emptybox만 렌더링한다.
const CalendarDay = ({ date, onPress }: Props) => {
  return (
    <Wrapper>
      <Description1 color="sub1">{date?.day}</Description1>
      {/* <ImageBorderWrapper> */}
      <EmptyBox />
      {/* </ImageBorderWrapper> */}
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
