import { Quest, AdventurerProfile, ShopItem, Achievement, LeaderboardCompetitor } from '../types/quest';

export const INITIAL_PROFILE: AdventurerProfile = {
  name: 'Aiden Shadowalker',
  title: 'Level 12 Adventurer',
  level: 12,
  currentXp: 2840,
  nextLevelXp: 3500,
  gems: 420,
  coins: 1850,
  streakDays: 18,
  multiplier: 2,
  isVerified: true,
  avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDNamtFQ9dQwbpaGe4Cfl2dPf0a_G2gwyeuTLvX6nWb6O55s-FoYCAcyqxG6UWz52jr8OM2lwwFFhEZI9RYiuqoWn5q5r8mB3RkWv2EPA3yOyUUThOZed_NgbFC1-IOQwy-zBu7B86_weja289hK50dmO8S1z_eqDcCaKl8YHr4vVIIsN0rTedI0-b_b7myDJ-0zIRkulPUmntlue74vnaSMbG0bv5fs0XdQjqKKhGESSnBcUIw1uVKjg',
  earnedCoinsToday: 150,
  mysteryBoxClaimedToday: false,
  attributes: {
    agility: 14,
    wisdom: 11,
    vitality: 15,
    focus: 13,
    discipline: 16
  }
};

export const LOGO_URL = 'https://lh3.googleusercontent.com/aida/AEtjO1XWf4ilLDTJn1zNflaqRBh-kAHQHK_fm0qBImdl-nKBmXfqXmrWENQ45zlNskMwdJSWBGc5FRr3Qk5q42pYpSq19SHC84S57f9aKGJaODCBpFPu4cb2jMoXqwO2s8m3SL9Nbs1N9h8waT8p0lkPXIN0QLSskZUYPDpkMRu7gLH19XXWq7UfDt9zxNWUcTBRKMvi_fgU2AcWlYb0A7pUdliW4dzH-Ftn-guTTDDmIA2x9F_OD5bMV9bmlF7k';

export const INITIAL_QUESTS: Quest[] = [
  {
    id: 'quest-1',
    title: '30 Min Morning Run',
    category: 'Agility',
    categoryLabel: '🏃 Agility',
    categoryEmoji: '🏃',
    categoryIcon: 'directions_run',
    subtitle: '07:15 AM • 4.2 km conquered',
    xpReward: 80,
    coinReward: 50,
    completed: true,
    isCoreQuest: true
  },
  {
    id: 'quest-2',
    title: 'Read 10 Pages',
    category: 'Wisdom',
    categoryLabel: '🧠 Wisdom',
    categoryEmoji: '🧠',
    categoryIcon: 'auto_stories',
    subtitle: 'Atomic Habits (Ch. 4 completed)',
    xpReward: 60,
    coinReward: 30,
    completed: true,
    isCoreQuest: true
  },
  {
    id: 'quest-3',
    title: 'Drink 2L Water',
    category: 'Vitality',
    categoryLabel: '💧 Vitality',
    categoryEmoji: '💧',
    categoryIcon: 'water_drop',
    subtitle: '8 of 8 elixir vials logged',
    xpReward: 40,
    coinReward: 20,
    completed: true,
    isCoreQuest: true,
    waterCounter: {
      current: 8,
      max: 8
    }
  },
  {
    id: 'quest-4',
    title: 'Deep Work: 45 Min Coding',
    category: 'Focus Quest',
    categoryLabel: '⚔️ Focus Quest',
    categoryEmoji: '⚔️',
    categoryIcon: 'terminal',
    subtitle: 'Streak at risk • Due before 11:59 PM',
    xpReward: 120,
    coinReward: 70,
    completed: false,
    isCoreQuest: true,
    isStreakAtRisk: true
  },
  {
    id: 'quest-5',
    title: 'Digital Wind-Down 10:30 PM',
    category: 'Night Ritual',
    categoryLabel: '🌙 Night Ritual',
    categoryEmoji: '🌙',
    categoryIcon: 'bedtime',
    subtitle: 'Sleep buff (+10% XP tomorrow)',
    xpReward: 50,
    coinReward: 30,
    completed: false,
    isCoreQuest: false,
    buffDescription: 'Sleep buff (+10% XP tomorrow)'
  }
];

export const INITIAL_SHOP_ITEMS: ShopItem[] = [
  {
    id: 'item-freeze',
    name: 'Phoenix Feather',
    type: 'consumable',
    icon: 'local_fire_department',
    description: 'Freezes your streak for 1 day if you miss a quest deadline.',
    cost: 300,
    currency: 'coins',
    rarity: 'Rare',
    ownedCount: 2
  },
  {
    id: 'item-xp-boost',
    name: 'Elixir of Double XP',
    type: 'buff',
    icon: 'science',
    description: 'Doubles all quest XP rewards gained for the next 4 hours.',
    cost: 200,
    currency: 'coins',
    rarity: 'Rare',
    ownedCount: 1
  },
  {
    id: 'item-chest-vault',
    name: 'Mythic Relic Chest',
    type: 'chest',
    icon: 'inventory_2',
    description: 'Unlocks rare avatar cosmetics, 400+ coins, and mystery gems.',
    cost: 50,
    currency: 'gems',
    rarity: 'Epic',
    ownedCount: 0
  },
  {
    id: 'item-neon-cloak',
    name: 'Cloak of Deep Focus',
    type: 'cosmetic',
    icon: 'shield',
    description: 'Legendary armory relic providing +20% Focus quest XP bonuses.',
    cost: 750,
    currency: 'coins',
    rarity: 'Legendary',
    ownedCount: 1
  },
  {
    id: 'item-water-goblet',
    name: 'Amulet of Pure Hydration',
    type: 'cosmetic',
    icon: 'water',
    description: 'Ancient artifact granting +15 bonus coins on Vitality quests.',
    cost: 450,
    currency: 'coins',
    rarity: 'Epic',
    ownedCount: 0
  }
];

export const INITIAL_LEADERBOARD: LeaderboardCompetitor[] = [
  {
    rank: 1,
    id: 'comp-1',
    name: 'Valkyrie_Nova',
    title: 'Rank 15 Grand Paladin',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    level: 15,
    weeklyXp: 3420,
    streak: 34,
    tierChange: 'up'
  },
  {
    rank: 2,
    id: 'comp-2',
    name: 'Kaelen_Frost',
    title: 'Rank 14 Frost Mage',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    level: 14,
    weeklyXp: 3150,
    streak: 22,
    tierChange: 'up'
  },
  {
    rank: 3,
    id: 'comp-3',
    name: 'Zephyr_Code',
    title: 'Rank 13 Cyber Sage',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80',
    level: 13,
    weeklyXp: 2990,
    streak: 19,
    tierChange: 'up'
  },
  {
    rank: 4,
    id: 'comp-user',
    name: 'Aiden Shadowalker',
    title: 'Level 12 Adventurer',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDNamtFQ9dQwbpaGe4Cfl2dPf0a_G2gwyeuTLvX6nWb6O55s-FoYCAcyqxG6UWz52jr8OM2lwwFFhEZI9RYiuqoWn5q5r8mB3RkWv2EPA3yOyUUThOZed_NgbFC1-IOQwy-zBu7B86_weja289hK50dmO8S1z_eqDcCaKl8YHr4vVIIsN0rTedI0-b_b7myDJ-0zIRkulPUmntlue74vnaSMbG0bv5fs0XdQjqKKhGESSnBcUIw1uVKjg',
    level: 12,
    weeklyXp: 2840,
    streak: 18,
    isUser: true,
    tierChange: 'same'
  },
  {
    rank: 5,
    id: 'comp-5',
    name: 'Seraphina_W',
    title: 'Rank 12 Vitality Druid',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
    level: 12,
    weeklyXp: 2680,
    streak: 14,
    tierChange: 'same'
  },
  {
    rank: 6,
    id: 'comp-6',
    name: 'Ronin_Dev',
    title: 'Rank 11 Shadow Blade',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    level: 11,
    weeklyXp: 2410,
    streak: 9,
    tierChange: 'down'
  },
  {
    rank: 7,
    id: 'comp-7',
    name: 'Aurelia_Sun',
    title: 'Rank 10 Sun Cleric',
    avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&auto=format&fit=crop&q=80',
    level: 10,
    weeklyXp: 2190,
    streak: 12,
    tierChange: 'down'
  }
];

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'ach-streak-14',
    title: 'Fortitude of Fire',
    description: 'Maintain an unbroken daily quest streak for 14 consecutive days.',
    icon: 'local_fire_department',
    unlocked: true,
    progress: 18,
    maxProgress: 14,
    reward: '+100 💎 Gems'
  },
  {
    id: 'ach-water-sage',
    title: 'Vitality Spring',
    description: 'Log 2 liters of water daily for 7 days in a row.',
    icon: 'water_drop',
    unlocked: true,
    progress: 7,
    maxProgress: 7,
    reward: '+250 🪙 Coins'
  },
  {
    id: 'ach-focus-beast',
    title: 'Hyperfocus Master',
    description: 'Complete 25 Deep Work coding sessions.',
    icon: 'terminal',
    unlocked: false,
    progress: 19,
    maxProgress: 25,
    reward: '+150 💎 Gems'
  },
  {
    id: 'ach-early-bird',
    title: 'Dawn Sprinter',
    description: 'Finish a morning run quest before 07:30 AM 10 times.',
    icon: 'directions_run',
    unlocked: true,
    progress: 10,
    maxProgress: 10,
    reward: '+300 🪙 Coins'
  },
  {
    id: 'ach-wisdom-reader',
    title: 'Archivist of Knowledge',
    description: 'Read over 500 pages of wisdom or educational literature.',
    icon: 'auto_stories',
    unlocked: false,
    progress: 340,
    maxProgress: 500,
    reward: '+200 💎 Gems'
  },
  {
    id: 'ach-titan-slayer',
    title: 'Behemoth Subduer',
    description: 'Deal over 1,000 total damage to the weekly Procrastination World Boss.',
    icon: 'swords',
    unlocked: false,
    progress: 650,
    maxProgress: 1000,
    reward: '+500 🪙 Coins'
  }
];
