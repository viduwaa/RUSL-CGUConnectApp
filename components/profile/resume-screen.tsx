import {
    Download,
    Eye,
    FileText,
    Plus,
    Share2,
    Trash2,
    Upload,
} from "lucide-react-native";
import React, { useState } from "react";
import { Alert, Pressable, ScrollView, Text, View } from "react-native";

interface ResumeScreenProps {
  onBack: () => void;
}

interface Resume {
  id: string;
  name: string;
  size: string;
  uploadDate: string;
  isDefault: boolean;
}

const mockResumes: Resume[] = [
  {
    id: "1",
    name: "Tharusha_Sandaruwan_CV.pdf",
    size: "245 KB",
    uploadDate: "Jan 10, 2026",
    isDefault: true,
  },
  {
    id: "2",
    name: "Resume_Software_Engineer.pdf",
    size: "180 KB",
    uploadDate: "Dec 15, 2025",
    isDefault: false,
  },
];

export const ResumeScreen = ({ onBack }: ResumeScreenProps) => {
  const [resumes, setResumes] = useState<Resume[]>(mockResumes);

  const handleUpload = () => {
    Alert.alert(
      "Upload Resume",
      "Choose a file to upload (PDF, DOC, DOCX supported)",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Choose File",
          onPress: () => {
            // Simulate file upload
            const newResume: Resume = {
              id: Date.now().toString(),
              name: `New_Resume_${Date.now()}.pdf`,
              size: "200 KB",
              uploadDate: "Jan 19, 2026",
              isDefault: false,
            };
            setResumes([...resumes, newResume]);
            Alert.alert("Success", "Resume uploaded successfully!");
          },
        },
      ],
    );
  };

  const handleSetDefault = (id: string) => {
    setResumes((prev) =>
      prev.map((r) => ({
        ...r,
        isDefault: r.id === id,
      })),
    );
    Alert.alert("Success", "Default resume updated!");
  };

  const handleDelete = (id: string) => {
    const resume = resumes.find((r) => r.id === id);
    Alert.alert(
      "Delete Resume",
      `Are you sure you want to delete "${resume?.name}"?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            setResumes((prev) => prev.filter((r) => r.id !== id));
          },
        },
      ],
    );
  };

  const handlePreview = (resume: Resume) => {
    Alert.alert("Preview", `Opening ${resume.name}...`);
  };

  const handleShare = (resume: Resume) => {
    Alert.alert("Share", `Sharing ${resume.name}...`);
  };

  const handleDownload = (resume: Resume) => {
    Alert.alert("Download", `Downloading ${resume.name}...`);
  };

  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Upload Button */}
        <Pressable
          onPress={handleUpload}
          className="flex-row items-center justify-center px-4 py-3 rounded-xl mb-4"
          style={{ backgroundColor: "#8B2635" }}
        >
          <Upload size={20} color="#fff" />
          <Text className="text-white font-semibold ml-2">
            Upload New Resume
          </Text>
        </Pressable>

        {/* Info Card */}
        <View className="bg-blue-50 rounded-xl p-4 mb-4">
          <Text className="text-sm text-blue-700 leading-5">
            💼 Keep your resume updated! Your default resume will be shared with
            employers when you apply for jobs.
          </Text>
        </View>

        {/* Resumes List */}
        <Text className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
          Your Resumes ({resumes.length})
        </Text>

        {resumes.map((resume) => (
          <View
            key={resume.id}
            className="bg-white rounded-2xl border mb-3 overflow-hidden"
            style={{
              borderColor: resume.isDefault ? "#8B2635" : "#e5e7eb",
            }}
          >
            {resume.isDefault && (
              <View
                className="px-3 py-1"
                style={{ backgroundColor: "#8B2635" }}
              >
                <Text className="text-xs text-white font-semibold">
                  DEFAULT RESUME
                </Text>
              </View>
            )}

            <View className="p-4">
              <View className="flex-row items-start">
                <View
                  className="w-12 h-12 rounded-xl items-center justify-center mr-3"
                  style={{ backgroundColor: "rgba(139, 38, 53, 0.1)" }}
                >
                  <FileText size={24} color="#8B2635" />
                </View>
                <View className="flex-1">
                  <Text
                    className="text-base font-medium text-gray-900"
                    numberOfLines={1}
                  >
                    {resume.name}
                  </Text>
                  <View className="flex-row items-center mt-1 gap-2">
                    <Text className="text-sm text-gray-500">{resume.size}</Text>
                    <View className="w-1 h-1 rounded-full bg-gray-300" />
                    <Text className="text-sm text-gray-500">
                      {resume.uploadDate}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Actions */}
              <View className="flex-row items-center mt-4 pt-3 border-t border-gray-100 gap-2">
                <Pressable
                  onPress={() => handlePreview(resume)}
                  className="flex-1 flex-row items-center justify-center py-2 rounded-lg bg-gray-100"
                >
                  <Eye size={16} color="#4b5563" />
                  <Text className="text-sm font-medium text-gray-700 ml-1">
                    View
                  </Text>
                </Pressable>

                <Pressable
                  onPress={() => handleDownload(resume)}
                  className="flex-1 flex-row items-center justify-center py-2 rounded-lg bg-gray-100"
                >
                  <Download size={16} color="#4b5563" />
                  <Text className="text-sm font-medium text-gray-700 ml-1">
                    Download
                  </Text>
                </Pressable>

                <Pressable
                  onPress={() => handleShare(resume)}
                  className="flex-1 flex-row items-center justify-center py-2 rounded-lg bg-gray-100"
                >
                  <Share2 size={16} color="#4b5563" />
                  <Text className="text-sm font-medium text-gray-700 ml-1">
                    Share
                  </Text>
                </Pressable>
              </View>

              {/* Bottom Actions */}
              <View className="flex-row items-center mt-3 gap-2">
                {!resume.isDefault && (
                  <Pressable
                    onPress={() => handleSetDefault(resume.id)}
                    className="flex-1 py-2.5 rounded-lg items-center"
                    style={{ backgroundColor: "rgba(139, 38, 53, 0.1)" }}
                  >
                    <Text
                      className="text-sm font-semibold"
                      style={{ color: "#8B2635" }}
                    >
                      Set as Default
                    </Text>
                  </Pressable>
                )}
                <Pressable
                  onPress={() => handleDelete(resume.id)}
                  className="px-4 py-2.5 rounded-lg items-center"
                  style={{ backgroundColor: "rgba(239, 68, 68, 0.1)" }}
                >
                  <Trash2 size={18} color="#ef4444" />
                </Pressable>
              </View>
            </View>
          </View>
        ))}

        {/* Upload New Button */}
        <Pressable
          onPress={handleUpload}
          className="bg-white rounded-2xl border-2 border-dashed border-gray-300 p-8 items-center justify-center"
        >
          <View
            className="w-16 h-16 rounded-full items-center justify-center mb-3"
            style={{ backgroundColor: "rgba(139, 38, 53, 0.1)" }}
          >
            <Plus size={32} color="#8B2635" />
          </View>
          <Text className="text-base font-semibold text-gray-900">
            Upload New Resume
          </Text>
          <Text className="text-sm text-gray-500 mt-1">
            PDF, DOC, DOCX (Max 5MB)
          </Text>
        </Pressable>
      </ScrollView>
    </View>
  );
};

export default ResumeScreen;
