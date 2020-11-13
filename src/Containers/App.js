import React, { Component } from "react";
import SearchBox from "../Components/SearchBox";
import Scroll from "../Components/Scroll";
import CardList from "../Components/CardList";
import ErrorBoundry from "../Components/ErrorBoundry";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      robots: [],
      searchFields: "",
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((user) => this.setState({ robots: user }));
  }

  onSearchChange = (event) => {
    this.setState({ searchFields: event.target.value });
  };

  render() {
    const { robots, searchFields } = this.state;

    const filterdRobots = robots.filter((robot) => {
      return robot.name.toLowerCase().includes(searchFields.toLowerCase());
    });
    return !robots.length ? (
      <h1>Loading</h1>
    ) : (
      <div className="tc">
        <h1 className="f1">Robofriends</h1>
        <SearchBox searchChange={this.onSearchChange} />
        <Scroll>
          <ErrorBoundry>
            <CardList robots={filterdRobots} />
          </ErrorBoundry>
        </Scroll>
      </div>
    );
  }
}

export default App;
