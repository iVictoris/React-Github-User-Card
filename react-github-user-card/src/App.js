import React, { Component } from "react";
import "./App.css";

import axios from "axios";

import GithubCard from './components/GithubCard/GithubCard';
import Loader from "./components/ui/Loader/Loader";

class App extends Component {
  state = {
    loading: true
  };

  fetchData = async github => {
    return await axios.get(`https://api.github.com/users/${github}`);
  };

  saveData = githubData => {
    const {
      data: {
        avatar_url,
        bio,
        followers_url,
        following_url,
        location,
        login,
        name,
        repos_url,
        html_url
      }
    } = githubData;
    const user = {
      user: {
        avatar_url,
        bio,
        followers_url,
        following_url,
        location,
        login,
        name,
        repos_url,
        html_url
      }
    };

    this.setState(
      prevState => {
        return { loading: !prevState.loading, ...user };
      },
      () => console.log(this.state)
    );
  };

  // Display data => create Card

  componentDidMount = async () => {
    try {
      const data = await this.fetchData("ivictoris");
      this.saveData(data);
    } catch (e) {
      console.error("Data fetching error", e);
    }
  };

  componentDidUpdate() {} // might not use

  componentWillUnmount() {} // might not use

  render() {
    const { loading, user } = this.state;

    return (
      <div>
        {loading && <Loader />}
        {!loading && <GithubCard {...user} />}
      </div>
    );
  }
}

export default App;
