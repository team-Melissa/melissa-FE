import { COLOR, FONT_FAMILY } from "@/src/constants/theme";
import styled from "styled-components/native";

type Props = {
  color?: keyof typeof COLOR;
};

export const LargeTitle = styled.Text<Props>(({ color }) => ({
  fontFamily: FONT_FAMILY.pretendard600,
  fontSize: 25,
  ...(color && { color: COLOR[color] }),
}));

export const Title = styled.Text<Props>(({ color }) => ({
  fontFamily: FONT_FAMILY.pretendard600,
  fontSize: 16,
  ...(color && { color: COLOR[color] }),
}));

export const Label = styled.Text<Props>(({ color }) => ({
  fontFamily: FONT_FAMILY.pretendard700,
  fontSize: 15,
  ...(color && { color: COLOR[color] }),
}));

export const Body1 = styled.Text<Props>(({ color }) => ({
  fontFamily: FONT_FAMILY.pretendard500,
  fontSize: 15,
  ...(color && { color: COLOR[color] }),
}));

export const Body2 = styled.Text<Props>(({ color }) => ({
  fontFamily: FONT_FAMILY.pretendard400,
  fontSize: 14,
  ...(color && { color: COLOR[color] }),
}));

export const Description1 = styled.Text<Props>(({ color }) => ({
  fontFamily: FONT_FAMILY.pretendard500,
  fontSize: 13,
  ...(color && { color: COLOR[color] }),
}));

export const Description2 = styled.Text<Props>(({ color }) => ({
  fontFamily: FONT_FAMILY.pretendard400,
  fontSize: 13,
  ...(color && { color: COLOR[color] }),
}));

export const Description3 = styled.Text<Props>(({ color }) => ({
  fontFamily: FONT_FAMILY.pretendard400,
  fontSize: 12,
  ...(color && { color: COLOR[color] }),
}));

export const Description4 = styled.Text<Props>(({ color }) => ({
  fontFamily: FONT_FAMILY.pretendard600,
  fontSize: 8,
  ...(color && { color: COLOR[color] }),
}));

export const ShareTitle = styled.Text<Props>(({ color }) => ({
  fontFamily: FONT_FAMILY.pretendard700,
  fontSize: 30,
  ...(color && { color: COLOR[color] }),
}));

export const ShareBody = styled.Text<Props>(({ color }) => ({
  fontFamily: FONT_FAMILY.pretendard400,
  fontSize: 18,
  ...(color && { color: COLOR[color] }),
}));

export const ShareTag = styled.Text<Props>(({ color }) => ({
  fontFamily: FONT_FAMILY.pretendard600,
  fontSize: 18,
  ...(color && { color: COLOR[color] }),
}));

export const Time = styled.Text<Props>(({ color }) => ({
  fontFamily: FONT_FAMILY.pretendard700,
  fontSize: 20,
  ...(color && { color: COLOR[color] }),
}));
