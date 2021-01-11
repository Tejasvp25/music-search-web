import React, { Component } from "react";
import MusicCard from "./MusicCard";
import { NoContentFound, ServerError } from "./CustomError";
import ClipLoader from "react-spinners/ClipLoader";

class MusicSection extends Component {
  state = {
    data: undefined,
  };

  componentDidMount() {
    this.setState({ data: this.props.data });
  }

  render() {
    if (this.state.data === undefined) {
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
    } else if (this.state.server_error) {
      return (
        <div className="justify-content-around">
          <ServerError />
        </div>
      );
    } else {
      return (
        <div className="justify-content-around">
          <div className="row pt-3 justify-content-center">
            {this.state.data.map((e, index) => {
              return (
                <div
                  className="col-lg-4 col-md-12 col-sm-12"
                  Key={`${this.props.type}${index.toString()}`}
                >
                  {this.props.type === "songs" ? (
                    <MusicCard
                      song={e}
                      type={this.props.type}
                      // Key={`${this.props.type}${index.toString()}`}
                    />
                  ) : (
                    <MusicCard
                      album={e}
                      type={this.props.type}
                      // Key={`${this.props.type}${index.toString()}`}
                    />
                  )}

                  <br></br>
                </div>
              );
            })}
          </div>
        </div>
      );
    }
  }
}

export default MusicSection;
