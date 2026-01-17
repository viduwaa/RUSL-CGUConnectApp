import { useColorScheme } from "@/hooks/use-color-scheme";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
    FadeIn,
    FadeInUp,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withTiming,
} from "react-native-reanimated";

export default function WelcomeScreen() {
  const colorScheme = useColorScheme() ?? "light";
  const isDark = colorScheme === "dark";
  const router = useRouter();

  // Pulse animation for the "tap to continue" text
  const opacity = useSharedValue(0.5);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1000 }),
        withTiming(0.5, { duration: 1000 }),
      ),
      -1,
      false,
    );
  }, []);

  const pulseStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const handleContinue = () => {
    router.push({ pathname: "/role-selection" } as any);
  };

  return (
    <Pressable onPress={handleContinue} className="flex-1">
      <LinearGradient
        colors={
          isDark
            ? ["#0f172a", "#134e4a", "#0f172a"]
            : ["#f0fdfa", "#ccfbf1", "#f0fdfa"]
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="flex-1 justify-center items-center"
      >
        {/* Decorative circles */}
        <View
          className="absolute top-[-100px] right-[-100px] w-[300px] h-[300px] rounded-full opacity-20"
          style={{ backgroundColor: "#14b8a6" }}
        />
        <View
          className="absolute bottom-[-150px] left-[-100px] w-[350px] h-[350px] rounded-full opacity-10"
          style={{ backgroundColor: "#0d9488" }}
        />

        <View className="items-center flex-1 justify-center w-4/5">
          {/* Logo with enhanced styling */}
          <Animated.View
            className="items-center mb-8"
            entering={FadeIn.delay(400).duration(800)}
          >
            <View
              className="p-6 rounded-3xl"
              style={{
                backgroundColor: isDark
                  ? "rgba(20, 184, 166, 0.1)"
                  : "rgba(20, 184, 166, 0.05)",
                shadowColor: "#14b8a6",
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.3,
                shadowRadius: 16,
                elevation: 12,
              }}
            >
              <Image
                source={require("../../assets/logos/rajarata-logo.png")}
                style={{ width: 160, height: 160 }}
                contentFit="contain"
              />
            </View>
          </Animated.View>

          {/* Title */}
          <Animated.Text
            entering={FadeInUp.delay(700).duration(600)}
            className={`font-SourceSans3Bold text-3xl text-center font-bold mb-3 ${isDark ? "text-white" : "text-slate-900"}`}
          >
            Rajarata University{"\n"}of Sri Lanka
          </Animated.Text>

          {/* Subtitle with gradient accent */}
          <Animated.View
            entering={FadeInUp.delay(900).duration(600)}
            className="items-center"
          >
            <View className="h-1 w-16 rounded-full bg-primary-500 mb-4" />
            <Text
              className={`font-SourceSans3Medium text-xl ${isDark ? "text-primary-300" : "text-primary-600"}`}
            >
              Career Guidance Unit
            </Text>
          </Animated.View>
        </View>

        {/* Bottom indicator with pulse animation */}
        <Animated.View
          entering={FadeIn.delay(1200).duration(600)}
          style={[pulseStyle]}
          className="absolute bottom-16 items-center"
        >
          <View className="flex-row items-center gap-2">
            <View
              className={`w-2 h-2 rounded-full ${isDark ? "bg-primary-400" : "bg-primary-500"}`}
            />
            <Text
              className={`text-sm font-medium ${isDark ? "text-slate-400" : "text-slate-500"}`}
            >
              Tap anywhere to continue
            </Text>
            <View
              className={`w-2 h-2 rounded-full ${isDark ? "bg-primary-400" : "bg-primary-500"}`}
            />
          </View>
        </Animated.View>
      </LinearGradient>
    </Pressable>
  );
}
