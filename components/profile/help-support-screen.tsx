import {
    ChevronRight,
    HelpCircle,
    Mail,
    MessageCircle,
    Phone,
    Star,
} from "lucide-react-native";
import React, { useState } from "react";
import {
    Alert,
    Linking,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    View,
} from "react-native";

interface HelpSupportScreenProps {
  onBack: () => void;
}

// FAQ Data
const faqData = [
  {
    id: "1",
    question: "How do I apply for a job?",
    answer:
      "Browse jobs in the Jobs tab, tap on a job card to view details, and click the 'Apply for Job' button at the bottom. Your profile will be shared with the employer.",
  },
  {
    id: "2",
    question: "How can I save jobs for later?",
    answer:
      "Tap the bookmark icon on any job card to save it. You can access all saved jobs from your Profile > Saved Jobs section.",
  },
  {
    id: "3",
    question: "How do I update my profile?",
    answer:
      "Go to Profile > Personal Information to update your details, skills, education, and experience. Keep your profile updated for better job matches.",
  },
  {
    id: "4",
    question: "Can I track my job applications?",
    answer:
      "Yes! Go to Profile > Application History to see all your submitted applications and their current status (pending, reviewing, interview, offered).",
  },
  {
    id: "5",
    question: "How do notifications work?",
    answer:
      "You'll receive notifications for job recommendations, application updates, and messages. Customize your preferences in Profile > Notification Preferences.",
  },
];

export const HelpSupportScreen = ({ onBack }: HelpSupportScreenProps) => {
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);
  const [feedbackText, setFeedbackText] = useState("");

  const handleContactEmail = () => {
    Linking.openURL("mailto:support@cguconnect.com?subject=Support Request");
  };

  const handleContactPhone = () => {
    Linking.openURL("tel:+94112345678");
  };

  const handleSubmitFeedback = () => {
    if (!feedbackText.trim()) {
      Alert.alert("Error", "Please enter your feedback");
      return;
    }
    Alert.alert(
      "Thank You!",
      "Your feedback has been submitted. We appreciate your input!",
      [
        {
          text: "OK",
          onPress: () => setFeedbackText(""),
        },
      ],
    );
  };

  const handleRateApp = () => {
    Alert.alert(
      "Rate CGUConnect",
      "Would you like to rate our app on the store?",
      [
        { text: "Not Now", style: "cancel" },
        { text: "Rate Now", onPress: () => console.log("Opening store") },
      ],
    );
  };

  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Contact Options */}
        <Text className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
          Contact Us
        </Text>
        <View className="bg-white rounded-2xl border border-gray-100 mb-6">
          <Pressable
            onPress={handleContactEmail}
            className="flex-row items-center p-4 border-b border-gray-100"
          >
            <View
              className="w-10 h-10 rounded-xl items-center justify-center mr-3"
              style={{ backgroundColor: "rgba(139, 38, 53, 0.1)" }}
            >
              <Mail size={20} color="#8B2635" />
            </View>
            <View className="flex-1">
              <Text className="text-base font-medium text-gray-900">Email</Text>
              <Text className="text-sm text-gray-500 mt-0.5">
                support@cguconnect.com
              </Text>
            </View>
            <ChevronRight size={20} color="#9ca3af" />
          </Pressable>

          <Pressable
            onPress={handleContactPhone}
            className="flex-row items-center p-4 border-b border-gray-100"
          >
            <View
              className="w-10 h-10 rounded-xl items-center justify-center mr-3"
              style={{ backgroundColor: "rgba(139, 38, 53, 0.1)" }}
            >
              <Phone size={20} color="#8B2635" />
            </View>
            <View className="flex-1">
              <Text className="text-base font-medium text-gray-900">Phone</Text>
              <Text className="text-sm text-gray-500 mt-0.5">
                +94 11 234 5678
              </Text>
            </View>
            <ChevronRight size={20} color="#9ca3af" />
          </Pressable>

          <Pressable
            onPress={() =>
              Alert.alert(
                "Live Chat",
                "Live chat is available Mon-Fri, 9AM-5PM",
              )
            }
            className="flex-row items-center p-4"
          >
            <View
              className="w-10 h-10 rounded-xl items-center justify-center mr-3"
              style={{ backgroundColor: "rgba(139, 38, 53, 0.1)" }}
            >
              <MessageCircle size={20} color="#8B2635" />
            </View>
            <View className="flex-1">
              <Text className="text-base font-medium text-gray-900">
                Live Chat
              </Text>
              <Text className="text-sm text-gray-500 mt-0.5">
                Chat with our support team
              </Text>
            </View>
            <ChevronRight size={20} color="#9ca3af" />
          </Pressable>
        </View>

        {/* FAQs */}
        <Text className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
          Frequently Asked Questions
        </Text>
        <View className="bg-white rounded-2xl border border-gray-100 mb-6">
          {faqData.map((faq, index) => (
            <View
              key={faq.id}
              className={
                index < faqData.length - 1 ? "border-b border-gray-100" : ""
              }
            >
              <Pressable
                onPress={() =>
                  setExpandedFaq(expandedFaq === faq.id ? null : faq.id)
                }
                className="flex-row items-center p-4"
              >
                <View
                  className="w-10 h-10 rounded-xl items-center justify-center mr-3"
                  style={{ backgroundColor: "rgba(139, 38, 53, 0.1)" }}
                >
                  <HelpCircle size={20} color="#8B2635" />
                </View>
                <View className="flex-1">
                  <Text className="text-base font-medium text-gray-900">
                    {faq.question}
                  </Text>
                </View>
                <ChevronRight
                  size={20}
                  color="#9ca3af"
                  style={{
                    transform: [
                      { rotate: expandedFaq === faq.id ? "90deg" : "0deg" },
                    ],
                  }}
                />
              </Pressable>
              {expandedFaq === faq.id && (
                <View className="px-4 pb-4 pt-0 ml-13">
                  <Text className="text-sm text-gray-600 leading-5 ml-13 pl-1">
                    {faq.answer}
                  </Text>
                </View>
              )}
            </View>
          ))}
        </View>

        {/* Feedback */}
        <Text className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
          Send Feedback
        </Text>
        <View className="bg-white rounded-2xl border border-gray-100 p-4 mb-6">
          <TextInput
            className="text-base text-gray-900 min-h-[100px] p-0"
            placeholder="Tell us how we can improve..."
            placeholderTextColor="#9ca3af"
            multiline
            value={feedbackText}
            onChangeText={setFeedbackText}
            textAlignVertical="top"
          />
          <Pressable
            onPress={handleSubmitFeedback}
            className="mt-3 py-3 rounded-xl items-center"
            style={{ backgroundColor: "#8B2635" }}
          >
            <Text className="text-white font-semibold">Submit Feedback</Text>
          </Pressable>
        </View>

        {/* Rate App */}
        <Pressable
          onPress={handleRateApp}
          className="bg-white rounded-2xl border border-gray-100 p-4 flex-row items-center mb-6"
        >
          <View
            className="w-12 h-12 rounded-full items-center justify-center mr-3"
            style={{ backgroundColor: "rgba(245, 158, 11, 0.1)" }}
          >
            <Star size={24} color="#f59e0b" fill="#f59e0b" />
          </View>
          <View className="flex-1">
            <Text className="text-base font-semibold text-gray-900">
              Enjoying CGUConnect?
            </Text>
            <Text className="text-sm text-gray-500 mt-0.5">
              Rate us on the app store!
            </Text>
          </View>
          <ChevronRight size={20} color="#9ca3af" />
        </Pressable>

        {/* Legal Links */}
        <View className="flex-row justify-center gap-4 mb-6">
          <Pressable
            onPress={() => Alert.alert("Terms of Service", "Terms content...")}
          >
            <Text className="text-sm text-gray-500 underline">
              Terms of Service
            </Text>
          </Pressable>
          <Text className="text-gray-300">|</Text>
          <Pressable
            onPress={() => Alert.alert("Privacy Policy", "Privacy content...")}
          >
            <Text className="text-sm text-gray-500 underline">
              Privacy Policy
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

export default HelpSupportScreen;
