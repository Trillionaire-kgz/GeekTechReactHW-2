import React from 'react';

import './todo-list-add.css';

class AddTodo extends React.Component {

    state = {
        value:''
    }

    onChangeValue = (event) => {
        this.setState({value: event.target.value})
    }

    onSubmitData = (event) => {
        event.preventDefault();
        this.props.onAddTodo(this.state.value)
        this.setState({value: ''})
    }

    render () {
        return (
            <form onSubmit = {this.onSubmitData}>
                <input type='text' className='input-btn' value={this.setState.value} onChange={this.onChangeValue} placeholder='type to add task'/>
                <input type='submit' className='submit-btn' />
            </form>
        )
        
    }
}

export default AddTodo;