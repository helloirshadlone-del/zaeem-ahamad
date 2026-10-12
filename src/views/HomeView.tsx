import React from 'react';
import { Quest, AdventurerProfile } from '../types/quest';
import { soundManager } from '../utils/audio';

interface HomeViewProps {
  profile: AdventurerProfile;
  quests: Quest[];
  onToggleQuest: (questId: string) => void;
  onOpenMysteryBox: () => void;
  onOpenNewQuestModal: () => void;
  onUpdateWater: (increment: boolean) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  profile,
  quests,
  onToggleQuest,
  onOpenMysteryBox,
  onOpenNewQuestModal,
  onUpdateWater
}) => {
  // Compute core quests statistics
  const coreQuests = quests.filter((q) => q.isCoreQuest);
  const coreCompleted = coreQuests.filter((q) => q.completed).length;
  const totalCore = coreQuests.length || 1;
  const corePercentage = Math.round((coreCompleted / totalCore) * 100);

  // Overall quests completed
  const totalCompleted = quests.filter((q) => q.completed).length;
  const totalQuests = quests.length;

  // SVG perimeter calculations: radius = 66, perimeter = 2 * PI * 66 ~= 414.69
  const perimeter = 414.69;
  const strokeDashoffset = perimeter * (1 - corePercentage / 100);

  // XP calculation
  const xpNeeded = Math.max(0, profile.nextLevelXp - profile.currentXp);
  const xpPercent = Math.min(100, Math.round((profile.currentXp / profile.nextLevelXp) * 100));

  return (
    <div className="flex flex-col w-full pb-8 space-y-4">
      {/* Adventurer Profile & Economy Bar */}
      <section className="flex flex-col rounded-[18px] bg-[#1b1b22] p-4 shadow-lg relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-36 h-36 bg-[#b76dff]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-8 -bottom-8 w-28 h-28 bg-[#4edea3]/15 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="relative w-12 h-12 rounded-[14px] bg-[#2a2931] flex items-center justify-center shadow-[0_0_12px_rgba(183,109,255,0.25)] shrink-0">
              <span
                className="material-symbols-outlined text-[26px] text-[#ddb7ff] fill-1"
              >
                shield_person
              </span>
              <span className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-full bg-[#b76dff] text-[#400071] text-[10px] font-bold shadow-md">
                {profile.level}
              </span>
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <h2 className="text-[18px] text-[#e4e1ec] font-bold truncate">
                  {profile.name}
                </h2>
                {profile.isVerified && (
                  <span
                    className="material-symbols-outlined text-[#4edea3] text-[16px] fill-1"
                  >
                    verified
                  </span>
                )}
              </div>
              <p className="text-[10px] text-[#ddb7ff] tracking-wider uppercase font-semibold">
                {profile.title}
              </p>
            </div>
          </div>

          {/* Quick Economy Chips */}
          <div className="flex items-center gap-1.5 shrink-0">
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#2a2931] shadow-inner">
              <span className="text-[13px]">💎</span>
              <span className="text-xs text-[#e4e1ec] font-bold tracking-tight">
                {profile.gems}
              </span>
            </div>
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#2a2931] shadow-inner">
              <span className="text-[13px]">🪙</span>
              <span className="text-xs text-[#ffb95f] font-bold tracking-tight">
                {profile.coins.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* XP Gauge Cluster */}
        <div className="relative z-10 flex flex-col gap-1.5 mt-1">
          <div className="flex items-center justify-between text-[10px]">
            <span className="text-[#cfc2d6] font-medium">
              Progress to Rank {profile.level + 1}
            </span>
            <span className="text-[#4edea3] font-bold tracking-wide">
              {profile.currentXp.toLocaleString()} / {profile.nextLevelXp.toLocaleString()} XP{' '}
              <span className="text-[#cfc2d6] font-normal">
                (+{xpNeeded} to Lv.{profile.level + 1})
              </span>
            </span>
          </div>
          <div className="h-2.5 w-full bg-[#34343c] rounded-full overflow-hidden p-0.5 shadow-inner">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#b76dff] via-[#00a572] to-[#4edea3] shadow-[0_0_12px_rgba(78,222,163,0.7)] transition-all duration-700"
              style={{ width: `${xpPercent}%` }}
            />
          </div>
        </div>

        {/* Streak Multiplier Ribbon */}
        <div className="relative z-10 mt-2.5 pt-1 flex items-center justify-between bg-[#1f1f26] rounded-xl px-3 py-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#ca8100]/30 flex items-center justify-center shadow-[0_0_12px_rgba(255,185,95,0.4)]">
              <span className="text-[16px] animate-pulse">🔥</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-[#ffb95f] font-bold tracking-wide">
                {profile.streakDays} Day Streak!
              </span>
              <span className="text-[10px] text-[#cfc2d6]">
                {profile.multiplier}x Daily XP Multiplier Active
              </span>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-[#ca8100]/40 text-[#ffb95f] text-[10px] font-extrabold uppercase tracking-wider">
            Active
          </span>
        </div>
      </section>

      {/* Circular Completion Hero Hub */}
      <section className="flex flex-col items-center rounded-[18px] bg-[#1f1f26] p-5 relative overflow-hidden shadow-xl border border-white/[0.04]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#b76dff]/10 via-transparent to-[#4edea3]/5 pointer-events-none" />

        {/* Circular Progress Graphic */}
        <div className="relative w-48 h-48 my-1 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 160 160">
            <defs>
              <linearGradient id="questGradient" x1="0%" x2="100%" y1="0%" y2="100%">
                <stop offset="0%" stopColor="#b76dff" />
                <stop offset="100%" stopColor="#4edea3" />
              </linearGradient>
              <filter id="glowShadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#4edea3" floodOpacity="0.55" />
              </filter>
            </defs>
            {/* Background Track */}
            <circle
              cx="80"
              cy="80"
              r="66"
              fill="transparent"
              stroke="#2a2931"
              strokeWidth="12"
              strokeLinecap="round"
            />
            {/* Glowing Progress Value */}
            <circle
              cx="80"
              cy="80"
              r="66"
              fill="transparent"
              stroke="url(#questGradient)"
              strokeWidth="12"
              strokeDasharray={perimeter}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              filter="url(#glowShadow)"
              className="transition-all duration-1000 ease-out"
            />
          </svg>

          {/* Center Data */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-[32px] text-[#4edea3] font-extrabold leading-none drop-shadow-[0_0_12px_rgba(78,222,163,0.5)]">
              {corePercentage}%
            </span>
            <span className="text-xs text-[#e4e1ec] font-semibold mt-1">
              Conquered
            </span>
            <span className="text-[10px] text-[#cfc2d6]">
              {coreCompleted} of {totalCore} Core Quests
            </span>
          </div>
        </div>

        {/* Motivation Banner */}
        <div className="w-full bg-[#1b1b22] rounded-xl px-3.5 py-2.5 mt-2 text-center shadow-inner">
          <p className="text-xs text-[#e4e1ec] italic tracking-normal">
            “Consistency turns quiet sparks into legendary flames.”
          </p>
        </div>

        {/* Reward Milestone Pill */}
        <div className="mt-2.5 flex items-center justify-center gap-1.5 text-center px-3 py-1.5 rounded-full bg-[#2a2931] text-[#cfc2d6] text-[10px] w-full">
          <span className="text-[#ffb95f] font-bold">
            +{profile.earnedCoinsToday} 🪙 earned today
          </span>
          <span className="text-[#988d9f]">•</span>
          <span className="text-[#4edea3] font-medium">
            100% unlocks Mystery Chest
          </span>
        </div>

        {/* Mystery Box CTA */}
        <button
          onClick={() => {
            soundManager.playClick();
            onOpenMysteryBox();
          }}
          className="relative w-full mt-4 py-3 px-4 rounded-xl bg-gradient-to-r from-[#b76dff] to-[#842bd2] text-white font-bold text-lg flex items-center justify-center gap-2 shadow-[0_8px_24px_-4px_rgba(183,109,255,0.45)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-[22px] fill-1">
            redeem
          </span>
          <span>Claim Daily Mystery Box</span>
          <span className="w-2 h-2 rounded-full bg-[#4edea3] animate-ping" />
        </button>
      </section>

      {/* Section Title & Status Count */}
      <div className="flex items-center justify-between pt-1 px-1">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#ddb7ff] text-[20px] fill-1">
            swords
          </span>
          <h3 className="text-[22px] text-[#e4e1ec] font-bold tracking-tight">
            Today's Quests
          </h3>
        </div>
        <span className="text-xs text-[#cfc2d6] uppercase tracking-wider font-semibold">
          {totalCompleted} / {totalQuests} Done
        </span>
      </div>

      {/* Habit Quests Vertical Stack */}
      <div className="flex flex-col space-y-2.5">
        {quests.map((quest) => {
          // Identify quest type variants to match screenshot
          const isDeepWork = quest.id === 'quest-4' || quest.title.includes('Deep Work');
          const isWater = quest.id === 'quest-3' || quest.title.includes('Water');

          // Styling logic
          const cardBg = quest.completed
            ? 'bg-[#1b1b22]'
            : isDeepWork
            ? 'bg-[#2a2931]'
            : 'bg-[#1b1b22]';

          return (
            <article
              key={quest.id}
              className={`flex items-center justify-between p-4 rounded-[18px] ${cardBg} shadow-md relative overflow-hidden group border border-white/[0.03] transition-all duration-200`}
            >
              {/* Glow for high priority active card */}
              {isDeepWork && !quest.completed && (
                <div className="absolute -right-8 -top-8 w-28 h-28 bg-[#ddb7ff]/20 rounded-full blur-2xl pointer-events-none" />
              )}

              <div className="flex items-center gap-3 min-w-0 pr-2 relative z-10">
                {/* Icon box */}
                <div
                  className={`relative w-12 h-12 rounded-[14px] flex items-center justify-center shrink-0 ${
                    quest.completed
                      ? 'bg-[#00a572]/20 text-[#4edea3] shadow-[0_0_14px_rgba(78,222,163,0.35)]'
                      : isDeepWork
                      ? 'bg-[#34343c] text-[#ddb7ff] shadow-[0_0_18px_rgba(183,109,255,0.4)]'
                      : 'bg-[#34343c] text-[#f0dbff]'
                  }`}
                >
                  <span
                    className={`material-symbols-outlined text-[26px] ${
                      isDeepWork && !quest.completed ? 'animate-pulse' : ''
                    }`}
                  >
                    {quest.categoryIcon}
                  </span>
                  {isDeepWork && !quest.completed && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#ffb95f] shadow-[0_0_8px_rgba(255,185,95,0.8)]" />
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-0.5">
                    <h4
                      className={`text-base font-semibold truncate ${
                        quest.completed
                          ? 'text-[#e4e1ec] line-through opacity-75'
                          : isDeepWork
                          ? 'text-[#e4e1ec] font-bold'
                          : 'text-[#e4e1ec]'
                      }`}
                    >
                      {quest.title}
                    </h4>

                    {/* Tag */}
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${
                        quest.category === 'Agility'
                          ? 'bg-[#4edea3]/15 text-[#4edea3]'
                          : quest.category === 'Wisdom'
                          ? 'bg-[#ddb7ff]/15 text-[#ddb7ff]'
                          : quest.category === 'Vitality'
                          ? 'bg-[#4edea3]/15 text-[#4edea3]'
                          : quest.category === 'Focus Quest'
                          ? 'bg-[#ca8100]/40 text-[#ffb95f]'
                          : 'bg-[#34343c] text-[#cfc2d6]'
                      }`}
                    >
                      {quest.categoryLabel}
                    </span>
                  </div>

                  {/* Subtitle / Status */}
                  {isDeepWork && !quest.completed ? (
                    <p className="text-xs text-[#ffb4ab] font-medium truncate flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">
                        warning
                      </span>
                      Streak at risk • Due before 11:59 PM
                    </p>
                  ) : quest.buffDescription && !quest.completed ? (
                    <p className="text-xs text-[#4edea3] truncate">
                      {quest.buffDescription}
                    </p>
                  ) : (
                    <div className="flex items-center gap-2">
                      <p className="text-xs text-[#cfc2d6] truncate">
                        {isWater && quest.waterCounter
                          ? `${quest.waterCounter.current} of ${quest.waterCounter.max} elixir vials logged`
                          : quest.subtitle}
                      </p>
                      {isWater && (
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onUpdateWater(false);
                            }}
                            className="w-5 h-5 rounded-md bg-[#2a2931] hover:bg-[#34343c] text-[10px] text-[#cfc2d6] flex items-center justify-center"
                            title="Decrease water"
                          >
                            -
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onUpdateWater(true);
                            }}
                            className="w-5 h-5 rounded-md bg-[#2a2931] hover:bg-[#34343c] text-[10px] text-[#4edea3] flex items-center justify-center"
                            title="Increase water"
                          >
                            +
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Rewards Row */}
                  <div className="flex items-center gap-2 mt-1 text-[10px]">
                    <span className="text-[#ddb7ff] font-bold">
                      +{quest.xpReward} XP
                    </span>
                    <span className="text-[#988d9f]">•</span>
                    <span className="text-[#ffb95f] font-bold">
                      +{quest.coinReward} 🪙
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Trigger Right Slot */}
              <div className="shrink-0 relative z-10">
                {quest.completed ? (
                  // Completed Green Check Indicator
                  <button
                    onClick={() => onToggleQuest(quest.id)}
                    className="flex flex-col items-center gap-1 group/btn cursor-pointer"
                    title="Tap to uncheck"
                  >
                    <div className="w-11 h-11 rounded-full bg-[#4edea3] flex items-center justify-center text-[#003824] shadow-[0_0_14px_rgba(78,222,163,0.6)] group-hover/btn:scale-105 transition-transform">
                      <span className="material-symbols-outlined text-[24px] font-bold">
                        check
                      </span>
                    </div>
                    <span className="text-[10px] text-[#4edea3] font-semibold">
                      Done
                    </span>
                  </button>
                ) : isDeepWork ? (
                  // Deep Work check-in pill button
                  <button
                    onClick={() => onToggleQuest(quest.id)}
                    className="h-11 px-3.5 rounded-xl bg-[#b76dff] text-[#400071] text-xs font-bold flex items-center gap-1.5 shadow-[0_4px_16px_rgba(183,109,255,0.4)] hover:brightness-110 active:scale-95 transition-all cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      radio_button_unchecked
                    </span>
                    <span>Check In</span>
                  </button>
                ) : (
                  // Uncompleted circle trigger button
                  <button
                    onClick={() => onToggleQuest(quest.id)}
                    className="w-11 h-11 rounded-full bg-[#2a2931] flex items-center justify-center text-[#988d9f] hover:text-[#4edea3] hover:bg-[#393840] hover:scale-105 active:scale-95 transition-all cursor-pointer"
                    title="Complete quest"
                  >
                    <span className="material-symbols-outlined text-[22px]">
                      circle
                    </span>
                  </button>
                )}
              </div>
            </article>
          );
        })}
      </div>

      {/* Quick Quest Action Button */}
      <div className="pt-1">
        <button
          onClick={() => {
            soundManager.playClick();
            onOpenNewQuestModal();
          }}
          className="w-full py-3.5 px-4 rounded-[18px] bg-[#2a2931] hover:bg-[#393840] text-[#e4e1ec] flex items-center justify-center gap-2 shadow-lg transition-all active:scale-[0.99] group cursor-pointer border border-white/[0.04]"
        >
          <div className="w-6 h-6 rounded-full bg-[#ddb7ff]/20 text-[#ddb7ff] flex items-center justify-center group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-[18px]">add</span>
          </div>
          <span className="text-sm font-bold tracking-wide text-[#ddb7ff]">
            + Add New Daily Quest
          </span>
        </button>
      </div>
    </div>
  );
};
