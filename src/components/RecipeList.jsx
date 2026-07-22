import React from 'react';
import { Clock, Flame, ChefHat, Plus, CheckCircle, AlertCircle, Star } from 'lucide-react';
import { SponsoredCardAd } from './AdContainer';

export function RecipeList({ 
  recipes, 
  pantry, 
  searchQuery, 
  activeCategory, 
  onSelectRecipe, 
  onAddToPlanner, 
  isPro 
}) {
  // Process recipes with match percentages
  const processedRecipes = recipes.map((recipe) => {
    const totalIngredients = recipe.ingredients.length;
    const matched = recipe.ingredients.filter((ing) => 
      pantry.some((pItem) => pItem.toLowerCase() === ing.name.toLowerCase())
    );
    const missing = recipe.ingredients.filter((ing) => 
      !pantry.some((pItem) => pItem.toLowerCase() === ing.name.toLowerCase())
    );
    
    const matchPercentage = Math.round((matched.length / totalIngredients) * 100);
    
    return {
      ...recipe,
      matchedCount: matched.length,
      missingCount: missing.length,
      missingItems: missing.map((m) => m.name),
      matchPercentage
    };
  });

  // Filter by category and search
  const filteredRecipes = processedRecipes.filter((recipe) => {
    const matchesCategory = activeCategory === 'All' || recipe.category === activeCategory || 
      (activeCategory === 'Quick & Easy' && recipe.cookTime + recipe.prepTime <= 20) ||
      (activeCategory === 'Healthy' && recipe.dietary.includes('Healthy'));

    const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.ingredients.some(i => i.name.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  // Sort by highest match percentage first
  filteredRecipes.sort((a, b) => b.matchPercentage - a.matchPercentage);

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <h2 style={{ fontSize: '1.2rem', color: 'var(--text-main)' }}>
          Matched Recipes <span style={{ fontSize: '0.9rem', color: 'var(--primary)' }}>({filteredRecipes.length})</span>
        </h2>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
          Sorted by Pantry Match %
        </span>
      </div>

      <div className="recipe-grid">
        {filteredRecipes.map((recipe, index) => (
          <React.Fragment key={recipe.id}>
            {/* Insert sponsored ad after every 3 cards */}
            {!isPro && index === 2 && recipe.sponsoredProduct && (
              <div style={{ gridColumn: '1 / -1' }}>
                <SponsoredCardAd 
                  isPro={isPro}
                  brand={recipe.sponsoredProduct.brand}
                  text={recipe.sponsoredProduct.text}
                  link={recipe.sponsoredProduct.link}
                />
              </div>
            )}

            <div className="recipe-card">
              <div className="card-image-wrap">
                <img src={recipe.image} alt={recipe.title} className="card-image" />
                <div className={`match-badge ${recipe.matchPercentage >= 80 ? 'high-match' : ''}`}>
                  <span>{recipe.matchPercentage}% Match</span>
                </div>
              </div>

              <div className="card-content">
                <div className="card-header">
                  <h3 className="recipe-title">{recipe.title}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', color: '#f59e0b', fontSize: '0.8rem', fontWeight: '700' }}>
                    <Star size={12} fill="#f59e0b" /> {recipe.rating}
                  </div>
                </div>

                <p className="recipe-desc">{recipe.description}</p>

                <div className="meta-stats">
                  <div className="meta-stat">
                    <Clock size={14} /> {recipe.prepTime + recipe.cookTime} mins
                  </div>
                  <div className="meta-stat">
                    <Flame size={14} /> {recipe.calories} kcal
                  </div>
                  <div className="meta-stat">
                    <ChefHat size={14} /> {recipe.difficulty}
                  </div>
                </div>

                {/* Ingredients Status */}
                <div className="ingredients-status">
                  <div className="status-row">
                    <span className="status-label">Pantry Match</span>
                    <span style={{ 
                      color: recipe.missingCount === 0 ? 'var(--primary)' : 'var(--accent-amber)',
                      fontWeight: '700' 
                    }}>
                      {recipe.matchedCount} of {recipe.ingredients.length} items
                    </span>
                  </div>

                  {recipe.missingCount > 0 ? (
                    <div className="missing-list">
                      <strong>Missing:</strong> {recipe.missingItems.join(', ')}
                    </div>
                  ) : (
                    <div style={{ color: 'var(--primary)', fontSize: '0.775rem', marginTop: '0.2rem', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                      <CheckCircle size={12} /> You have all ingredients!
                    </div>
                  )}
                </div>

                <div className="card-actions">
                  <button className="cook-btn" onClick={() => onSelectRecipe(recipe)}>
                    <ChefHat size={16} /> Start Cooking
                  </button>
                  <button 
                    className="plan-btn" 
                    title="Add to Weekly Meal Planner"
                    onClick={() => onAddToPlanner(recipe)}
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>
            </div>
          </React.Fragment>
        ))}

        {filteredRecipes.length === 0 && (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
            <ChefHat size={48} style={{ opacity: 0.3, marginBottom: '1rem' }} />
            <h3>No recipes matched your search</h3>
            <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>Try adding more items to your pantry or clearing search filters!</p>
          </div>
        )}
      </div>
    </div>
  );
}
