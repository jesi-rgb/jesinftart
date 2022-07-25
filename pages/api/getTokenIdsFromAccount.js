/* eslint-disable import/no-anonymous-default-export */
import JesiArt from "@/contracts/JesiArt.json";
import Web3 from "web3";

/**
 * Calls the blockchain to return the ids of the tokens owned by a specific account
 */
export default async (req, res) => {
  const { contractAddress, account } = req.query;
  let web3 = new Web3(`https://rinkeby.infura.io/v3/${process.env.INFURA_KEY}`); //TODO

  const contract = new web3.eth.Contract(JesiArt.abi, contractAddress);

  // Get the tokens that the account received
  const eventsReceivedTokens = await contract.getPastEvents("Transfer", {
    filter: {
      to: account,
    },
    fromBlock: 0,
  });

  // Count the number of times the account received the token
  let receivedTokensCount = {};
  for (let key in eventsReceivedTokens) {
    let tokenId = eventsReceivedTokens[key]["returnValues"]["tokenId"];
    receivedTokensCount[tokenId] = (receivedTokensCount[tokenId] || 0) + 1;
  }

  let receivedTokenIds = Object.keys(receivedTokensCount);

  // Get the tokens that the account sent
  const eventsSentTokens = await contract.getPastEvents("Transfer", {
    filter: {
      from: account,
      tokenId: receivedTokenIds,
    },
    fromBlock: 0,
  });

  let sentTokensCount = {};
  for (let key in eventsSentTokens) {
    let tokenId = eventsSentTokens[key]["returnValues"]["tokenId"];
    sentTokensCount[tokenId] = (sentTokensCount[tokenId] || 0) + 1;
  }

  // Substract the tokens received by the sent to get the tokens owned by account
  // Store them on ownedTokenIds
  let ownedTokenIds = [];
  for (let tokenId in receivedTokensCount) {
    if (
      (sentTokensCount[tokenId] ? sentTokensCount[tokenId] : 0) <
      receivedTokensCount[tokenId]
    ) {
      ownedTokenIds.push(tokenId);
    }
  }

  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "max-age=180000");
  res.end(JSON.stringify(ownedTokenIds));
};
