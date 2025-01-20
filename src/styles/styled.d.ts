import "styled-components/native";
import { BorderRadius, Colors, Fontsize } from "./theme";

declare module "styled-components/native" {
  export interface DefaultTheme {
    fontSize: Fontsize;
    borderRadius: BorderRadius;
    colors: Colors;
  }
}
