/* eslint-disable import/no-anonymous-default-export */
import JesiArt from "@/contracts/JesiArt.json";
import Web3 from "web3";
import { constants } from "ethers";

const web3 = new Web3(
  `https://rinkeby.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`
);

export default async (req, res) => {
  const { contractAddress } = req.query;
  const contract = new web3.eth.Contract(JesiArt.abi, contractAddress);

  const response = await contract.getPastEvents("Transfer", {
    filter: {
      _from: constants.AddressZero,
    },
    fromBlock: 0,
  });

  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "max-age=180000");
  res.end(JSON.stringify(response));
};
