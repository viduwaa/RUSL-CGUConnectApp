import { AvatarPicker } from "@/components/ui/avatar-picker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft, Lock, Mail, ShieldCheck, User } from "lucide-react-native";
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

export default function RegisterScreen() {
  const colorScheme = useColorScheme() ?? "light";
  const isDark = colorScheme === "dark";
  const router = useRouter();
  const { role } = useLocalSearchParams<{ role?: string }>();

  const [avatarUri, setAvatarUri] = useState<string | null>(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    // TODO: Implement actual registration logic
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

  const isFormValid =
    fullName &&
    email &&
    password &&
    confirmPassword &&
    password === confirmPassword;

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
            className="mb-6"
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
              Create Account
            </Text>
            <Text
              className={`text-base ${isDark ? "text-slate-400" : "text-slate-500"}`}
            >
              Join the CGU Connect community
            </Text>
          </Animated.View>

          {/* Avatar Section */}
          <Animated.View
            entering={FadeInDown.delay(300).duration(500)}
            className="items-center mb-6"
          >
            <View
              className={`p-4 rounded-3xl ${isDark ? "bg-surface-card" : "bg-white"}`}
              style={{
                shadowColor: "#14b8a6",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 12,
                elevation: 4,
              }}
            >
              <AvatarPicker
                uri={avatarUri}
                onImageSelected={setAvatarUri}
                size={100}
              />
            </View>
            <Text
              className={`mt-3 text-sm font-medium ${isDark ? "text-slate-400" : "text-slate-500"}`}
            >
              Add profile photo
            </Text>
          </Animated.View>

          {/* Form Card */}
          <Animated.View
            entering={FadeInUp.delay(400).duration(500)}
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
              label="Full Name"
              value={fullName}
              onChangeText={setFullName}
              placeholder="Enter your full name"
              autoComplete="name"
              leftIcon={
                <User size={20} color={isDark ? "#64748b" : "#94a3b8"} />
              }
            />

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
              placeholder="Create a strong password"
              secureTextEntry
              autoComplete="new-password"
              leftIcon={
                <Lock size={20} color={isDark ? "#64748b" : "#94a3b8"} />
              }
            />

            <Input
              label="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Confirm your password"
              secureTextEntry
              autoComplete="new-password"
              leftIcon={
                <ShieldCheck size={20} color={isDark ? "#64748b" : "#94a3b8"} />
              }
              error={
                confirmPassword && password !== confirmPassword
                  ? "Passwords do not match"
                  : undefined
              }
            />
          </Animated.View>

          {/* Action Buttons */}
          <Animated.View
            entering={FadeInUp.delay(500).duration(500)}
            className="gap-5 pb-8"
          >
            <Button
              title="Create Account"
              onPress={handleRegister}
              loading={loading}
              disabled={!isFormValid}
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

            {/* Login Link */}
            <View className="flex-row items-center justify-center gap-1">
              <Text
                className={`text-sm ${isDark ? "text-slate-400" : "text-slate-500"}`}
              >
                Already have an account?
              </Text>
              <Link
                href={{ pathname: "/(auth)/login", params: { role } }}
                asChild
              >
                <Pressable>
                  <Text className="text-primary-500 text-sm font-bold">
                    Sign In
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
