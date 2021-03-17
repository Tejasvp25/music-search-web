import React, { useState } from "react";
import { getYoutubeAudioLink } from "../utils/network_utils";
const YtCard = ({ ytItem }) => {
  const [audioLink, setaudioLink] = useState(undefined);
  const [request, setRequested] = useState(false);
  return (
    <div className="col-lg-4 col-md-12 col-sm-12">
      <div className="border-black br-10px elevated-card grey-bg p-2 ">
        <div className="row justify-content-center p-2">
          <div className="col-lg-4 col-md-6 col-sm-6 p-2">
            <img
              className="br-10px img-fluid"
              src={ytItem.thumbnails[0]}
              alt={ytItem.title}
            ></img>
          </div>
          <div className="col-lg-8 col-sm-6 align-content-start">
            <div className="justify-content-center p2">{ytItem.title}</div>
            {audioLink === undefined ? (
              <div className="justify-content-center mt-2">
                <button
                  className="btn btn-danger"
                  onClick={(e) => {
                    e.preventDefault();
                    if (!request) {
                      setRequested(true);
                      getYoutubeAudioLink(ytItem.url_suffix)
                        .then((res) => {
                          if (res.status === 200) {
                            setaudioLink(res.data);
                          }
                        })
                        .then(() => {
                          setRequested(false);
                        });
                    }
                  }}
                >
                  Get Link from Server
                </button>
              </div>
            ) : (
              <div className="justify-content-center mt-2">
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    window.open(audioLink);
                  }}
                >
                  Download Song
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <br />
    </div>
  );
};

export default YtCard;
