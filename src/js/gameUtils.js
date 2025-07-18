export function handleTimeLimit(numTokens) {
    if (numTokens < 6) return 25;
    if (numTokens >= 6 && numTokens <= 7) return 30;
    if (numTokens >= 8 && numTokens <= 11) return 35; 
    if (numTokens >= 12 && numTokens < 20) return 45;
    if (numTokens >= 20 && numTokens < 30) return 60;
    return 75;
}

