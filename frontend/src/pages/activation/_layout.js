import { router, Stack, useNavigation } from "expo-router";
import { useEffect } from "react";
import { useBackHandler } from "@/hooks/useBackHandler";

export default function ActivationLayout() {
  const navigation = useNavigation();

  // use back navigationt to go back to the previous screen
  useBackHandler(() => {
    router.back();
    return true;
  });

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  return <Stack />;
}
