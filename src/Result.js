import React, { Component } from "react";
import { NoContentFound } from "./components/CustomError";
import MusicSection from "./components/MusicSection";
import { getMusicRawSearchResult } from "./utils/network_utils";
import ClipLoader from "react-spinners/ClipLoader";
class Result extends Component {
  state = {
    songs: undefined,
    albums: undefined,
    server_is_waking: false,
  };

  componentDidMount() {
    getMusicRawSearchResult(this.props.query).then((res) => {
      this.setState({
        songs: res.data["songs"]["data"],
        albums: res.data["albums"]["data"],
        // server_is_waking: false,
      });
    });
    setTimeout(this.setServerIsWaking, 10000);
  }

  setServerIsWaking = () => {
    if (this.state.songs === undefined) {
      this.setState({
        server_is_waking: true,
      });
    }
  };

  GetMusicSection = (props) => {
    console.log(this.state.server_is_waking);
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
    }
    if (this.state.songs === undefined) {
      return (
        <div className="container p-5">
          <ClipLoader color="red" />
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
