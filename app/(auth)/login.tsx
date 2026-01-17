import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft, Lock, Mail } from "lucide-react-native";
import { useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    Text,
    View,
} from "react-native";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  const colorScheme = useColorScheme() ?? "light";
  const isDark = colorScheme === "dark";
  const router = useRouter();
  const { role } = useLocalSearchParams<{ role?: string }>();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    // TODO: Implement actual login logic
    setTimeout(() => {
      setLoading(false);
      // Navigate based on role selection
      if (role === "employer") {
        router.replace("/(employer)" as any);
      } else {
        router.replace("/(jobSeeker)" as any);
      }
    }, 1500);
  };

  const getRoleInfo = () => {
    if (role === "employer") {
      return { label: "Employer", color: "#8b5cf6" };
    }
    return { label: "Job Seeker", color: "#14b8a6" };
  };

  const roleInfo = getRoleInfo();

  return (
    <SafeAreaView
      className={`flex-1 ${isDark ? "bg-surface-dark" : "bg-slate-50"}`}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ padding: 24, paddingTop: 8 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header with back button */}
          <Animated.View entering={FadeInDown.delay(100).duration(400)}>
            <Pressable
              onPress={() => router.back()}
              className={`self-start mb-6 p-2 rounded-xl ${isDark ? "bg-slate-800" : "bg-white"}`}
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.05,
                shadowRadius: 4,
                elevation: 2,
              }}
            >
              <ArrowLeft size={22} color={isDark ? "#fff" : "#334155"} />
            </Pressable>
          </Animated.View>

          {/* Title Section */}
          <Animated.View
            entering={FadeInDown.delay(200).duration(500)}
            className="mb-8"
          >
            <View
              className="self-start px-3 py-1.5 rounded-full mb-4"
              style={{ backgroundColor: `${roleInfo.color}20` }}
            >
              <Text
                style={{ color: roleInfo.color }}
                className="text-xs font-semibold"
              >
                {roleInfo.label} Account
              </Text>
            </View>
            <Text
              className={`text-3xl font-bold mb-2 ${isDark ? "text-white" : "text-slate-900"}`}
            >
              Welcome Back
            </Text>
            <Text
              className={`text-base ${isDark ? "text-slate-400" : "text-slate-500"}`}
            >
              Sign in to continue your journey
            </Text>
          </Animated.View>

          {/* Form Card */}
          <Animated.View
            entering={FadeInUp.delay(300).duration(500)}
            className={`rounded-3xl p-6 mb-6 ${isDark ? "bg-surface-card" : "bg-white"}`}
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: isDark ? 0.3 : 0.08,
              shadowRadius: 16,
              elevation: 8,
            }}
          >
            <Input
              label="Email Address"
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              leftIcon={
                <Mail size={20} color={isDark ? "#64748b" : "#94a3b8"} />
              }
            />

            <Input
              label="Password"
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              secureTextEntry
              autoComplete="password"
              leftIcon={
                <Lock size={20} color={isDark ? "#64748b" : "#94a3b8"} />
              }
            />

            <Pressable className="self-end mb-2">
              <Text className="text-primary-500 text-sm font-semibold">
                Forgot Password?
              </Text>
            </Pressable>
          </Animated.View>

          {/* Action Buttons */}
          <Animated.View
            entering={FadeInUp.delay(400).duration(500)}
            className="gap-5"
          >
            <Button
              title="Sign In"
              onPress={handleLogin}
              loading={loading}
              disabled={!email || !password}
            />

            {/* Divider */}
            <View className="flex-row items-center gap-4 my-2">
              <View
                className={`flex-1 h-px ${isDark ? "bg-slate-700" : "bg-slate-200"}`}
              />
              <Text
                className={`text-xs ${isDark ? "text-slate-500" : "text-slate-400"}`}
              >
                OR
              </Text>
              <View
                className={`flex-1 h-px ${isDark ? "bg-slate-700" : "bg-slate-200"}`}
              />
            </View>

            {/* Register Link */}
            <View className="flex-row items-center justify-center gap-1">
              <Text
                className={`text-sm ${isDark ? "text-slate-400" : "text-slate-500"}`}
              >
                Don't have an account?
              </Text>
              <Link
                href={{ pathname: "/(auth)/register", params: { role } }}
                asChild
              >
                <Pressable>
                  <Text className="text-primary-500 text-sm font-bold">
                    Create Account
                  </Text>
                </Pressable>
              </Link>
            </View>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
