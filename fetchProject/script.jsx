'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const styles = require('./style.css');

class CountryList extends React.Component {
  constructor(props) {
    super(props);

    // props.countryList = []
  }

  render() {
    const countryList = this.props.countryList.map((country) => {
      return <li>{country.name} ({country.alpha2_code})</li>;
    });

    // return a dom element
    return (
      <div>
        <h1>Country Name (Country Code)</h1>
        <ul>
          {countryList}
        </ul>
      </div>
    );
 }
}


class Main extends React.Component {
  constructor(props) {
    super(props);
    //key assigned to null
    this.state = { countryList: null };
  }

  render() {
    let self = this;

    // Fetch data if not fetched already
    if (!this.state.countryList) {
      fetch('http://services.groupkt.com/country/get/all').then((response) => {
        response.json().then((data) => {
          const countries = data.RestResponse.result;

          this.state.countryList = countries;
          self.setState(this.state);
        });
      });
    }

    // Display UI based on state countryList
    let dom;
    if (this.state.countryList) {
      dom = <CountryList countryList={this.state.countryList} />;
    } else {
      dom = <div>Loading...</div>;
    }

    return (
      <div>{dom}</div>
    );
  }
}

ReactDOM.render(<Main />, document.getElementById('root'));
