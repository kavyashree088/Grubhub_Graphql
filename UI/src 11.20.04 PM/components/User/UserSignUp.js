import React, { Component } from "react";
import { Button, Container, Form, Row, Col, FormGroup } from "react-bootstrap";
import "../../css/grubhub.css";
import Navigation from "../Navbar";
import { graphql } from "react-apollo";
import { addUserMutation } from "../../mutation/mutations"

class UserSignUp extends Component {
  constructor(props) {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      emailError: "",
      passwordError: ""
    };
  }
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleClick = event => {
    event.preventDefault();
    console.log("click");
    if (this.validate()) {
      let data = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        password: this.state.password
      };
      this.props.addUserMutation({
        variables: {
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          email: this.state.email,
          password: this.state.password
        }
      })
      this.props.history.push("/SignIn")
    }
  };
  validate = () => {
    this.setState({
      emailError: "",
      passwordError: ""
    });
    console.log("validate");
    let flag = true;
    console.log(this.state.email);
    if (!this.state.email.includes("@") || !this.state.email.includes(".")) {
      this.setState({
        emailError: "Inavalid email"
      });
      flag = false;
    }
    if (this.state.password.length < 8) {
      this.setState({
        passwordError: "Insufficient password length"
      });
      flag = false;
    }
    return flag;
  };

  render() {
    return (
      <div>
        <Navigation></Navigation>
        <Container>
          <div className="login u-dimension-1">
            <h3>Creae your GrubHub Account</h3>
            <Form className="pt-3" data-toggle="validator">
              <Row>
                <Col>
                  <FormGroup>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      onChange={this.handleChange}
                      name="firstName"
                      required="true"
                    ></Form.Control>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      onChange={this.handleChange}
                      name="lastName"
                      required="true"
                    ></Form.Control>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      onChange={this.handleChange}
                      name="email"
                      required="true"
                    ></Form.Control>
                    <div
                      style={{ fontSize: 12, color: "red" }}
                      className="text-center"
                    >
                      {this.state.emailError}
                    </div>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      name="password"
                      onChange={this.handleChange}
                      type="password"
                      required="true"
                    ></Form.Control>
                    <div
                      style={{ fontSize: 12, color: "red" }}
                      className="text-center"
                    >
                      {this.state.passwordError}
                    </div>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group>
                    <Button
                      variant="primary"
                      type="submit"
                      onClick={this.handleClick}
                      className="btn-block"
                    >
                      Create Account
                    </Button>
                  </Form.Group>
                </Col>
              </Row>
            </Form>
            <div className="text-center">
              <p>
                Have an ccount? <a href="/SignIn">Sign In</a>
              </p>
            </div>
          </div>
        </Container>
      </div>
    );
  }
}
export default  graphql(addUserMutation, { name: "addUserMutation" })(UserSignUp);
