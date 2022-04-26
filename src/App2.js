//Solution with Classes 

import React from "react";

import logo from "./chuck.png";
import { Message, IconButton, InputPicker, Loader } from "rsuite";
import { ArrowRight } from '@rsuite/icons';

import "rsuite/dist/rsuite.min.css";
import "./App.css";

const URL = "https://api.chucknorris.io/jokes/";

class App2 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      joke: "",
      categories: [],
      category: "",
      loading: true,
      loadingJoke: false
    };

    this.setup = this.setup.bind(this);
    this.getJoke = this.getJoke.bind(this);
    this.setCategory = this.setCategory.bind(this);
  }

  componentDidMount() {
    this.setup();
  }

  render() {
    if (this.state.loading) {
      return (
        <div className="wrapper">
          <Loader size="lg" content="" />
        </div>
      );
    }

    return (
      <div className="wrapper">
        <img src={logo} alt="chuck norris logo" width='50%' style={{marginTop:'80px'}} />
        <div>
          {this.state.loadingJoke ? (
            <div className="loadingJoke">
              <Loader size="md" />
            </div>
          ) : (
            <blockquote>
              <span className="dropcap">"</span>
              {" " + this.state.joke}
            </blockquote>
          )}
        </div>
        <div className="picker">
          <InputPicker
            data={this.state.categories}
            style={{ width: 224 }}
            placeholder="Choose Category"
            onSelect={val => {
              this.setCategory(val);
            }}
          />
          <IconButton
            icon={<ArrowRight />}
            placement="right"
            className="next"
            onClick={() => {
              this.getJoke();
            }}
          >
            Next
          </IconButton>
        </div>
        <div />
      </div>
    );
  }

  setup() {
    this.setState({ loading: true });
    fetch(URL + "categories")
      .then(resp => resp.json())
      .then(resp => {
        const categories = resp.map(val => {
          return { label: val, value: val };
        });
        this.setState({ categories: categories });
        this.setState({ category: "random" });
      })
      .then(x => {
        return fetch(URL + "random");
      })
      .then(resp => resp.json())
      .then(resp => {
        this.setState({ joke: resp.value, loading: false });
      })
      .catch(err =>
        <Message type="error" description="Oops an unexpected error occurred! Try again later!" />
      );
  }

  getJoke() {
    let url = URL + "random";
    if (this.state.category !== "random") {
      url += "?category=" + this.state.category;
    }

    this.setState({ loadingJoke: true });
    fetch(url)
      .then(resp => resp.json())
      .then(resp => {
        this.setState({ joke: resp.value });
        this.setState({ loadingJoke: false });
      })
      .catch(err =>
        <Message type="error" description="Oops an unexpected error occurred! Try again later!" />
      );
  }

  setCategory(category) {
    this.setState({ category: category });
  }
}

export default App2;
