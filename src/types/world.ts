export type WorldUser = {
  walletAddress?: string;
  username?: string;
  profilePictureUrl?: string;
  permissions?: {
    notifications: boolean;
    contacts: boolean;
  };
  optedIntoOptionalAnalytics?: boolean;
  worldAppVersion?: number;
  deviceOS?: string;
};

export interface WorldContact {
  walletAddress: string;
  username?: string;
  profilePictureUrl?: string;
} 