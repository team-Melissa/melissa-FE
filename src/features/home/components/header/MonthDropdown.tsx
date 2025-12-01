import { Dropdown } from "@/src/core/Dropdown";
import { LargeTitle, Title } from "@/src/core/Txt";
import { IconArrowDown } from "@/src/icons/IconArrowDown";
import responsiveToPx from "@/src/utils/responsiveToPx";
import styled from "styled-components/native";

type Props = {
  value: number;
  onValueChange?: (newValue: number) => void;
};

const MONTH_LIST = Array.from({ length: 12 }, (_, idx) => idx + 1);

const MonthDropdown = ({ value, onValueChange }: Props) => {
  return (
    <Dropdown>
      <StyledDropdownTrigger>
        <LargeTitle color="title">{value}월</LargeTitle>
        <IconArrowDown />
      </StyledDropdownTrigger>
      {onValueChange && (
        <StyledDropdownMenu align="center">
          {MONTH_LIST.map((month) => (
            <StyledDropdownItem key={month} onPress={() => onValueChange(month)}>
              <Title color="title">{month}월</Title>
            </StyledDropdownItem>
          ))}
        </StyledDropdownMenu>
      )}
    </Dropdown>
  );
};

export default MonthDropdown;

const StyledDropdownTrigger = styled(Dropdown.Trigger)`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 2px;
`;

const StyledDropdownMenu = styled(Dropdown.Menu)`
  width: ${responsiveToPx("232px")};
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 0;
  gap: 4px;
`;

const StyledDropdownItem = styled(Dropdown.Item)`
  width: ${responsiveToPx("55px")};
  justify-content: center;
  align-items: center;
  padding: 0;
`;
