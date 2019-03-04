import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';

class App extends Component {
  constructor(props) {
    super(props);

    this.state =  {
      username: '',
      repo: '',
      languages: []
    };
  }

  handleUsernameChange() {
    this.setState({username: event.target.value});
  }

  handleRepoChange() {
    this.setState({repo: event.target.value});
  }

  fetchRepo() {
    fetch(`https://api.github.com/repos/${this.state.username}/${this.state.repo}/languages?access_token=${process.env.GITHUB_AUTH_TOKEN}`).then((r) => r.json()).then((parsedJSON) => {
      this.setState({languages: Object.keys(parsedJSON)});
    });
  }

  render() {
    return (
      <div>
        <input type="name" name="name" onChange={this.handleUsernameChange.bind(this)} />
        <input type="repo" name="repo" onChange={this.handleRepoChange.bind(this)} />
        <button onClick={this.fetchRepo.bind(this)}>Ok</button>

        <ul>
          {
            this.state.languages.map((language) => {
              return <li>{language}</li>;
            })
          }
        </ul>
      </div>
    );
  }
}

export default hot(App);
