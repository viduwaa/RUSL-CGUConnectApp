// User and notification related types

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: string;
  phone?: string;
  location?: string;
  bio?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "job" | "message" | "system";
  timestamp: string;
  isRead: boolean;
  actionUrl?: string;
}

export interface MenuItem {
  id: string;
  title: string;
  subtitle?: string;
  icon: string;
  route?: string;
  action?: () => void;
  showChevron?: boolean;
  destructive?: boolean;
}

export interface MenuSection {
  id: string;
  title?: string;
  items: MenuItem[];
}
