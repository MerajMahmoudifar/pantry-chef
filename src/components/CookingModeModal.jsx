import React, { useState, useEffect } from 'react';
import { X, Play, Pause, RotateCcw, Check, Clock, Volume2, Users } from 'lucide-react';

export function CookingModeModal({ recipe, onClose }) {
  const [servings, setServings] = useState(recipe.servings || 2);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [activeTimerIndex, setActiveTimerIndex] = useState(null);
  const [timerSecondsLeft, setTimerSecondsLeft] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const multiplier = servings / (recipe.servings || 2);

  // Timer Interval Effect
  useEffect(() => {
    let interval = null;
    if (isTimerRunning && timerSecondsLeft > 0) {
      interval = setInterval(() => {
        setTimerSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (timerSecondsLeft === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      // Play web audio alert beep
      try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, ctx.currentTime);
        osc.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.8);
      } catch (e) {
        console.log('Audio alert fallback');
      }
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSecondsLeft]);

  const startStepTimer = (stepIndex, minutes) => {
    setActiveTimerIndex(stepIndex);
    setTimerSecondsLeft(minutes * 60);
    setIsTimerRunning(true);
  };

  const toggleStep = (stepIndex) => {
    if (completedSteps.includes(stepIndex)) {
      setCompletedSteps(completedSteps.filter((s) => s !== stepIndex));
    } else {
      setCompletedSteps([...completedSteps, stepIndex]);
    }
  };

  const formatTimer = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: '700', textTransform: 'uppercase' }}>
              Hands-Free Cooking Mode
            </div>
            <h2 style={{ fontSize: '1.4rem', color: 'var(--text-main)' }}>{recipe.title}</h2>
          </div>
          <button className="close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          {/* Servings Adjuster */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            background: 'rgba(15, 23, 42, 0.7)',
            padding: '0.75rem 1rem',
            borderRadius: 'var(--radius-md)',
            marginBottom: '1.5rem',
            border: '1px solid var(--border-color)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              <Users size={16} /> Servings Multiplier:
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <button 
                onClick={() => setServings(Math.max(1, servings - 1))}
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '4px', width: '28px', height: '28px', cursor: 'pointer' }}
              >
                -
              </button>
              <strong style={{ minWidth: '30px', textAlign: 'center', color: 'var(--primary)' }}>{servings}</strong>
              <button 
                onClick={() => setServings(servings + 1)}
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '4px', width: '28px', height: '28px', cursor: 'pointer' }}
              >
                +
              </button>
            </div>
          </div>

          {/* Scaled Ingredients Checklist */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1rem', marginBottom: '0.75rem', color: 'var(--text-main)' }}>
              Required Ingredients (Scaled):
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.5rem' }}>
              {recipe.ingredients.map((ing, idx) => (
                <div key={idx} style={{ 
                  background: 'rgba(255, 255, 255, 0.03)', 
                  border: '1px solid var(--border-color)',
                  padding: '0.4rem 0.75rem',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.825rem',
                  color: 'var(--text-muted)',
                  display: 'flex',
                  justifyContent: 'space-between'
                }}>
                  <span>{ing.name}</span>
                  <strong style={{ color: 'var(--text-main)' }}>{ing.amount}</strong>
                </div>
              ))}
            </div>
          </div>

          {/* Cooking Steps */}
          <div>
            <h3 style={{ fontSize: '1rem', marginBottom: '1rem', color: 'var(--text-main)' }}>
              Cooking Steps ({completedSteps.length}/{recipe.instructions.length} Complete):
            </h3>

            {recipe.instructions.map((step, idx) => {
              const isDone = completedSteps.includes(idx);
              const hasTimer = step.timerMinutes && step.timerMinutes > 0;
              const isCurrentStepTimer = activeTimerIndex === idx;

              return (
                <div 
                  key={idx} 
                  className={`step-card ${isDone ? 'done' : ''} ${isCurrentStepTimer ? 'active' : ''}`}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <button
                      onClick={() => toggleStep(idx)}
                      style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        border: isDone ? 'none' : '2px solid var(--border-color)',
                        background: isDone ? 'var(--primary)' : 'transparent',
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        marginTop: '2px',
                        flexShrink: 0
                      }}
                    >
                      {isDone ? <Check size={14} /> : idx + 1}
                    </button>

                    <div style={{ flex: 1 }}>
                      <p style={{ 
                        fontSize: '0.95rem', 
                        color: isDone ? 'var(--text-dim)' : 'var(--text-main)',
                        textDecoration: isDone ? 'line-through' : 'none'
                      }}>
                        {step.text}
                      </p>

                      {/* Interactive Step Timer */}
                      {hasTimer && (
                        <div style={{ marginTop: '0.5rem' }}>
                          {isCurrentStepTimer ? (
                            <div className={`timer-box ${isTimerRunning ? 'running' : ''}`}>
                              <Clock size={14} />
                              <span>{formatTimer(timerSecondsLeft)}</span>
                              <button 
                                onClick={() => setIsTimerRunning(!isTimerRunning)}
                                style={{ background: 'transparent', border: 'none', color: 'inherit', cursor: 'pointer' }}
                              >
                                {isTimerRunning ? <Pause size={14} /> : <Play size={14} />}
                              </button>
                              <button 
                                onClick={() => {
                                  setIsTimerRunning(false);
                                  setTimerSecondsLeft(step.timerMinutes * 60);
                                }}
                                style={{ background: 'transparent', border: 'none', color: 'inherit', cursor: 'pointer' }}
                              >
                                <RotateCcw size={14} />
                              </button>
                            </div>
                          ) : (
                            <button 
                              className="timer-box"
                              onClick={() => startStepTimer(idx, step.timerMinutes)}
                              style={{ cursor: 'pointer' }}
                            >
                              <Clock size={14} /> Start {step.timerMinutes} Min Timer
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
