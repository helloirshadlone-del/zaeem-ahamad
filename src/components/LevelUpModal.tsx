import React from 'react';

interface LevelUpModalProps {
  isOpen: boolean;
  level: number;
  onClose: () => void;
}

export const LevelUpModal: React.FC<LevelUpModalProps> = ({
  isOpen,
  level,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-sm rounded-[24px] bg-[#1f1f26] border-2 border-[#b76dff] p-6 shadow-[0_0_60px_rgba(183,109,255,0.6)] text-center overflow-hidden">
        {/* Glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#b76dff]/20 via-transparent to-[#4edea3]/20 pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center py-2">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-[#6900b3] via-[#b76dff] to-[#4edea3] p-1 mb-3 shadow-[0_0_30px_rgba(183,109,255,0.7)] flex items-center justify-center animate-bounce">
            <div className="w-full h-full rounded-[14px] bg-[#1b1b22] flex items-center justify-center">
              <span className="material-symbols-outlined text-[42px] text-[#ffb95f] fill-1">military_tech</span>
            </div>
          </div>

          <span className="px-3 py-1 rounded-full bg-[#b76dff]/30 text-[#ddb7ff] font-bold text-xs uppercase tracking-wider mb-2">
            Adventurer Promotion!
          </span>

          <h2 className="text-3xl font-extrabold text-[#e4e1ec] tracking-tight">
            LEVEL {level} REACHED!
          </h2>
          <p className="text-xs text-[#4edea3] font-medium mt-1">
            New Rank unlocked: Champion Adventurer
          </p>

          <div className="w-full bg-[#1b1b22] rounded-xl p-3 my-5 space-y-2 text-left border border-white/5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#cfc2d6]">Reward Bonus</span>
              <span className="font-bold text-[#ffb95f]">+100 💎 Gems &amp; +300 🪙</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#cfc2d6]">All Attributes</span>
              <span className="font-bold text-[#4edea3]">+1 All Base Stats</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#cfc2d6]">Daily Energy Cap</span>
              <span className="font-bold text-[#ddb7ff]">+250 XP Capacity</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#b76dff] to-[#4edea3] text-[#13131a] font-extrabold text-base tracking-wide shadow-[0_8px_24px_rgba(183,109,255,0.5)] active:scale-95 transition-all"
          >
            Claim &amp; Ascend!
          </button>
        </div>
      </div>
    </div>
  );
};
