export function calculateBMR(weight, height, age, gender) {
    if (gender === 'male') {
        return (10 * weight) + (6.25 * height) - (5 * age) + 5;
    } else if (gender === 'female') {
        return (10 * weight) + (6.25 * height) - (5 * age) - 161;
    }
    return 0;
}

export function calculateActivityMultiplier(activityLevel, bmr) {
    const multipliers = {
        niz: 1.2,
        norm: 1.375,
        max: 1.55
    };
    return bmr * (multipliers[activityLevel] || 1);
}

export function calculateGoalMultiplier(goal) {
    const multipliers = {
        lose: 0.9,
        stay: 1.0,
        gain: 1.1
    };
    return multipliers[goal] || 1;
}

export function calculateMacros(calories) {
    const proteins = (calories * 0.2) / 4;
    const fats = (calories * 0.3) / 9;
    const carbs = (calories * 0.5) / 4;
    return { proteins, fats, carbs };
}