import { Pressable, Text, ActivityIndicator, View } from 'react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';

interface ButtonProps {
    title: string;
    onPress: () => void;
    variant?: ButtonVariant;
    disabled?: boolean;
    loading?: boolean;
    className?: string;
    textClassName?: string;
}

export function Button({
    title,
    onPress,
    variant = 'primary',
    disabled = false,
    loading = false,
    className = '',
    textClassName = '',
}: ButtonProps) {
    const colorScheme = useColorScheme() ?? 'light';
    const isDark = colorScheme === 'dark';

    const getVariantClasses = () => {
        switch (variant) {
            case 'primary':
                return {
                    container: 'bg-cyan-600',
                    text: isDark ? 'text-black' : 'text-white',
                };
            case 'secondary':
                return {
                    container: isDark ? 'bg-gray-700' : 'bg-gray-200',
                    text: isDark ? 'text-white' : 'text-gray-900',
                };
            case 'outline':
                return {
                    container: 'bg-transparent border-2 border-cyan-600',
                    text: 'text-cyan-600',
                };
            case 'ghost':
                return {
                    container: 'bg-transparent',
                    text: 'text-cyan-600',
                };
            default:
                return {
                    container: 'bg-cyan-600',
                    text: 'text-white',
                };
        }
    };

    const variantClasses = getVariantClasses();

    return (
        <Pressable
            onPress={onPress}
            disabled={disabled || loading}
            className={`py-4 px-6 rounded-xl items-center justify-center min-h-[56px] active:opacity-80 active:scale-[0.98] ${variantClasses.container} ${disabled ? 'opacity-50' : ''} ${className}`}
        >
            {loading ? (
                <ActivityIndicator color={variant === 'primary' ? '#fff' : '#0891b2'} />
            ) : (
                <Text className={`text-base font-semibold ${variantClasses.text} ${textClassName}`}>
                    {title}
                </Text>
            )}
        </Pressable>
    );
}
