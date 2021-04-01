import React from 'react';
import { httpRequest } from '../services/httpRequest';

function Home(){
    const [todoList, setTodoList] = React.useState([]);
    const [todo, setTodo] = React.useState("");

    function onAdd(){
        let singleTodo = {
            title: todo,
            complete: false
        }
        
        httpRequest.post("todos", singleTodo).then((res)=>{
            todoList.push(res.data);
            setTodoList([...todoList]);
            setTodo("");
        })
        
    }

    React.useEffect( function(){
        httpRequest.get("todos").then((res)=>{
                    setTodoList([...res.data])
                })
    }, [])
    
    // componentDidMount(){
    //     let newState = {...this.state};
    //     httpRequest.get("todos").then((res)=>{
    //         newState.todoList = [...res.data];
    //         this.setState(newState)
    //     })
    // }

    // onDelete(id, index){
    //     httpRequest.delete("todos/" + id).then((res)=>{
    //         let todoList = [...this.state.todoList];
    //         todoList.splice(index,1);
    //         this.setState({
    //             todoList: todoList
    //         })
    //     })
    // }

    // updateTodo(todo, index, event){
    //     let checked = event.target.checked;
    //     httpRequest.patch("todos/" + todo.id, {complete: checked } ).then((res)=>{
    //         let todoList = [...this.state.todoList];
    //         todoList[index].complete = checked;
    //         this.setState({
    //             todoList: todoList
    //         })
    //     })

    // }

        return <div className="todo-list-container container-fluid">
            <div className="row">
                <div className="col">

                </div>
                <div className="col">
                    <div className="todo-box">
                        <h1>
                            Todo List
                        </h1>
                       
                        <div className="todo-form">
                            <div className="input-group">
                                
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Add your todo" 
                                    value={todo} 
                                    onChange={ (e)=> setTodo(e.target.value) } 
                                />
                                <button className="btn btn-primary add-icon" id="btnGroupAddon" onClick={ onAdd }></button>
                            </div>
                        </div>
                        <p>
                            You have {todoList.length} pending tasks
                        </p>
                        <div className="todo-list">
                            <ul className="list-group">
                                {
                                    todoList.map((singleTodo, index)=> {
                                        let liClasses = "";
                                        if(singleTodo.complete){
                                            liClasses = "completed-item"
                                        }
                                        return <li className="list-group-item" key={singleTodo.id} >
                                                
                                                <h3 className={liClasses}> 
                                                    
                                                    {singleTodo.title} 
                                                   
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