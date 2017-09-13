'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const styles = require('./style.css');

class HackerNews extends React.Component {
  constructor(props) {
    super(props);

    // props.newsList = []
  }

  render() {
    const newsList = this.props.newsList.map((list) => {
      return <li>{newsList}</li>;
    });

    // return a dom element
    return (
      <div>
        <h1>Your Hacker News HQ</h1>
        <ul>
          {newsList}
        </ul>
      </div>
    );
  }
}

class Main extends React.Component {
  constructor(props) {
    super(props);
    //key assigned to null
    this.state = { newsList: null };
  }

  render() {
    let self = this;

    // Fetch data if not fetched already
    if (!this.state.newsList) {
      for (var i = 0; i < 10; i++) {
      fetch('https://hacker-news.firebaseio.com/v0/item/${i}.json').then((response) => {
        response.json().then((data) => {
          const news = data.type;

          this.state.newsList = news;
          this.setState(this.state);
        });
      });
    }
  }

    // Display UI based on state newsList
    let dom;
    if (this.state.newsList) {
      dom = <HackerNews newsList={this.state.newsList} />;
    } else {
    }

    return (
      <div>{dom}</div>
    );
  }
}

ReactDOM.render(<Main />, document.getElementById('root'));
