import React from 'react';
import PropTypes from 'prop-types';

import './todo_input.css';

const ToDoInput = ({ value, onChange, onKeyPress }) => (
  <div className="todo-input-wrapper">
    <input
      className="todo-input"
      placeholder="Create a new todo..."
      onChange={onChange}
      value={value}
      onKeyPress={onKeyPress}
    />
  </div>
);

ToDoInput.propTypes = {
  onChange: PropTypes.func,
  onKeyPress: PropTypes.func,
  value: PropTypes.string,
}

ToDoInput.defaultProps = {
  onChange: () => { },
  onKeyPress: () => { },
  value: '',
}

export default ToDoInput;
