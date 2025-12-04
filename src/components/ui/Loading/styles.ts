import styled from 'styled-components/native';

/**
 * @deprecated core/loading을 사용해주세요
 */
export const CenterView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white};
`;
