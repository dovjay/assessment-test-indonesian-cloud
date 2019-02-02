import React, { Component } from 'react';

class InputForm extends Component {
  render() {
    return (
      <div className="form-group">
        <label>{this.props.label}</label>
        <input 
          type={this.props.type} 
          className="form-control"
          placeholder={this.props.placeholder}
          onChange={this.props.onChangeFunction}
          />
      </div>
      
    );
  }
}

export default InputForm;