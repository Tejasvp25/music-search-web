import React, { Component } from "react";
import { NoContentFound } from "./components/CustomError";
import MusicSection from "./components/MusicSection";
import { getMusicRawSearchResult } from "./utils/network_utils";

class Result extends Component {
  state = {
    songs: undefined,
    albums: undefined,
  };

  componentDidMount() {
    getMusicRawSearchResult(this.props.query).then((res) => {
      this.setState({
        songs: res.data["songs"]["data"],
        albums: res.data["albums"]["data"],
      });
    });
  }

  GetMusicSection = (props) => {
    if (this.state.songs === undefined) {
      return (
        <div className="row justify-content-center p-3">
          <div class="spinner-border text-dark" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      );
    }
    if (props.type === "songs") {
      if (this.state.songs.length === 0) {
        return <NoContentFound />;
      }
    } else {
      if (this.state.albums.length === 0) {
        return <NoContentFound />;
      }
    }

    return <MusicSection type={props.type} data={props.data} />;
  };

  render() {
    return (
      <div className="container-fluid mt-5">
        <h2 className="text-secondary">
          Search Result for "{this.props.query}"
        </h2>
        <br></br>
        <span className="h1">Songs</span>
        <div>
          <this.GetMusicSection type="songs" data={this.state.songs} />
        </div>
        <br />
        <br />
        <span className="h1">Albums</span>
        <div>
          <this.GetMusicSection type="albums" data={this.state.albums} />
        </div>
      </div>
    );
  }
}

export default Result;
