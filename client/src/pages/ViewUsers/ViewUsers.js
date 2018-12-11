import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Container, Col, Row } from "../../components/Grid";
import API from '../../utils/API'

export default class ViewUsers extends Component {

  state = {
    users: [],
    user: {},
    redirect: false
  }

  componentDidMount() {
    this.getUsers();
  }

  getUsers = () => {
    API
    .getUsers()
    .then(results => this.setState({ users: results.data }))
    .catch(err => console.log(err));
  }

  handleDelete = (id) => {
    API
      .deleteUser(id)
      .then(results => {
        let tempArr = this.state.users.filter(user => user._id !== id)
        this.setState({ users: tempArr });
      })
      .catch(err => console.log(err));
  }

  handleUpdate = (id) => {
    API
    .getUser(id)
    .then(result => {
      this.setState({ user: result.data }, function () {
        this.setState({ redirect: true });
      });
    });
  }

  render() {
    return(
      <Container>
        <Row>
          <Col size="lg-6" offset='lg-3'>
            {
              this.state.users.length > 0 ?
              (<div className='well'>
                {
                  this.state.users.map((user,i) => {
                    return(
                      <div key={i} className="well" style={{position: 'relative'}}>
                        <h4>{i+1}. {user.username}</h4>
                        <div className="btn-group" style={{position: 'absolute', right: 0, top: '50%', transform: 'translate(-10%,-50%)'}}>
                          <button className="btn btn-primary" onClick={() => this.handleDelete(user._id)}>Delete</button>
                          <button className="btn btn-info" onClick={() => this.handleUpdate(user._id)}>Update</button>
                        </div>
                      </div>
                    )
                  })
                }
              </div>)
              :
              (<div className="alert alert-warning">No Saved Users</div>)
            }
            {/* redirects user to detail page, and passes along the user to be updated */}
            { this.state.redirect ? (<Redirect to= {{pathname:"/detail", state: this.state.user}}/>) : null }
          </Col>
        </Row>
      </Container>
    )
  }
}
