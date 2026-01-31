// Write a function called sum that finds the sum from 1 to a number

function sumLoop(num) {
    sumValue = 0
    for (let i = 1; i <= num; i++) {
        sumValue = sumValue + i   
    }

    return sumValue
}

console.log(sumLoop(10))


