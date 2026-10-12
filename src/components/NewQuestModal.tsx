import React, { useState } from 'react';
import { Quest, QuestCategory } from '../types/quest';
import { soundManager } from '../utils/audio';

interface NewQuestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddQuest: (quest: Quest) => void;
}

const CATEGORIES: {
  category: QuestCategory;
  label: string;
  emoji: string;
  icon: string;
  defaultSubtitle: string;
}[] = [
  {
    category: 'Agility',
    label: '🏃 Agility',
    emoji: '🏃',
    icon: 'directions_run',
    defaultSubtitle: 'Cardio, movement or outdoor quest'
  },
  {
    category: 'Wisdom',
    label: '🧠 Wisdom',
    emoji: '🧠',
    icon: 'auto_stories',
    defaultSubtitle: 'Reading, studying or audio lessons'
  },
  {
    category: 'Vitality',
    label: '💧 Vitality',
    emoji: '💧',
    icon: 'water_drop',
    defaultSubtitle: 'Hydration, nourishment & body care'
  },
  {
    category: 'Focus Quest',
    label: '⚔️ Focus Quest',
    emoji: '⚔️',
    icon: 'terminal',
    defaultSubtitle: 'Deep work, coding or high-intensity tasks'
  },
  {
    category: 'Night Ritual',
    label: '🌙 Night Ritual',
    emoji: '🌙',
    icon: 'bedtime',
    defaultSubtitle: 'Wind-down, sleep prep & restorative recovery'
  },
  {
    category: 'Discipline',
    label: '🛡️ Discipline',
    emoji: '🛡️',
    icon: 'shield',
    defaultSubtitle: 'Habit restraint, digital detox, or meditation'
  }
];

export const NewQuestModal: React.FC<NewQuestModalProps> = ({
  isOpen,
  onClose,
  onAddQuest
}) => {
  const [title, setTitle] = useState('');
  const [selectedCat, setSelectedCat] = useState(CATEGORIES[0]);
  const [subtitle, setSubtitle] = useState('');
  const [xpReward, setXpReward] = useState(60);
  const [coinReward, setCoinReward] = useState(30);
  const [isCoreQuest, setIsCoreQuest] = useState(true);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    soundManager.playCoinClink();
    const newQuest: Quest = {
      id: `quest-${Date.now()}`,
      title: title.trim(),
      category: selectedCat.category,
      categoryLabel: selectedCat.label,
      categoryEmoji: selectedCat.emoji,
      categoryIcon: selectedCat.icon,
      subtitle: subtitle.trim() || selectedCat.defaultSubtitle,
      xpReward,
      coinReward,
      completed: false,
      isCoreQuest
    };

    onAddQuest(newQuest);
    setTitle('');
    setSubtitle('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md rounded-[24px] bg-[#1f1f26] border border-[#34343c] p-6 shadow-2xl text-left overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#2a2931] hover:bg-[#34343c] text-[#cfc2d6] flex items-center justify-center transition-colors"
          aria-label="Close"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        <div className="flex items-center gap-2 mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#b76dff]/20 text-[#ddb7ff] flex items-center justify-center">
            <span className="material-symbols-outlined text-[24px] fill-1">add_task</span>
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#e4e1ec]">Forge New Daily Quest</h3>
            <p className="text-xs text-[#cfc2d6]">Enlist a new habit into your daily campaign</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Quest Title */}
          <div>
            <label className="block text-xs font-semibold text-[#cfc2d6] mb-1.5 uppercase tracking-wider">
              Quest Objective
            </label>
            <input
              type="text"
              required
              placeholder="e.g. 20 Min Mobility Yoga, Pushups 3x25..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#151522] border border-[#34343c] text-[#e4e1ec] placeholder-[#988d9f] focus:outline-none focus:border-[#b76dff] text-sm"
            />
          </div>

          {/* Category Picker */}
          <div>
            <label className="block text-xs font-semibold text-[#cfc2d6] mb-1.5 uppercase tracking-wider">
              Attribute Domain
            </label>
            <div className="grid grid-cols-2 gap-2 max-h-36 overflow-y-auto pr-1">
              {CATEGORIES.map((cat) => {
                const isSelected = selectedCat.category === cat.category;
                return (
                  <button
                    type="button"
                    key={cat.category}
                    onClick={() => {
                      setSelectedCat(cat);
                      soundManager.playClick();
                    }}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all border text-left ${
                      isSelected
                        ? 'bg-[#b76dff]/25 border-[#b76dff] text-[#ddb7ff] shadow-[0_0_12px_rgba(183,109,255,0.3)]'
                        : 'bg-[#151522] border-[#2a2931] text-[#cfc2d6] hover:bg-[#2a2931]'
                    }`}
                  >
                    <span className="text-sm">{cat.emoji}</span>
                    <span className="truncate">{cat.category}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Details / Metric */}
          <div>
            <label className="block text-xs font-semibold text-[#cfc2d6] mb-1.5 uppercase tracking-wider">
              Target / Notes (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. 08:00 AM • Goal: 3 sets with focus"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#151522] border border-[#34343c] text-[#e4e1ec] placeholder-[#988d9f] focus:outline-none focus:border-[#b76dff] text-sm"
            />
          </div>

          {/* Reward configuration */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <div>
              <span className="block text-xs font-semibold text-[#ddb7ff] mb-1">
                XP Reward
              </span>
              <div className="flex gap-1.5">
                {[40, 60, 80, 120].map((val) => (
                  <button
                    type="button"
                    key={val}
                    onClick={() => setXpReward(val)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                      xpReward === val
                        ? 'bg-[#b76dff] text-[#400071]'
                        : 'bg-[#151522] text-[#cfc2d6] hover:bg-[#2a2931]'
                    }`}
                  >
                    +{val}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="block text-xs font-semibold text-[#ffb95f] mb-1">
                Coin Bounty
              </span>
              <div className="flex gap-1.5">
                {[20, 30, 50, 70].map((val) => (
                  <button
                    type="button"
                    key={val}
                    onClick={() => setCoinReward(val)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                      coinReward === val
                        ? 'bg-[#ca8100] text-black font-extrabold'
                        : 'bg-[#151522] text-[#cfc2d6] hover:bg-[#2a2931]'
                    }`}
                  >
                    +{val}🪙
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Core Quest Checkbox */}
          <label className="flex items-center gap-2.5 pt-1 cursor-pointer">
            <input
              type="checkbox"
              checked={isCoreQuest}
              onChange={(e) => setIsCoreQuest(e.target.checked)}
              className="w-4 h-4 rounded text-[#b76dff] bg-[#151522] border-[#34343c] focus:ring-0"
            />
            <span className="text-xs text-[#cfc2d6]">
              Mark as <strong className="text-[#e4e1ec]">Core Quest</strong> (counts toward 100% daily ring)
            </span>
          </label>

          {/* Submit */}
          <button
            type="submit"
            className="w-full mt-2 py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#b76dff] to-[#4edea3] text-[#13131a] font-bold text-sm tracking-wide shadow-[0_4px_20px_rgba(183,109,255,0.4)] hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">swords</span>
            <span>Enlist Into Daily Quests</span>
          </button>
        </form>
      </div>
    </div>
  );
};
