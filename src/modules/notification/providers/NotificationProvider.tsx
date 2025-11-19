import * as Notifications from "expo-notifications";
import { useEffect, type PropsWithChildren } from "react";
import { setNotificationToken } from "@/src/libs/mmkv";
import { initializePushNotification } from "../utils/setup";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export const NotificationProvider = ({ children }: PropsWithChildren) => {
  useEffect(() => {
    (async () => {
      const notificationToken = await initializePushNotification();
      if (!notificationToken) return;
      setNotificationToken(notificationToken);
    })();

    const notificationListener = Notifications.addNotificationReceivedListener((notification) => {
      // TODO: 포어그라운드 알림 수신에 대한 처리 진행
      console.log("FG 알림 수신: ", notification);
    });

    const responseListener = Notifications.addNotificationResponseReceivedListener((response) => {
      // TODO: 백그라운드 알림 수신에 대한 처리 진행
      console.log("BG 알림 내 데이터: ", response.notification.request.content.data);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  return children;
};
