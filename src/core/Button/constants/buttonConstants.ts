import responsiveToPx from "@/src/utils/responsiveToPx";
import type { PrimaryButtonVariant, SubButtonVariant } from "../types/buttonTypes";

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
