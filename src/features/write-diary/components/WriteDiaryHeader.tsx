import { LargeTitle } from '@/src/core/Txt';
import { IconArrowDown } from '@/src/icons';
import responsiveToPx from '@/src/utils/responsiveToPx';
import type { ReactNode } from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

type Props = {
  children: ReactNode;
  onBackClick: () => void;
};

const WriteDiaryHeader = ({ children, onBackClick }: Props) => {
  return (
    <Wrapper>
      <TouchableOpacity onPress={onBackClick} hitSlop={5}>
        <StyledIconArrowLeft width={30} height={30} />
      </TouchableOpacity>
      <LargeTitle color="title">{children}</LargeTitle>
      <EmptyView />
    </Wrapper>
  );
};

export default WriteDiaryHeader;

const Wrapper = styled.View`
  flex-direction: row;
  width: 100%;
  padding: 15px 0;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const StyledIconArrowLeft = styled(IconArrowDown)`
  width: ${responsiveToPx('30px')};
  height: ${responsiveToPx('30px')};
  transform: rotate(90deg);
`;

const EmptyView = styled.View`
  width: ${responsiveToPx('30px')};
  height: ${responsiveToPx('30px')};
`;
