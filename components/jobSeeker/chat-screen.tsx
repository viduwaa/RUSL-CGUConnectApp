import { LinearGradient } from "expo-linear-gradient";
import {
    ArrowLeft,
    Camera,
    Image as ImageIcon,
    Mic,
    MoreVertical,
    Paperclip,
    Phone,
    Send,
    Smile,
    Video,
} from "lucide-react-native";
import React, { useRef, useState } from "react";
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// User data type
export interface ChatUser {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
  lastSeen?: string;
}

// Message type
interface Message {
  id: string;
  text: string;
  time: string;
  isMe: boolean;
  status?: "sent" | "delivered" | "read";
}

// User data mapping
const usersData: Record<string, ChatUser> = {
  "1": {
    id: "1",
    name: "Dr. Nimal Perera",
    avatar:
      "https://api.dicebear.com/7.x/avataaars/png?seed=nimal&backgroundColor=b6e3f4",
    isOnline: true,
  },
  "2": {
    id: "2",
    name: "Kamal Jayasinghe",
    avatar:
      "https://api.dicebear.com/7.x/avataaars/png?seed=kamal&backgroundColor=ffd5dc",
    isOnline: true,
  },
  "3": {
    id: "3",
    name: "Sithara Fernando",
    avatar:
      "https://api.dicebear.com/7.x/avataaars/png?seed=sithara&backgroundColor=c0aede",
    isOnline: false,
    lastSeen: "2 hours ago",
  },
  "4": {
    id: "4",
    name: "CGUConnect Support",
    avatar:
      "https://api.dicebear.com/7.x/initials/png?seed=CGU&backgroundColor=8B2635",
    isOnline: true,
  },
  "5": {
    id: "5",
    name: "Amali Wickramasinghe",
    avatar:
      "https://api.dicebear.com/7.x/avataaars/png?seed=amali&backgroundColor=d1d4f9",
    isOnline: false,
    lastSeen: "5 hours ago",
  },
  "6": {
    id: "6",
    name: "Ruwan Bandara",
    avatar:
      "https://api.dicebear.com/7.x/avataaars/png?seed=ruwan&backgroundColor=ffeaa7",
    isOnline: false,
    lastSeen: "1 day ago",
  },
  "7": {
    id: "7",
    name: "Dilini Rajapaksa",
    avatar:
      "https://api.dicebear.com/7.x/avataaars/png?seed=dilini&backgroundColor=fab1a0",
    isOnline: true,
  },
};

// Sample messages for each conversation
const messagesData: Record<string, Message[]> = {
  "1": [
    {
      id: "1",
      text: "Good morning Dr. Perera! I wanted to ask about the upcoming career workshop.",
      time: "9:30 AM",
      isMe: true,
      status: "read",
    },
    {
      id: "2",
      text: "Good morning! Yes, the workshop is scheduled for next Friday.",
      time: "9:32 AM",
      isMe: false,
    },
    {
      id: "3",
      text: "That sounds great! What topics will be covered?",
      time: "9:33 AM",
      isMe: true,
      status: "read",
    },
    {
      id: "4",
      text: "We'll cover resume writing, interview skills, and networking strategies.",
      time: "9:35 AM",
      isMe: false,
    },
    {
      id: "5",
      text: "Can you share the registration link?",
      time: "9:36 AM",
      isMe: true,
      status: "read",
    },
    {
      id: "6",
      text: "Sure, I will share the workshop details with you shortly.",
      time: "9:38 AM",
      isMe: false,
    },
  ],
  "2": [
    {
      id: "1",
      text: "Hi Kamal, I saw your profile on CGUConnect. Your experience in software development is impressive!",
      time: "Yesterday",
      isMe: true,
      status: "read",
    },
    {
      id: "2",
      text: "Thank you! I noticed you're looking for opportunities in the tech industry.",
      time: "Yesterday",
      isMe: false,
    },
    {
      id: "3",
      text: "Yes, I'm actively searching. Do you have any tips?",
      time: "Yesterday",
      isMe: true,
      status: "read",
    },
    {
      id: "4",
      text: "Actually, my company is hiring. Would you be interested in an interview?",
      time: "Yesterday",
      isMe: false,
    },
    {
      id: "5",
      text: "Absolutely! That would be amazing.",
      time: "10:15 AM",
      isMe: true,
      status: "read",
    },
    {
      id: "6",
      text: "Great! Looking forward to the interview next week.",
      time: "10:20 AM",
      isMe: false,
    },
  ],
  "3": [
    {
      id: "1",
      text: "Hello Sithara, I found your profile through the alumni network.",
      time: "2 hours ago",
      isMe: true,
      status: "read",
    },
    {
      id: "2",
      text: "Thanks for connecting! How can I help you?",
      time: "1 hour ago",
      isMe: false,
    },
  ],
  "4": [
    {
      id: "1",
      text: "Welcome to CGUConnect! 👋",
      time: "3 hours ago",
      isMe: false,
    },
    {
      id: "2",
      text: "Thank you! I just completed my profile setup.",
      time: "3 hours ago",
      isMe: true,
      status: "read",
    },
    {
      id: "3",
      text: "Your profile has been verified successfully! 🎉",
      time: "3 hours ago",
      isMe: false,
    },
  ],
  "5": [
    {
      id: "1",
      text: "Hi Amali, are you working on the final year project?",
      time: "5 hours ago",
      isMe: false,
    },
    {
      id: "2",
      text: "Yes, I'm currently documenting it.",
      time: "5 hours ago",
      isMe: true,
      status: "read",
    },
    {
      id: "3",
      text: "Can you share the project documentation?",
      time: "5 hours ago",
      isMe: false,
    },
  ],
  "6": [
    {
      id: "1",
      text: "Hey, don't forget about the team meeting tomorrow.",
      time: "1 day ago",
      isMe: false,
    },
    {
      id: "2",
      text: "What time is it scheduled?",
      time: "1 day ago",
      isMe: true,
      status: "read",
    },
    {
      id: "3",
      text: "The meeting is scheduled for tomorrow at 10 AM.",
      time: "1 day ago",
      isMe: false,
    },
  ],
  "7": [
    {
      id: "1",
      text: "I referred you for the position at my company!",
      time: "2 days ago",
      isMe: false,
    },
    {
      id: "2",
      text: "Thank you so much Dilini! I really appreciate it.",
      time: "2 days ago",
      isMe: true,
      status: "read",
    },
    {
      id: "3",
      text: "Thank you for the referral!",
      time: "2 days ago",
      isMe: false,
    },
  ],
};

// Message Bubble Component
interface MessageBubbleProps {
  message: Message;
}

const MessageBubble = ({ message }: MessageBubbleProps) => (
  <View
    className={`max-w-[80%] mb-3 ${message.isMe ? "self-end" : "self-start"}`}
  >
    <View
      className={`px-4 py-3 rounded-2xl ${
        message.isMe ? "rounded-br-md bg-[#8B2635]" : "rounded-bl-md bg-white"
      }`}
      style={
        !message.isMe
          ? {
              shadowColor: "#000",
              shadowOpacity: 0.05,
              shadowRadius: 4,
              elevation: 2,
            }
          : {}
      }
    >
      <Text
        className={`text-[15px] leading-5 ${
          message.isMe ? "text-white" : "text-gray-800"
        }`}
      >
        {message.text}
      </Text>
    </View>
    <View
      className={`flex-row items-center mt-1 gap-1 ${
        message.isMe ? "justify-end" : "justify-start"
      }`}
    >
      <Text className="text-xs text-gray-400">{message.time}</Text>
    </View>
  </View>
);

// Props for ChatScreen
interface ChatScreenProps {
  conversationId: string;
  onBack: () => void;
}

export default function ChatScreen({
  conversationId,
  onBack,
}: ChatScreenProps) {
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState<Message[]>(
    messagesData[conversationId] || [],
  );
  const scrollViewRef = useRef<ScrollView>(null);

  const user = usersData[conversationId] || usersData["1"];

  const handleSend = () => {
    if (messageText.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: messageText.trim(),
        time: "Just now",
        isMe: true,
        status: "sent",
      };
      setMessages([...messages, newMessage]);
      setMessageText("");
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  return (
    <View className="flex-1 bg-gray-100 absolute inset-0 z-50">
      <StatusBar barStyle="light-content" backgroundColor="#8B2635" />

      {/* Header */}
      <LinearGradient colors={["#8B2635", "#7D1F2E"]} className="pb-3">
        <SafeAreaView edges={["top"]} className="px-4">
          <View className="flex-row items-center justify-between pt-2">
            <View className="flex-row items-center flex-1">
              <TouchableOpacity className="p-2 -ml-2" onPress={onBack}>
                <ArrowLeft size={24} color="#fff" />
              </TouchableOpacity>

              <TouchableOpacity className="flex-row items-center flex-1 ml-1">
                <View className="relative">
                  <Image
                    source={{ uri: user.avatar }}
                    className="w-10 h-10 rounded-full"
                  />
                  {user.isOnline && (
                    <View className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-[#8B2635]" />
                  )}
                </View>
                <View className="ml-3 flex-1">
                  <Text
                    className="text-base font-semibold text-white"
                    numberOfLines={1}
                  >
                    {user.name}
                  </Text>
                  <Text className="text-xs text-white/70">
                    {user.isOnline ? "Online" : user.lastSeen || "Offline"}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            <View className="flex-row items-center gap-1">
              <TouchableOpacity className="p-2">
                <Phone size={20} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity className="p-2">
                <Video size={20} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity className="p-2">
                <MoreVertical size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>

      {/* Messages */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
        keyboardVerticalOffset={0}
      >
        <ScrollView
          ref={scrollViewRef}
          className="flex-1 px-4 pt-4"
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() =>
            scrollViewRef.current?.scrollToEnd({ animated: false })
          }
        >
          {/* Date Separator */}
          <View className="items-center mb-4">
            <View className="bg-white/80 px-4 py-1.5 rounded-full">
              <Text className="text-xs text-gray-500">Today</Text>
            </View>
          </View>

          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}

          <View className="h-4" />
        </ScrollView>

        {/* Input Area */}
        <View className="bg-white border-t border-gray-200 px-4 py-3">
          <SafeAreaView edges={["bottom"]}>
            <View className="flex-row items-end gap-2">
              <View className="flex-row items-center gap-1">
                <TouchableOpacity className="p-2">
                  <Camera size={22} color="#8B2635" />
                </TouchableOpacity>
                <TouchableOpacity className="p-2">
                  <ImageIcon size={22} color="#8B2635" />
                </TouchableOpacity>
                <TouchableOpacity className="p-2">
                  <Paperclip size={22} color="#8B2635" />
                </TouchableOpacity>
              </View>

              <View className="flex-1 flex-row items-end bg-gray-100 rounded-2xl px-4 py-2">
                <TextInput
                  className="flex-1 text-base text-gray-800 max-h-24"
                  placeholder="Type a message..."
                  placeholderTextColor="#999"
                  value={messageText}
                  onChangeText={setMessageText}
                  multiline
                />
                <TouchableOpacity className="ml-2 mb-0.5">
                  <Smile size={22} color="#999" />
                </TouchableOpacity>
              </View>

              {messageText.trim() ? (
                <TouchableOpacity
                  className="w-11 h-11 rounded-full items-center justify-center"
                  style={{ backgroundColor: "#8B2635" }}
                  onPress={handleSend}
                >
                  <Send size={20} color="#fff" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  className="w-11 h-11 rounded-full items-center justify-center"
                  style={{ backgroundColor: "#8B2635" }}
                >
                  <Mic size={20} color="#fff" />
                </TouchableOpacity>
              )}
            </View>
          </SafeAreaView>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
