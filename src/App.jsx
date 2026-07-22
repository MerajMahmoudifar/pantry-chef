import React, { useState } from 'react';
import { ChefHat, Calendar, Sparkles, Search, SlidersHorizontal, ShieldCheck, Zap } from 'lucide-react';
import { INITIAL_PANTRY, SAMPLE_RECIPES, CATEGORIES } from './data/recipes';
import { TopAdBanner } from './components/AdContainer';
import { PantryManager } from './components/PantryManager';
import { RecipeList } from './components/RecipeList';
import { CookingModeModal } from './components/CookingModeModal';
import { MealPlanner } from './components/MealPlanner';
import { AIRecipeGenerator } from './components/AIRecipeGenerator';

export function App() {
  const [pantry, setPantry] = useState(INITIAL_PANTRY);
  const [activeTab, setActiveTab] = useState('recipes'); // 'recipes' | 'planner' | 'ai'
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [isPro, setIsPro] = useState(false);
  
  // Cooking Modal State
  const [activeCookingRecipe, setActiveCookingRecipe] = useState(null);
  
  // Meal Planner State
  const [plannedRecipes, setPlannedRecipes] = useState([
    { id: 'plan-1', day: 'Monday', recipe: SAMPLE_RECIPES[0] },
    { id: 'plan-2', day: 'Wednesday', recipe: SAMPLE_RECIPES[1] }
  ]);

  const handleAddToPlanner = (recipe) => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const randomDay = days[Math.floor(Math.random() * days.length)];
    const newPlan = {
      id: 'plan-' + Date.now(),
      day: randomDay,
      recipe
    };
    setPlannedRecipes([...plannedRecipes, newPlan]);
    setActiveTab('planner');
  };

  return (
    <div className="app-container">
      {/* Header Bar */}
      <header className="app-header">
        <div className="nav-content">
          <div className="logo-group" onClick={() => setActiveTab('recipes')}>
            <div className="logo-icon">🍳</div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span className="logo-text">PantryChef</span>
                <span className="logo-tag">Zero Waste</span>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="nav-tabs">
            <button 
              className={`nav-tab ${activeTab === 'recipes' ? 'active' : ''}`}
              onClick={() => setActiveTab('recipes')}
            >
              <ChefHat size={16} /> Recipe Matcher
            </button>
            <button 
              className={`nav-tab ${activeTab === 'planner' ? 'active' : ''}`}
              onClick={() => setActiveTab('planner')}
            >
              <Calendar size={16} /> Meal Planner
            </button>
            <button 
              className={`nav-tab ${activeTab === 'ai' ? 'active' : ''}`}
              onClick={() => setActiveTab('ai')}
            >
              <Sparkles size={16} /> AI Generator
            </button>
          </nav>

          {/* Controls */}
          <div className="header-actions">
            <button 
              className={`pro-toggle-btn ${isPro ? 'is-pro' : ''}`}
              onClick={() => setIsPro(!isPro)}
              title="Toggle Ad-Free Mode for portfolio testing"
            >
              {isPro ? <ShieldCheck size={14} /> : <Zap size={14} />}
              {isPro ? 'Pro Mode (Ad Free)' : 'Toggle Ad-Free Pro'}
            </button>

            <div className="pantry-pill">
              Pantry: <span>{pantry.length} items</span>
            </div>
          </div>
        </div>
      </header>

      {/* Monetization Top Banner (Shows if not Pro) */}
      <TopAdBanner isPro={isPro} onTogglePro={() => setIsPro(true)} />

      {/* View Switcher */}
      {activeTab === 'recipes' && (
        <div>
          {/* Search & Filter Toolbar */}
          <div className="toolbar">
            <div className="search-box">
              <Search size={18} className="search-icon" />
              <input 
                type="text" 
                placeholder="Search recipes, ingredients (e.g., chicken, garlic)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="category-chips">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  className={`cat-chip ${activeCategory === cat ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <main className="main-layout">
            {/* Left Sidebar: Virtual Pantry Manager */}
            <aside>
              <PantryManager pantry={pantry} setPantry={setPantry} />
            </aside>

            {/* Right Content: Matched Recipes Grid */}
            <section>
              <RecipeList 
                recipes={SAMPLE_RECIPES}
                pantry={pantry}
                searchQuery={searchQuery}
                activeCategory={activeCategory}
                onSelectRecipe={(recipe) => setActiveCookingRecipe(recipe)}
                onAddToPlanner={handleAddToPlanner}
                isPro={isPro}
              />
            </section>
          </main>
        </div>
      )}

      {activeTab === 'planner' && (
        <MealPlanner 
          plannedRecipes={plannedRecipes}
          setPlannedRecipes={setPlannedRecipes}
          pantry={pantry}
        />
      )}

      {activeTab === 'ai' && (
        <AIRecipeGenerator 
          pantry={pantry}
          onCookGeneratedRecipe={(recipe) => setActiveCookingRecipe(recipe)}
        />
      )}

      {/* Cooking Mode Modal */}
      {activeCookingRecipe && (
        <CookingModeModal 
          recipe={activeCookingRecipe}
          onClose={() => setActiveCookingRecipe(null)}
        />
      )}
    </div>
  );
}

export default App;
