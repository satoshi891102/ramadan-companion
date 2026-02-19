'use client';

import { useState, useEffect } from 'react';
import { Target, Plus, Trash2, ChevronUp, ChevronDown } from 'lucide-react';
import Header from '@/components/Header';
import { getState, updateGoal, addGoal, removeGoal } from '@/lib/storage';
import type { Goal } from '@/lib/storage';

export default function GoalsPage() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [mounted, setMounted] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newTarget, setNewTarget] = useState('');
  const [newUnit, setNewUnit] = useState('');

  useEffect(() => {
    setMounted(true);
    setGoals(getState().goals);
  }, []);

  const handleUpdate = (goalId: string, delta: number) => {
    const goal = goals.find((g) => g.id === goalId);
    if (!goal) return;
    const newVal = Math.max(0, Math.min(goal.target, goal.current + delta));
    const updated = updateGoal(goalId, newVal);
    setGoals(updated);
  };

  const handleAdd = () => {
    if (!newTitle || !newTarget) return;
    const goal: Goal = {
      id: `custom-${Date.now()}`,
      title: newTitle,
      target: parseInt(newTarget),
      current: 0,
      unit: newUnit || 'units',
    };
    const updated = addGoal(goal);
    setGoals(updated);
    setNewTitle('');
    setNewTarget('');
    setNewUnit('');
    setShowAddForm(false);
  };

  const handleRemove = (goalId: string) => {
    const updated = removeGoal(goalId);
    setGoals(updated);
  };

  if (!mounted) return null;

  const totalProgress = goals.length > 0
    ? Math.round(goals.reduce((acc, g) => acc + (g.current / g.target) * 100, 0) / goals.length)
    : 0;

  return (
    <div className="flex min-h-screen flex-col pb-24">
      <Header />

      <div className="px-4">
        {/* Overall progress */}
        <div className="glass-card mb-4 p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Target size={18} className="text-gold" />
              <h2 className="text-sm font-semibold text-text-primary">Overall Progress</h2>
            </div>
            <span className="text-2xl font-bold text-gold">{totalProgress}%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-background">
            <div
              className="h-full rounded-full bg-gradient-to-r from-gold to-teal transition-all duration-500"
              style={{ width: `${totalProgress}%` }}
            />
          </div>
        </div>

        {/* Goals list */}
        <div className="space-y-3">
          {goals.map((goal) => {
            const percent = Math.round((goal.current / goal.target) * 100);
            const isComplete = goal.current >= goal.target;

            return (
              <div
                key={goal.id}
                className={`glass-card p-4 transition-all ${isComplete ? 'ring-1 ring-teal/30' : ''}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className={`text-sm font-semibold ${isComplete ? 'text-teal' : 'text-text-primary'}`}>
                      {goal.title}
                    </h3>
                    <p className="text-xs text-text-secondary">
                      {goal.current} / {goal.target} {goal.unit}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className={`text-lg font-bold ${isComplete ? 'text-teal' : 'text-gold'}`}>
                      {percent}%
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mb-3 h-1.5 w-full overflow-hidden rounded-full bg-background">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isComplete ? 'bg-teal' : 'bg-gradient-to-r from-gold to-gold-dim'
                    }`}
                    style={{ width: `${percent}%` }}
                  />
                </div>

                {/* Controls */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleUpdate(goal.id, -1)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg bg-background text-text-secondary hover:text-text-primary transition-colors"
                      disabled={goal.current <= 0}
                    >
                      <ChevronDown size={16} />
                    </button>
                    <button
                      onClick={() => handleUpdate(goal.id, 1)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold/15 text-gold hover:bg-gold/25 transition-colors"
                      disabled={isComplete}
                    >
                      <ChevronUp size={16} />
                    </button>
                  </div>
                  {goal.id.startsWith('custom-') && (
                    <button
                      onClick={() => handleRemove(goal.id)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-text-secondary hover:text-red-400 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Add goal */}
        {showAddForm ? (
          <div className="glass-card mt-4 p-4">
            <h3 className="text-sm font-semibold text-text-primary mb-3">Add New Goal</h3>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Goal title"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full rounded-xl bg-background px-3 py-2.5 text-sm text-text-primary placeholder:text-text-secondary/50 outline-none ring-1 ring-border focus:ring-gold/50 transition-all"
              />
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Target"
                  value={newTarget}
                  onChange={(e) => setNewTarget(e.target.value)}
                  className="w-1/2 rounded-xl bg-background px-3 py-2.5 text-sm text-text-primary placeholder:text-text-secondary/50 outline-none ring-1 ring-border focus:ring-gold/50 transition-all"
                />
                <input
                  type="text"
                  placeholder="Unit (e.g. days)"
                  value={newUnit}
                  onChange={(e) => setNewUnit(e.target.value)}
                  className="w-1/2 rounded-xl bg-background px-3 py-2.5 text-sm text-text-primary placeholder:text-text-secondary/50 outline-none ring-1 ring-border focus:ring-gold/50 transition-all"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleAdd}
                  className="flex-1 rounded-xl bg-gold py-2.5 text-sm font-semibold text-background transition-all hover:bg-gold-dim"
                >
                  Add Goal
                </button>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="rounded-xl bg-surface px-4 py-2.5 text-sm text-text-secondary transition-all hover:text-text-primary"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowAddForm(true)}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-border py-3 text-sm text-text-secondary transition-all hover:border-gold/30 hover:text-gold"
          >
            <Plus size={16} />
            Add Custom Goal
          </button>
        )}
      </div>
    </div>
  );
}
