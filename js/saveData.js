const Storage_Key = {
    FormData :"my_calory",
    ResultData:"result",
    MenuData:"menu"
    
}
export function saveFormData(){
    const userData = {
        weight:document.getElementById("massa").value,
        age:document.getElementById("age").value,
        height:document.getElementById("rost").value,
        gender:document.getElementById("male").checked ? "male":"female",
        activity: getCheckedRadioValue('skill'),
        goal: getCheckedRadioValue('goal'),
        savedAt: new Date().toISOString()

    }
    localStorage.setItem(Storage_Key.FormData,JSON.stringify(userData))
    console.log("Данные сохранены успешно",userData)
}

export function loadForm(){
    const saveData = localStorage.getItem(Storage_Key.FormData)

    if(!saveData){
        console.log("Нет сохранения данных")
        return false
    }
    const data = JSON.parse(saveData)
    if(data.weight) document.getElementById("massa").value = data.weight
    if (data.age) document.getElementById('age').value = data.age;
    if (data.height) document.getElementById('rost').value = data.height;

    if(data.gender === "male"){
        document.getElementById("male").checked = true
    }else{
        document.getElementById("female").checked = true
    }

    if (data.activity) {
        document.getElementById(data.activity).checked = true;
    }
    if (data.goal) {
        document.getElementById(data.goal).checked = true;
    }
    console.log("данные загружены")
    return true

}
export function saveResultData(result){
    const resultData = {
        finalCalor: result.finalCalor,
        proteins: result.proteins,
        fats: result.fats,
        carbs: result.carbs,
        bmr: result.bmr,        
        maintenance: result.maintenance, 
        calculatedAt: new Date().toISOString()
    }
    localStorage.setItem(Storage_Key.ResultData,JSON.stringify(resultData))
    console.log("Результат сохранен", resultData)


}
 export function loadResultData(){
    const saveData = localStorage.getItem(Storage_Key.ResultData)
    if(!saveData){
        console.log("нет сохранения")
        return null
    }
    const data = JSON.parse(saveData)
     console.log("📀 Результаты расчета загружены");
    return data;
}
function getCheckedRadioValue(name){
    const radios = document.querySelectorAll(`input[name ="${name}"] `)
    for(let radio of radios){
        if(radio.checked){
            return radio.id
        }
    }
    return null

}
export function saveMenuData(menuType, menuHtml, totalCalories){
    const menuData = {
        type:menuType,
        html:menuHtml,
        totalCalories:totalCalories,
        savedAt: new Date().toISOString()
    }
    localStorage.setItem(Storage_Key.MenuData,JSON.stringify(menuData))
    console.log(`✅ ${menuType === 'day' ? 'Дневное' : 'Недельное'} меню сохранено`);
}
export function loadMenuData(){
    const saveData = localStorage.getItem(Storage_Key.MenuData)
    if(!saveData){
        console.log("нет сохранения")
        return null
    }
    const data = JSON.parse(saveData)
    console.log("📀 Меню загружено из сохранения");
    return data;
}
export function restoreSavedMenu(resultDiv){
    const savedMenu = loadMenuData()
    if (savedMenu && savedMenu.html && resultDiv) {
        
        const oldMenuDay = document.querySelector('.menu-day');
        const oldMenuWeek = document.querySelector('.menu-week');
        if (oldMenuDay) oldMenuDay.remove();
        if (oldMenuWeek) oldMenuWeek.remove();
        
        
        resultDiv.insertAdjacentHTML('beforeend', savedMenu.html);
        console.log(`🔄 Сохраненное ${savedMenu.type === 'day' ? 'дневное' : 'недельное'} меню восстановлено`);
        return true;
    }
    return false;
}

export function clearSavedData() {
    localStorage.removeItem(Storage_Key.FormData);
    localStorage.removeItem(Storage_Key.ResultData);
    localStorage.removeItem(Storage_Key.MenuData); 
    console.log('🗑️ Все сохраненные данные (форма, результаты, меню) удалены');
}

