import { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs";
import { PlatformPressable } from "@react-navigation/elements";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";

export function HapticTab(props: BottomTabBarButtonProps) {
  const router = useRouter();

  const handlePress = (ev: any) => {
    // Add haptic feedback on iOS
    if (process.env.EXPO_OS === "ios") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    // Get the route name from the accessibilityLabel or children
    const routeName = props.accessibilityLabel?.toLowerCase();

    // Navigate to the root of the tab based on the tab name
    if (routeName?.includes("home")) {
      router.replace("/(jobSeeker)" as any);
    } else if (routeName?.includes("jobs")) {
      router.replace("/(jobSeeker)/jobs" as any);
    } else if (routeName?.includes("messages")) {
      router.replace("/(jobSeeker)/messages" as any);
    } else {
      // Fallback to default behavior
      props.onPress?.(ev);
    }
  };

  return (
    <PlatformPressable
      {...props}
      onPressIn={(ev) => {
        if (process.env.EXPO_OS === "ios") {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
        props.onPressIn?.(ev);
      }}
      onPress={handlePress}
    />
  );
}
