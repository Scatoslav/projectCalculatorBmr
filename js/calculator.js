// modules/calculator.js
import { calculateBMR, calculateActivityMultiplier, calculateGoalMultiplier, calculateMacros } from './calculations.js';

export function calculateAndDisplay(
    weight, agee, height, gender, activityLevel, goal, resultDiv
) {
    let bmr = calculateBMR(weight, height, agee, gender);
    let finBmr = calculateActivityMultiplier(activityLevel, bmr);
    let finKf = calculateGoalMultiplier(goal);
    let finalCalor = finKf * finBmr;
    let { proteins, fats, carbs } = calculateMacros(finalCalor);
    
    resultDiv.innerHTML = `
        <hr>
        <h3>Ваш результат:</h3>
        <p><b>Целевая калорийность: ${finalCalor.toFixed(0)} ккал/день</b></p>
        <p>Для достижения цели вам нужно потреблять:</p>
        <ul>
            <li>🧬 Белки: <b>${proteins.toFixed(1)} г</b></li>
            <li>🔋 Жиры: <b>${fats.toFixed(1)} г</b></li>
            <li>⚡ Углеводы: <b>${carbs.toFixed(1)} г</b></li>
        </ul>
        <p><small>Базовый обмен: ${bmr.toFixed(0)} ккал | Поддержание: ${finBmr.toFixed(0)} ккал</small></p>
    `;
    
   return { 
        finalCalor, 
        proteins, 
        fats, 
        carbs,
        bmr: bmr.toFixed(0),
        maintenance: finBmr.toFixed(0)
    };
}