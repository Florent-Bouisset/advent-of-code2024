// Solution for day03

import { readFileSync } from "node:fs"
import { join, dirname } from "node:path"
import { fileURLToPath } from 'node:url';

console.time("total-run-time")

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const input = readFileSync(join(__dirname, "input.txt"), {encoding: 'utf8'})

const regex = new RegExp(/mul\((\d+),(\d+)\)/gm);

let parsed;
let sum = 0;

while(true) {
    parsed = regex.exec(input);

    if(parsed === null) {
        break;
    }
    const[_, a, b] = parsed;
    sum += a*b;
}

console.log("Result for part 1 is:", sum)



// PART 2
const regexPart2 = new RegExp(/mul\((\d+),(\d+)\)|do\(\)|don\'t\(\)/gm);
let sumP2 = 0;
let allow = true;
while(true) {
    parsed = regexPart2.exec(input);
    if(parsed === null) {
        break;
    }
    if(parsed[0] === "do()") {
        allow = true;
    } else if(parsed[0] === "don't()") {
        allow = false;
    } else if(allow) {
        const[_, a, b] = parsed;
        sumP2 += a*b;
    }
}

console.log("Result for part 2 is:", sumP2)


console.timeEnd("total-run-time")
