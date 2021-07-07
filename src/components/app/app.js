import React from 'react';
import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import AddTodo from '../todo-list-add';

import './app.css';

class App extends React.Component {

  for_new_todo = 200

  state = {
    todoData: [
      {label: 'Drink coffee', important: false, id: 1, done: false},
      {label: 'Make Awesome App', important: true, id: 2, done: false},
      {label: 'Have a lunch', important: false, id: 3, done: false}
    ],
    search: '',
    status: 'All'
  }

  onToggleImportant = (id) => {
    this.setState((old_state) => {
      const elem_idx = old_state.todoData.findIndex(item => item.id === id);

      const old_todo = old_state.todoData[elem_idx];
      const new_todo = {...old_todo, important: !old_todo.important}

      const prev_todos = old_state.todoData.slice(0, elem_idx);
      const post_todos = old_state.todoData.slice(elem_idx + 1);

      const new_state = [...prev_todos, new_todo, ...post_todos];

      return {
        todoData: new_state
      }
    })
  }

  onToggleDone = (id) => {
    this.setState((state) => {
      const elem_idx = state.todoData.findIndex(item => item.id === id);
      const old_todo = state.todoData[elem_idx];
      const new_todo = {...old_todo, done: !old_todo.done};

      const prev_todos = state.todoData.slice(0, elem_idx);
      const post_todos = state.todoData.slice(elem_idx + 1);

      const new_state = [...prev_todos, new_todo, ...post_todos];

      return {
        todoData: new_state
      }
    })
  }

  onDelete = (id) => {
    this.setState((old_state) => {
      const elem_idx = old_state.todoData.findIndex(item => item.id === id);

      const prev_todos = old_state.todoData.slice(0, elem_idx);
      const post_todos = old_state.todoData.slice(elem_idx + 1);

      const new_state = [...prev_todos, ...post_todos];

      return {
        todoData: new_state
      }
    })
  }

  onSearch = (value) => {
    this.setState({
      search: value
    })
  }

  onSearchTodos = (todoData, value) => {
    if (value === '') {
      return todoData
    }

    const new_elements = todoData.filter(item => {
      return item.label.toLowerCase().indexOf(value.toLowerCase()) > -1
    })

    return new_elements
  }

  onChangeStatus = (value) => {
    this.setState({
      status: value
    })
  }

  onFilterTodos = (todoData, status) => {
    if (status === 'All') {
      return todoData
    } else if (status === 'Active') {
      return todoData.filter(item => !item.done)
    } else if (status === 'Done') {
      return todoData.filter(item => item.done)
    }
  }

  onAddTodo = (label) => {
    const new_todo = {
      label: label,
      important: false,
      done: false,
      id: ++this.for_new_todo,
    }

    this.setState((old_state) => {
      return {
        todoData:[...old_state.todoData, new_todo]
      }
      })
  }

  activeTodos = (todoData) => {
    const active = todoData.filter(todo => !todo.done)
    return active.length
  }

  doneTodos = (todoData) => {
    const done = todoData.filter(todo => todo.done)
    return done.length
  }

  render() {

    const filtered_todos = this.onFilterTodos(this.state.todoData, this.state.status);
    const new_elements = this.onSearchTodos(filtered_todos, this.state.search);
    const active = this.activeTodos(this.state.todoData);
    const done = this.doneTodos(this.state.todoData);


    return (
      <div className="todo-app">
        <AppHeader toDo={active} done={done}/>
        <div className="top-panel d-flex">
          <SearchPanel onSearch={this.onSearch}/>
          <ItemStatusFilter onChangeStatus={this.onChangeStatus}/>
        </div>

        <TodoList onToggleDone={this.onToggleDone} onDelete={this.onDelete} onToggleImportant={this.onToggleImportant}
                  todos={new_elements}/>
        <AddTodo onAddTodo={this.onAddTodo}/>
      </div>
    );
  }
}

export default App;
