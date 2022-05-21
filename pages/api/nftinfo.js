/* eslint-disable import/no-anonymous-default-export */
import { retrieveIPFSData } from "@/lib/ipfs";

export default async (req, res) => {
  const { hash } = req.query;
  console.log(hash);
  const json = await retrieveIPFSData(`https:/${hash}.ipfs.infura-ipfs.io`);

  return res.status(200).json(json);
};
