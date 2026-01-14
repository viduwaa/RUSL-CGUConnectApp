import { View, Text, ScrollView, KeyboardAvoidingView, Platform, Pressable } from 'react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useRouter, useLocalSearchParams, Link } from 'expo-router';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AvatarPicker } from '@/components/ui/avatar-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useState } from 'react';
import { ArrowLeft } from 'lucide-react-native';

export default function RegisterScreen() {
    const colorScheme = useColorScheme() ?? 'light';
    const isDark = colorScheme === 'dark';
    const router = useRouter();
    const { role } = useLocalSearchParams<{ role?: string }>();

    const [avatarUri, setAvatarUri] = useState<string | null>(null);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
        setLoading(true);
        // TODO: Implement actual registration logic
        setTimeout(() => {
            setLoading(false);
            router.replace('/(tabs)');
        }, 1500);
    };

    const isFormValid = fullName && email && password && confirmPassword && password === confirmPassword;

    return (
        <SafeAreaView className={`flex-1 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1"
            >
                <ScrollView
                    contentContainerStyle={{ padding: 24, paddingTop: 16 }}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    <Animated.View entering={FadeInDown.delay(100).duration(500)}>
                        <Pressable onPress={() => router.back()} className="self-start mb-6">
                            <ArrowLeft size={24} color={isDark ? '#fff' : '#111'} />
                        </Pressable>
                    </Animated.View>

                    <Animated.View entering={FadeInDown.delay(200).duration(500)}>
                        <Text className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            Create Account
                        </Text>
                        <Text className={`text-base mb-8 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            Register as {role || 'user'}
                        </Text>
                    </Animated.View>

                    <Animated.View entering={FadeInDown.delay(300).duration(500)} className="items-center mb-8">
                        <AvatarPicker uri={avatarUri} onImageSelected={setAvatarUri} size={100} />
                        <Text className={`mt-3 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            Tap to add profile photo
                        </Text>
                    </Animated.View>

                    <Animated.View entering={FadeInDown.delay(400).duration(500)} className="mb-6">
                        <Input
                            label="Full Name"
                            value={fullName}
                            onChangeText={setFullName}
                            placeholder="Enter your full name"
                            autoComplete="name"
                        />

                        <Input
                            label="Email"
                            value={email}
                            onChangeText={setEmail}
                            placeholder="Enter your email"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoComplete="email"
                        />

                        <Input
                            label="Password"
                            value={password}
                            onChangeText={setPassword}
                            placeholder="Create a password"
                            secureTextEntry
                            autoComplete="new-password"
                        />

                        <Input
                            label="Confirm Password"
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            placeholder="Confirm your password"
                            secureTextEntry
                            autoComplete="new-password"
                            error={confirmPassword && password !== confirmPassword ? 'Passwords do not match' : undefined}
                        />
                    </Animated.View>

                    <Animated.View entering={FadeInDown.delay(500).duration(500)} className="gap-4 pb-8">
                        <Button
                            title="Create Account"
                            onPress={handleRegister}
                            loading={loading}
                            disabled={!isFormValid}
                        />

                        <View className="flex-row items-center justify-center gap-1">
                            <Text className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                Already have an account?
                            </Text>
                            <Link href={{ pathname: '/(auth)/login', params: { role } }} asChild>
                                <Pressable>
                                    <Text className="text-cyan-600 text-sm font-semibold">Sign In</Text>
                                </Pressable>
                            </Link>
                        </View>
                    </Animated.View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
