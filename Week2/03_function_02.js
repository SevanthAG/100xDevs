// Write a function called canVote that returns true or false if the age of a user is > 18

function canVote(age){
    if (age >= 18) {
        console.log("You are eligible.")
    } else {
        console.log("You cannot vote")
    }
}

canVote(17)
canVote(67)