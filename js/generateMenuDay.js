// modules/menuDay.js
import { recipes } from './menu.js';
import { messageCal, getRandomMeal } from './helpers.js';

export function generateMenuDay(globalFinalCalor, resultDiv) {
    const breakfastRecipes = recipes.filter(r => r.type === "breakfast");
    const lunchesRecipes = recipes.filter(r => r.type === "lunch");
    const dinnersRecipes = recipes.filter(r => r.type === "dinner");
    const snacksRecipes = recipes.filter(r => r.type === "snack");
    const targetCal = globalFinalCalor;
    const perMealTarget = targetCal / 4;
    
    let breakfast = getRandomMeal(breakfastRecipes, perMealTarget);
    let lunch = getRandomMeal(lunchesRecipes, perMealTarget);
    let dinner = getRandomMeal(dinnersRecipes, perMealTarget);
    let snack = getRandomMeal(snacksRecipes, perMealTarget);
    
    const totalCalories = breakfast.calories + lunch.calories + dinner.calories + snack.calories;
    const totalProteins = breakfast.proteins + lunch.proteins + dinner.proteins + snack.proteins;
    const totalFats = breakfast.fats + lunch.fats + dinner.fats + snack.fats;
    const totalCarbs = breakfast.carbs + lunch.carbs + dinner.carbs + snack.carbs;
    const deviation = totalCalories - targetCal;
    const recommendation = messageCal(deviation, targetCal);
    
    let recommendationHTML = '';
    if (recommendation) {
        recommendationHTML = `<div class="recommendation"><p><strong>💡 Рекомендация:</strong> ${recommendation.message}</p></div>`;
    }
    
    const menuHtml = `
        <div class="menu-day">
            <h3>Меню на день</h3>
            <div class="menu-summary">
                <p><b>Цель:</b> ${targetCal.toFixed(0)} ккал | <b>Итого:</b> ${totalCalories.toFixed(0)} ккал (${deviation >= 0 ? '+' : ''}${deviation.toFixed(0)})</p>
                <p><b>БЖУ:</b> 🧬 ${totalProteins.toFixed(1)}г | 🔋 ${totalFats.toFixed(1)}г | ⚡ ${totalCarbs.toFixed(1)}г</p>
            </div>
            ${recommendationHTML}
            <div class="meals-list">
                <div class="meal breakfast">
                    <b>Завтрак:</b> ${breakfast.name} - ${breakfast.calories} ккал<br>
                    <b>Ингредиенты:</b> ${breakfast.ingredients.join(', ')}<br>
                    <b>Рецепт:</b> ${breakfast.instructions}
                </div>
                <div class="meal lunch">
                    <b>Обед:</b> ${lunch.name} - ${lunch.calories} ккал<br>
                    <b>Ингредиенты:</b> ${lunch.ingredients.join(', ')}<br>
                    <b>Рецепт:</b> ${lunch.instructions}
                </div>
                <div class="meal dinner">
                    <b>Ужин:</b> ${dinner.name} - ${dinner.calories} ккал<br>
                    <b>Ингредиенты:</b> ${dinner.ingredients.join(', ')}<br>
                    <b>Рецепт:</b> ${dinner.instructions}
                </div>
                <div class="meal snack">
                    <b>Перекус:</b> ${snack.name} - ${snack.calories} ккал<br>
                    <b>Ингредиенты:</b> ${snack.ingredients.join(', ')}<br>
                    <b>Рецепт:</b> ${snack.instructions}
                </div>
            </div>
            <button class="generate-btn" onclick="window.regenerateMenu()">Сгенерировать другое меню</button>
        </div>
    `;
    
    resultDiv.insertAdjacentHTML('beforeend', menuHtml);
    return { html: menuHtml, totalCalories: totalCalories, type: 'day' };
}