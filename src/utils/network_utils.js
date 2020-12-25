import Axios from "axios";

const BASE_URL = "https://torr-scraper.herokuapp.com/api/";

export async function getMusicRawSearchResult(search_query) {
  let url = `${BASE_URL}jiosaavnraw?search=${search_query}`;

  return new Promise(function (resolve, reject) {
    Axios.get(url)
      .then((res) => {
        return resolve(res);
      })
      .catch((err) => {
        return reject(err);
      });
  });
}

export async function getMusicWithData(search_query) {
  let url = `${BASE_URL}jiosaavnsong?search=${search_query}`;

  return new Promise(function (resolve, reject) {
    Axios.get(url)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export async function getMusicAlbum(search_query) {
  let url = `${BASE_URL}jiosaavnalbum?search=${search_query}`;

  return new Promise(function (resolve, reject) {
    Axios.get(url)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export async function getMusicPlaylist(search_query) {
  let url = `${BASE_URL}jiosaavnplaylist?search=${search_query}`;

  return new Promise(function (resolve, reject) {
    Axios.get(url)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
