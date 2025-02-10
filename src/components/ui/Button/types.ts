import { PropsWithChildren } from "react";
import { TouchableOpacityProps } from "react-native";
import { Fontsize, FontFamily, BorderRadius, Colors } from "@/src/constants/theme";

export type BtnStyle = {
  color?: keyof Colors;
  textColor?: keyof Colors;
  fontFamily?: keyof FontFamily;
  fontSize?: keyof Fontsize;
  borderRadius?: keyof BorderRadius;
};

export type BtnProps = BtnStyle & TouchableOpacityProps & PropsWithChildren;
