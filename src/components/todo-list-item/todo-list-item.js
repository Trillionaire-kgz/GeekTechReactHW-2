import React from 'react';

import './todo-list-item.css';
import {logDOM} from "@testing-library/react";

const TodoListItem = ({important, label, onToggleImportant, id, onDelete, onToggleDone, done}) => {

  const style = {
    color: important ? 'steelblue' : 'black',
    fontWeight: important ? 'bold' : 'normal',
    textDecoration: done ? 'line-through' : 'none',
    fontSize: done ? '0.9em' : '1.1em'
  };

  return (
    <span className="todo-list-item">
      <span
        onClick={() => {
          onToggleDone(id)
        }}
        className="todo-list-item-label"
        style={style}>
        {label}
      </span>

      <button type="button"
              onClick={() => {
                onToggleImportant(id)
              }}
              className="btn btn-outline-success btn-sm float-right">
        <i className="fa fa-exclamation"/>
      </button>

      <button type="button"
              onClick={() => {
                onDelete(id)
              }}
              className="btn btn-outline-danger btn-sm float-right">
        <i className="fa fa-trash-o"/>
      </button>
    </span>
  );
};

export default TodoListItem;
