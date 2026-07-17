let index = 1;

function addMe(){
    const content = document.getElementById("mytodo");
    if(content.value === ""){
        return
    }
    
    const todo = content.value

    const newDiv = document.createElement("div")
    newDiv.setAttribute("id", "todo" +index)
    newDiv.innerHTML = todo

    const DeleteButton = document.createElement("button")
    DeleteButton.setAttribute("onclick", "deleteMe("+ index +")")
    DeleteButton.innerHTML = "Delete Me"
    newDiv.appendChild(DeleteButton)
    
    const OldDiv = document.getElementById("Todo");
    OldDiv.appendChild(newDiv)
    index = index + 1

    content.value = ""
}

function deleteMe(index){
    const deleteTodo = document.getElementById("todo"+index);
    deleteTodo.remove()
}