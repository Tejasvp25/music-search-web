import React, { Component } from "react";
import YtCard from "./YtCard";
import { getYoutubeSearchResult } from "../utils/network_utils";
import isDurationExceed from "../utils/misc_utils";

import { NoContentFound, ServerError } from "./CustomError";
import ClipLoader from "react-spinners/ClipLoader";
class YtSection extends Component {
  state = {
    data: undefined,
    no_content_found: false,
    server_is_waking: false,
    retry: true,
  };
  componentDidMount() {
    getYoutubeSearchResult(this.props.search).then((res) => {
      if (res.status === 200) {
        this.setState({
          data: res.data,
          server_is_waking: false,
          retry: false,
        });
      }
      if (res.status === 204) {
        this.setState({
          no_content_found: true,
          server_is_waking: false,
          retry: false,
        });
      }
    });

    setInterval(this.setServerIsWaking, 10000);
  }

  setServerIsWaking = () => {
    if (!this.state.retry) {
      return;
    }
    if (this.state.songs === undefined) {
      this.setState({
        server_is_waking: true,
      });

      if (this.state.retry) {
        getYoutubeSearchResult(this.props.search).then((res) => {
          if (res.status === 200) {
            this.setState({
              data: res.data,
              server_is_waking: false,
              retry: false,
            });
          }
          if (res.status === 204) {
            this.setState({
              no_content_found: true,
              server_is_waking: false,
              retry: false,
            });
          }
        });
      }
    }
  };
  render() {
    if (this.state.server_is_waking) {
      return (
        <div className="container p-5">
          <div className="col">
            <h4 className="text-monospace text-muted">
              Sorry for inconvenience <br /> Wait for Few Seconds while server
              is Waking
            </h4>
            <ClipLoader color="red" />
          </div>
        </div>
      );
    } else if (this.state.data === undefined && this.state.no_content_found) {
      return (
        <div className="justify-content-center">
          <br></br>
          <NoContentFound />
        </div>
      );
    } else if (this.state.data === undefined) {
      return (
        <div className="justify-content-around">
          <br></br>
          <div className="container p-5">
            <ClipLoader color="red" />
          </div>
        </div>
      );
    } else {
      return (
        <div className="justify-content-around">
          <div className="row pt-3 justify-content-center">
            {this.state.data.map((e, index) => {
              if (isDurationExceed(e.duration)) {
                return null;
              }
              return (
                <>
                  <YtCard ytItem={e} Key={`k${index.toString()}`} />
                  <br />
                  <br />
                </>
              );
            })}
          </div>
        </div>
      );
    }
  }
}

export default YtSection;
