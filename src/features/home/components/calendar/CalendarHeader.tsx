import { Description1 } from '@/src/core/Txt';
import type { CalendarHeaderProps } from 'react-native-calendars/src/calendar/header';
import { HEADER_HEIGHT } from 'react-native-calendars/src/expandableCalendar/style';
import styled from 'styled-components/native';
import HomeHeader from '../header/HomeHeader';

const DAY_NAMES = ['일', '월', '화', '수', '목', '금', '토'];

const CalendarHeader = (props: CalendarHeaderProps) => {
  const { month } = props;

  const date = new Date(month);
  const monthNum = date.getMonth() + 1;

  return (
    <Wrapper>
      <HomeHeader month={monthNum} />
      <DayNamesWrapper>
        {DAY_NAMES.map((dayName) => (
          <StyledDescription1 key={dayName} color="weeks">
            {dayName}
          </StyledDescription1>
        ))}
      </DayNamesWrapper>
    </Wrapper>
  );
};

export default CalendarHeader;

const Wrapper = styled.View`
  width: 100%;
  height: ${HEADER_HEIGHT + 20}px;
  justify-content: space-between;
`;

const DayNamesWrapper = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-evenly;
`;

const StyledDescription1 = styled(Description1)`
  flex: 1;
  text-align: center;
`;
