import React, { Component } from "react";

import image from "../images/food1.jpg";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Navigation from "../components/Navbar";
import { graphql } from 'react-apollo';
import "../App.css";
import { getUsersQuery } from '../queries/queries';
class Home extends Component {
  render() {
    return (
      <div
        className="homePage"
        style={{
          backgroundImage: `url(${image})`
        }}
      >
        <Navigation></Navigation>
        <Container>
          <div className="pt-5">
            <Jumbotron
              style={{
                background: `rgba(0, 0, 0, 0.5)`,
                color: `#f1f1f1`
              }}
            >
              <Container>
                <h1>Welcome To Spartan Grubhub</h1>
                <p></p>
                <h4>Order food delivery you’ll love</h4>
              </Container>
            </Jumbotron>
          </div>
        </Container>
      </div>
    );
  }
}

export default graphql(getUsersQuery)(Home);
