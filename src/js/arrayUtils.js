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
