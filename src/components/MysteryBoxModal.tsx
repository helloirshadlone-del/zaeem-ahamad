import React, { useState } from 'react';
import { soundManager } from '../utils/audio';

interface MysteryBoxModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClaim: (reward: { coins: number; gems: number; item: string; xp: number }) => void;
  alreadyClaimed?: boolean;
}

export const MysteryBoxModal: React.FC<MysteryBoxModalProps> = ({
  isOpen,
  onClose,
  onClaim,
  alreadyClaimed = false
}) => {
  const [isOpening, setIsOpening] = useState(false);
  const [openedReward, setOpenedReward] = useState<{
    coins: number;
    gems: number;
    item: string;
    xp: number;
  } | null>(null);

  if (!isOpen) return null;

  const handleOpenChest = () => {
    if (isOpening || openedReward) return;
    setIsOpening(true);
    soundManager.playClick();

    setTimeout(() => {
      const generatedReward = {
        coins: Math.floor(Math.random() * 150) + 120, // 120 - 270
        gems: Math.floor(Math.random() * 25) + 20,    // 20 - 45
        xp: Math.floor(Math.random() * 100) + 100,    // 100 - 200
        item: ['Phoenix Feather (Streak Shield)', 'Elixir of Mind Clarity', 'Crystal of Vitality', 'Scroll of Wisdom'][
          Math.floor(Math.random() * 4)
        ]
      };
      setOpenedReward(generatedReward);
      setIsOpening(false);
      soundManager.playMysteryBoxOpen();
      onClaim(generatedReward);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-sm rounded-[24px] bg-[#1f1f26] border border-[#b76dff]/30 p-6 shadow-[0_0_50px_rgba(183,109,255,0.3)] text-center overflow-hidden">
        {/* Ambient neon radial backdrops */}
        <div className="absolute -top-20 -left-20 w-44 h-44 bg-[#b76dff]/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-44 h-44 bg-[#4edea3]/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close trigger */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#2a2931] hover:bg-[#34343c] text-[#cfc2d6] flex items-center justify-center transition-colors"
          aria-label="Close"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        {!openedReward ? (
          <div className="flex flex-col items-center py-2">
            <span className="px-3 py-1 rounded-full bg-[#ca8100]/30 text-[#ffb95f] font-bold text-xs uppercase tracking-wider mb-3">
              Daily Adventurer Cache
            </span>

            <h3 className="text-2xl font-bold text-[#e4e1ec] tracking-tight">
              Daily Mystery Box
            </h3>
            <p className="text-xs text-[#cfc2d6] mt-1 max-w-[260px]">
              Earned by keeping momentum! Open to unveil rare gold, gems, and relics.
            </p>

            {/* Glowing 3D Chest Container */}
            <div className="relative my-7 flex items-center justify-center">
              <div
                className={`w-32 h-32 rounded-3xl bg-gradient-to-tr from-[#6900b3] via-[#b76dff] to-[#4edea3] p-1 shadow-[0_0_35px_rgba(183,109,255,0.6)] ${
                  isOpening ? 'animate-bounce scale-110' : 'animate-pulse-glow hover:scale-105'
                } transition-all duration-300 cursor-pointer flex items-center justify-center`}
                onClick={handleOpenChest}
              >
                <div className="w-full h-full rounded-[22px] bg-[#1b1b22] flex flex-col items-center justify-center gap-1 border border-white/10">
                  <span className="material-symbols-outlined text-[54px] text-[#ffb95f] fill-1 drop-shadow-[0_0_15px_rgba(255,185,95,0.8)]">
                    redeem
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#ddb7ff]">
                    {isOpening ? 'Unlocking...' : 'Tap To Open'}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={handleOpenChest}
              disabled={isOpening}
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#b76dff] to-[#842bd2] hover:brightness-110 text-white font-bold text-base flex items-center justify-center gap-2 shadow-[0_8px_24px_-4px_rgba(183,109,255,0.5)] active:scale-[0.98] transition-all disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-[20px] fill-1">lock_open</span>
              <span>{isOpening ? 'Summoning Loot...' : 'Unlock Daily Box'}</span>
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center py-2 animate-scaleUp">
            <div className="w-16 h-16 rounded-full bg-[#00a572]/20 border border-[#4edea3] text-[#4edea3] flex items-center justify-center mb-3 shadow-[0_0_25px_rgba(78,222,163,0.5)]">
              <span className="material-symbols-outlined text-[36px] fill-1">auto_awesome</span>
            </div>

            <h3 className="text-2xl font-bold text-[#e4e1ec] tracking-tight">
              Victory Rewards!
            </h3>
            <p className="text-xs text-[#4edea3] font-medium mt-0.5">
              Added directly to your Adventurer Pouch
            </p>

            <div className="w-full space-y-2.5 my-5">
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#1b1b22] border border-white/5">
                <div className="flex items-center gap-2.5">
                  <span className="text-xl">🪙</span>
                  <span className="text-sm font-semibold text-[#e4e1ec]">Coins</span>
                </div>
                <span className="text-sm font-bold text-[#ffb95f]">+{openedReward.coins}</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-[#1b1b22] border border-white/5">
                <div className="flex items-center gap-2.5">
                  <span className="text-xl">💎</span>
                  <span className="text-sm font-semibold text-[#e4e1ec]">Gems</span>
                </div>
                <span className="text-sm font-bold text-[#ddb7ff]">+{openedReward.gems}</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-[#1b1b22] border border-white/5">
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[20px] text-[#4edea3]">trending_up</span>
                  <span className="text-sm font-semibold text-[#e4e1ec]">Bonus XP</span>
                </div>
                <span className="text-sm font-bold text-[#4edea3]">+{openedReward.xp} XP</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-[#2a2931] border border-[#b76dff]/30 shadow-inner">
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[20px] text-[#ffb95f]">diamond</span>
                  <span className="text-sm font-semibold text-[#e4e1ec] text-left">Artifact</span>
                </div>
                <span className="text-xs font-bold text-[#ddb7ff] max-w-[140px] truncate text-right">
                  {openedReward.item}
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#4edea3] to-[#00a572] hover:brightness-110 text-[#003824] font-extrabold text-base flex items-center justify-center gap-2 shadow-[0_8px_24px_-4px_rgba(78,222,163,0.5)] active:scale-[0.98] transition-all"
            >
              <span>Equip &amp; Continue</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
