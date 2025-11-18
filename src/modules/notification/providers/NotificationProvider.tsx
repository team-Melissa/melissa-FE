import * as Notifications from "expo-notifications";
import { useEffect, type PropsWithChildren } from "react";
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
      const pushToken = await initializePushNotification();
      if (!pushToken) return;
      // TODO: 백엔드로 expo push token 저장
    })();

    const notificationListener = Notifications.addNotificationReceivedListener((notification) => {
      console.log("알림 수신 (foreground):", notification);
    });

    const responseListener = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log("알림 내 데이터:", response.notification.request.content.data);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  return children;
};
