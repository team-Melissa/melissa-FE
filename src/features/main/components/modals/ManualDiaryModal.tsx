import styled from "styled-components/native";
import type { DateData } from "react-native-calendars";
import { ModalRoot, type ModalProps } from "@/src/modules/modal";
import responsiveToPx from "@/src/utils/responsiveToPx";
import { theme } from "@/src/constants/theme";
import { useState } from "react";

type Props = ModalProps & {
  date: DateData;
};

const ManualDiaryModal = ({ isOpen, close, exit, date }: Props) => {
  const [title, setTitle] = useState<string>("");

  return (
    <ModalRoot isOpen={isOpen} onClose={close}>
      <Wrapper>
        <Title>일기 작성</Title>
        <TitleInput
          value={title}
          onChangeText={setTitle}
          placeholder="제목을 작성해주세요..."
          hitSlop={15}
          placeholderTextColor={theme.colors.placeholderText}
        />
      </Wrapper>
    </ModalRoot>
  );
};

export default ManualDiaryModal;

const Wrapper = styled.View`
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${theme.colors.white};
  padding: ${responsiveToPx("30px")};
  gap: ${responsiveToPx("20px")};
  border-radius: ${responsiveToPx("30px")};
`;

const Title = styled.Text`
  font-family: ${theme.fontFamily.nsExtraBold};
  font-size: ${theme.fontSize.lg};
  color: ${theme.colors.black};
`;

const TitleInput = styled.TextInput`
  width: ${responsiveToPx("333px")};
  max-height: ${responsiveToPx("100px")};
  padding: ${responsiveToPx("11px")} ${responsiveToPx("16px")};
  background-color: ${theme.colors.white};
  border: 1px solid ${theme.colors.gray};
  border-radius: ${theme.borderRadius.sm};
  font-family: ${theme.fontFamily.nsRegular};
  font-size: ${theme.fontSize.base};
`;
