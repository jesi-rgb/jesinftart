/* eslint-disable import/no-anonymous-default-export */

import axios from "axios";
import FormData from "form-data";
import { Blob } from "react-blob";

export default async (req, res) => {
  const PINATA_PIN_FILE_URL = "https://api.pinata.cloud/pinning/pinFileToIPFS";

  const { contractAddress } = req.query;
  // let web3 = new Web3(`https://rinkeby.infura.io/v3/${process.env.INFURA_KEY}`); //TODO

  var data = new FormData();
  data.append("upfile", new Blob(["holaaaa"], { type: "text/plain" }));

  axios
    .post(PINATA_PIN_FILE_URL, data, {
      headers: {
        "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
        pinata_api_key: process.env.PINATA_API_KEY,
        pinata_secret_api_key: process.env.PINATA_SECRET_API_KEY,
      },
    })
    .then(function (response) {
      res.setHeader("Content-Type", "application/json");
      res.setHeader("Cache-Control", "max-age=180000");
      res.end(JSON.stringify(response.data));
    })
    .catch(function (response) {
      console.log(response);
      res.setHeader("Content-Type", "application/json");
      res.setHeader("Cache-Control", "max-age=180000");
      res.end(JSON.stringify(response));
    });
};
