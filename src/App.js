import React, { Component } from "react";
import Result from "./Result";
import "./App.css";
import $ from "jquery";
import Cookies from "js-cookie";
class App extends Component {
  state = {
    show_result: false,
    search_query: "",
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const query = document.getElementById("search-input").value;
    if (query.trim().length > 0) {
      this.setState({
        show_result: true,
        search_query: query,
      });
    }
  };

  toggleDarkMode = (e) => {
    $("body").toggleClass("body-dark");
    $("body").toggleClass("body-light");
    if ($("body").hasClass("body-dark")) {
      Cookies.set("dark", 1);
    } else {
      Cookies.set("dark", 0);
    }
  };

  componentDidMount() {
    $("#search-input").on("keypress", function (e) {
      if (e.key === "Enter") {
        $("#btn-submit").trigger("click");
      }
    });
  }

  render() {
    return (
      <div className="App">
        <main className="mt-5">
          <div
            className="align-content-center my-auto mt-auto h-100"
            style={{ verticalAlign: "middle" }}
          >
            <div className="col">
              <img
                className=" app-logo img-fluid"
                src="app_icon.png"
                alt="Music Search"
              ></img>
              <div>
                <span className="h1 app-name">Music Search</span>
              </div>
              <div className="container center">
                <div className="input-group input-group-lg mt-4">
                  <input
                    id="search-input"
                    type="text"
                    className="form-control input-red"
                    placeholder="Search Here"
                  ></input>
                </div>
                <div className="row justify-content-center">
                  <div className="pl-2 pr-2">
                    <button
                      id="btn-submit"
                      type="submit"
                      className="btn search-button text-white"
                      onClick={this.handleSubmit}
                    >
                      Search
                    </button>
                  </div>
                  <div className="pl-2 pr-2">
                    <button
                      id="btn-dark-mode"
                      className="btn btn-light dark-mode-button"
                      onClick={this.toggleDarkMode}
                    >
                      Dark Mode
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {this.state.show_result ? (
            <Result query={this.state.search_query} key={Math.random()} />
          ) : null}
        </main>
        <footer className="page-footer m-5">
          <div className="social-icons">
            <h3 style={{ color: "red" }}>Made with ❤️ in India</h3>
            <div className="row justify-content-center">
              <div className="m-2">
                <a
                  href="https://github.com/Torrent-Search/music-search-web"
                  className="social-custom-link"
                >
                  <i class="devicon-github-original social-icons"></i>
                </a>
              </div>
              <div className="m-2">
                <a
                  href="mailto:tejasvp25@gmail.com"
                  className="social-custom-link"
                >
                  <i class="devicon-google-plain social-icons"></i>
                </a>
              </div>
            </div>
            <div className="row justify-content-center">
              <i
                class="devicon-react-original-wordmark colored"
                style={{ fontSize: "35px" }}
              ></i>
              <h5 className="ml-2">Made with React</h5>
            </div>
          </div>
          <br />
          <div className="row justify-content-center text-secondary">
            <span> Tejasvp25 © 2020</span>
          </div>
        </footer>
      </div>
    );
  }

  // render() {
  //   return <Result />;
  // }
}

export default App;
