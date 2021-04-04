import React from 'react';
import { httpRequest } from '../services/httpRequest';
import Header from './Header';

class Home extends React.Component {
    state = {
        todo: "",
        todoList: [],
        counter: 10,
        headerTitle: "Todo List"
    }
    
    onAdd() {
        let newState = { ...this.state };
        let singleTodo = {
            title: newState.todo,
            complete: false
        }
        newState.todo = "";

        httpRequest.post("todos", singleTodo).then((res) => {
            newState.todoList.push(res.data);
            newState.todo1 = "demo value";
            this.setState(newState);
        })

    }

    componentDidMount() {
        let newState = { ...this.state };
        httpRequest.get("todos").then((res) => {
            newState.todoList = [...res.data];
            this.setState(newState)
        })
    }

    onDelete(id, index) {
        httpRequest.delete("todos/" + id).then((res) => {
            let todoList = [...this.state.todoList];
            todoList.splice(index, 1);
            this.setState({
                todoList: todoList
            })
        })
    }

    updateTodo(todo, index, event) {
        let checked = event.target.checked;
        httpRequest.patch("todos/" + todo.id, { complete: checked }).then((res) => {
            let todoList = [...this.state.todoList];
            todoList[index].complete = checked;
            this.setState({
                todoList: todoList
            })
        })

    }

    render() {
        console.log("this.state", this.state)
        return <div className="todo-list-container container-fluid">
            <div className="row">
                <div className="col">

                </div>
                <div className="col">
                    <div className="todo-box">

                        <div onClick={ ()=> this.setState({headerTitle: "new Title"}) } >
                            <Header title={ this.state.headerTitle } />
                        </div>

                        <div className="todo-form">
                            <div className="input-group">

                                <input type="text" className="form-control" placeholder="Add your todo" value={this.state.todo} onChange={(e) => this.setState({ todo: e.target.value })} />
                                <button className="btn btn-primary add-icon" id="btnGroupAddon" onClick={this.onAdd.bind(this)}></button>
                            </div>
                        </div>
                        <p>
                            You have {this.state.todoList.length} pending tasks
                        </p>
                        <div className="todo-list">
                            <ul className="list-group">
                                {
                                    this.state.todoList.map((singleTodo, index) => {
                                        let liClasses = "";
                                        if (singleTodo.complete) {
                                            liClasses = "completed-item"
                                        }
                                        return <li className="list-group-item" key={singleTodo.id} >

                                            <h3 className={liClasses}> <input type="checkbox" checked={singleTodo.complete} onChange={this.updateTodo.bind(this, singleTodo, index)} /> {singleTodo.title} <button className="btn btn-danger pull-right" onClick={this.onDelete.bind(this, singleTodo.id, index)} >Delete</button> </h3>

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
}

export default Home;