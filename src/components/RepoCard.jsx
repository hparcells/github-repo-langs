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
    const { classes, appState : { username, repository, languages, showCard } } = this.props;

    const githubURL = `https://github.com/${username}/${repository}/`;
    const profileURL = `https://github.com/${username}/`;
    const repositoryLanguages = Object.keys(languages);

    if(showCard) {
      return (
        <Card id='repo-card' className={classes.card}>
          <CardContent>
            <Typography variant='h5' component='h2'>
              {repository}
            </Typography>
            <Typography className={classes.pos} color='textSecondary'>
              <a className='repo-card-user-url' href={profileURL} target='_blank' rel='noreferrer noopener'>{username}</a>
            </Typography>
            <Typography component='p'>
              {
                repositoryLanguages.map((language) => {
                  return <li>{language} ({ prettyBytes(languages[language]) })</li>;
                })
              }
            </Typography>
          </CardContent>
          <CardActions>
            <Button size='small' variant='outlined' color='primary' href={githubURL} target='_blank' rel='noreferrer noopener'>View on GitHub</Button>
          </CardActions>
        </Card>
      );
    }
    
    return <Typography paragraph>Enter a username and a repository above to start!</Typography>;
  }
}

export default hot(withStyles(styles)(RepoCard));
