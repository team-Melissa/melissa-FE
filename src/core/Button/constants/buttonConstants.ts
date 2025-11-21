import responsiveToPx from "@/src/utils/responsiveToPx";
import type { PrimaryButtonVariant, SubButtonVariant } from "../types/buttonTypes";
import type { OAuthProvider } from "@/src/types/commonTypes";
import type { ReactNode } from "react";
import { IconKakao } from "@/src/icons/IconKakao";
import type { SvgProps } from "react-native-svg";
import { IconGoogle } from "@/src/icons/IconGoogle";
import { IconApple } from "@/src/icons/IconApple";
import { COLOR } from "@/src/constants/theme";

export const primaryButtonWidth = {
  large: responsiveToPx("245px"),
  medium: responsiveToPx("155px"),
  small: responsiveToPx("135px"),
} satisfies Record<PrimaryButtonVariant, string>;

export const primaryButtonHeight = {
  large: responsiveToPx("60px"),
  medium: responsiveToPx("58px"),
  small: responsiveToPx("52px"),
} satisfies Record<PrimaryButtonVariant, string>;

export const subButtonWidth = {
  large: responsiveToPx("135px"),
  small: responsiveToPx("105px"),
} satisfies Record<SubButtonVariant, string>;

export const subButtonHeight = responsiveToPx("52px");

export const loginButtonWidth = responsiveToPx("245px");

export const loginButtonHeight = responsiveToPx("58px");

export const loginButtonColor = {
  KAKAO: {
    front: "#fae100",
    back: "#ccb700",
    text: COLOR.title,
  },
  GOOGLE: {
    front: COLOR.white,
    back: "#d2d8dB",
    text: COLOR.title,
  },
  APPLE: {
    front: "#4c4c4c",
    back: "#313131",
    text: COLOR.white,
  },
} satisfies Record<OAuthProvider, object>;

export const loginButtonIcon = {
  KAKAO: IconKakao,
  GOOGLE: IconGoogle,
  APPLE: IconApple,
} satisfies Record<OAuthProvider, (props: SvgProps) => ReactNode>;
