import { View, Text, ScrollView, KeyboardAvoidingView, Platform, Pressable } from 'react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useRouter, useLocalSearchParams, Link } from 'expo-router';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useState } from 'react';
import { ArrowLeft } from 'lucide-react-native';

export default function LoginScreen() {
    const colorScheme = useColorScheme() ?? 'light';
    const isDark = colorScheme === 'dark';
    const router = useRouter();
    const { role } = useLocalSearchParams<{ role?: string }>();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        setLoading(true);
        // TODO: Implement actual login logic
        setTimeout(() => {
            setLoading(false);
            router.replace('/(tabs)');
        }, 1500);
    };

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
                            Welcome back
                        </Text>
                        <Text className={`text-base mb-10 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            Sign in to continue as {role || 'user'}
                        </Text>
                    </Animated.View>

                    <Animated.View entering={FadeInDown.delay(300).duration(500)} className="mb-6">
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
                            placeholder="Enter your password"
                            secureTextEntry
                            autoComplete="password"
                        />

                        <Pressable className="self-end">
                            <Text className="text-cyan-600 text-sm font-medium">Forgot Password?</Text>
                        </Pressable>
                    </Animated.View>

                    <Animated.View entering={FadeInDown.delay(400).duration(500)} className="gap-4">
                        <Button
                            title="Sign In"
                            onPress={handleLogin}
                            loading={loading}
                            disabled={!email || !password}
                        />

                        <View className="flex-row items-center justify-center gap-1">
                            <Text className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                Don't have an account?
                            </Text>
                            <Link href={{ pathname: '/(auth)/register', params: { role } }} asChild>
                                <Pressable>
                                    <Text className="text-cyan-600 text-sm font-semibold">Register</Text>
                                </Pressable>
                            </Link>
                        </View>
                    </Animated.View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
