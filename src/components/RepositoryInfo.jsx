import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import prettyBytes from 'pretty-bytes';
import Smackdown from 'react-smackdown';
import dateFormat from 'dateformat';

const styles = (theme) => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  },
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
  },
  chip: {
    marginBottom: theme.spacing.unit,
    marginRight: '5px'
  }
});

class RepositoryInfo extends Component {
  render() {
    const { classes, appState : { username, repository, languages, showCard, encodedReadme, repositoryInformation, commitInfo, topics } } = this.props;

    const githubURL = `https://github.com/${username}/${repository}/`;
    const profileURL = `https://github.com/${username}/`;
    const repositoryLanguages = Object.keys(languages);

    if(showCard) {
      return (
        <>
          <Card id='repo-card' className={classes.card}>
            <CardContent>
              <Typography variant='h5' component='h2'>
                <a className='repo-card-url repo-card-user-url' href={profileURL} target='_blank' rel='noreferrer noopener'>{username}</a>/<a className='repo-card-url' href={githubURL} target='_blank' rel='noreferrer noopener'>{repository}</a>
              </Typography>
              <Typography className={classes.pos} color='textSecondary'>{repositoryInformation.description}</Typography>
              {
                topics.map((topic) => {
                  const topicURL = `https://github.com/topics/${topic}`;
                  return <Chip label={topic} className={classes.chip} component="a" href={topicURL} target='_blank' rel='noreferrer noopener' clickable />;
                })
              }
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

          <Paper className={classes.root} style={{marginBottom: '30px'}}>
            <Typography variant='h5'>README</Typography>
            <Smackdown
              source={atob(encodedReadme)}
            />
          </Paper>

          <Paper className={classes.root} style={{marginBottom: '30px'}}>
            <Typography variant='h5'>Stats</Typography>
            <ul>
              <li><strong>Last Commit</strong>: {commitInfo[0].commit.message} (<a href={commitInfo[0].html_url} target='_blank' rel='noreferrer noopener'>{commitInfo[0].sha.substring(0, 7)}</a>) by <a href={commitInfo[0].author.html_url}>{commitInfo[0].commit.author.name}</a> on {dateFormat(commitInfo[0].commit.author.date, 'dddd, mmmm dS, yyyy, h:MM:ss TT')}</li>
              <li><strong>Open Issues</strong>: {repositoryInformation.open_issues}</li>
              <li><strong>Forks</strong>: {repositoryInformation.forks}</li>
              <li><strong>License</strong>: {repositoryInformation.license.name}</li>
              <li><strong>Repository Creation Date</strong>: {dateFormat(repositoryInformation.created_at, 'dddd, mmmm dS, yyyy, h:MM:ss TT')}</li>
            </ul>
          </Paper>
        </>
      );
    }
    
    return <Typography paragraph>Enter a username and a repository above to start!</Typography>;
  }
}

export default hot(withStyles(styles)(RepositoryInfo));
