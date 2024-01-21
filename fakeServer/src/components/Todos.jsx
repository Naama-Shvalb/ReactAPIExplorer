import React, { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';


const Todos = () => {
    const { userId } = useParams();

    const [todos, setTodos] = useState('');
    const [isDone, setIsDone] = useState(false);
    const [forceRender, setForseRender] = useState(false);

    const currentUser = JSON.parse(localStorage.getItem("activeUser"));

    useEffect(()=>{

    fetch(`http://localhost:3000/todos?userId=${currentUser.id}`)
    .then(response => response.json())
    .then(json => {setTodos(json);});
    }, []);

    if(!todos){
        return <></>;
    }

    const handleCheckboxChange = (e, todo) => {
        console.log("checked:", e.target.checked);        
        // if (e.target.checked) {
        //     setIsDone(true);
        // }
        // else{
        // setIsDone(false);
        // }
        todo.completed = e.target.checked;
        updateTodo(todo);
       
    };

    const updateTodo = (todo) => {
      const updatedTodo = { "userId": todo.userId,
      "id": todo.id,
      "title": todo.title,
      "completed": todo.completed };

      console.log(todo);
      fetch(`http://localhost:3000/comments/${todo.id}`, {
        method: "PUT",
        body: JSON.stringify(updatedTodo ),
      })
        .then(response => response.json())
        .catch(error => console.error('Error:', error));

        console.log("second before", updatedTodo)
        setTodos(prevTodos => prevTodos.map((todo) => {
        return todo.id == updatedTodo.id ? updatedTodo : todo;
      }));

    };

    const compareAlphabetical = ( a, b ) => {
        if ( a.title < b.title ){
          return -1;
        }
        if ( a.title > b.title ){
          return 1;
        }
        return 0;
      };

    const compareSerially = ( a, b ) => {
      if ( a.id < b.id ){
        return -1;
      }
      if ( a.id > b.id ){
        return 1;
      }
      return 0;
    };

    const compareCompletion = ( a, b ) => {
      if ( a.completed < b.completed ){
        return -1;
      }
      if ( a.completed > b.completed ){
        return 1;
      }
      return 0;
    };
        
    const handleSelectTodos = (selectType) => {
        const currentTodos = todos;
        if(selectType === 'alphabetical'){
            currentTodos.sort(compareAlphabetical);
        }
        else if(selectType === 'serially'){
            currentTodos.sort(compareSerially);
        }
        else if(selectType === 'random'){
            currentTodos.sort((a, b) => 0.5 - Math.random());
        }
        else if(selectType === 'completion'){
            currentTodos.sort(compareCompletion);
        }
        console.log("todos usestate:", todos);

        setTodos(currentTodos);
        setForseRender(!forceRender);
        console.log("todos usestate after:", todos);

    };

  
    return(
        <>
        <h1>Todos</h1>
        <div>
            <div>
                <h2>Select todos for user {userId}:</h2>
                <button onClick={()=>handleSelectTodos('serially')} >Show serially</button>
                <button onClick={()=>handleSelectTodos('alphabetical')}>View in alphabetical order</button>
                <button onClick={()=>handleSelectTodos('completion')}>View by task completion</button>
                <button onClick={()=>handleSelectTodos('random')}>Show in random order</button>
            </div>
            {todos.map((todo, index) => (
                <div key={index}>
                    <p>{index}.  {todo.title}
                     <input type="checkbox" defaultChecked={todo.completed} value={isDone} onChange={()=>{handleCheckboxChange(event, todo); /*console.log("copleted:",todo.completed);*/}}/>
                    </p>
                    

                </div>


            ))}
        </div>
        </>

    );
};

export default Todos;