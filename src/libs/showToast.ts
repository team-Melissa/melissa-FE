import { theme } from "@/src/constants/theme";
import Toast from "react-native-toast-message";

type MessageType = "error" | "success";

const showToast = (message: string | undefined, type: MessageType) => {
  if (message) {
    Toast.show({
      type: type,
      position: "bottom",
      text1: message,
      text1Style: {
        fontSize: parseInt(theme.fontSize.base),
        fontFamily: theme.fontFamily.nsRegular,
      },
    });
  }
};

export default showToast;
