import React, { useEffect, useState } from 'react';
import { httpRequest } from '../services/httpRequest';
import Header from './Header';
function Home() {
    const [todoList, setTodoList] = useState([]);
    const [todo, setTodo] = useState("");
    const [header, setHeader] = useState("Default HEader");
    React.useEffect(function () {
        httpRequest.get("todos").then((res) => {
            console.log('res:', res.data)
            setTodoList([...res.data])
        })
    }, [])

    function onAdd() {
        let singleTodo = {
            title: todo,
            complete: false
        }

        httpRequest.post("todos", singleTodo).then((res) => {
            todoList.push(res.data);
            setTodoList([...todoList]);
            setTodo("");
        })

    }

    

    function onDelete(id, index) {
        httpRequest.delete("todos/" + id).then((res) => {
            let tempTodoList = [...todoList];
            tempTodoList.splice(index, 1);
            setTodoList(tempTodoList)
        })
    }

    function updateTodo(todo, index, event) {
        let checked = event.target.checked;
        httpRequest.patch("todos/" + todo.id, { complete: checked }).then((res) => {
            let tempTodoList = [...todoList];
            tempTodoList[index].complete = checked;
            setTodoList(tempTodoList)
        })

    }

    function changeHeader(){
        setHeader("new Header" + Math.random().toFixed(2))
    }
    console.log("render")
    return <div className="todo-list-container container-fluid">
        <div className="row">
            <div className="col">

            </div>
            <div className="col">
                <div className="todo-box">
                    <div onClick={changeHeader}>
                        <Header title={header} />
                    </div>

                    <div className="todo-form">
                        <div className="input-group">

                            <input
                                type="text"
                                className="form-control"
                                placeholder="Add your todo"
                                value={todo}
                                onChange={(e) => setTodo(e.target.value)}
                            />
                            <button className="btn btn-primary add-icon" id="btnGroupAddon" onClick={onAdd}></button>
                        </div>
                    </div>
                    <p>
                        You have {todoList.length} pending tasks
                        </p>
                    <div className="todo-list">
                        <ul className="list-group">
                            {
                                todoList.map((singleTodo, index) => {
                                    let liClasses = "";
                                    if (singleTodo.complete) {
                                        liClasses = "completed-item"
                                    }
                                    return <li className="list-group-item" key={singleTodo.id} >

                                        <h3 className={liClasses}>
                                            <input type="checkbox" checked={singleTodo.complete} onChange={updateTodo.bind(null, singleTodo, index)} />
                                            {singleTodo.title}
                                            <button className="btn btn-info pull-right">Edit</button>
                                            <button className="btn btn-danger pull-right" onClick={onDelete.bind(null, singleTodo.id, index)} >Delete</button>
                                        </h3>

                                    </li>
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
            <div className="col">

            </div>
        </div>
    </div>
}

export default Home;