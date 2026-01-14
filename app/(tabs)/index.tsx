import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { View } from 'react-native';

export default function HomeScreen() {
  return (
    <ThemedView className="flex-1 p-5 bg-white justify-center items-center">
      <View className="items-center">
        <ThemedText type="title">Home Page</ThemedText>
        <ThemedText className="text-lg mt-2 text-gray-500">Welcome to CGUConnect!</ThemedText>
      </View>
    </ThemedView>
  );
}

