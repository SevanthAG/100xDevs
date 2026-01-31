// Write an if/else statement that checks if a number is even or odd. If it's even, print "The number is even." Otherwise, print "The number is odd."

function even(number){
    if (number % 2 == 0) {
        console.log(number + " Its Even")
    } else {
        console.log(number + " Its Odd")
    }
}

even(78)
even(3)