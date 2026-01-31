// Create a function that takes an array of objects as input,
// and returns the users whose age > 18 and are male


let usr = [
    {
        nme: "Sevanth",
        age: 20,
        gender: "M"
    },
    {
        nme: "Roshan",
        age: 16,
        gender: "M"
    },
    {
        nme: "vasanthi",
        age: 4,
        gender: "F"

    }
]

function Checker(usr){
    let checkResult = []

    for (let i = 0; i < usr.length; i++) {
        if (usr[i].age > 18 && usr[i].gender == "M"){
            checkResult.push(usr[i])

        }
    }
    return checkResult
}

Result = Checker(usr)
console.log(Result)