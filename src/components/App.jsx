import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';

import RepositoryInfo from './RepositoryInfo';

const styles = (theme) => ({
  root: {
    flexGrow: 1
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  button: {
    margin: theme.spacing.unit,
    marginTop: '25px'
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  }
});

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      repository: '',
      token: '',
      languages: {},
      showCard: false,
      encodedReadme: '',
      repositoryInformation: {},
      commitInfo: []
    };
  }

  handleUsernameChange() {
    this.setState({ username: event.target.value });
    this.setState({ showCard: false });
  }
  handleRepoChange() {
    this.setState({ repository: event.target.value });
    this.setState({ showCard: false });
  }
  handleTokenChange() {
    this.setState({ token: event.target.value });
    this.setState({ showCard: false });
  }

  fetchRepo() {
    const repositoryURL = `https://api.github.com/repos/${this.state.username}/${this.state.repository}${this.state.token !== '' ? `?access_token=${this.state.token}` : ''}`;
    const repositoryLanguagesURL = `https://api.github.com/repos/${this.state.username}/${this.state.repository}/languages${this.state.token !== '' ? `?access_token=${this.state.token}` : ''}`;
    const repositoryReadmeURL = `https://api.github.com/repos/${this.state.username}/${this.state.repository}/readme${this.state.token !== '' ? `?access_token=${this.state.token}` : ''}`;
    const repositoryCommitURL = `https://api.github.com/repos/${this.state.username}/${this.state.repository}/commits${this.state.token !== '' ? `?access_token=${this.state.token}` : ''}`;

    fetch(repositoryURL).then((r) => r.json()).then((parsedJSON) => {
      if(Object.keys(parsedJSON)[0] === 'message') {
        return;
      }

      this.setState({repositoryInformation: parsedJSON});
    });
    fetch(repositoryLanguagesURL).then((r) => r.json()).then((parsedJSON) => {
      if(Object.keys(parsedJSON)[0] === 'message') {
        return;
      }

      this.setState({languages: parsedJSON});
    });
    fetch(repositoryReadmeURL).then((r) => r.json()).then((parsedJSON) => {
      if(Object.keys(parsedJSON)[0] === 'message') {
        return;
      }

      this.setState({encodedReadme: parsedJSON.content});
    });
    fetch(repositoryCommitURL).then((r) => r.json()).then((parsedJSON) => {
      if(Object.keys(parsedJSON)[0] === 'message') {
        return;
      }

      this.setState({commitInfo: parsedJSON});

      if(!this.state.showCard) {
        this.setState({ showCard: true });
      }
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar id='main-app-bar' position="static" color="primary">
          <Toolbar>
            <Typography variant="h6" color="inherit">
              GitHub Repository Languages
            </Typography>
          </Toolbar>
        </AppBar>

        <div id="appContent">
          <Typography variant="h3" color="inherit" gutterBottom>GitHub Repository Languages</Typography>
          <Typography paragraph>This tool was made in React using the GitHub API to fetch the languages used in your or anyone's GitHub repositories, and display them including how much of the repository
            is made of that language.
          </Typography>
          <Typography paragraph>This app currently does not support private repositories, if you want to see your own private repositories, you must create your own personal access token. To do this,
            you have to create a GitHub account if you haven't already, and go to <a href='https://github.com/settings/tokens' target='_blank' rel='noreferrer noopener'>https://github.com/settings/tokens</a>.
            Click on "Generate new token", type a small description like "GitHub Repo Langs", check the repo checkbox, and click the generate token button at the bottom. Copy the token, <strong>KEEP THIS TOKEN
            SECRET</strong>, and paste it in the text box below.
          </Typography>
          <Typography paragraph>If nothing shows up when you click the go button, one of three things must of happened. Either you mistyped the username, repository (or it doesn't exist), token (or it's invalid)
            or you hit the rate limit for the GitHub API and must follow the instructions above, or the repository is private.
          </Typography>
          <TextField
            id="username"
            label="User or Organization"
            className={classes.textField}
            value={this.state.username}
            onChange={this.handleUsernameChange.bind(this)}
            margin="normal"
          />
          <TextField
            id="repository"
            label="Repository"
            className={classes.textField}
            value={this.state.repository}
            onChange={this.handleRepoChange.bind(this)}
            margin="normal"
          />
          <TextField
            id="token"
            label="Token (Optional)"
            className={classes.textField}
            value={this.state.token}
            onChange={this.handleTokenChange.bind(this)}
            margin="normal"
            type="password"
          />
          <Button variant="outlined" color="primary" className={classes.button} onClick={this.fetchRepo.bind(this)}>
            Go
            <SearchIcon className={classes.rightIcon} />
          </Button>

          <RepositoryInfo appState={this.state} />
        </div>
      </div>
    );
  }
}

export default hot(withStyles(styles)(App));
