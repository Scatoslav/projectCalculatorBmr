import { recipes } from './menu.js';

const recipesList = document.getElementById("recipes-list");
const filterSelect = document.getElementById("recipe-filter");


function createCards() {
    recipesList.innerHTML = '';
    
    for (let i = 0; i < recipes.length; i++) {
        const recipe = recipes[i];
        
        let typeEmoji = '🍽️';
        if (recipe.type === 'breakfast') typeEmoji = '🍳';
        if (recipe.type === 'lunch') typeEmoji = '🍲';
        if (recipe.type === 'dinner') typeEmoji = '🍽️';
        if (recipe.type === 'snack') typeEmoji = '🍎';
        
        const card = document.createElement('div');
        card.className = 'recipe-card';
        card.setAttribute('data-type', recipe.type);
        card.innerHTML = `
            <h3 style="color: #667eea;">${typeEmoji} ${recipe.name}</h3>
            <p><strong>🔥 Калории:</strong> ${recipe.calories} ккал</p>
            <p><strong>🥩 Белки:</strong> ${recipe.proteins} г | <strong>🧈 Жиры:</strong> ${recipe.fats} г | <strong>🍚 Углеводы:</strong> ${recipe.carbs} г</p>
            <p><strong>📝 Ингредиенты:</strong> ${recipe.ingredients}</p>
            <p><strong>👨‍🍳 Приготовление:</strong> ${recipe.instructions}</p>
        `;
        recipesList.appendChild(card);
    }
}

function filterRecipes() {
    const selectedType = filterSelect.value;
    const allCards = document.querySelectorAll('.recipe-card');
    
    for (let i = 0; i < allCards.length; i++) {
        const card = allCards[i];
        const cardType = card.getAttribute('data-type');
        
        if (selectedType === 'all' || cardType === selectedType) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    }
}

filterSelect.addEventListener('change', filterRecipes);
document.addEventListener("DOMContentLoaded", () => {
    createCards();
    filterRecipes();
});