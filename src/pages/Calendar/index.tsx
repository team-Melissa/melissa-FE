import { useEffect } from "react";
import Button from "@/src/components/ui/Button";
import Loading from "@/src/components/ui/Loading";
import { useIsNewUserContext } from "@/src/contexts/IsNewUserProvider";
import useRegisterSetting from "@/src/hooks/useRegisterSetting";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function CalendarPage(): JSX.Element {
  const isNewUser = useIsNewUserContext();
  const { isPending, isError, error, mutate } = useRegisterSetting();

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
        <SafeAreaView>
          <Text>앱 초기 로딩 중 에러가 발생했어요.</Text>
          <Text>{error.response?.data.message}</Text>
          <Button color="white" textColor="black" fontFamily="nsRegular" onPress={() => mutate()}>
            다시 로딩하기
          </Button>
        </SafeAreaView>
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
