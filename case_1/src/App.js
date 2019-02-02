import React, { Component } from 'react';
import './App.css';

import InputForm from './components/InputForm';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      formType: "person",
      name: '',
      email: '',
      company_name: '',
      phone: '',
      alert: []
    };
  }

  handleRadioChange = (e) => {
    e.preventDefault();
    this.setState({formType: e.currentTarget.value});
  }

  handleOnChangeForm = (e, label) => {
    this.setState({[label]: e.target.value});
    console.log(this.state[label]);
  }

  handleButton = (e) => {
    e.preventDefault();
    let alert = [];
    // Verification form
    if (this.state.formType === 'person') {
      if (this.state.name === '') {
        alert.push("Please enter your name before send!");
      }
      if (this.state.email === '') {
        alert.push("Please enter your email before send!");
      } else {
        let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!regEmail.test(String(this.state.email).toLowerCase())) {
          alert.push("Please correct your email address field");
        }
      }
    } else if (this.state.formType === 'company') {
      if (this.state.company_name === '') {
        alert.push("Please enter your company name before send!");
      }
      if (this.state.phone === '') {
        alert.push("Please enter your phone number before send!");
      } else {
        let regPhone = /[0-9]{3}[-\s][0-9]{3}|[-\s]?[0-9]{3}/
        let regNumber = /[0-9]/g
        if (this.state.phone.match(regNumber).length < 6) {
          alert.push("Phone number should have at least 6 digits");
        } if (!regPhone.test(this.state.phone)) {
          alert.push("Please correct your phone number! Using '123-123-123' or '123 123 123' format");
        }
      }
    }

    this.setState({alert});

    if (alert.length === 0) {
      this.setState({success: true});
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          Assessment Test Indonesian Cloud, Case 1
        </header>

        <div className="container">
            {
              this.state.alert.length > 0 ? 
                this.state.alert.map((element, i) => {
                  return (
                    <div key={i} className="alert alert-danger">{element}</div>
                  )
                }) :
                null
            }
            {
              this.state.success &&
              <div className="alert alert-success">Your form has successfully sent to us!</div>
            }
          <div className="mt-5 row justify-content-md-center">
            <form className="border border-dark rounded p-5 w-50">
              <label>Form Type: </label>
              <div className="form-check">
                <input type="radio" className="form-check-input" value="person" onChange={this.handleRadioChange} checked={this.state.formType === "person"}/>
                <label>Person</label>
              </div>
              <div className="form-check">
                <input type="radio" className="form-check-input" value="company" onChange={this.handleRadioChange} checked={this.state.formType === "company"}/>
                <label>Company</label>
              </div>
              {
                this.state.formType === "person" && 
                /* Person */
                <div className="Person-form">
                  <InputForm 
                    type="text"
                    placeholder="Please enter your name"
                    label="Name:"
                    onChangeFunction={(e) => this.handleOnChangeForm(e, 'name')}
                  />
                  <InputForm
                    type="email"
                    placeholder="Please enter your email"
                    label="Email:"
                    onChangeFunction={(e) => this.handleOnChangeForm(e, 'email')}
                  />
                </div>
              }
              {
                this.state.formType === "company" &&
                /* Company */
                <div className="Company-form">
                  <InputForm
                    type="text"
                    placeholder="Please enter company name"
                    label="Company Name:"
                    onChangeFunction={(e) => this.handleOnChangeForm(e, 'company_name')}
                  />
                  <InputForm
                    type="text" 
                    placeholder="Please enter your phone number"
                    label="Phone:"
                    onChangeFunction={(e) => this.handleOnChangeForm(e, 'phone')}
                  />
                </div>
              }
              <button 
                className="btn btn-primary btn-block"
                onClick={this.handleButton}
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
