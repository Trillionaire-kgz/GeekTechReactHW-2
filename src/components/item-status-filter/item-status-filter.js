import React from 'react';

import './item-status-filter.css';

const ItemStatusFilter = (props) => {
  return (
    <div className="btn-group">
      <button type="button"
              onClick={() => {props.onChangeStatus('All')}}
              className="btn btn-info">All</button>
      <button type="button"
              onClick={() => {props.onChangeStatus('Active')}}
              className="btn btn-outline-secondary">Active</button>
      <button type="button"
              onClick={() => {props.onChangeStatus('Done')}}
              className="btn btn-outline-secondary">Done</button>
    </div>
  );
};

export default ItemStatusFilter;
