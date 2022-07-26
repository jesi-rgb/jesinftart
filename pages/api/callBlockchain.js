/* eslint-disable import/no-anonymous-default-export */
import Collection from "@/contracts/Collection.json";
import Web3 from "web3";

const web3 = new Web3(
  `https://rinkeby.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`
);

export default async (req, res) => {
  const { contractAddress, method_name, args } = req.query;

  const contract = new web3.eth.Contract(Collection.abi, contractAddress);

  const functionCall = args
    ? await contract.methods[method_name].apply(this, JSON.parse(args))
    : await contract.methods[method_name]();

  const response = functionCall
    .call()
    .then((data) => {
      res.setHeader("Content-Type", "application/json");
      res.setHeader("Cache-Control", "no-cache");
      res.end(JSON.stringify(data));
    })
    .catch((error) => {
      res.setHeader("Content-Type", "application/json");
      res.setHeader("Cache-Control", "no-cache");
      res.status(530);
      res.end(JSON.stringify(error.message));
    });
};
