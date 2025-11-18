import * as Sentry from "@sentry/react-native";
import { useNavigationContainerRef } from "expo-router";
import { useEffect, type PropsWithChildren } from "react";
import { getSentryNavigationIntegration, initializeSentry } from "../utils/setup";

const navigationIntegration = getSentryNavigationIntegration();

initializeSentry(navigationIntegration);

/**
 * @description 반드시 최상위에서 감싸야 합니다.
 */
export const SentryProvider = Sentry.wrap(({ children }: PropsWithChildren) => {
  const navigationContainerRef = useNavigationContainerRef();

  useEffect(() => {
    if (!navigationContainerRef?.current) return;
    navigationIntegration.registerNavigationContainer(navigationContainerRef);
  }, [navigationContainerRef]);

  return children;
});
