import styled from "styled-components/native";
import responsiveToPx from "@/src/utils/responsiveToPx";

export const ImageBox = styled.View`
  width: ${responsiveToPx("300px")};
  height: ${responsiveToPx("300px")};
  background-color: ${({ theme }) => theme.colors.whiteBlue};
  border-radius: 5px;
  justify-content: center;
  align-items: center;
`;

export const Image = styled.Image`
  width: ${responsiveToPx("295px")};
  height: ${responsiveToPx("295px")};
  border-radius: 5px;
`;
