import "styled-components/native";
import { BorderRadius, Colors, FontFamily, Fontsize } from "./theme";

declare module "styled-components/native" {
  export interface DefaultTheme {
    fontSize: Fontsize;
    fontFamily: FontFamily;
    borderRadius: BorderRadius;
    colors: Colors;
  }
}
