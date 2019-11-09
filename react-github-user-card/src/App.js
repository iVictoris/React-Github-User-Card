import React, { Component } from "react";
import "./App.css";

import axios from "axios";

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
    let avatar_url, bio, location, login, name, html_url;
    const { loading, user } = this.state;
    if (!loading) {
      ({ avatar_url, bio, location, login, name, html_url } = user);
    }
    return (
      <div>
        {!loading && (
          // Card component
          <section className="card">
            <img src={avatar_url} alt="github avatar" className="avatar" />
            <a href={html_url}>@{login}</a>
            <section className="name">{name}</section>
            <section className="location">Located: {location}</section>
            <section className="bio">Bio: {bio}</section>
          </section>
        )}
      </div>
    );
  }
}

export default App;
