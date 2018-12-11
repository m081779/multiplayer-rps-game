import React, { Component } from "react";
import { Col, Row, Container } from "../../components/Grid";
import { Input } from "../../components/Form";
import API from "../../utils/API";

class Detail extends Component {
  state = {
    user: this.props.location.state,
    username: this.props.location.state.username,
    password: this.props.location.state.password,
    update: false
  }


  handleChange = (e) => {
    let { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let { username, password, user } = this.state;
    let userData = {username, password, _id: user._id}
    API
      .updateUser(userData)
      .then(result => {
        this.setState({ username: '', password: '', user: result.data, update: true });
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <Container>
        <Row>
          <Col size="lg-6" offset='lg-3'>
            {
              this.state.update ?
              (<div className="alert alert-success">User updated successfully!</div>)
              :
              null
            }
            <form className="well">
              <label
                htmlFor="username">Change User Name:
              </label>
              <Input
                type="text"
                value={this.state.username}
                onChange={this.handleChange}
                name="username"
              />
              <label
                htmlFor="password">Change Password:
              </label>
              <Input
                type="text"
                value={this.state.password}
                onChange={this.handleChange}
                name="password"
              />
              <Input
                type="submit"
                value="Submit Changes"
                onClick={this.handleSubmit}
                className="btn btn-primary btn-block"
              />
            </form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Detail;
