import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from "axios";

import { changeFilter } from '../actions/actionCreator';

import ToDoInput from './todo_input/todo_input';
import ToDoList from './todo_list/todo_list';
import Footer from './footer/footer';

import './todo.css';

class ToDo extends Component {
  state = {
    taskText: '',
    tasks:[]
  }

  handleInputChange = ({ target: { value } }) => {
    this.setState({
      taskText: value,
    })
  }

  addTask = ({ key }) => {
    const { taskText } = this.state;

    if (taskText.length > 3 && key === 'Enter') {
      axios.post("/add", {id: (new Date()).getTime(), text:taskText, isCompleted:false}).then(res => {
          this.setState({
            tasks: res.data.data,
            taskText: ''
          })
        }).catch(err => console.error(err));
    }
  }

  removeTask = (key) => {
    axios.post("/delete", {id: key}).then(res => {
      this.setState({
        tasks: res.data.data,
        taskText: ''
      })
    }).catch(err => console.error(err));
  }

  completeTask = (key) => {
    axios.post("/markComplete", {id: key}).then(res => {
      this.setState({
        tasks: res.data.data,
        taskText: ''
      })
    }).catch(err => console.error(err));
  }

  clearCompleted = (key) => {
    axios.post("/clearCompleted").then(res => {
      this.setState({
        tasks: res.data.data,
        taskText: ''
      })
    }).catch(err => console.error(err));
  }

  filterTasks = (tasks, activeFilter) => {
    switch (activeFilter) {
      case 'all':
        return tasks;
      case 'completed':
        return tasks.filter(task => task.isCompleted);
      case 'active':
        return tasks.filter(task => !task.isCompleted);
      default: tasks.filter(task => !task.isCompleted);;
    }
  }

  getActiveTasksCounter = tasks => tasks.filter(task => !task.isCompleted).length;

  render() {
    const { taskText } = this.state;
    const {  filters, changeFilter } = this.props;
    const isTasksExist = this.state.tasks && this.state.tasks.length > 0;
    const filteredTasks = this.filterTasks(this.state.tasks, filters);
    const taskCounter = this.getActiveTasksCounter(this.state.tasks);

    return (
      <div className="todo-wrapper">
        <ToDoInput onKeyPress={this.addTask} onChange={this.handleInputChange} value={taskText} />
        {isTasksExist && <ToDoList removeTask={this.removeTask} tasksList={filteredTasks} completeTask={this.completeTask} />}
        {isTasksExist && <Footer changeFilter={changeFilter} amount={taskCounter} activeFilter={filters} clearCompleted={this.clearCompleted} />}
      </div>
    );
  }
}

export default connect(({ filters }) => ({
  filters,
}), { changeFilter })(ToDo);
