export function infModeProblemStreaks(winStreak, lossStreak) {
    if (winStreak % 5 == 0 && 10 <= winStreak < 30) {
        return [
            "YOU KNOW YOUR STUFF",
            "KING OF EQUATIONS, HUH?",
            "YOU'RE ON A HOT STREAK",
            "WE GOT A HOTSHOT HERE.",
            "LET 'EM KNOW",
        ]
    } else if (30 <= winStreak <= 50) {
        return [
            "THIS IS SOME EULER-LEVEL KNOWLEDGE..",
            "ELITE BALL KNOWLEDGE!!!",
            "IS THIS GAME TOO EASY FOR YOU?",
            "WHO LET HIM COOK???",
            "ALRIGHT BRO, WE SEE THE FIT",
            "FREDERICK CARL WHO? ISSAC WHO???"
        ]
    }

    if (lossStreak % 5 == 0 && 10 <= lossStreak < 30) {
        return [
            "ALRIGHT BRO, HIT THE BOOKS..",
            "NO HATE, BUT YOU GOT TO LOCK IN",
            "IS THIS YOUR FIRST RODEO??",
            "NO WORRIES, WE'VE ALL BEEN THERE.",
            "DO YOU EVEN MATH, BRO??",
            "WE'RE TOTALLY NOT ASHAMED OF YOU..",
            "IT'S OVER FOR YOU"
        ]
    }    
}

export function generalProblemStreaks(winStreak, lossStreak, numQuestions) {
    if (wins === numQuestions) {
        return [
            "THIS IS SOME EULER-LEVEL KNOWLEDGE..",
            "ELITE BALL KNOWLEDGE!!!",
            "IS THIS GAME TOO EASY FOR YOU?",
            "WHO LET HIM COOK???",
            "ALRIGHT BRO, WE SEE THE FIT",
            "FREDERICK CARL WHO? ISSAC WHO???",
        ]
    }
}

export function fisherYates(arr) { 
    // samples a random permutation, not derangements
    // acceptable if don't care about 1/N! chance of identity permutation
    let curr_idx = arr.length;
    if (curr_idx < 2) return [...arr];

    while (curr_idx != 0) {
        let rand_idx = Math.floor(Math.random() * curr_idx);
        curr_idx--;

        [arr[curr_idx], arr[rand_idx]] = [arr[rand_idx], arr[curr_idx]];
    }
}
export function fisherYatesWIKI(array) {
    // JS implementation from Wikipedia
    for (let i = array.length - 1; i >= 1; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


let arr = [2, 11, 37, 42];
fisherYates(arr);
console.log("Mine: ", arr);

let arr1 = [2, 11, 37, 42];
fisherYatesWIKI(arr1);
console.log("\nWIKI: ", arr1);
