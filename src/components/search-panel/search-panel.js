import React from 'react';

import './search-panel.css';

class SearchPanel extends React.Component {

  state = {
    value: ''
  }

  changeState = (e) => {
    this.setState({
      value: e.target.value
    })
    this.props.onSearch(e.target.value)
  }

  render() {
    return (
      <input type="text"
             onChange={this.changeState}
             value={this.state.value}
             className="form-control search-input"
             placeholder="type to search"/>
    );
  }
}

export default SearchPanel;