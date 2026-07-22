import React, { useState } from 'react';
import { Plus, Trash2, Check, Sparkles, RefreshCw } from 'lucide-react';
import { ALL_INGREDIENTS, INITIAL_PANTRY } from '../data/recipes';

export function PantryManager({ pantry, setPantry }) {
  const [customInput, setCustomInput] = useState('');

  const toggleIngredient = (item) => {
    if (pantry.includes(item)) {
      setPantry(pantry.filter((i) => i !== item));
    } else {
      setPantry([...pantry, item]);
    }
  };

  const handleAddCustom = (e) => {
    e.preventDefault();
    if (!customInput.trim()) return;
    const formatted = customInput.trim();
    if (!pantry.includes(formatted)) {
      setPantry([...pantry, formatted]);
    }
    setCustomInput('');
  };

  const applyPreset = (presetType) => {
    if (presetType === 'standard') {
      setPantry(INITIAL_PANTRY);
    } else if (presetType === 'vegetarian') {
      setPantry(['Eggs', 'Garlic', 'Onion', 'Olive Oil', 'Pasta', 'Tomatoes', 'Spinach', 'Cheddar Cheese', 'Avocado', 'Bread', 'Butter']);
    } else if (presetType === 'student') {
      setPantry(['Eggs', 'Bread', 'Butter', 'Pasta', 'Soy Sauce', 'Rice', 'Garlic', 'Salt', 'Black Pepper']);
    } else if (presetType === 'clear') {
      setPantry([]);
    }
  };

  return (
    <div className="glass-card">
      <div className="section-title">
        <span>Your Virtual Pantry</span>
        <button 
          onClick={() => applyPreset('clear')}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--text-dim)',
            fontSize: '0.75rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.2rem'
          }}
        >
          <Trash2 size={12} /> Clear All
        </button>
      </div>
      <p className="section-subtitle">
        Select items you have in your kitchen to match recipes instantly.
      </p>

      {/* Preset Quick Actions */}
      <div className="preset-chips">
        <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', alignSelf: 'center', marginRight: '0.2rem' }}>Presets:</span>
        <button className="preset-chip" onClick={() => applyPreset('standard')}>🏠 Standard</button>
        <button className="preset-chip" onClick={() => applyPreset('vegetarian')}>🥗 Vegetarian</button>
        <button className="preset-chip" onClick={() => applyPreset('student')}>🎓 Quick Student</button>
      </div>

      {/* Add Custom Ingredient */}
      <form onSubmit={handleAddCustom} className="pantry-input-group">
        <input 
          type="text" 
          className="pantry-input" 
          placeholder="Add custom ingredient (e.g. Sriracha)..." 
          value={customInput}
          onChange={(e) => setCustomInput(e.target.value)}
        />
        <button type="submit" className="add-btn">
          <Plus size={16} />
        </button>
      </form>

      {/* Pantry Tag List */}
      <div className="pantry-tags">
        {ALL_INGREDIENTS.map((item) => {
          const isSelected = pantry.includes(item);
          return (
            <span
              key={item}
              className={`ingredient-tag ${isSelected ? 'selected' : ''}`}
              onClick={() => toggleIngredient(item)}
            >
              {isSelected ? <Check size={12} /> : null}
              {item}
            </span>
          );
        })}
      </div>
    </div>
  );
}
