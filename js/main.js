import { calculateAndDisplay } from './calculator.js';
import { generateMenuDay } from './generateMenuDay.js';
import { generateMenuWeek } from './generateMenuWeek.js';
import { removeOldMenu } from './helpers.js';
import { 
    saveFormData, 
    loadForm, 
    clearSavedData,
    saveResultData, 
    loadResultData,
    saveMenuData,           
    restoreSavedMenu
} from './saveData.js';
import { printToPdf } from './pdf.js'; 


let globalFinalCalor = 0;

// DOM элементы
const button = document.getElementById("rass");
const mas = document.getElementById("massa");
const age = document.getElementById("age");
const rost = document.getElementById("rost");
const resultDiv = document.getElementById("result");
const goalLose = document.getElementById("lose");
const goalStay = document.getElementById("stay");
const goalGain = document.getElementById("gain");
const btn = document.getElementById("btn");


// ПРИ ЗАГРУЗКЕ СТРАНИЦЫ
document.addEventListener("DOMContentLoaded", () => {
    const hasData = loadForm();
    const savedResult = loadResultData();
    
    if (savedResult) {
        globalFinalCalor = savedResult.finalCalor;
        console.log(`📊 Восстановлен результат: ${globalFinalCalor} ккал/день`);
        
        if (resultDiv && savedResult.finalCalor) {
            resultDiv.innerHTML = `
                <hr>
                <h3>Ваш результат (восстановлен из сохранения):</h3>
                <p><b>Целевая калорийность: ${savedResult.finalCalor.toFixed(0)} ккал/день</b></p>
                <p>Для достижения цели вам нужно потреблять:</p>
                <ul>
                    <li>🧬 Белки: <b>${savedResult.proteins.toFixed(1)} г</b></li>
                    <li>🔋 Жиры: <b>${savedResult.fats.toFixed(1)} г</b></li>
                    <li>⚡ Углеводы: <b>${savedResult.carbs.toFixed(1)} г</b></li>
                </ul>
                <p><small>Базовый обмен: ${savedResult.bmr} ккал | Поддержание: ${savedResult.maintenance} ккал</small></p>
            `;
        }
    }
    
    const menuRestored = restoreSavedMenu(resultDiv);
    
    if (hasData || savedResult || menuRestored) {
        console.log("🔄 Все данные восстановлены из localStorage!");
    }
});


// КНОПКА "РАССЧИТАТЬ"

button.addEventListener("click", () => {
    let weight = parseFloat(mas.value);
    let agee = parseFloat(age.value);
    let height = parseFloat(rost.value);
    
    if(!weight || !agee || !height){
        alert("Заполните поля");
        return;
    }
    
    const maleRadio = document.getElementById("male");
    const femaleRadio = document.getElementById("female");
    let gender;
    if(maleRadio.checked){
        gender = 'male';
    } else if(femaleRadio.checked){
        gender = 'female';
    } else {
        alert('Выберите пол');
        return;
    }
    
    const niz = document.getElementById("niz");
    const norm = document.getElementById("norm");
    const max = document.getElementById("max");
    let activityLevel;
    if(niz.checked){
        activityLevel = 'niz';
    } else if(norm.checked){
        activityLevel = 'norm';
    } else if(max.checked){
        activityLevel = 'max';
    } else {
        alert("Выберите активность");
        return;
    }
    
    let goal;
    if(goalLose.checked){
        goal = 'lose';
    } else if(goalStay.checked){
        goal = 'stay';
    } else if(goalGain.checked){
        goal = 'gain';
    } else {
        alert("Выберите цель");
        return;
    }
    
    const result = calculateAndDisplay(weight, agee, height, gender, activityLevel, goal, resultDiv);
    globalFinalCalor = result.finalCalor;
    saveFormData();
    saveResultData(result);
});


// КНОПКА СГЕНЕРИРОВАТЬ МЕНЮ
btn.addEventListener("click", () => {
    if (!globalFinalCalor) {
        alert("Сначала рассчитайте свою норму калорий!");
        return;
    }
    const dayRadio = document.getElementById("Day");
    const nedRadio = document.getElementById("Ned");
    removeOldMenu();
    
    let menuResult = null; 
    
    if (dayRadio.checked) {
        menuResult = generateMenuDay(globalFinalCalor, resultDiv); 
    } else if (nedRadio.checked) {
        menuResult = generateMenuWeek(globalFinalCalor, resultDiv); 
    }
    

    if (menuResult) {
        saveMenuData(menuResult.type, menuResult.html, menuResult.totalCalories);
    }
});


window.regenerateMenu = function() {
    if (!globalFinalCalor) {
        alert("Сначала рассчитайте свою норму калорий!");
        return;
    }
    removeOldMenu();
    const dayRadio = document.getElementById("Day");
    const nedRadio = document.getElementById("Ned");
    
    let menuResult = null; 
    
    if (dayRadio.checked) {
        menuResult = generateMenuDay(globalFinalCalor, resultDiv); 
    } else if (nedRadio.checked) {
        menuResult = generateMenuWeek(globalFinalCalor, resultDiv);
    }
    
    if (menuResult) {
        saveMenuData(menuResult.type, menuResult.html, menuResult.totalCalories);
    }
};
// Импорт функции PDF


// Функции для сохранения PDF


// Замени функции PDF на эти:
window.saveResultsPdf = function() {
    const resultDiv = document.getElementById('result');
    if (!resultDiv || !resultDiv.innerText.trim()) {
        alert('Сначала рассчитайте калории!');
        return;
    }
    printToPdf(resultDiv, 'Результаты расчета');
};

window.saveMenuPdf = function() {
    const menuElement = document.querySelector('.menu-day') || document.querySelector('.menu-week');
    if (!menuElement) {
        alert('Сначала сгенерируйте меню!');
        return;
    }
    printToPdf(menuElement, 'План питания');
};

window.saveFullPdf = function() {
    const resultDiv = document.getElementById('result');
    const menuElement = document.querySelector('.menu-day') || document.querySelector('.menu-week');
    
    if (!resultDiv || !resultDiv.innerText.trim()) {
        alert('Сначала рассчитайте калории!');
        return;
    }
    
    // Создаем временный контейнер
    const temp = document.createElement('div');
    temp.appendChild(resultDiv.cloneNode(true));
    
    if (menuElement) {
        const hr = document.createElement('hr');
        temp.appendChild(hr);
        temp.appendChild(menuElement.cloneNode(true));
    }
    
    printToPdf(temp, 'Полный отчет');
};

// КНОПКА ОЧИСТКИ

window.clearAllData = function() {
    if (confirm("Очистить все сохраненные данные?")) {
        clearSavedData();
        alert("Данные очищены! Страница обновится.");
        location.reload();
    }
};