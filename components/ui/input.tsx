import { useState } from 'react';
import { View, TextInput, Text, TextInputProps } from 'react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface InputProps extends TextInputProps {
    label?: string;
    error?: string;
    containerClassName?: string;
}

export function Input({
    label,
    error,
    containerClassName = '',
    className = '',
    ...props
}: InputProps) {
    const colorScheme = useColorScheme() ?? 'light';
    const isDark = colorScheme === 'dark';
    const [isFocused, setIsFocused] = useState(false);

    const borderColor = error
        ? 'border-red-500'
        : isFocused
            ? 'border-cyan-600'
            : isDark
                ? 'border-gray-700'
                : 'border-gray-300';

    return (
        <View className={`mb-4 ${containerClassName}`}>
            {label && (
                <Text className={`text-sm font-medium mb-2 ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
                    {label}
                </Text>
            )}
            <TextInput
                className={`py-3.5 px-4 rounded-xl text-base border-2 ${isDark ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'
                    } ${borderColor} ${className}`}
                placeholderTextColor={isDark ? '#666' : '#999'}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                {...props}
            />
            {error && <Text className="text-red-500 text-xs mt-1">{error}</Text>}
        </View>
    );
}
