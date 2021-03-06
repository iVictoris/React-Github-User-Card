import React, { Component } from "react";
import "./App.css";

import axios from "axios";

import GithubCard from "./components/GithubCard/GithubCard";
import Loader from "./components/ui/Loader/Loader";
import UserLookupForm from "./components/Form/UserLookupForm";
import GithubCards from "./components/GithubCard/GithubCards";

class App extends Component {
  state = {
    loading: true
  };

  fetchData = async github => {
    this.setState({ loading: true, user: null });
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
        html_url,
        id
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
        html_url,
        id
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

  // added functionality
  searchUser = async username => {
    try {
      const data = await this.fetchData(username);
      await this.saveData(data);
      await this.getFollowers();
    } catch (e) {
      console.log("Search for user failed", e);
      this.setState({ loading: false });
    }
  };

  componentDidMount = async () => {
    try {
      await this.searchUser("ivictoris");
    } catch (e) {
      console.error("Data fetching error", e);
      this.setState({ loading: false });
    }
  };

  getFollowers = async () => {
    const { loading, user } = this.state;

    if (!loading) {
      const { followers_url } = user;
      try {
        const { data } = await axios.get(followers_url);
        // data is an array of githubData
        this.setState({ user: { ...this.state.user, followers: data } }); // this loads follower data under other data
      } catch (e) {
        console.log("Could not fetch followers", e);
      }
    }
  };

  componentDidUpdate(nextProps, nextState) {} // might not use

  componentWillUnmount() {} // might not use

  render() {
    const { loading, user } = this.state;

    return (
      <section>
        <UserLookupForm searchUser={this.searchUser} />
        {loading && <Loader />}
        {!loading && !user && <h2>Handle does not exist!</h2>}
        {!loading && user && (
          <>
            <GithubCard {...user} />
            <GithubCards followers={this.state.user.followers} />
          </>
        )}
      </section>
    );
  }
}

export default App;
