import { useEffect } from "react";
import Loading from "@/src/components/ui/Loading";
import CommonError from "@/src/components/ui/CommonError";
import { useIsNewUserContext } from "@/src/contexts/IsNewUserProvider";
import useRegisterSetting from "@/src/hooks/useRegisterSetting";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function CalendarPage(): JSX.Element {
  const isNewUser = useIsNewUserContext();
  const { isPending, isError, mutate } = useRegisterSetting();

  useEffect(() => {
    if (isNewUser) {
      mutate();
    }
  }, [isNewUser, mutate]);

  if (isNewUser) {
    if (isPending) {
      return <Loading />;
    }

    if (isError) {
      return (
        <CommonError
          titleText="앱 초기 로딩 중 에러가 발생했어요."
          buttonText="다시 로딩하기"
          onPress={() => mutate()}
        />
      );
    }
  }

  return (
    <SafeAreaView>
      <Text>Hello</Text>
      <Text>This Is Authed Main Page</Text>
    </SafeAreaView>
  );
}

export default CalendarPage;
