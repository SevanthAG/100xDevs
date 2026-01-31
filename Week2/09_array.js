// Write a function that takes an array of numbers as input, and returns a new array with only even values. Read about filter in JS

function EvenArray(arr) {
    let NewArr = []
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] %2  == 0) {
            NewArr.push(arr[i])
        }
    }
    return NewArr
}
arr = [1,2,3,4,5,6,7,8,9,10]
console.log(EvenArray(arr))