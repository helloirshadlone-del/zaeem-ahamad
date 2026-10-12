import React from 'react';
import { soundManager } from '../utils/audio';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  onClose,
  isMuted,
  onToggleMute
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-sm h-full bg-[#1b1b22] border-l border-[#34343c] flex flex-col shadow-2xl animate-slideLeft">
        {/* Header */}
        <div className="h-16 px-5 border-b border-[#2a2931] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#4edea3] text-[22px]">notifications_active</span>
            <h3 className="font-bold text-[#e4e1ec] text-base">Adventurer Dispatch</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#2a2931] hover:bg-[#34343c] text-[#cfc2d6] flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Quick Audio Setting */}
        <div className="p-4 border-b border-[#2a2931] bg-[#151522] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[#ddb7ff] text-[20px]">
              {isMuted ? 'volume_off' : 'volume_up'}
            </span>
            <span className="text-xs font-semibold text-[#e4e1ec]">RPG Sound Effects</span>
          </div>
          <button
            onClick={() => {
              onToggleMute();
              if (isMuted) soundManager.playClick();
            }}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${
              !isMuted
                ? 'bg-[#4edea3]/20 text-[#4edea3] border border-[#4edea3]/40'
                : 'bg-[#34343c] text-[#988d9f]'
            }`}
          >
            {!isMuted ? 'Enabled' : 'Muted'}
          </button>
        </div>

        {/* Notification Cards List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          <div className="p-3.5 rounded-xl bg-[#2a2931] border border-[#ca8100]/40 relative">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm">🔥</span>
              <span className="text-xs font-bold text-[#ffb95f]">18-Day Streak Safe</span>
              <span className="text-[10px] text-[#988d9f] ml-auto">2h ago</span>
            </div>
            <p className="text-xs text-[#cfc2d6]">
              2x Daily XP multiplier is running hot! Complete your remaining Deep Work quest to protect your streak.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#2a2931] border border-[#b76dff]/30">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm">⚔️</span>
              <span className="text-xs font-bold text-[#ddb7ff]">World Boss Strike Alert</span>
              <span className="text-[10px] text-[#988d9f] ml-auto">5h ago</span>
            </div>
            <p className="text-xs text-[#cfc2d6]">
              Guild has dealt 550 DMG to the Procrastination Behemoth. 1,450 HP remains until defeat!
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#2a2931] border border-[#4edea3]/30">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm">🎁</span>
              <span className="text-xs font-bold text-[#4edea3]">Mystery Box Unlocked</span>
              <span className="text-[10px] text-[#988d9f] ml-auto">Today</span>
            </div>
            <p className="text-xs text-[#cfc2d6]">
              Your daily attendance crate is waiting in the Dashboard hero hub!
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#2a2931] border border-white/5">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm">🎖️</span>
              <span className="text-xs font-bold text-[#e4e1ec]">Diamond League Update</span>
              <span className="text-[10px] text-[#988d9f] ml-auto">1d ago</span>
            </div>
            <p className="text-xs text-[#cfc2d6]">
              You are currently ranked #4 in Division III. Climb 150 XP to enter the Promotion Zone!
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#2a2931] bg-[#151522]">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-[#2a2931] hover:bg-[#34343c] text-xs font-bold text-[#cfc2d6] transition-colors"
          >
            Dismiss All
          </button>
        </div>
      </div>
    </div>
  );
};
