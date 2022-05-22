/* eslint-disable import/no-anonymous-default-export */
import JesiArt from "@/contracts/JesiArt.json";
import Web3 from "web3";

export default async (req, res) => {
  const { contractAddress, method_name, args } = req.query;
  let web3 = new Web3(`https://rinkeby.infura.io/v3/${process.env.INFURA_KEY}`); //TODO

  const contract = new web3.eth.Contract(JesiArt.abi, contractAddress);

  const response = await contract.methods[method_name]
    .apply(this, JSON.parse(args))
    .call();

  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "max-age=180000");
  res.end(JSON.stringify(response));
};