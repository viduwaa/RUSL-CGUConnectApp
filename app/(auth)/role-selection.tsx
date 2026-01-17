import { useColorScheme } from "@/hooks/use-color-scheme";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Building2, ChevronRight, GraduationCap } from "lucide-react-native";
import { Pressable, ScrollView, Text, View } from "react-native";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const roles = [
  {
    id: "jobseeker",
    label: "Job Seeker",
    icon: GraduationCap,
    description: "Find jobs, internships, and career opportunities",
    gradientColors: ["#14b8a6", "#0d9488"] as const,
  },
  {
    id: "employer",
    label: "Employer",
    icon: Building2,
    description: "Post jobs and find talented graduates",
    gradientColors: ["#8b5cf6", "#7c3aed"] as const,
  },
];

export default function RoleSelectionScreen() {
  const colorScheme = useColorScheme() ?? "light";
  const isDark = colorScheme === "dark";
  const router = useRouter();

  const handleRoleSelect = (roleId: string) => {
    router.push({ pathname: "/(auth)/login", params: { role: roleId } });
  };

  return (
    <SafeAreaView
      className={`flex-1 ${isDark ? "bg-surface-dark" : "bg-slate-50"}`}
    >
      <ScrollView
        contentContainerStyle={{ padding: 24, paddingTop: 48 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <Animated.View entering={FadeInDown.delay(100).duration(500)}>
          <Text
            className={`text-sm font-semibold tracking-widest uppercase mb-2 ${isDark ? "text-primary-400" : "text-primary-600"}`}
          >
            CGU Connect
          </Text>
          <Text
            className={`text-3xl font-bold mb-3 ${isDark ? "text-white" : "text-slate-900"}`}
          >
            Choose Your Role
          </Text>
          <Text
            className={`text-base leading-relaxed mb-10 ${isDark ? "text-slate-400" : "text-slate-500"}`}
          >
            Select how you want to use the app. You can always change this later
            in settings.
          </Text>
        </Animated.View>

        {/* Role Cards */}
        <View className="gap-5">
          {roles.map((role, index) => {
            const IconComponent = role.icon;
            return (
              <Animated.View
                key={role.id}
                entering={FadeInUp.delay(300 + index * 150).duration(500)}
              >
                <Pressable
                  onPress={() => handleRoleSelect(role.id)}
                  className="active:scale-[0.98] active:opacity-90"
                >
                  <View
                    className={`rounded-3xl overflow-hidden ${isDark ? "bg-surface-card" : "bg-white"}`}
                    style={{
                      shadowColor: role.gradientColors[0],
                      shadowOffset: { width: 0, height: 8 },
                      shadowOpacity: isDark ? 0.3 : 0.15,
                      shadowRadius: 16,
                      elevation: 8,
                    }}
                  >
                    {/* Top gradient accent */}
                    <LinearGradient
                      colors={[...role.gradientColors]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      className="h-1"
                    />

                    <View className="p-6">
                      <View className="flex-row items-start gap-4">
                        {/* Icon container with gradient */}
                        <LinearGradient
                          colors={[...role.gradientColors]}
                          start={{ x: 0, y: 0 }}
                          end={{ x: 1, y: 1 }}
                          className="w-16 h-16 rounded-2xl items-center justify-center"
                        >
                          <IconComponent size={32} color="#fff" />
                        </LinearGradient>

                        <View className="flex-1">
                          <Text
                            className={`text-xl font-bold mb-1 ${isDark ? "text-white" : "text-slate-900"}`}
                          >
                            {role.label}
                          </Text>
                          <Text
                            className={`text-sm leading-relaxed ${isDark ? "text-slate-400" : "text-slate-500"}`}
                          >
                            {role.description}
                          </Text>
                        </View>

                        {/* Arrow indicator */}
                        <View
                          className={`w-10 h-10 rounded-xl items-center justify-center ${isDark ? "bg-slate-700" : "bg-slate-100"}`}
                        >
                          <ChevronRight
                            size={20}
                            color={isDark ? "#94a3b8" : "#64748b"}
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                </Pressable>
              </Animated.View>
            );
          })}
        </View>

        {/* Footer text */}
        <Animated.View
          entering={FadeInUp.delay(700).duration(500)}
          className="mt-10 items-center"
        >
          <Text
            className={`text-sm text-center ${isDark ? "text-slate-500" : "text-slate-400"}`}
          >
            By continuing, you agree to our{" "}
            <Text className="text-primary-500">Terms of Service</Text> and{" "}
            <Text className="text-primary-500">Privacy Policy</Text>
          </Text>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}
