import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../contexts/UserProvider';

const Todos = () => {
  const { userId } = useParams();

  const [todos, setTodos] = useState('');
  //const [isDone, setIsDone] = useState(false);
  const [title, setTitle] = useState('');
  const [copleted, setComplited] = useState('');
  const [forceRender, setForseRender] = useState(false);
  const [todoId, setTodoId] = useState('');
  const [isToAddTodo, setIsToAddTodo] = useState('');
  const [toUpdateTodoId, setToUpdateTodoId] = useState('');
  const [isToSearchTodo, setIsToSearchTodo] = useState(false);

  //const currentUser = JSON.parse(localStorage.getItem("activeUser"));
  const { user } = useContext(UserContext);

  useEffect(() => {

    fetch(`http://localhost:3000/todos?userId=${user.id}`)
      .then(response => response.json())
      .then(json => { setTodos(json); });
    fetch("http://localhost:3000/nextID", {
      method: 'GET'
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setTodoId(json[0].nextTodoId);
      });
  }, []);

  if (!todos) {
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

  const searchTodos = (propertytype, property) => {
    fetch(`http://localhost:3000/todos?${propertytype}=${property}`)
      .then(response => response.json())
      .then(json => { setTodos(json); });
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
    // const ID = (posts == undefined || posts == '') ? 1 : parseInt(posts[posts.length - 1].id) + 1;
    const addedTodo = {
      "id": `${todoId}`,
      "userId": user.id,
      "title": title,
      "completed": copleted
    };
    fetch('http://localhost:3000/todos', {
      method: 'POST',
      body: JSON.stringify(addedTodo),
    })
      .then(response => response.json())
      .catch(error => console.error('Error:', error));

    setTodos(prevTodos => [...prevTodos, addedTodo]);
    setTitle('');
    setIsToAddTodo(false);
    getAndSetNextTodoId();
  };

  const handleUpdateTodo = (todoToUpdate) => {
    let todoToUpdateId;
    todos.map((todo, index) => {
      if (todoToUpdate.id === todo.id) {
        todoToUpdateId = index;
      }
    });
    setToUpdateTodoId(todoToUpdateId);
  };

  const updateTodo = (todo) => {
    const updatedTodo = {
      "userId": todo.userId,
      "id": todo.id,
      "title": title,
      "completed": todo.completed
    };

    fetch(`http://localhost:3000/todos/${todo.id}`, {
      method: "PUT",
      body: JSON.stringify(updatedTodo),
    })
      .then(response => response.json())
      .catch(error => console.error('Error:', error));

    setTodos(prevTodos => prevTodos.map((prevTodo) =>
      prevTodo.id === updatedTodo.id ? updatedTodo : prevTodo
    ));
    setToUpdateTodoId('');
  };


  const cancel = () => {
    setIsToAddTodo(false);
    setToUpdateTodoId('');
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
    }
    if (a.title > b.title) {
      return 1;
    }
    return 0;
  };

  const compareSerially = (a, b) => {
    if (a.id < b.id) {
      return -1;
    }
    if (a.id > b.id) {
      return 1;
    }
    return 0;
  };

  const compareCompletion = (a, b) => {
    if (a.completed < b.completed) {
      return -1;
    }
    if (a.completed > b.completed) {
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


  return (
    <>
      <h1>Todos</h1>
      <div>
        <div>
          <h2>Search Todos</h2>
          <button onClick={() => searchTodos('id',)}>search by numer:</button>
        </div>

        <div>
          <h2>Select todos for user {userId}:</h2>
          <button onClick={() => handleSelectTodos('serially')} >Show serially</button>
          <button onClick={() => handleSelectTodos('alphabetical')}>View in alphabetical order</button>
          <button onClick={() => handleSelectTodos('completion')}>View by task completion</button>
          <button onClick={() => handleSelectTodos('random')}>Show in random order</button>
        </div>
        {todos.map((todo, index) => (
          <div key={index}>
            <p>{index}.  {todo.title}
              <input type="checkbox" defaultChecked={todo.completed} value={copleted} onChange={() => { handleCheckboxChange(event, todo); }} />
            </p>
            {/*comment.email == currentUser.email &&*/ <>
              <button onClick={() => deleteTodo(todo.id)}>delete todo</button>
              {toUpdateTodoId === index ?
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
                : <button onClick={() => handleUpdateTodo(todo)}>update todo</button>
              }
            </>}
          </div>
        ))}
        {isToAddTodo ?
          <>
            <input
              type="text"
              placeholder="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <button onClick={() => addNewTodo(todoId)}>add</button>
            <button onClick={() => { cancel(); }}>cancel</button><br />
          </>
          : <button onClick={() => setIsToAddTodo(true)}>add comment</button>
        }
      </div>
    </>

  );
};

export default Todos;