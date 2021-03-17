import Axios from "axios";

const BASE_URL = "https://torr-scraper.herokuapp.com/api/";

const instance = Axios.create({ baseURL: BASE_URL, timeout: 10000 });

export async function getMusicRawSearchResult(search_query) {
  const url = `jiosaavnraw?search=${search_query}`;

  return new Promise(function (resolve, reject) {
    instance
      .get(url)
      .then((res) => {
        return resolve(res);
      })
      .catch((err) => {
        return reject(err);
      });
  });
}

export async function getMusicWithData(search_query) {
  const url = `jiosaavnsong?search=${search_query}`;

  return new Promise(function (resolve, reject) {
    instance
      .get(url)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export async function getMusicAlbum(search_query) {
  const url = `jiosaavnalbum?search=${search_query}`;

  return new Promise(function (resolve, reject) {
    instance
      .get(url)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export async function getMusicPlaylist(search_query) {
  const url = `jiosaavnplaylist?search=${search_query}`;

  return new Promise(function (resolve, reject) {
    instance
      .get(url)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export async function getYoutubeSearchResult(search_query) {
  const url = `yt?search=${search_query}`;

  return new Promise(function (resolve, reject) {
    instance
      .get(url)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export async function getYoutubeAudioLink(url_suffix) {
  const url = `yturl?search=${url_suffix}`;

  return new Promise(function (resolve, reject) {
    instance
      .get(url)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
