import React, { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';


const Todos = () => {
    const { userId } = useParams();

    const [todos, setTodos] = useState('');
    const [isDone, setIsDone] = useState(false);


    const currentUser = JSON.parse(localStorage.getItem("activeUser"));


    useEffect(()=>{

    fetch(`http://localhost:3000/todos?userId=${currentUser.id}`)
    .then(response => response.json())
    .then(json => {setTodos(json);});
    });

    if(!todos){
        return <></>;
    }

    const handleCheckboxChange = (e) => {
        console.log("checked:", e.target.checked);        
        if (e.target.checked) {
            setIsDone(true);
        }
        setIsDone(false);
    };

    const handleSelectTodos = () => {

    };

   
    return(
        <>
        <h1>Todos</h1>
        <div>
            <div>
            <h2>Select todos for user {userId}</h2>
            <button></button>
            <button></button>
            <button></button>
            <button></button>
            </div>
            {todos.map((todo, index) => (
                <div key={index}>
                    <p>{index}.  {todo.title} <input type="checkbox" defaultChecked={todo.completed} value={isDone} onChange={()=>{handleCheckboxChange(event); console.log("copleted:",todo.completed);}}/>
                    </p>
                    

                </div>


            ))}
        </div>
        </>

    );
};

export default Todos;