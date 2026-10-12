import React, { useState } from 'react';
import { AdventurerProfile, ShopItem, Achievement } from '../types/quest';
import { soundManager } from '../utils/audio';

interface ProfileViewProps {
  profile: AdventurerProfile;
  shopItems: ShopItem[];
  achievements: Achievement[];
  onBuyItem: (item: ShopItem) => void;
  onChangeTitle: (newTitle: string) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  profile,
  shopItems,
  achievements,
  onBuyItem,
  onChangeTitle
}) => {
  const [subTab, setSubTab] = useState<'attributes' | 'shop' | 'achievements'>('attributes');
  const [editingTitle, setEditingTitle] = useState(false);

  const titles = [
    'Level 12 Adventurer',
    'Shadowalker of Dawn',
    'Grand Sage of Habits',
    'Hydration Knight',
    'Code Architect'
  ];

  return (
    <div className="flex flex-col w-full pb-8 space-y-4">
      {/* Adventurer Identity Card */}
      <section className="p-5 rounded-[22px] bg-[#1b1b22] border border-white/[0.04] shadow-xl relative overflow-hidden text-center">
        <div className="absolute -top-12 -left-12 w-36 h-36 bg-[#b76dff]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-36 h-36 bg-[#4edea3]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center">
          {/* Avatar with Halo */}
          <div className="relative p-1 rounded-full bg-gradient-to-tr from-[#b76dff] via-[#6ffbbe] to-[#4edea3] shadow-[0_0_25px_rgba(183,109,255,0.45)] mb-3">
            <img
              src={profile.avatarUrl}
              alt={profile.name}
              className="w-20 h-20 rounded-full object-cover block border-2 border-[#13131a]"
            />
            <span className="absolute bottom-0 right-0 px-2 py-0.5 rounded-full bg-[#b76dff] text-[#400071] text-xs font-bold shadow-md">
              Lv.{profile.level}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <h2 className="text-xl font-bold text-[#e4e1ec]">{profile.name}</h2>
            {profile.isVerified && (
              <span className="material-symbols-outlined text-[#4edea3] text-[18px] fill-1">
                verified
              </span>
            )}
          </div>

          {editingTitle ? (
            <div className="mt-1 flex flex-wrap gap-1 justify-center max-w-xs">
              {titles.map((t) => (
                <button
                  key={t}
                  onClick={() => {
                    onChangeTitle(t);
                    setEditingTitle(false);
                    soundManager.playClick();
                  }}
                  className="px-2 py-1 rounded-md text-[10px] bg-[#2a2931] hover:bg-[#b76dff]/30 text-[#ddb7ff]"
                >
                  {t}
                </button>
              ))}
            </div>
          ) : (
            <button
              onClick={() => setEditingTitle(true)}
              className="mt-0.5 text-xs text-[#ddb7ff] font-semibold tracking-wide hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>{profile.title}</span>
              <span className="material-symbols-outlined text-[13px]">edit</span>
            </button>
          )}

          {/* Currency Readout */}
          <div className="flex items-center gap-3 mt-4">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#2a2931] border border-white/5">
              <span className="text-sm">💎</span>
              <span className="text-xs font-bold text-[#e4e1ec]">{profile.gems} Gems</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#2a2931] border border-white/5">
              <span className="text-sm">🪙</span>
              <span className="text-xs font-bold text-[#ffb95f]">
                {profile.coins.toLocaleString()} Coins
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Profile Subnavigation */}
      <div className="flex items-center gap-1 p-1 bg-[#151522] rounded-xl border border-white/[0.04]">
        {[
          { key: 'attributes', label: 'RPG Attributes' },
          { key: 'shop', label: 'Armory Shop' },
          { key: 'achievements', label: 'Trophies' }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => {
              setSubTab(tab.key as any);
              soundManager.playClick();
            }}
            className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              subTab === tab.key
                ? 'bg-[#2a2931] text-[#4edea3] shadow-sm'
                : 'text-[#cfc2d6] hover:text-[#e4e1ec]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Subtab 1: Attributes */}
      {subTab === 'attributes' && (
        <section className="space-y-2.5">
          {[
            {
              name: 'Agility',
              level: profile.attributes.agility,
              desc: 'Paces running speed, cardio recovery & swift task starts',
              icon: 'directions_run',
              color: '#4edea3'
            },
            {
              name: 'Wisdom',
              level: profile.attributes.wisdom,
              desc: 'Governs reading habit retention & insight synthesis',
              icon: 'auto_stories',
              color: '#ddb7ff'
            },
            {
              name: 'Vitality',
              level: profile.attributes.vitality,
              desc: 'Boosts physical hydration, immune resilience & sleep quality',
              icon: 'water_drop',
              color: '#6ffbbe'
            },
            {
              name: 'Focus',
              level: profile.attributes.focus,
              desc: 'Deep work endurance and immunity against distraction debuffs',
              icon: 'terminal',
              color: '#ffb95f'
            },
            {
              name: 'Discipline',
              level: profile.attributes.discipline,
              desc: 'Unbroken daily quest momentum and streak preservation strength',
              icon: 'shield',
              color: '#b76dff'
            }
          ].map((attr) => (
            <div
              key={attr.name}
              className="p-3.5 rounded-2xl bg-[#1b1b22] border border-white/[0.03] flex items-center justify-between"
            >
              <div className="flex items-center gap-3 min-w-0 pr-2">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${attr.color}20`, color: attr.color }}
                >
                  <span className="material-symbols-outlined text-[22px]">{attr.icon}</span>
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-[#e4e1ec]">{attr.name}</h4>
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-[#2a2931] text-[#ddb7ff]">
                      Lv.{attr.level}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#cfc2d6] truncate">{attr.desc}</p>
                </div>
              </div>

              {/* Stat Bar */}
              <div className="w-16 shrink-0">
                <div className="h-1.5 w-full bg-[#151522] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${Math.min(100, (attr.level / 20) * 100)}%`,
                      backgroundColor: attr.color
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Subtab 2: Armory Shop */}
      {subTab === 'shop' && (
        <section className="space-y-2.5">
          {shopItems.map((item) => {
            const canAfford =
              item.currency === 'coins'
                ? profile.coins >= item.cost
                : profile.gems >= item.cost;

            return (
              <div
                key={item.id}
                className="p-3.5 rounded-2xl bg-[#1b1b22] border border-white/[0.03] flex items-center justify-between gap-2"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-[#2a2931] text-[#ffb95f] flex items-center justify-center shrink-0 border border-white/5">
                    <span className="material-symbols-outlined text-[22px] fill-1">
                      {item.icon}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-xs font-bold text-[#e4e1ec] truncate">{item.name}</h4>
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#34343c] text-[#cfc2d6] font-semibold">
                        {item.rarity}
                      </span>
                      {item.ownedCount > 0 && (
                        <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#00a572]/20 text-[#4edea3] font-bold">
                          Owned: {item.ownedCount}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-[#cfc2d6] truncate">{item.description}</p>
                  </div>
                </div>

                <button
                  onClick={() => onBuyItem(item)}
                  disabled={!canAfford}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all flex items-center gap-1 ${
                    canAfford
                      ? 'bg-[#b76dff] text-[#400071] hover:brightness-110 active:scale-95'
                      : 'bg-[#2a2931] text-[#988d9f] cursor-not-allowed opacity-60'
                  }`}
                >
                  <span>{item.cost}</span>
                  <span>{item.currency === 'coins' ? '🪙' : '💎'}</span>
                </button>
              </div>
            );
          })}
        </section>
      )}

      {/* Subtab 3: Achievements */}
      {subTab === 'achievements' && (
        <section className="space-y-2.5">
          {achievements.map((ach) => (
            <div
              key={ach.id}
              className={`p-3.5 rounded-2xl border transition-all ${
                ach.unlocked
                  ? 'bg-[#1b1b22] border-[#4edea3]/30 shadow-[0_0_12px_rgba(78,222,163,0.15)]'
                  : 'bg-[#151522] border-white/[0.03] opacity-80'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      ach.unlocked
                        ? 'bg-[#4edea3]/20 text-[#4edea3]'
                        : 'bg-[#2a2931] text-[#988d9f]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {ach.icon}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#e4e1ec]">{ach.title}</h4>
                    <p className="text-[10px] text-[#cfc2d6]">{ach.description}</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-[#ffb95f] shrink-0">
                  {ach.reward}
                </span>
              </div>

              {/* Progress bar */}
              <div className="mt-2 space-y-1">
                <div className="flex justify-between text-[9px] text-[#cfc2d6]">
                  <span>{ach.unlocked ? 'Achievement Conquered' : 'Progress'}</span>
                  <span>
                    {ach.progress} / {ach.maxProgress}
                  </span>
                </div>
                <div className="h-1.5 w-full bg-[#13131a] rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      ach.unlocked ? 'bg-[#4edea3]' : 'bg-[#b76dff]'
                    }`}
                    style={{
                      width: `${Math.min(100, (ach.progress / ach.maxProgress) * 100)}%`
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </section>
      )}
    </div>
  );
};
