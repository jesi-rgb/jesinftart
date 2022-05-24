/* eslint-disable import/no-anonymous-default-export */
import { retrieveIPFSData } from "@/lib/ipfs";

export default async (req, res) => {
  const { url } = req.query;
  console.log(url);
  const json = await retrieveIPFSData(url).then((response) => {
    return response;
  });

  return res.status(200).json(json);
};
