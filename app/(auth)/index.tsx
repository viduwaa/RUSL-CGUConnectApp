import { View, Text, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useRouter } from 'expo-router';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withDelay,
    withTiming,
    FadeIn,
} from 'react-native-reanimated';


export default function WelcomeScreen() {
    const colorScheme = useColorScheme() ?? 'light';
    const isDark = colorScheme === 'dark';
    const router = useRouter();

    const handleContinue = () => {
        router.push({ pathname: '/role-selection' } as any);
    };

    return (
        <Pressable
            onPress={handleContinue}
            className={`flex-1 justify-center items-center ${isDark ? 'bg-gray-900' : 'bg-white'}`}
        >
            <View className="items-center flex-1 justify-center w-3/4">
                <Animated.View className="items-center mb-6"
                    entering={FadeIn.delay(600).duration(600)}>
                    <Image
                        source={require('../../assets/logos/rajarata-logo.png')}
                        style={{ width: 192, height: 192 }} 
                        contentFit="contain"
                    />
                </Animated.View>

                <Animated.Text
                    entering={FadeIn.delay(800).duration(600)}
                    className={`font-SourceSans3Bold text-4xl text-wrap text-center font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}
                >
                    Rajarata University of Sri Lanka
                </Animated.Text>

                <Animated.Text
                    entering={FadeIn.delay(1000).duration(600)}
                    className={`font-SourceSans3Medium text-2xl ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
                >
                    Career Guidance Unit
                </Animated.Text>
            </View>

            <Animated.Text
                entering={FadeIn.delay(1400).duration(600)}
                className={`absolute bottom-16 text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}
            >
                Tap anywhere to continue
            </Animated.Text>
        </Pressable>
    );
}
