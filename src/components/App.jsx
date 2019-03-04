import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';

import RepoData from './RepoData';

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
      repo: '',
      languages: {},
      showCard: false
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

  fetchRepo() {
    const url = `https://api.github.com/repos/${this.state.username}/${this.state.repository}/languages?access_token=${process.env.GITHUB_AUTH_TOKEN}`;

    fetch(url).then((r) => r.json()).then((parsedJSON) => {
      if(Object.keys(parsedJSON)[0] === 'message') {
        return;
      }

      if(!this.state.showCard) {
        this.setState({ showCard: true });
      }
      this.setState({languages: parsedJSON});
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
          <Button variant="outlined" color="primary" className={classes.button} onClick={this.fetchRepo.bind(this)}>
            Go
            <SearchIcon className={classes.rightIcon} />
          </Button>

          <RepoData state={this.state} />
        </div>
      </div>
    );
  }
}

export default hot(withStyles(styles)(App));
