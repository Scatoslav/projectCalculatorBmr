export function messageCal(deviation, targetCal) {
    const absDeviation = Math.abs(deviation);
    if(deviation > 0){
        if(absDeviation > 100){
            return {
                message:"Вы превысили калорийность! Рекомендуем повысить свою физическую активность (легкая прогулка или пробежка)"
            };
        }
    } else if(deviation < 0){
        if(absDeviation > 150){
            return {
                message:"Вы не добрали калорийность! Рекомендуем съесть чего-нибудь вкусного, но в пределах разумного"
            };
        }
    }
    return null;
}

export function removeOldMenu() {
    const oldMenuDay = document.querySelector('.menu-day');
    const oldMenuWeek = document.querySelector('.menu-week');
    if (oldMenuDay) oldMenuDay.remove();
    if (oldMenuWeek) oldMenuWeek.remove();
}

export function getRandomMeal(recipes, targetCal) {
    const sorted = [...recipes].sort((a, b) => 
        Math.abs(a.calories - targetCal) - Math.abs(b.calories - targetCal)
    );
    const top5 = sorted.slice(0, 5);
    return top5[Math.floor(Math.random() * top5.length)];
}