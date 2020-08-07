import React, { Component } from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";

export default class TodoList extends Component {
  state = {
    todos: [],
    todoToShow: "all",
    toggleAllComplete: true,
  };

  toggleComplete = (id) => {
    this.setState((state) => ({
      todos: state.todos.map((todo) => {
        if (todo.id === id) {
          // suppose to update
          return {
            ...todo,
            complete: !todo.complete,
          };
        } else {
          return todo;
        }
      }),
    }));
  };

  updateTodoShow = (show) => {
    this.setState({
      todoToShow: show,
    });
  };

  addTodo = (todo) => {
    this.setState({
      todos: [todo, ...this.state.todos],
    });
    console.log(this.state);
  };

  deleteTodo = (id) => {
    this.setState((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    }));
  };

  removeAllCompletedTodo = () => {
    console.log("hello");
    this.setState((state) => ({
      todos: state.todos.filter((todo) => !todo.complete),
    }));
  };

  render() {
    let todos = [];
    if (this.state.todoToShow === "all") {
      todos = this.state.todos;
    } else if (this.state.todoToShow === "active") {
      todos = this.state.todos.filter((todo) => !todo.complete);
    } else {
      todos = this.state.todos.filter((todo) => todo.complete);
    }

    return (
      <div>
        <TodoForm addTodo={this.addTodo} />
        {todos.map((todo) => (
          <Todo
            key={todo.id}
            toggleComplete={() => this.toggleComplete(todo.id)}
            todo={todo}
            onDelete={() => this.deleteTodo(todo.id)}
          />
        ))}
        <div>
          Todos left: {this.state.todos.filter((todo) => !todo.complete).length}
        </div>
        <button onClick={() => this.updateTodoShow("all")}>all</button>
        <button onClick={() => this.updateTodoShow("active")}>active</button>
        <button onClick={() => this.updateTodoShow("complete")}>
          completed
        </button>
        {this.state.todos.some((todo) => todo.complete) ? (
          <div>
            <button onClick={() => this.removeAllCompletedTodo()}>
              Remove all completed todo's
            </button>
          </div>
        ) : null}
        <div>
          <button
            onClick={() =>
              this.setState((state) => ({
                todos: state.todos.map((todo) => ({
                  ...todo,
                  complete: state.toggleAllComplete,
                })),
                toggleAllComplete: !state.toggleAllComplete,
              }))
            }
          >
            toggle all complete: {`${this.state.toggleAllComplete}`}
          </button>
        </div>
      </div>
    );
  }
}
