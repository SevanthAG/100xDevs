// Also tell the user if they are legal to vote or not

user1 = {
    nme: "Harkirat",
    surName: "Mr",
    age: 30,
    gender: "M"
}

user2 = {
    nme: "sevanth",
    surName: "Mr",
    age: 16,
    gender: "M"
}


user3 = {
    nme: "Ladki",
    surName: "Mrs",
    age: 14,
    gender: "F"
}


function greet(user) {
    console.log("Hi " + user.surName + " " + user.nme + " Your age is " + user.age)
    if (user.age >= 18) {
        console.log("You are eligible to Vote.")
    } else {
        console.log("You cannot vote")
    }
}

greet(user1)