/* eslint-disable import/no-anonymous-default-export */
import { retrieveIPFSData } from "@/lib/ipfs";
import JesiArt from "@/contracts/JesiArt.json";
import { Contract } from "@ethersproject/contracts";
import { constants, utils } from "ethers";
import { useContractFunction, useCall, useEthers } from "@usedapp/core";

export default async (req, res) => {
  const { contractAddress, tokenId } = req.query;

  const jesiArtAbi = JesiArt.abi;
  const jesiArtInterface = new utils.Interface(jesiArtAbi);
  const jesiArtContract = new Contract(contractAddress, jesiArtInterface);

  const { value: json_uri } =
    useCall({
      contract: jesiArtContract,
      method: "tokenURI",
      args: [tokenId],
    }) ?? {};

  return json_uri;
};
