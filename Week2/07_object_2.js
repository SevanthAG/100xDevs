// Write a function that takes a new object as input which has name , age  and gender and greets the user with their gender (Hi Mr/Mrs/Others harkirat, your age is 21)

user1 = {
    nme: "Harkirat",
    surName : "Mr",
    age: 30,
    gender : "M"
}

user2 = {
    nme: "sevanth",
    surName : "Mr",
    age: 20,
    gender : "M"
}


user3 = {
    nme: "Ladki",
    surName : "Mrs",
    age: 19,
    gender : "F"
}


function greet(user){
    console.log("Hi " + user.surName +" " + user.nme + " Your age is " + user.age)
}

greet(user1)