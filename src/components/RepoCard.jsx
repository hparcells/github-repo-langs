import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import prettyBytes from 'pretty-bytes';

const styles = {
  card: {
    minWidth: 275
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
};

class RepoCard extends Component {
  render() {
    const { classes } = this.props;

    const githubURL = `https://github.com/${this.props.state.username}/${this.props.state.repository}/`;
    const languages = Object.keys(this.props.state.languages);

    if(this.props.state.showCard) {
      return (
        <Card id='repo-card' className={classes.card}>
          <CardContent>
            <Typography variant="h5" component="h2">
              {this.props.state.repository}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {this.props.state.username}
            </Typography>
            <Typography component="p">
              {
                languages.map((language) => {
                  return <li>{language} ({ prettyBytes(this.props.state.languages[language]) })</li>;
                })
              }
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" target="_blank" href={githubURL}>View on GitHub</Button>
          </CardActions>
        </Card>
      );
    }
    
    return <Typography paragraph>Enter a username and a repository above to start!</Typography>;
  }
}

export default hot(withStyles(styles)(RepoCard));
