import React, { useState, useEffect} from 'react';


const Todos = () => {

    const [todos, setTodos] = useState('');
    const [isDone, setIsDone] = useState(false);

    const users = JSON.parse(localStorage.getItem("storedUsers"));
    const currentUser = users[users.length-1];

    useEffect(()=>{
    fetch(`http://localhost:3000/todos?userId=${currentUser.id}`)
    .then(response => response.json())
    .then(json => {setTodos(json)})
    })

    if(!todos){
        return <></>
    }

    const handleCheckboxChange = (e) => {
        console.log("checked:", e.target.checked)        
        if (e.target.checked) {
            setIsDone(true);
        }
        setIsDone(false);
    }

   
    return(
        <>
        <h1>Todos</h1>
        <div>
            {todos.map((todo, index) => (
                <div key={index}>
                    <p>{index}.  {todo.title} <input type="checkbox" defaultChecked={todo.completed} value={isDone} onChange={()=>{handleCheckboxChange(event); console.log("copleted:",todo.completed)}}/>
                    </p>
                    

                </div>
                


            ))}
        </div>
        </>

    )
}

export default Todos