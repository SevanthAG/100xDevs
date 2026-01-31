// Write a function that takes a user as an input and greets them with their name and age

user1 = {
    nme: "Harkirat",
    age: 30
}

user2 = {
    nme: "sevanth",
    age: 20
}


user3 = {
    nme: "roshan",
    age: 25
}

function greet(user){
    console.log("Hello " + user.nme)
    console.log("Your age is "+user.age)
}

greet(user1)