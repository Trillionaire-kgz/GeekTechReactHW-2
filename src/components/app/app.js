import React from 'react';
import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';

import './app.css';

class App extends React.Component {
  state = {
    todoData: [
      {label: 'Drink coffee', important: false, id: 1, done: false},
      {label: 'Make Awesome App', important: true, id: 2, done: false},
      {label: 'Have a lunch', important: false, id: 3, done: false}
    ],
    search: '',
    status: 'All'
  }

  lolo = () => {
    console.log('hi')
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

  render() {

    const filtered_todos = this.onFilterTodos(this.state.todoData, this.state.status)
    const new_elements = this.onSearchTodos(filtered_todos, this.state.search)

    return (
      <div className="todo-app">
        <AppHeader toDo={1} done={3}/>
        <div className="top-panel d-flex">
          <SearchPanel onSearch={this.onSearch}/>
          <ItemStatusFilter onChangeStatus={this.onChangeStatus}/>
        </div>

        <TodoList onToggleDone={this.onToggleDone} onDelete={this.onDelete} onToggleImportant={this.onToggleImportant}
                  todos={new_elements}/>
      </div>
    );
  }
}

export default App;
