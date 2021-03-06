/* eslint-disable import/no-anonymous-default-export */
import pinata from "@pinata/sdk";

const pinata_client = pinata(
  process.env.PINATA_API_KEY,
  process.env.PINATA_SECRET_API_KEY
);

/**
 * Uploads json to IPFS
 */
export default async (req, res) => {
  let response = await pinata_client.pinJSONToIPFS(req.body);
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "max-age=180000");
  res.end(JSON.stringify(response));
};
