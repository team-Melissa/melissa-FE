import styled from 'styled-components/native';
import MenuButtons from './MenuButtons';
import MonthDropdown from './MonthDropdown';
import StreakBadge from './StreakBadge';

type Props = {
  month: number;
  onChange?: (newMonth: number) => void;
};

const HomeHeader = ({ month, onChange }: Props) => {
  return (
    <Wrapper>
      <StreakBadge />
      <MonthDropdown value={month} onValueChange={onChange} />
      <MenuButtons />
    </Wrapper>
  );
};

export default HomeHeader;

const Wrapper = styled.View`
  width: 100%;
  padding: 10px 18px 0 18px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
