import styled from 'styled-components/native';
import { COLOR, FONT_FAMILY } from '@/src/constants/theme';

type Props = {
  color?: keyof typeof COLOR;
};

export const LargeTitle = styled.Text<Props>`
  font-family: ${FONT_FAMILY.pretendard600};
  font-size: 25px;
  ${({ color }) => color && { color: COLOR[color] }};
`;

export const Title = styled.Text<Props>`
  font-family: ${FONT_FAMILY.pretendard600};
  font-size: 16px;
  ${({ color }) => color && { color: COLOR[color] }};
`;

export const Label = styled.Text<Props>`
  font-family: ${FONT_FAMILY.pretendard700};
  font-size: 15px;
  ${({ color }) => color && { color: COLOR[color] }};
`;

export const Body1 = styled.Text<Props>`
  font-family: ${FONT_FAMILY.pretendard500};
  font-size: 15px;
  ${({ color }) => color && { color: COLOR[color] }};
`;

export const Body2 = styled.Text<Props>`
  font-family: ${FONT_FAMILY.pretendard400};
  font-size: 14px;
  ${({ color }) => color && { color: COLOR[color] }};
`;

export const Description1 = styled.Text<Props>`
  font-family: ${FONT_FAMILY.pretendard500};
  font-size: 13px;
  ${({ color }) => color && { color: COLOR[color] }};
`;

export const Description2 = styled.Text<Props>`
  font-family: ${FONT_FAMILY.pretendard400};
  font-size: 13px;
  ${({ color }) => color && { color: COLOR[color] }};
`;

export const Description3 = styled.Text<Props>`
  font-family: ${FONT_FAMILY.pretendard400};
  font-size: 12px;
  ${({ color }) => color && { color: COLOR[color] }};
`;

export const Description4 = styled.Text<Props>`
  font-family: ${FONT_FAMILY.pretendard600};
  font-size: 8px;
  ${({ color }) => color && { color: COLOR[color] }};
`;

export const ShareTitle = styled.Text<Props>`
  font-family: ${FONT_FAMILY.pretendard700};
  font-size: 30px;
  ${({ color }) => color && { color: COLOR[color] }};
`;

export const ShareBody = styled.Text<Props>`
  font-family: ${FONT_FAMILY.pretendard400};
  font-size: 18px;
  ${({ color }) => color && { color: COLOR[color] }};
`;

export const ShareTag = styled.Text<Props>`
  font-family: ${FONT_FAMILY.pretendard600};
  font-size: 18px;
  ${({ color }) => color && { color: COLOR[color] }};
`;

export const Time = styled.Text<Props>`
  font-family: ${FONT_FAMILY.pretendard700};
  font-size: 20px;
  ${({ color }) => color && { color: COLOR[color] }};
`;
