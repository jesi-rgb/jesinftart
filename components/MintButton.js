import { useContractFunction } from "@usedapp/core";
import JesiArt from "@/contracts/JesiArt.json";
import { utils } from "ethers";
import { Contract } from "@ethersproject/contracts";
import { JESI_ART_CONTRACT_ADDRESS } from "@/lib/utils";

import SuccessAlert from "./SucessAlert";
import LoadingPing from "./LoadingPing";
import { useState, useEffect } from "react";

export default function MintButton({}) {
  const minting_tx_name = "Mint NFT";
  const [pushJsonToIpfs, setPushJsonToIpfs] = useState(false);

  // Get contract
  const jesiArtAbi = JesiArt.abi;
  const jesiArtInterface = new utils.Interface(jesiArtAbi);
  const jesiArtContract = new Contract(
    JESI_ART_CONTRACT_ADDRESS,
    jesiArtInterface
  );

  // Minting function
  const { send: mintSend, state: mintState } = useContractFunction(
    jesiArtContract,
    "create_ntf",
    { transactionName: minting_tx_name }
  );

  const nftJson = {
    name: "PUGGY",
    description: "An amazinger Z adorable PUG pup!",
    image:
      "https://ipfs.io/ipfs/QmSsYRx3LpDAb1GZQm7zZ1AuHZjfbPkD6J7s9r41xu1mf8?filename=pug.png",
    attributes: [
      {
        trait_type: "cuteness",
        value: 100,
      },
    ],
  };

  useEffect(() => {
    const pushAndMint = async () => {
      const ipfs_response = await fetch(
        `/api/jsonToIpfs?jsonURI=${JSON.stringify(nftJson)}`
      );

      let ipfs_hash = ipfs_response["IpfsHash"];
      let ipfs_json_uri = `https://ipfs.io/ipfs/${ipfs_hash}`;
      mintSend(ipfs_json_uri);

      console.log(ipfs_json_uri);

      setPushJsonToIpfs(false);
    };
    if (pushJsonToIpfs) {
      pushAndMint();
    }
  }, [pushJsonToIpfs]);

  const isMining = mintState.status === "Mining";

  return (
    <>
      <button
        className="text-slate-300 font-body bg-slate-800 hover:bg-slate-600 transition-colors rounded-lg px-3 py-1 border-2 border-slate-600 w-full"
        onClick={() => {
          setPushJsonToIpfs(true);
        }}
      >
        {isMining ? (
          <div className="inline-block mx-auto space-x-3">
            <span>Minting...</span>
            <LoadingPing />
          </div>
        ) : (
          "Mint NFT"
        )}
      </button>

      {mintState.status === "Success" ? (
        <SuccessAlert id="hideMe" />
      ) : (
        <div></div>
      )}
    </>
  );
} // TODO change snackbar and alert because it throws an exception and you can make it more beautiful, Jesi
