import React, { useState, useEffect } from 'react';
import {
  INITIAL_PROFILE,
  INITIAL_QUESTS,
  INITIAL_SHOP_ITEMS,
  INITIAL_LEADERBOARD,
  INITIAL_ACHIEVEMENTS,
  LOGO_URL
} from './data/initialData';
import { Quest, AdventurerProfile, ShopItem, Achievement } from './types/quest';
import { soundManager } from './utils/audio';
import { ConfettiCanvas } from './components/ConfettiCanvas';
import { MysteryBoxModal } from './components/MysteryBoxModal';
import { NewQuestModal } from './components/NewQuestModal';
import { NotificationDrawer } from './components/NotificationDrawer';
import { LevelUpModal } from './components/LevelUpModal';
import { HomeView } from './views/HomeView';
import { QuestsView } from './views/QuestsView';
import { RanksView } from './views/RanksView';
import { ProfileView } from './views/ProfileView';

type TabType = 'home' | 'quests' | 'ranks' | 'profile';

export default function App() {
  // Load persistent state or fall back to initial data
  const [profile, setProfile] = useState<AdventurerProfile>(() => {
    try {
      const saved = localStorage.getItem('habitquest_profile_v1');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_PROFILE;
  });

  const [quests, setQuests] = useState<Quest[]>(() => {
    try {
      const saved = localStorage.getItem('habitquest_quests_v1');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_QUESTS;
  });

  const [shopItems, setShopItems] = useState<ShopItem[]>(() => {
    try {
      const saved = localStorage.getItem('habitquest_shop_v1');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_SHOP_ITEMS;
  });

  const [achievements] = useState<Achievement[]>(INITIAL_ACHIEVEMENTS);
  const [activeTab, setActiveTab] = useState<TabType>('home');

  // Modals & Drawers
  const [isMysteryBoxOpen, setIsMysteryBoxOpen] = useState(false);
  const [isNewQuestModalOpen, setIsNewQuestModalOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isMuted, setIsMuted] = useState(() => soundManager.getIsMuted());

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('habitquest_profile_v1', JSON.stringify(profile));
    } catch {
      // silent
    }
  }, [profile]);

  useEffect(() => {
    try {
      localStorage.setItem('habitquest_quests_v1', JSON.stringify(quests));
    } catch {
      // silent
    }
  }, [quests]);

  useEffect(() => {
    try {
      localStorage.setItem('habitquest_shop_v1', JSON.stringify(shopItems));
    } catch {
      // silent
    }
  }, [shopItems]);

  // Handle quest completion toggle
  const handleToggleQuest = (questId: string) => {
    setQuests((prev) =>
      prev.map((q) => {
        if (q.id === questId) {
          const willComplete = !q.completed;
          if (willComplete) {
            soundManager.playQuestComplete();
            // Award XP & Coins
            const addedXp = q.xpReward * (profile.multiplier || 1);
            const addedCoins = q.coinReward;

            setProfile((prevProf) => {
              const newXp = prevProf.currentXp + addedXp;
              const newCoins = prevProf.coins + addedCoins;
              const earnedToday = prevProf.earnedCoinsToday + addedCoins;

              // Level up check
              if (newXp >= prevProf.nextLevelXp) {
                soundManager.playLevelUp();
                setShowConfetti(true);
                setIsLevelUpModalOpen(true);
                return {
                  ...prevProf,
                  level: prevProf.level + 1,
                  currentXp: newXp - prevProf.nextLevelXp,
                  nextLevelXp: Math.round(prevProf.nextLevelXp * 1.25),
                  coins: newCoins + 100,
                  gems: prevProf.gems + 25,
                  earnedCoinsToday: earnedToday
                };
              }

              return {
                ...prevProf,
                currentXp: newXp,
                coins: newCoins,
                earnedCoinsToday: earnedToday
              };
            });
          } else {
            // Deduct XP and Coins if unchecked
            setProfile((prevProf) => ({
              ...prevProf,
              currentXp: Math.max(0, prevProf.currentXp - q.xpReward * (profile.multiplier || 1)),
              coins: Math.max(0, prevProf.coins - q.coinReward),
              earnedCoinsToday: Math.max(0, prevProf.earnedCoinsToday - q.coinReward)
            }));
          }

          return {
            ...q,
            completed: willComplete,
            completedAt: willComplete ? new Date().toISOString() : undefined
          };
        }
        return q;
      })
    );
  };

  // Water vial count adjustment
  const handleUpdateWater = (increment: boolean) => {
    setQuests((prev) =>
      prev.map((q) => {
        if (q.id === 'quest-3' && q.waterCounter) {
          const nextVal = increment
            ? Math.min(q.waterCounter.max, q.waterCounter.current + 1)
            : Math.max(0, q.waterCounter.current - 1);
          const completed = nextVal >= q.waterCounter.max;
          soundManager.playCoinClink();
          return {
            ...q,
            completed,
            waterCounter: {
              ...q.waterCounter,
              current: nextVal
            }
          };
        }
        return q;
      })
    );
  };

  // Mystery Box claim handler
  const handleClaimMysteryBox = (reward: { coins: number; gems: number; item: string; xp: number }) => {
    setShowConfetti(true);
    setProfile((prev) => {
      const nextXp = prev.currentXp + reward.xp;
      const willLevelUp = nextXp >= prev.nextLevelXp;
      if (willLevelUp) {
        setIsLevelUpModalOpen(true);
      }
      return {
        ...prev,
        coins: prev.coins + reward.coins,
        gems: prev.gems + reward.gems,
        currentXp: willLevelUp ? nextXp - prev.nextLevelXp : nextXp,
        level: willLevelUp ? prev.level + 1 : prev.level,
        nextLevelXp: willLevelUp ? Math.round(prev.nextLevelXp * 1.25) : prev.nextLevelXp,
        mysteryBoxClaimedToday: true,
        earnedCoinsToday: prev.earnedCoinsToday + reward.coins
      };
    });
  };

  // Shop purchase handler
  const handleBuyItem = (item: ShopItem) => {
    if (item.currency === 'coins') {
      if (profile.coins < item.cost) return;
      soundManager.playCoinClink();
      setProfile((prev) => ({ ...prev, coins: prev.coins - item.cost }));
    } else {
      if (profile.gems < item.cost) return;
      soundManager.playCoinClink();
      setProfile((prev) => ({ ...prev, gems: prev.gems - item.cost }));
    }

    setShopItems((prev) =>
      prev.map((i) => (i.id === item.id ? { ...i, ownedCount: i.ownedCount + 1 } : i))
    );
  };

  // Sound mute toggle
  const handleToggleMute = () => {
    const nextVal = !isMuted;
    setIsMuted(nextVal);
    soundManager.setMuted(nextVal);
  };

  // Get view subtitle for header
  const getSubTitle = () => {
    switch (activeTab) {
      case 'home':
        return 'Dashboard';
      case 'quests':
        return 'Codex & Raids';
      case 'ranks':
        return 'Arena & Leagues';
      case 'profile':
        return 'Adventurer Sheet';
    }
  };

  return (
    <div className="bg-[#13131a] text-[#e4e1ec] min-h-screen flex flex-col font-['Outfit'] selection:bg-[#b76dff] selection:text-[#400071]">
      {/* Visual celebration particles */}
      <ConfettiCanvas trigger={showConfetti} onDone={() => setShowConfetti(false)} />

      {/* Global Top Header (Exact layout from HTML) */}
      <header className="fixed top-0 w-full z-40 pt-safe bg-[#13131a]/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.4)] border-b border-white/[0.04]">
        <div className="h-16 px-4 max-w-[680px] mx-auto flex items-center justify-between">
          {/* Logo & Title */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => {
              setActiveTab('home');
              soundManager.playClick();
            }}
          >
            <img
              alt="HabitQuest Logo"
              className="h-8 w-auto object-contain"
              src={LOGO_URL}
            />
            <div className="flex flex-col">
              <span className="text-[18px] font-bold tracking-tight text-[#e4e1ec] flex items-center gap-1.5 leading-tight">
                HabitQuest
              </span>
              <span className="text-[10px] text-[#4edea3] uppercase tracking-wider font-semibold leading-tight">
                {getSubTitle()}
              </span>
            </div>
          </div>

          {/* Action triggers */}
          <div className="flex items-center gap-2">
            {/* Audio Quick Mute */}
            <button
              aria-label="Toggle Sound"
              onClick={handleToggleMute}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-[#1f1f26] hover:bg-[#2a2931] text-[#cfc2d6] transition-colors cursor-pointer"
              title={isMuted ? 'Unmute sounds' : 'Mute sounds'}
            >
              <span className="material-symbols-outlined text-[18px]">
                {isMuted ? 'volume_off' : 'volume_up'}
              </span>
            </button>

            {/* Notification Bell */}
            <button
              aria-label="Notifications"
              onClick={() => {
                setIsNotificationsOpen(true);
                soundManager.playClick();
              }}
              className="relative w-10 h-10 flex items-center justify-center rounded-full bg-[#1f1f26] hover:bg-[#2a2931] text-[#cfc2d6] transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">notifications</span>
              <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#4edea3] shadow-[0_0_8px_rgba(78,222,163,0.8)]" />
            </button>

            {/* Profile Avatar with Neon Gradient Ring */}
            <div
              onClick={() => {
                setActiveTab('profile');
                soundManager.playClick();
              }}
              className="relative p-0.5 rounded-full bg-gradient-to-tr from-[#b76dff] to-[#4edea3] shadow-[0_0_10px_rgba(183,109,255,0.3)] cursor-pointer hover:scale-105 transition-transform"
            >
              <img
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover block"
                src={profile.avatarUrl}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative w-full pt-16 pb-24 px-4 max-w-[680px] mx-auto mt-2">
        {activeTab === 'home' && (
          <HomeView
            profile={profile}
            quests={quests}
            onToggleQuest={handleToggleQuest}
            onOpenMysteryBox={() => setIsMysteryBoxOpen(true)}
            onOpenNewQuestModal={() => setIsNewQuestModalOpen(true)}
            onUpdateWater={handleUpdateWater}
          />
        )}

        {activeTab === 'quests' && (
          <QuestsView
            profile={profile}
            quests={quests}
            onToggleQuest={handleToggleQuest}
            onOpenNewQuestModal={() => setIsNewQuestModalOpen(true)}
          />
        )}

        {activeTab === 'ranks' && (
          <RanksView profile={profile} leaderboard={INITIAL_LEADERBOARD} />
        )}

        {activeTab === 'profile' && (
          <ProfileView
            profile={profile}
            shopItems={shopItems}
            achievements={achievements}
            onBuyItem={handleBuyItem}
            onChangeTitle={(t) => setProfile((prev) => ({ ...prev, title: t }))}
          />
        )}
      </main>

      {/* Fixed Bottom Navigation Bar (Exact styling from HTML) */}
      <nav className="fixed bottom-0 w-full z-40 pb-safe bg-[#0e0e15]/95 backdrop-blur-xl shadow-[0_-4px_20px_rgba(0,0,0,0.5)] border-t border-white/[0.05]">
        <div className="flex justify-around items-center h-20 px-4 max-w-[680px] mx-auto">
          {/* HOME TAB */}
          <button
            onClick={() => {
              setActiveTab('home');
              soundManager.playClick();
            }}
            className={`flex flex-col items-center justify-center gap-1 w-16 h-14 rounded-xl transition-all duration-200 group cursor-pointer ${
              activeTab === 'home'
                ? 'text-[#4edea3] bg-[#2a2931]/80 shadow-[0_0_16px_rgba(78,222,163,0.35)]'
                : 'text-[#cfc2d6] hover:text-[#e4e1ec]'
            }`}
          >
            <span className="material-symbols-outlined text-[22px] transition-transform group-hover:scale-110">
              sports_esports
            </span>
            <span className="text-[10px] uppercase tracking-wider font-bold">
              Home
            </span>
          </button>

          {/* QUESTS TAB */}
          <button
            onClick={() => {
              setActiveTab('quests');
              soundManager.playClick();
            }}
            className={`flex flex-col items-center justify-center gap-1 w-16 h-14 rounded-xl transition-all duration-200 group cursor-pointer ${
              activeTab === 'quests'
                ? 'text-[#4edea3] bg-[#2a2931]/80 shadow-[0_0_16px_rgba(78,222,163,0.35)]'
                : 'text-[#cfc2d6] hover:text-[#e4e1ec]'
            }`}
          >
            <span className="material-symbols-outlined text-[22px] transition-transform group-hover:scale-110">
              insights
            </span>
            <span className="text-[10px] uppercase tracking-wider font-bold">
              Quests
            </span>
          </button>

          {/* RANKS TAB */}
          <button
            onClick={() => {
              setActiveTab('ranks');
              soundManager.playClick();
            }}
            className={`flex flex-col items-center justify-center gap-1 w-16 h-14 rounded-xl transition-all duration-200 group cursor-pointer ${
              activeTab === 'ranks'
                ? 'text-[#4edea3] bg-[#2a2931]/80 shadow-[0_0_16px_rgba(78,222,163,0.35)]'
                : 'text-[#cfc2d6] hover:text-[#e4e1ec]'
            }`}
          >
            <span className="material-symbols-outlined text-[22px] transition-transform group-hover:scale-110">
              military_tech
            </span>
            <span className="text-[10px] uppercase tracking-wider font-bold">
              Ranks
            </span>
          </button>

          {/* PROFILE TAB */}
          <button
            onClick={() => {
              setActiveTab('profile');
              soundManager.playClick();
            }}
            className={`flex flex-col items-center justify-center gap-1 w-16 h-14 rounded-xl transition-all duration-200 group cursor-pointer ${
              activeTab === 'profile'
                ? 'text-[#4edea3] bg-[#2a2931]/80 shadow-[0_0_16px_rgba(78,222,163,0.35)]'
                : 'text-[#cfc2d6] hover:text-[#e4e1ec]'
            }`}
          >
            <span className="material-symbols-outlined text-[22px] transition-transform group-hover:scale-110">
              person
            </span>
            <span className="text-[10px] uppercase tracking-wider font-bold">
              Profile
            </span>
          </button>
        </div>
      </nav>

      {/* Interactive Modals */}
      <MysteryBoxModal
        isOpen={isMysteryBoxOpen}
        onClose={() => setIsMysteryBoxOpen(false)}
        onClaim={handleClaimMysteryBox}
        alreadyClaimed={profile.mysteryBoxClaimedToday}
      />

      <NewQuestModal
        isOpen={isNewQuestModalOpen}
        onClose={() => setIsNewQuestModalOpen(false)}
        onAddQuest={(newQ) => setQuests((prev) => [newQ, ...prev])}
      />

      <NotificationDrawer
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
      />

      <LevelUpModal
        isOpen={isLevelUpModalOpen}
        level={profile.level}
        onClose={() => setIsLevelUpModalOpen(false)}
      />
    </div>
  );
}
