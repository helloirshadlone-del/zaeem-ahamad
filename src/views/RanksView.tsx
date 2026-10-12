import React, { useState } from 'react';
import { LeaderboardCompetitor, AdventurerProfile } from '../types/quest';
import { soundManager } from '../utils/audio';

interface RanksViewProps {
  profile: AdventurerProfile;
  leaderboard: LeaderboardCompetitor[];
}

export const RanksView: React.FC<RanksViewProps> = ({ profile, leaderboard }) => {
  const [activeTab, setActiveTab] = useState<'league' | 'tiers'>('league');

  const tiers = [
    { name: 'Mythic Grandmaster', color: '#ffb95f', minXp: '6,000+ XP', perk: 'Legendary Halo & +100% Coin Multiplier' },
    { name: 'Master League', color: '#ddb7ff', minXp: '4,500+ XP', perk: '+50% Gold Multiplier & Title' },
    { name: 'Diamond Division III', color: '#4edea3', minXp: '2,800+ XP', perk: 'Current League • 2x XP Active', isCurrent: true },
    { name: 'Platinum Tier', color: '#6ffbbe', minXp: '1,800+ XP', perk: 'Weekly Relic Crate' },
    { name: 'Gold Tier', color: '#ca8100', minXp: '1,000+ XP', perk: 'Streak Freeze Discount' },
    { name: 'Silver Tier', color: '#cfc2d6', minXp: '500+ XP', perk: 'Adventurer Guild Access' },
    { name: 'Bronze Initiate', color: '#988d9f', minXp: '0+ XP', perk: 'Starter Daily Quests' }
  ];

  return (
    <div className="flex flex-col w-full pb-8 space-y-4">
      {/* Title */}
      <div className="px-1">
        <h2 className="text-2xl font-bold text-[#e4e1ec] tracking-tight flex items-center gap-2">
          <span className="material-symbols-outlined text-[#ffb95f]">military_tech</span>
          Adventurer Arena &amp; Ranks
        </h2>
        <p className="text-xs text-[#cfc2d6]">Weekly competitive league standings</p>
      </div>

      {/* League Banner */}
      <section className="p-4 rounded-[18px] bg-gradient-to-r from-[#1f1f26] via-[#2a2931] to-[#1b1b22] border border-[#4edea3]/30 shadow-lg relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#4edea3]/15 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#4edea3] shadow-[0_0_8px_rgba(78,222,163,0.8)]" />
            <span className="text-xs font-bold text-[#4edea3] uppercase tracking-wider">
              Diamond League
            </span>
          </div>
          <span className="text-[10px] text-[#cfc2d6] font-medium">Ends in 2d 14h</span>
        </div>

        <h3 className="text-xl font-extrabold text-[#e4e1ec]">Division III Standings</h3>
        <p className="text-xs text-[#cfc2d6] mt-0.5">
          Top 3 promote to <strong className="text-[#ddb7ff]">Master League</strong>. Bottom 3 relegate.
        </p>

        {/* User Quick Highlight */}
        <div className="mt-3.5 p-3 rounded-xl bg-[#13131a]/80 border border-[#b76dff]/40 flex items-center justify-between shadow-inner">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="text-base font-extrabold text-[#ddb7ff] w-6 text-center">#4</span>
            <img
              src={profile.avatarUrl}
              alt="You"
              className="w-9 h-9 rounded-full object-cover border border-[#b76dff]"
            />
            <div className="truncate">
              <span className="text-xs font-bold text-[#e4e1ec] block truncate">
                {profile.name} (You)
              </span>
              <span className="text-[10px] text-[#4edea3] font-medium">
                150 XP behind #3 Zephyr
              </span>
            </div>
          </div>
          <div className="text-right shrink-0">
            <span className="text-xs font-extrabold text-[#4edea3] block">
              {profile.currentXp.toLocaleString()} XP
            </span>
            <span className="text-[10px] text-[#ffb95f] font-semibold">
              🔥 {profile.streakDays}d Streak
            </span>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div className="flex items-center gap-1 p-1 bg-[#151522] rounded-xl border border-white/[0.04]">
        <button
          onClick={() => {
            setActiveTab('league');
            soundManager.playClick();
          }}
          className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            activeTab === 'league' ? 'bg-[#2a2931] text-[#4edea3]' : 'text-[#cfc2d6]'
          }`}
        >
          Active Leaderboard
        </button>
        <button
          onClick={() => {
            setActiveTab('tiers');
            soundManager.playClick();
          }}
          className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            activeTab === 'tiers' ? 'bg-[#2a2931] text-[#4edea3]' : 'text-[#cfc2d6]'
          }`}
        >
          League Tier Ladder
        </button>
      </div>

      {activeTab === 'league' ? (
        <div className="space-y-2">
          {leaderboard.map((item) => {
            const isUser = item.isUser;
            const isPromotion = item.rank <= 3;
            const isDemotion = item.rank >= 6;

            return (
              <div
                key={item.id}
                className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all ${
                  isUser
                    ? 'bg-[#2a2931] border-[#b76dff]/60 shadow-[0_0_15px_rgba(183,109,255,0.2)]'
                    : 'bg-[#1b1b22] border-white/[0.03]'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0 pr-2">
                  {/* Rank Badge */}
                  <div className="w-7 text-center shrink-0">
                    {item.rank === 1 ? (
                      <span className="text-lg">🥇</span>
                    ) : item.rank === 2 ? (
                      <span className="text-lg">🥈</span>
                    ) : item.rank === 3 ? (
                      <span className="text-lg">🥉</span>
                    ) : (
                      <span className="text-xs font-bold text-[#cfc2d6]">#{item.rank}</span>
                    )}
                  </div>

                  <img
                    src={item.avatarUrl}
                    alt={item.name}
                    className="w-10 h-10 rounded-full object-cover shrink-0 border border-white/10"
                  />

                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-[#e4e1ec] truncate">
                        {item.name} {isUser && '(You)'}
                      </span>
                      {isPromotion && (
                        <span className="px-1.5 py-0.2 rounded bg-[#00a572]/20 text-[#4edea3] text-[9px] font-extrabold uppercase">
                          PROMOTING
                        </span>
                      )}
                      {isDemotion && (
                        <span className="px-1.5 py-0.2 rounded bg-[#93000a]/30 text-[#ffb4ab] text-[9px] font-extrabold uppercase">
                          DANGER
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-[#cfc2d6] truncate">{item.title}</span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-xs font-extrabold text-[#4edea3] block">
                    {item.weeklyXp.toLocaleString()} XP
                  </span>
                  <span className="text-[10px] text-[#ffb95f]">
                    🔥 {item.streak}d
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="space-y-2.5">
          {tiers.map((t, idx) => (
            <div
              key={t.name}
              className={`p-3.5 rounded-2xl border transition-all ${
                t.isCurrent
                  ? 'bg-[#2a2931] border-[#4edea3] shadow-[0_0_15px_rgba(78,222,163,0.25)]'
                  : 'bg-[#1b1b22] border-white/[0.03]'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: t.color }}
                  />
                  <h4 className="text-xs font-bold text-[#e4e1ec]">{t.name}</h4>
                  {t.isCurrent && (
                    <span className="px-1.5 py-0.5 rounded-full bg-[#4edea3]/20 text-[#4edea3] text-[9px] font-extrabold uppercase">
                      Current
                    </span>
                  )}
                </div>
                <span className="text-[10px] font-bold text-[#ffb95f]">{t.minXp}</span>
              </div>
              <p className="text-[11px] text-[#cfc2d6] pl-5">{t.perk}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
