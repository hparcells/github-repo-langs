import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { withStyles } from '@material-ui/core/styles';

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
  }
});

class App extends Component {
  constructor(props) {
    super(props);

    this.state =  {
      username: '',
      repo: '',
      languages: {}
    };
  }

  handleUsernameChange() {
    this.setState({ username: event.target.value });
  }

  handleRepoChange() {
    this.setState({ repo: event.target.value });
  }

  fetchRepo() {
    fetch(`https://api.github.com/repos/${this.state.username}/${this.state.repo}/languages?access_token=${process.env.GITHUB_AUTH_TOKEN}`).then((r) => r.json()).then((parsedJSON) => {
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
            id="name"
            label="User or Organization"
            className={classes.textField}
            value={this.state.username}
            onChange={this.handleUsernameChange.bind(this)}
            margin="normal"
          />
          <TextField
            id="repo"
            label="Repository"
            className={classes.textField}
            value={this.state.repo}
            onChange={this.handleRepoChange.bind(this)}
            margin="normal"
          />
          <Button variant="outlined" color="primary" className={classes.button} onClick={this.fetchRepo.bind(this)}>
            Go
          </Button>

          <RepoData languages={this.state.languages} />
        </div>
      </div>
    );
  }
}

export default hot(withStyles(styles)(App));
