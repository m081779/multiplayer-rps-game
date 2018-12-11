import React, { Component } from 'react';
import { Container, Col, Row } from "../../components/Grid";
import { Input } from "../../components/Form";
import API from '../../utils/API';


export default class AddUser extends Component {

  state = {
    username: '',
    password: '',
    added: false
  }


  handleChange = (e) => {
    let { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let { username, password } = this.state;
    let newUser = { username, password }
    API
      .saveUser(newUser)
      .then(response => this.setState({ username:'', password: '', added: true }))
      .catch(err => console.log(err))
  }

  render() {
    return(
      <Container>
        <Col size="lg-6" offset='lg-3'>
          <Row>
            <h2>Add a new user</h2>
            {
              this.state.added ?
              (<div className="alert alert-success">User updated successfully!</div>)
              :
              null
            }
            <form className="well">
              <label htmlFor="username">
                Enter User Name:
              </label>
              <Input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleChange}
              />
              <label htmlFor="password">
                Enter Password:
              </label>
              <Input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
              <Input
                type="submit"
                value="Submit"
                className="btn btn-info btn-block"
                onClick={this.handleSubmit}
              />
            </form>
          </Row>
        </Col>
      </Container>
    )
  }
}
