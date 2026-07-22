import React, { useState } from 'react';
import { Sparkles, Wand2, ChefHat, Clock, Flame, ArrowRight } from 'lucide-react';

export function AIRecipeGenerator({ pantry, onCookGeneratedRecipe }) {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [generatedRecipe, setGeneratedRecipe] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const toggleSelect = (ing) => {
    if (selectedIngredients.includes(ing)) {
      setSelectedIngredients(selectedIngredients.filter((i) => i !== ing));
    } else {
      if (selectedIngredients.length < 4) {
        setSelectedIngredients([...selectedIngredients, ing]);
      }
    }
  };

  const handleGenerate = () => {
    if (selectedIngredients.length === 0) return;

    setIsGenerating(true);
    setTimeout(() => {
      const mainIng = selectedIngredients.join(' & ');
      const title = `Creative ${selectedIngredients[0] || 'Pantry'} Fusion Bowl`;
      
      const newRecipe = {
        id: 'ai-' + Date.now(),
        title: title,
        description: `An experimental culinary dish crafted dynamically using your pantry selection of ${mainIng}.`,
        prepTime: 7,
        cookTime: 10,
        servings: 2,
        calories: 420,
        difficulty: 'Easy',
        category: 'AI Creation',
        dietary: ['Custom', 'Pantry Special'],
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
        ingredients: selectedIngredients.map(ing => ({ name: ing, amount: '1 portion' })).concat([
          { name: 'Olive Oil', amount: '1 tbsp' },
          { name: 'Garlic', amount: '2 cloves' },
          { name: 'Salt & Pepper', amount: 'To taste' }
        ]),
        instructions: [
          { step: 1, text: `Prep your selected key ingredients (${mainIng}) into uniform slices.` },
          { step: 2, text: 'Heat oil and garlic in a skillet over medium heat for 2 minutes.', timerMinutes: 2 },
          { step: 3, text: `Add ${selectedIngredients[0] || 'ingredients'} and sear until lightly golden and fragrant.`, timerMinutes: 5 },
          { step: 4, text: 'Season to perfection and serve warm with your choice of side.' }
        ],
        rating: 5.0,
        reviewsCount: 1
      };

      setGeneratedRecipe(newRecipe);
      setIsGenerating(false);
    }, 1200);
  };

  return (
    <div className="glass-card">
      <div className="section-title">
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Wand2 size={22} style={{ color: '#ec4899' }} /> AI Recipe Generator & Experimenter
        </span>
        <span style={{ fontSize: '0.75rem', background: 'rgba(236, 72, 153, 0.2)', color: '#ec4899', padding: '0.2rem 0.6rem', borderRadius: '99px', fontWeight: '700' }}>
          AI Mode
        </span>
      </div>
      <p className="section-subtitle">
        Pick 1 to 4 ingredients from your pantry to generate an instant unique recipe.
      </p>

      {/* Selectable Ingredients */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
        {pantry.map((ing) => {
          const isSel = selectedIngredients.includes(ing);
          return (
            <button
              key={ing}
              onClick={() => toggleSelect(ing)}
              style={{
                background: isSel ? 'linear-gradient(135deg, #8b5cf6, #ec4899)' : 'rgba(15, 23, 42, 0.8)',
                border: isSel ? 'none' : '1px solid var(--border-color)',
                color: isSel ? '#ffffff' : 'var(--text-muted)',
                padding: '0.4rem 0.85rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.85rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {isSel ? '✓ ' : '+ '}{ing}
            </button>
          );
        })}
      </div>

      <button 
        className="ai-gen-btn"
        onClick={handleGenerate}
        disabled={selectedIngredients.length === 0 || isGenerating}
        style={{ opacity: selectedIngredients.length === 0 ? 0.5 : 1 }}
      >
        <Sparkles size={20} />
        {isGenerating ? 'Synthesizing Recipe...' : `Generate Custom Recipe (${selectedIngredients.length} selected)`}
      </button>

      {/* Generated Result */}
      {generatedRecipe && (
        <div style={{ 
          marginTop: '2rem',
          background: 'rgba(15, 23, 42, 0.9)',
          border: '1px solid rgba(236, 72, 153, 0.4)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.5rem',
          boxShadow: '0 10px 30px rgba(236, 72, 153, 0.15)'
        }}>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            <img 
              src={generatedRecipe.image} 
              alt="Generated Recipe" 
              style={{ width: '140px', height: '140px', objectFit: 'cover', borderRadius: 'var(--radius-md)' }}
            />
            <div style={{ flex: 1 }}>
              <div style={{ color: '#ec4899', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', marginBottom: '0.2rem' }}>
                AI Recipe Created!
              </div>
              <h3 style={{ fontSize: '1.3rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                {generatedRecipe.title}
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1rem' }}>
                {generatedRecipe.description}
              </p>

              <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-dim)', fontSize: '0.8rem', marginBottom: '1rem' }}>
                <span><Clock size={12} style={{ display: 'inline' }} /> 17 mins</span>
                <span><Flame size={12} style={{ display: 'inline' }} /> 420 kcal</span>
              </div>

              <button 
                className="cook-btn" 
                onClick={() => onCookGeneratedRecipe(generatedRecipe)}
                style={{ width: 'auto', padding: '0.6rem 1.25rem' }}
              >
                <ChefHat size={16} /> Cook This AI Creation Now <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
