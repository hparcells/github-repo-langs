import React, { Component } from 'react';

class RepoData extends Component {
  render() {
    return (
      <ul>
        {
          Object.keys(this.props.languages).map((language) => {
            return <li>{ language }</li>;
          })
        }
      </ul>
    );
  }
}

export default RepoData;
