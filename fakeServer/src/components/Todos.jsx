import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../contexts/UserProvider';
import '../styles/Global.css';

const Todos = () => {
  const { userId } = useParams();
  const { user } = useContext(UserContext);

  const [todos, setTodos] = useState('');
  const [title, setTitle] = useState('');
  const [completed, setCompleted] = useState('');
  const [forceRender, setForseRender] = useState(false);
  const [todoId, setTodoId] = useState('');
  const [isToAddTodo, setIsToAddTodo] = useState('');
  const [toUpdateTodoId, setToUpdateTodoId] = useState('');
  const [toSearchId, setToSearchId] = useState('');
  const [toSearchTitle, setToSearchTitle] = useState('');
  const [toSearchState, setToSearchState] = useState('');
  const [searchTodosdBy, setSearchTodosBy] = useState('');

  useEffect(() => {
    fetch(`http://localhost:3000/todos?userId=${user.id}`)
    .then(response => response.json())
    .then(json => {setTodos(json);});
    fetch("http://localhost:3000/nextID", {
      method: 'GET'
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setTodoId(json[0].nextTodoId);
      });
    }, []);

  if(!todos){
      return <></>;
  }

  todos.map((todo) => (
      todo.id = parseInt(todo.id)
  ));


  const handleCheckboxChange = (e, todo) => {
    console.log("checked:", e.target.checked);        
    //setCompleted(false);
    fetch(`http://localhost:3000/todos/${todo.id}`, {
            method: "PATCH",
            body: JSON.stringify({
                "completed": e.target.checked
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })
            .then((response) => response.json())
            .then((json) => console.log(json));

    setTodos(prevTodos => prevTodos.map((prevTodo) => {
        if(prevTodo.id === todo.id){
          prevTodo.completed = e.target.checked;
        }
        return (prevTodo);
      }));
      
  };

  const searchTodos = (propertytype, property) => {
    console.log("prr", propertytype, property);
    if (property === '' || property === undefined) {
      fetch(`http://localhost:3000/todos?userId=${user.id}`)
          .then(response => response.json())
          .then(json => setTodos(json));
    } else {
      fetch(`http://localhost:3000/todos?${propertytype}=${property}`)
          .then(response => response.json())
          .then(json => setTodos(json));
    }
    console.log("ttt", todos); 
  };

  const deleteTodo = (todoId) => {
    fetch(`http://localhost:3000/todos/${todoId}`, {
      method: "DELETE",
    })
      .then(response => response.json());

      setTodos(prevTodos => prevTodos.filter(todo => { return todo.id !== todoId; }));
    };
   
  const addNewTodo = () => {
    updateNextTodoId();
    const addedTodo = {  
    "userId": `${user.id}`, 
    "id": `${todoId}`,
    "title": title, 
    "completed": completed }; 
    fetch('http://localhost:3000/todos', {
      method: 'POST',
      body: JSON.stringify(addedTodo),
    })
      .then(response => response.json())
      .catch(error => console.error('Error:', error));

    setTodos(prevTodos => [...prevTodos, addedTodo]);
    setTitle('');
    setCompleted('');
    setIsToAddTodo(false);  
    getAndSetNextTodoId();
  };

  const updateTodo = (todo) => {
    const updatedTodo = { 
        "userId": `${todo.userI}`,
        "id": `${todo.id}`,
        "title": title,
        "completed": todo.completed
    };
    console.log(todo.id);

    fetch(`http://localhost:3000/todos/${todo.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          "title":title,
        }),
    })
    .then(response => response.json())
    .catch(error => console.error('Error:', error));

    setTodos(prevTodos => prevTodos.map((prevTodo) => {
       return prevTodo.id === todo.id ? updatedTodo : prevTodo
    }));
    setToUpdateTodoId('');
    setTitle('');
  };

  
  const cancel = () => {
    setIsToAddTodo(false);
    setToUpdateTodoId('');
    setSearchTodosBy('');
    setToSearchId('');
    setTitle('');
  };

  const getAndSetNextTodoId = () => {
    fetch("http://localhost:3000/nextID", {
      method: 'GET'
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setTodoId(json[0].nextTodoId);
      });
  };

  const updateNextTodoId = () => {
    fetch("http://localhost:3000/nextID/1", {
      method: "PATCH",
      body: JSON.stringify({
        "nextTodoId": todoId + 1
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  };

  const compareAlphabetical = (a, b) => {
    if (a.title < b.title) {
      return -1;
    }if (a.title > b.title) {
      return 1;
    }
    return 0;
  };

  const compareSerially = (a, b) => {
    if (a.id < b.id) {
      return -1;
    }if (a.id > b.id) {
      return 1;
    }
    return 0;
  };

  const compareCompletion = (a, b) => {
    if (a.completed < b.completed) {
      return -1;
    }if (a.completed > b.completed) {
      return 1;
    }
    return 0;
  };

  const handleSelectTodos = (selectType) => {
    const currentTodos = todos;
    if (selectType === 'alphabetical') {
      currentTodos.sort(compareAlphabetical);
    }
    else if (selectType === 'serially') {
      currentTodos.sort(compareSerially);
    }
    else if (selectType === 'random') {
      currentTodos.sort((a, b) => 0.5 - Math.random());
    }
    else if (selectType === 'completion') {
      currentTodos.sort(compareCompletion);
    }
    console.log("todos usestate:", todos);

        setTodos(currentTodos);
        setForseRender(!forceRender);
        console.log("todos usestate after:", todos);
    };

  
    return(
        <>
        <div className="container">
        <h1 className="heading">Todos</h1>
        <div>
          <div className="section search-section">
            <h2>Search Todos</h2>
            {searchTodosdBy ==='id' ?
              <>
              <input
                  type="number"
                  placeholder="id"
                  value={toSearchId}
                  onChange={(e) => setToSearchId(e.target.value)}
              />
              <button onClick={() => searchTodos(searchTodosdBy, toSearchId)}>search</button>
              <button onClick={() => { cancel(); }}>cancel</button><br />
              </>
              :searchTodosdBy === 'title'?
                <>
                <input
                    type="text"
                    placeholder="title"
                    value={toSearchTitle}
                    onChange={(e) => setToSearchTitle(e.target.value)}
                />
                <button onClick={() => searchTodos(searchTodosdBy, toSearchTitle)}>search</button>
                <button onClick={() => { cancel(); }}>cancel</button><br />
                </>
                :searchTodosdBy === 'completed'?
                <>
                <input
                    type="text"
                    placeholder="is complited?"
                    value={toSearchState}
                    onChange={(e) => setToSearchState(e.target.value)}
                />
                <button onClick={() => searchTodos(searchTodosdBy, toSearchState == 'true')}>search</button>
                <button onClick={() => { cancel(); }}>cancel</button><br />
                </>
                :<>
                <button onClick={()=>setSearchTodosBy('id')}>search by id:</button>
                <button onClick={()=>setSearchTodosBy('title')}>search by title:</button>
                <button onClick={()=>setSearchTodosBy('completed')}>search by state:</button>
                </>
            }
          </div>

          <div className="actions item-actions">
              <h2>Select todos for user {userId}:</h2>
              <button onClick={()=>handleSelectTodos('serially')} >Show serially</button>
              <button onClick={()=>handleSelectTodos('alphabetical')}>View in alphabetical order</button>
              <button onClick={()=>handleSelectTodos('completion')}>View by task completion</button>
              <button onClick={()=>handleSelectTodos('random')}>Show in random order</button>
          </div>
          {todos.map((todo, index) => (
              <div key={todo.id} className="item">
                <div className="item-content">
                  <p>{todo.id}.  {todo.title}
                    <input 
                    type="checkbox" 
                    defaultChecked={todo.completed}
                    value={completed} onChange={()=>{handleCheckboxChange(event, todo);}}
                    />
                  </p>
                </div>
                  { <>
                    <div className="actions item-actions">
                      <button onClick={() => deleteTodo(todo.id)}>delete todo</button>
                      {toUpdateTodoId === todo.id ? 
                      <>
                          <input
                              type="text"
                              placeholder="title"
                              value={title}
                              onChange={(e) => setTitle(e.target.value)}
                          />
                          <button onClick={() => { updateTodo(todo); }}>update</button>
                          <button onClick={() => { cancel(); }}>cancel</button>
                      </>
                          : <button onClick={() => setToUpdateTodoId(todo.id)}>update todo</button>
                      }
                    </div>
                  </>}
              </div>
          ))}
          <div className="section add-section">
          {isToAddTodo ?
          <>
          <input
            type="text"
            placeholder="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
              type="text"
              placeholder="is complited?"
              value={completed}
              onChange={(e) => setCompleted(e.target.value)}
          />
          <button onClick={() => addNewTodo()}>add</button>
          <button onClick={() => { cancel(); }}>cancel</button><br />
          </>
          : <button onClick={() => setIsToAddTodo(true)}>add todo</button>
          }
      </div>
    </div>
    </div>
  </>

  );
};

export default Todos;