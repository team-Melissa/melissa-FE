import { COLOR } from '@/src/constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import Calendar from '../components/calendar/Calendar';

const CalendarContainer = () => {
  return (
    <SafeView>
      <Calendar />
    </SafeView>
  );
};

export default CalendarContainer;

const SafeView = styled(SafeAreaView)`
  flex: 1;
  background-color: ${COLOR.background};
`;
