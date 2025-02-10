import styled from "styled-components/native";
import { Image as Img } from "expo-image";
import responsiveToPx from "@/src/utils/responsiveToPx";
import { ItemBox } from "../styles";

export { ItemBox };

/* 이름과 아이콘 버튼을 한 줄로 배치 */
export const NameTagContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding-horizontal: ${responsiveToPx("20px")};
`;

/* 복제 및 삭제 버튼 아이콘 정렬 */
export const IconButtonBox = styled.View`
  flex-direction: row;
  gap: ${({ theme }) => theme.gap.sm};
  align-items: center;
`;

/* "+" 버튼을 포함한 컨테이너 */
export const ButtonBox = styled.View`
  flex-direction: row;
  gap: ${({ theme }) => theme.gap.lg};
  align-items: center;
  justify-content: center;
  width: 100%;
`;

/* 터치 가능한 버튼 */
export const Button = styled.TouchableOpacity`
  width: ${responsiveToPx("101px")};
  height: ${responsiveToPx("29px")};
  background-color: ${({ theme }) => theme.colors.skyBlue};
  border-radius: ${({ theme }) => theme.borderRadius.base};
  justify-content: center;
  align-items: center;
`;

/* "+" 아이콘 이미지 */
export const PlusImage = styled(Img)`
  width: ${responsiveToPx("180px")};
  height: ${responsiveToPx("180px")};
`;

/* "새로운 서포터 만들기" 텍스트 */
export const GenAiText = styled.Text`
  font-family: ${({ theme }) => theme.fontFamily.nsExtraBold};
  font-size: ${({ theme }) => theme.fontSize.xl};
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
`;