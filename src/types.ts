export interface Milestone {
  id: string;
  date: string;
  title: string;
  description: string;
  imageUrl: string;
  fallbackUrl?: string;
  tag: string;
  rotation?: string;
  accentEmoji?: string;
}

export interface PolaroidItem {
  id: string;
  title: string;
  date: string;
  imageUrl: string;
  fallbackUrl?: string;
  caption: string;
  tapeColor?: 'pink' | 'beige' | 'maroon';
  rotation: string; // e.g. "-rotate-3", "rotate-2"
  sticker?: string;
}

export interface LoveCoupon {
  id: string;
  title: string;
  subtitle: string;
  iconName: string;
  terms: string;
  code: string;
  isRedeemed: boolean;
}

export interface WishNote {
  id: string;
  author: string;
  message: string;
  date: string;
  avatar: string;
}
