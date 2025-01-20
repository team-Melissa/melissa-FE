import { Text } from "react-native";
import styled from "styled-components/native";

export default function Index() {
  return (
    <StyledView>
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </StyledView>
  );
}

const StyledView = styled.View`
  background-color: ${({ theme }) => theme.colors.deepGreen};
`;
