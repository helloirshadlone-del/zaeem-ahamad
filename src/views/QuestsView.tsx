import React, { useState } from 'react';
import { Quest, AdventurerProfile } from '../types/quest';
import { soundManager } from '../utils/audio';

interface QuestsViewProps {
  profile: AdventurerProfile;
  quests: Quest[];
  onToggleQuest: (questId: string) => void;
  onOpenNewQuestModal: () => void;
}

export const QuestsView: React.FC<QuestsViewProps> = ({
  profile,
  quests,
  onToggleQuest,
  onOpenNewQuestModal
}) => {
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed' | 'core'>('all');
  const [bossHp, setBossHp] = useState(1450);
  const [bossHitMessage, setBossHitMessage] = useState<string | null>(null);

  const filteredQuests = quests.filter((q) => {
    if (filter === 'pending') return !q.completed;
    if (filter === 'completed') return q.completed;
    if (filter === 'core') return q.isCoreQuest;
    return true;
  });

  const weekDays = [
    { day: 'Mon', date: '6', status: 'completed' },
    { day: 'Tue', date: '7', status: 'completed' },
    { day: 'Wed', date: '8', status: 'completed' },
    { day: 'Thu', date: '9', status: 'completed' },
    { day: 'Fri', date: '10', status: 'completed' },
    { day: 'Sat', date: '11', status: 'completed' },
    { day: 'Sun', date: '12', status: 'today' }
  ];

  const handleBossStrike = () => {
    if (bossHp <= 0) return;
    soundManager.playCoinClink();
    const dmg = 75;
    const nextHp = Math.max(0, bossHp - dmg);
    setBossHp(nextHp);
    setBossHitMessage(`CRITICAL STRIKE! -${dmg} HP dealt to Behemoth!`);
    setTimeout(() => {
      setBossHitMessage(null);
    }, 2500);
  };

  return (
    <div className="flex flex-col w-full pb-8 space-y-4">
      {/* Title */}
      <div className="flex items-center justify-between px-1">
        <div>
          <h2 className="text-2xl font-bold text-[#e4e1ec] tracking-tight flex items-center gap-2">
            <span className="material-symbols-outlined text-[#4edea3]">insights</span>
            Quest Codex &amp; Raids
          </h2>
          <p className="text-xs text-[#cfc2d6]">Weekly performance &amp; cooperative boss battles</p>
        </div>
        <button
          onClick={onOpenNewQuestModal}
          className="px-3 py-1.5 rounded-xl bg-[#b76dff]/20 text-[#ddb7ff] border border-[#b76dff]/40 text-xs font-bold hover:bg-[#b76dff]/30 transition-all flex items-center gap-1"
        >
          <span className="material-symbols-outlined text-[16px]">add</span>
          <span>New Quest</span>
        </button>
      </div>

      {/* 7-Day Consistency Heatmap */}
      <section className="p-4 rounded-[18px] bg-[#1b1b22] border border-white/[0.04] shadow-md">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <span className="text-sm">🔥</span>
            <span className="text-xs font-bold text-[#ffb95f]">Weekly Momentum Matrix</span>
          </div>
          <span className="text-[10px] text-[#4edea3] font-semibold">100% On-Track</span>
        </div>

        <div className="grid grid-cols-7 gap-1.5 text-center">
          {weekDays.map((wd) => {
            const isToday = wd.status === 'today';
            return (
              <div
                key={wd.day}
                className={`py-2 rounded-xl flex flex-col items-center gap-1 border transition-all ${
                  isToday
                    ? 'bg-[#2a2931] border-[#4edea3] shadow-[0_0_12px_rgba(78,222,163,0.3)]'
                    : 'bg-[#151522] border-white/[0.04]'
                }`}
              >
                <span className="text-[10px] font-medium text-[#cfc2d6]">{wd.day}</span>
                <span className="text-xs font-bold text-[#e4e1ec]">{wd.date}</span>
                <div
                  className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                    isToday
                      ? 'bg-[#4edea3] text-[#003824] font-bold'
                      : 'bg-[#00a572]/20 text-[#4edea3]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[12px] font-bold">check</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-3 pt-2.5 border-t border-white/[0.05] grid grid-cols-3 text-center text-[10px]">
          <div>
            <span className="text-[#cfc2d6] block">Current Streak</span>
            <span className="text-sm font-bold text-[#ffb95f]">{profile.streakDays} Days</span>
          </div>
          <div>
            <span className="text-[#cfc2d6] block">Longest Record</span>
            <span className="text-sm font-bold text-[#ddb7ff]">42 Days</span>
          </div>
          <div>
            <span className="text-[#cfc2d6] block">Weekly XP</span>
            <span className="text-sm font-bold text-[#4edea3]">2,840 XP</span>
          </div>
        </div>
      </section>

      {/* World Boss Raid: Procrastination Behemoth */}
      <section className="p-4 rounded-[18px] bg-[#1f1f26] border border-[#ca8100]/30 shadow-lg relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#ffb95f]/15 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full bg-[#93000a]/40 text-[#ffb4ab] text-[10px] font-extrabold uppercase tracking-wider">
              Weekly World Raid
            </span>
            <span className="text-[10px] text-[#cfc2d6]">Resets in 2d 14h</span>
          </div>
          <span className="text-[11px] font-bold text-[#ffb95f]">500 🪙 Bounty</span>
        </div>

        <div className="flex items-center gap-3 my-2">
          <div className="w-12 h-12 rounded-xl bg-[#2a2931] border border-[#ffb95f]/30 flex items-center justify-center text-2xl shrink-0 shadow-[0_0_15px_rgba(255,185,95,0.25)]">
            👹
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-bold text-[#e4e1ec] truncate">
              The Procrastination Behemoth
            </h4>
            <p className="text-[10px] text-[#cfc2d6]">
              Every habit completed deals 50 DMG to defeat this weekly nemesis!
            </p>
          </div>
        </div>

        {/* Boss Health Bar */}
        <div className="space-y-1 my-2">
          <div className="flex justify-between text-[10px] font-semibold">
            <span className="text-[#ffb4ab]">Boss Vitality</span>
            <span className="text-[#e4e1ec]">
              {bossHp.toLocaleString()} / 2,000 HP ({Math.round((bossHp / 2000) * 100)}%)
            </span>
          </div>
          <div className="h-2.5 w-full bg-[#151522] rounded-full overflow-hidden p-0.5 border border-white/5">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#93000a] via-[#ca8100] to-[#ffb95f] transition-all duration-500"
              style={{ width: `${Math.max(0, (bossHp / 2000) * 100)}%` }}
            />
          </div>
        </div>

        {bossHitMessage && (
          <div className="p-2 rounded-lg bg-[#4edea3]/20 border border-[#4edea3]/50 text-center text-xs font-bold text-[#4edea3] animate-bounce my-2">
            {bossHitMessage}
          </div>
        )}

        <button
          onClick={handleBossStrike}
          disabled={bossHp <= 0}
          className="w-full mt-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#ca8100] to-[#ffb95f] text-[#2a1700] text-xs font-extrabold tracking-wide shadow-[0_4px_16px_rgba(255,185,95,0.3)] hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-1.5 disabled:opacity-50"
        >
          <span className="material-symbols-outlined text-[16px]">swords</span>
          <span>{bossHp > 0 ? 'Strike Boss with Completed Momentum' : 'Behemoth Sunk! Victory Claimed'}</span>
        </button>
      </section>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1 p-1 bg-[#151522] rounded-xl border border-white/[0.04]">
        {[
          { key: 'all', label: 'All Quests' },
          { key: 'pending', label: 'Incomplete' },
          { key: 'completed', label: 'Conquered' },
          { key: 'core', label: 'Core Only' }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => {
              setFilter(tab.key as any);
              soundManager.playClick();
            }}
            className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              filter === tab.key
                ? 'bg-[#2a2931] text-[#4edea3] shadow-sm'
                : 'text-[#cfc2d6] hover:text-[#e4e1ec]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Filtered Quests List */}
      <div className="space-y-2.5">
        {filteredQuests.map((quest) => (
          <article
            key={quest.id}
            className="flex items-center justify-between p-3.5 rounded-2xl bg-[#1b1b22] border border-white/[0.03] shadow-sm"
          >
            <div className="flex items-center gap-3 min-w-0 pr-2">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  quest.completed
                    ? 'bg-[#00a572]/20 text-[#4edea3]'
                    : 'bg-[#2a2931] text-[#ddb7ff]'
                }`}
              >
                <span className="material-symbols-outlined text-[22px]">
                  {quest.categoryIcon}
                </span>
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <h4
                    className={`text-sm font-semibold truncate ${
                      quest.completed ? 'line-through text-[#cfc2d6]' : 'text-[#e4e1ec]'
                    }`}
                  >
                    {quest.title}
                  </h4>
                  <span className="text-[10px] text-[#ddb7ff] bg-[#34343c] px-1.5 py-0.5 rounded-md font-medium">
                    {quest.categoryLabel}
                  </span>
                </div>
                <p className="text-[11px] text-[#cfc2d6] truncate">{quest.subtitle}</p>
                <div className="flex items-center gap-2 mt-0.5 text-[10px]">
                  <span className="text-[#ddb7ff] font-bold">+{quest.xpReward} XP</span>
                  <span className="text-[#988d9f]">•</span>
                  <span className="text-[#ffb95f] font-bold">+{quest.coinReward} 🪙</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onToggleQuest(quest.id)}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                quest.completed
                  ? 'bg-[#4edea3] text-[#003824] shadow-[0_0_10px_rgba(78,222,163,0.5)]'
                  : 'bg-[#2a2931] text-[#988d9f] hover:text-[#4edea3]'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">
                {quest.completed ? 'check' : 'circle'}
              </span>
            </button>
          </article>
        ))}
      </div>
    </div>
  );
};
