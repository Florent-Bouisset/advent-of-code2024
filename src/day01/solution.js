// Solution for day01
import { readFileSync } from "node:fs"
import { join, dirname } from "node:path"
import { fileURLToPath } from 'node:url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const input = readFileSync(join(__dirname, "input.txt"), {encoding: 'utf8'})
const rows = input.split("\n");
const colA = []
const colB = [] 

rows.forEach((row) => {
    // Split the string by any whitespace (one or more spaces)
    const [rawItemA, rawItemB] = row.split(/\s+/);
    colA.push(parseInt(rawItemA, 10))
    colB.push(parseInt(rawItemB, 10))
})

colA.sort((a, b) => a - b)
colB.sort((a, b) => a - b)

let result = 0;
for(let i = 0; i < colA.length; i++) {
    result += Math.abs(colA[i] - colB[i])
}

console.log("Part 1 result is:", result)

// PART 2

let result2 = 0;
for(let i = 0; i < colA.length; i++) {
    for(let j=0; j < colB.length; j++) {
        if(colA[i] === colB[j]) {
            result2 += colA[i];
        } else if (colA[i] < colB[j]) {
            // this number is not present because the array are sorted
            break;
        }
    }
}

console.log("Part 2 result is:", result2)
