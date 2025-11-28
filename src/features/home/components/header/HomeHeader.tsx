import styled from "styled-components/native";
import MenuButtons from "./MenuButtons";
import MonthChangeDropdown from "./MonthChangeDropdown";
import StreakBadge from "./StreakBadge";

type Props = {
  month: number;
  onChange: (newMonth: number) => void;
};

const HomeHeader = ({ month, onChange }: Props) => {
  return (
    <Wrapper>
      <StreakBadge />
      <MonthChangeDropdown value={month} onValueChange={onChange} />
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
