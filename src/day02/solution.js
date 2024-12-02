// Solution for day02
// Solution for day01
import { readFileSync } from "node:fs"
import { join, dirname } from "node:path"
import { fileURLToPath } from 'node:url';

console.time("total-run-time")

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const input = readFileSync(join(__dirname, "input.txt"), {encoding: 'utf8'})
const rows = input.split("\n");
const reports = []

rows.forEach((row) => {
    // Split the string by any whitespace (one or more spaces)
    const report = row.split(/\s+/);
    const formattedReport = report.map((el) => parseInt(el, 10));
    reports.push(formattedReport)
})


function isMonotonous(array) {
    let increasing = null;
    let newIncreasing;
    for(let i = 0; i < array.length; i++) {
        if(i > 0) {
            if(array[i] === array[i -1]) {
                return false;
            } else if (array[i] > array[i -1]) {
                newIncreasing = true;
            } else if (array[i] < array[i -1]) {
                newIncreasing = false;
            }

            if(increasing === null) {
                increasing = newIncreasing;
            } else if(increasing !== newIncreasing) {
                return false;
            }
        } 
    }
    return true;
}

function isLittleVariation(array) {
    for(let i = 0; i < array.length; i++) {
        if(i > 0) {
            let diff = array[i] - array[i -1];
            if(Math.abs(diff) > 3) {
                return false;
            }
        }
    }
    return true;
}

let okReports = 0;
reports.forEach((el) => {
    let isOK = isMonotonous(el) && isLittleVariation(el);
    okReports += isOK ? 1 : 0;
})

console.log("Part 1 - Number of OK reports: ", okReports)

// PART 2

let okReportsPart2 = 0

reports.forEach((el) => {
    let combinations = [];
    for(let i = 0; i < el.length; i++) {
        let newArr = [...el];
        newArr.splice(i, 1);
        combinations.push(newArr);
    }
    combinations.push(el);
    let foundOne = combinations.find((el) => isMonotonous(el) && isLittleVariation(el))
    okReportsPart2 += foundOne ? 1 : 0;
})

console.log("Part 2 - Number of OK reports: ", okReportsPart2)
console.timeEnd("total-run-time")
