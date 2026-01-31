// Write a function that takes an array of users as inputs and returns only the users who are more than 18 years old

usr = [
    {
        nme: "Sevanth",
        age: 20
    },
    {
        nme: "Roshan",
        age: 16
    },
    {
        nme: "vasan",
        age: 4
    }
]

function MoreThan18(usr) {
    let More = []

    for (let i = 0; i < usr.length; i++) {
        if (usr[i].age > 18) {
            More.push(usr[i])
        }
    }

    return More
}

let A = MoreThan18(usr)
console.log(A)
