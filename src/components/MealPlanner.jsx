import React, { useState } from 'react';
import { Calendar, ShoppingBag, Trash2, Check, Plus, ArrowRight } from 'lucide-react';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export function MealPlanner({ plannedRecipes, setPlannedRecipes, pantry }) {
  const [checkedItems, setCheckedItems] = useState([]);

  // Calculate aggregated missing ingredients across all planned recipes
  const shoppingListMap = {};
  plannedRecipes.forEach((plan) => {
    plan.recipe.ingredients.forEach((ing) => {
      const isMissing = !pantry.some((p) => p.toLowerCase() === ing.name.toLowerCase());
      if (isMissing) {
        if (shoppingListMap[ing.name]) {
          shoppingListMap[ing.name].count += 1;
        } else {
          shoppingListMap[ing.name] = { name: ing.name, amount: ing.amount, count: 1 };
        }
      }
    });
  });

  const shoppingList = Object.values(shoppingListMap);

  const toggleShoppingCheck = (itemName) => {
    if (checkedItems.includes(itemName)) {
      setCheckedItems(checkedItems.filter((i) => i !== itemName));
    } else {
      setCheckedItems([...checkedItems, itemName]);
    }
  };

  const removePlan = (planId) => {
    setPlannedRecipes(plannedRecipes.filter((p) => p.id !== planId));
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '1.5rem' }}>
      {/* Weekly Schedule */}
      <div className="glass-card">
        <div className="section-title">
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Calendar size={20} style={{ color: 'var(--primary)' }} /> Weekly Meal Schedule
          </span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
            {plannedRecipes.length} Planned Meals
          </span>
        </div>
        <p className="section-subtitle">
          Organize your daily meals. Missing ingredients automatically sync to your shopping list.
        </p>

        <div className="planner-grid">
          {DAYS.map((day) => {
            const dayMeals = plannedRecipes.filter((p) => p.day === day);
            return (
              <div key={day} className="day-column">
                <div className="day-header">{day}</div>
                {dayMeals.length === 0 ? (
                  <div className="meal-slot" style={{ fontStyle: 'italic', opacity: 0.5 }}>
                    No meal scheduled
                  </div>
                ) : (
                  dayMeals.map((plan) => (
                    <div key={plan.id} className="meal-slot" style={{ background: 'rgba(16, 185, 129, 0.1)', borderColor: 'var(--primary)' }}>
                      <div style={{ fontWeight: '700', color: 'var(--text-main)' }}>{plan.recipe.title}</div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        <span>{plan.recipe.cookTime} mins</span>
                        <button 
                          onClick={() => removePlan(plan.id)} 
                          style={{ background: 'transparent', border: 'none', color: 'var(--accent-rose)', cursor: 'pointer' }}
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Auto Shopping List */}
      <div className="glass-card">
        <div className="section-title">
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShoppingBag size={20} style={{ color: 'var(--accent-amber)' }} /> Shopping List
          </span>
          <span style={{ fontSize: '0.8rem', color: 'var(--accent-amber)', fontWeight: '700' }}>
            {shoppingList.length} items
          </span>
        </div>
        <p className="section-subtitle">
          Missing items aggregated from your scheduled meal plan.
        </p>

        {shoppingList.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem 1rem', color: 'var(--text-dim)' }}>
            <Check size={36} style={{ opacity: 0.3, marginBottom: '0.5rem' }} />
            <p style={{ fontSize: '0.85rem' }}>Your pantry has all items needed for your planned meals!</p>
          </div>
        ) : (
          <div>
            {shoppingList.map((item) => {
              const isChecked = checkedItems.includes(item.name);
              return (
                <div key={item.name} className={`shopping-item ${isChecked ? 'checked' : ''}`}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <button
                      onClick={() => toggleShoppingCheck(item.name)}
                      style={{
                        width: '18px',
                        height: '18px',
                        borderRadius: '4px',
                        border: isChecked ? 'none' : '1px solid var(--border-color)',
                        background: isChecked ? 'var(--primary)' : 'transparent',
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                      }}
                    >
                      {isChecked ? <Check size={12} /> : null}
                    </button>
                    <span style={{ fontSize: '0.875rem', color: isChecked ? 'var(--text-dim)' : 'var(--text-main)' }}>
                      {item.name}
                    </span>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {item.amount}
                  </span>
                </div>
              );
            })}

            <button 
              onClick={() => setCheckedItems(shoppingList.map(i => i.name))}
              style={{
                width: '100%',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-muted)',
                borderRadius: 'var(--radius-md)',
                padding: '0.5rem',
                fontSize: '0.8rem',
                marginTop: '1rem',
                cursor: 'pointer'
              }}
            >
              Mark All as Bought
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
