/* eslint-disable import/no-anonymous-default-export */
import pinata from "@pinata/sdk";

const fs = require("fs");
const FormData = require("form-data");
const rfs = require("recursive-fs");
const basePathConverter = require("base-path-converter");
const got = require("got");
import multiparty from "multiparty";
import formidable from "formidable";
import { content } from "tailwind.config";
import axios from "axios";

const pinata_client = pinata(
  process.env.PINATA_API_KEY,
  process.env.PINATA_SECRET_API_KEY
);

const PINATA_URL = "https://api.pinata.cloud/pinning/pinFileToIPFS";

/**
 * Create the smart contracts and upload the canvas to IPFS
 */
export default async (req, res) => {
  let response;
  let boundary = req.body.split("\r")[0];
  console.log("boundary:", boundary);
  try {
    response = await axios({
      method: "post",
      url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
      //   url: PINATA_URL,
      headers: {
        pinata_api_key: process.env.PINATA_API_KEY,
        pinata_secret_api_key: process.env.PINATA_SECRET_API_KEY,
      },
      body: req.body,
    });

    console.log("-----------------");
    console.log(JSON.parse(response.body));
  } catch (error) {
    console.log(error);
  }

  //   let response = await pinata_client.pinFileToIPFS(req.body);

  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "max-age=180000");
  res.end("aaa");
};
