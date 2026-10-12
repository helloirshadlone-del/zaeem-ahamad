export type QuestCategory =
  | 'Agility'
  | 'Wisdom'
  | 'Vitality'
  | 'Focus Quest'
  | 'Night Ritual'
  | 'Discipline';

export interface Quest {
  id: string;
  title: string;
  category: QuestCategory;
  categoryLabel: string;
  categoryEmoji: string;
  categoryIcon: string; // Material symbol icon name
  subtitle: string;
  xpReward: number;
  coinReward: number;
  completed: boolean;
  completedAt?: string;
  isCoreQuest?: boolean;
  isStreakAtRisk?: boolean;
  buffDescription?: string;
  waterCounter?: {
    current: number;
    max: number;
  };
}

export interface AdventurerProfile {
  name: string;
  title: string;
  level: number;
  currentXp: number;
  nextLevelXp: number;
  gems: number;
  coins: number;
  streakDays: number;
  multiplier: number;
  avatarUrl: string;
  isVerified: boolean;
  earnedCoinsToday: number;
  mysteryBoxClaimedToday: boolean;
  attributes: {
    agility: number;
    wisdom: number;
    vitality: number;
    focus: number;
    discipline: number;
  };
}

export interface ShopItem {
  id: string;
  name: string;
  type: 'consumable' | 'buff' | 'cosmetic' | 'chest';
  icon: string;
  description: string;
  cost: number;
  currency: 'coins' | 'gems';
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  ownedCount: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
  progress: number;
  maxProgress: number;
  reward: string;
}

export interface LeaderboardCompetitor {
  rank: number;
  id: string;
  name: string;
  title: string;
  avatarUrl: string;
  level: number;
  weeklyXp: number;
  streak: number;
  isUser?: boolean;
  tierChange: 'up' | 'down' | 'same';
}
