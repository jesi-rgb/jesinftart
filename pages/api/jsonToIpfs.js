/* eslint-disable import/no-anonymous-default-export */

import axios from "axios";
import pinata from "@pinata/sdk";

export default async (req, res) => {
  const PINATA_PIN_FILE_URL = "https://api.pinata.cloud/pinning/pinJSONToIPFS";

  const { stringJson } = req.query;

  let pinata_client = pinata(
    process.env.PINATA_API_KEY,
    process.env.PINATA_SECRET_API_KEY
  );

  let json = JSON.parse(stringJson);

  let response = await pinata_client.pinJSONToIPFS(json);
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "max-age=180000");
  res.end(JSON.stringify(response));

  //   axios
  //     .post(PINATA_PIN_FILE_URL, file, {
  //       headers: {
  //         pinata_api_key: process.env.PINATA_API_KEY,
  //         pinata_secret_api_key: process.env.PINATA_SECRET_API_KEY,
  //       },
  //       body: file,
  //     })
  //     .then(function (response) {
  //       res.setHeader("Content-Type", "application/json");
  //       res.setHeader("Cache-Control", "max-age=180000");
  //       res.end(JSON.stringify(response.data));
  //     })
  //     .catch(function (response) {
  //       console.log(response);
  //       res.setHeader("Content-Type", "application/json");
  //       res.setHeader("Cache-Control", "max-age=180000");
  //       res.end(JSON.stringify(response));
  //     });
};
