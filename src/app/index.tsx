import styled from "styled-components/native";

export default function Index() {
  return (
    <StyledView>
      <NanumText>Edit app/index.tsx to edit this screen.</NanumText>
    </StyledView>
  );
}

const StyledView = styled.View`
  background-color: ${({ theme }) => theme.colors.deepGreen};
`;

const NanumText = styled.Text`
  font-family: ${({ theme }) => theme.fontFamily.nsExtraBold};
`;
