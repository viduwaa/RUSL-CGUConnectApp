import type { Notification, User } from "@/types/user";

export const mockUser: User = {
  id: "user-001",
  name: "Tharusha Sandaruwan",
  email: "tharusha.sandaruwan@example.com",
  role: "Software Engineer",
  phone: "+94 77 123 4567",
  location: "Colombo, Sri Lanka",
  bio: "Passionate software engineer with 3+ years of experience in mobile and web development. Looking for exciting opportunities in tech.",
  avatar:
    "https://api.dicebear.com/7.x/avataaars/png?seed=tharusha&backgroundColor=b6e3f4",
};

export const mockNotifications: Notification[] = [
  {
    id: "notif-001",
    title: "Application Viewed",
    message:
      "TechVentures Lanka viewed your application for Full Stack Software Engineer position.",
    type: "job",
    timestamp: "2 hours ago",
    isRead: false,
    actionUrl: "/job-details?id=2",
  },
  {
    id: "notif-002",
    title: "New Message",
    message:
      "You have a new message from HR at Swis Group Holdings regarding your application.",
    type: "message",
    timestamp: "5 hours ago",
    isRead: false,
    actionUrl: "/messages",
  },
  {
    id: "notif-003",
    title: "Job Recommendation",
    message:
      "Based on your profile, we found 5 new jobs that match your skills.",
    type: "system",
    timestamp: "1 day ago",
    isRead: false,
    actionUrl: "/jobs",
  },
  {
    id: "notif-004",
    title: "Interview Scheduled",
    message:
      "Your interview with BrandCraft Agency has been scheduled for Jan 20, 2026 at 10:00 AM.",
    type: "job",
    timestamp: "2 days ago",
    isRead: true,
    actionUrl: "/job-details?id=3",
  },
  {
    id: "notif-005",
    title: "Profile Update Reminder",
    message: "Keep your profile updated to get better job recommendations.",
    type: "system",
    timestamp: "3 days ago",
    isRead: true,
  },
  {
    id: "notif-006",
    title: "Application Submitted",
    message:
      "Your application for Senior Management Accountant at Swis Group Holdings was successfully submitted.",
    type: "job",
    timestamp: "4 days ago",
    isRead: true,
    actionUrl: "/job-details?id=1",
  },
  {
    id: "notif-007",
    title: "Welcome to CGUConnect!",
    message:
      "Thank you for joining CGUConnect. Complete your profile to start applying for jobs.",
    type: "system",
    timestamp: "1 week ago",
    isRead: true,
  },
];
