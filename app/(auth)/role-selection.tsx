import { View, Text, ScrollView, Pressable } from 'react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useRouter } from 'expo-router';
import { Button } from '@/components/ui/button';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { GraduationCap, Building2, User } from 'lucide-react-native';

const roles = [
    { id: 'jobseeker', label: 'Job Seeker', icon: GraduationCap, description: 'Find jobs and internships' },
    { id: 'employer', label: 'Employer', icon: Building2, description: 'Post job opportunities' },
];

export default function RoleSelectionScreen() {
    const colorScheme = useColorScheme() ?? 'light';
    const isDark = colorScheme === 'dark';
    const router = useRouter();

    const handleRoleSelect = (roleId: string) => {
        router.push({ pathname: '/(auth)/login', params: { role: roleId } });
    };

    return (
        <SafeAreaView className={`flex-1 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
            <ScrollView
                contentContainerStyle={{ padding: 24, paddingTop: 48 }}
                showsVerticalScrollIndicator={false}
            >
                <Animated.View entering={FadeInDown.delay(100).duration(500)}>
                    <Text className={`text-[28px] font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        Welcome to CGU Connect
                    </Text>
                    <Text className={`text-base mb-10 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        Select how you want to continue
                    </Text>
                </Animated.View>

                <View className="gap-4">
                    {roles.map((role, index) => {
                        const IconComponent = role.icon;
                        return (
                            <Animated.View
                                key={role.id}
                                entering={FadeInDown.delay(200 + index * 100).duration(500)}
                            >
                                <View
                                    className={`p-5 rounded-2xl border flex-row items-center gap-4 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
                                        }`}
                                >
                                    <View className="w-14 h-14 rounded-2xl bg-cyan-600/20 items-center justify-center">
                                        <IconComponent size={32} color="#0891b2" />
                                    </View>
                                    <View className="flex-1">
                                        <Text className={`text-lg font-semibold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                            {role.label}
                                        </Text>
                                        <Text className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                            {role.description}
                                        </Text>
                                    </View>
                                    <Button
                                        title="Continue"
                                        onPress={() => handleRoleSelect(role.id)}
                                        variant="outline"
                                        className="py-2.5 px-4 min-h-[40px]"
                                    />
                                </View>
                            </Animated.View>
                        );
                    })}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
