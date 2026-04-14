// modules/menuWeek.js
import { recipes } from './menu.js';
import { messageCal, getRandomMeal } from './helpers.js';

export function generateMenuWeek(globalFinalCalor, resultDiv) {
    const breakfastRecipes = recipes.filter(r => r.type === "breakfast");
    const lunchesRecipes = recipes.filter(r => r.type === "lunch");
    const dinnersRecipes = recipes.filter(r => r.type === "dinner");
    const snacksRecipes = recipes.filter(r => r.type === "snack");
    
    const targetCal = globalFinalCalor;
    const perMealTarget = targetCal / 4;
    const days = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"];
    
    let weekHTML = `<hr><div class="menu-week"><h3>Меню на неделю</h3><p>Цель: ${targetCal.toFixed(0)} ккал/день</p>`;
    let weekTotalCalories = 0;
    let weekTotalProteins = 0;
    let weekTotalFats = 0;
    let weekTotalCarbs = 0;
    
    for (let i = 0; i < days.length; i++) {
        let breakfast = getRandomMeal(breakfastRecipes, perMealTarget);
        let lunch = getRandomMeal(lunchesRecipes, perMealTarget);
        let dinner = getRandomMeal(dinnersRecipes, perMealTarget);
        let snack = getRandomMeal(snacksRecipes, perMealTarget);
        
        const dayTotal = breakfast.calories + lunch.calories + dinner.calories + snack.calories;
        const dayDeviation = dayTotal - targetCal;
        
        weekTotalCalories += dayTotal;
        weekTotalProteins += breakfast.proteins + lunch.proteins + dinner.proteins + snack.proteins;
        weekTotalFats += breakfast.fats + lunch.fats + dinner.fats + snack.fats;
        weekTotalCarbs += breakfast.carbs + lunch.carbs + dinner.carbs + snack.carbs;
        
        const recommendation = messageCal(dayDeviation, targetCal);
        let recommendationHTML = recommendation ? `<div class="day-recommendation"><p>💡 ${recommendation.message}</p></div>` : '';
        
        weekHTML += `
            <div class="week-day">
                <div class="day-header"><b>${days[i]}</b> - ${dayTotal} ккал (${dayDeviation >= 0 ? '+' : ''}${dayDeviation.toFixed(0)})</div>
                <div class="day-meals">
                    <div>🍳 Завтрак: ${breakfast.name} (${breakfast.calories} ккал)</div>
                    <div>🍲 Обед: ${lunch.name} (${lunch.calories} ккал)</div>
                    <div>🍽 Ужин: ${dinner.name} (${dinner.calories} ккал)</div>
                    <div>🍎 Перекус: ${snack.name} (${snack.calories} ккал)</div>
                </div>
                ${recommendationHTML}
            </div>
        `;
    }
    
    const avgCalories = weekTotalCalories / 7;
    const avgDeviation = avgCalories - targetCal;
    
    weekHTML += `
        <div class="week-summary">
            <h4>Итоги недели:</h4>
            <p>Средняя калорийность: ${avgCalories.toFixed(0)} ккал/день (${avgDeviation >= 0 ? '+' : ''}${avgDeviation.toFixed(0)} от цели)</p>
            <p>Точность: ${(100 - Math.abs(avgDeviation / targetCal * 100)).toFixed(1)}%</p>
            <ul>
                <li>🧬 Белки: ${(weekTotalProteins / 7).toFixed(0)} г/день</li>
                <li>🔋 Жиры: ${(weekTotalFats / 7).toFixed(0)} г/день</li>
                <li>⚡ Углеводы: ${(weekTotalCarbs / 7).toFixed(0)} г/день</li>
            </ul>
        </div>
        <button class="generate-btn" onclick="window.regenerateMenu()">Другая неделя</button>
    `;
    
    resultDiv.insertAdjacentHTML('beforeend', weekHTML);
    return { html: weekHTML, totalCalories: weekTotalCalories, type: 'week' };
}