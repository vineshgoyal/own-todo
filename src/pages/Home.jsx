import React from 'react';
import { httpRequest } from '../services/httpRequest';
import { ToasterContext } from '../services/toasterContext';
import Header from './Header';
class Home extends React.Component {
    state = {
        todo: "",
        todoList: [],
        counter: 10,
        headerTitle: "Todo List",
        error: null
    }

    static contextType = ToasterContext;

    onAdd() {
        if (this.state.todo == "") {
            this.setState({
                error: "To create new todo, Need some text."
            });
            return;
        }
        let newState = { ...this.state };
        let singleTodo = {
            title: newState.todo,
            complete: false
        }
        newState.todo = "";

        httpRequest.post("todos", singleTodo).then((res) => {
            newState.todoList.push(res.data);
            newState.todo1 = "demo value";
            newState.error = null;
            this.context.showToaster(<span className="text-success">A new Todo added</span>);
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
            let deletedTodo = todoList.splice(index, 1);
            console.log('deletedTodo:', deletedTodo)
            this.setState({
                todoList: todoList
            })
            this.context.showToaster(<span className="text-danger">The Todo (<b>{deletedTodo[0].title}</b>) has deleted.</span>);
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
                            <p className='text-danger'>{this.state.error}</p>
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