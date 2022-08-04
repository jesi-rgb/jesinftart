import { useContractFunction, useEthers } from "@usedapp/core";
import { Contract } from "@ethersproject/contracts";
import {
  CollectionInterface,
  IPFS_PREFIX,
  THUMBNAIL_FILENAME,
  WEB_URI,
} from "@/lib/utils";

import SuccessAlert from "./SucessAlert";
import LoadingPing from "./LoadingPing";
import { useState, useEffect } from "react";

export default function MintButton({
  collectionAddress,
  seed,
  name,
  totalSupply,
  description,
  ipfsHash,
}) {
  const { account, chainId } = useEthers();
  // const rightNetwork = TODO

  const minting_tx_name = "Mint NFT";
  const [mintButtonPushed, setMintButtonPushed] = useState(false);

  // Get contract
  const collectionContract = new Contract(
    collectionAddress,
    CollectionInterface
  );

  // Minting function
  const { send: mintSend, state: mintState } = useContractFunction(
    collectionContract,
    "mint",
    { transactionName: minting_tx_name }
  );

  useEffect(() => {
    const pushAndMint = async (json) => {
      let ipfs_response = await fetch(`/api/jsonToIpfs`, {
        method: "POST",
        body: JSON.stringify(await json),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if ((await ipfs_response.status) == 500) {
        console.error(
          "An error happened while trying to upload JSON:",
          await ipfs_response.json()
        );
      } else {
        let json_ipfs_hash = (await ipfs_response.json())["IpfsHassh"];
        if (json_ipfs_hash === undefined) {
          console.error("Ipfs Hash is undefined");
        } else {
          let ipfs_json_uri = IPFS_PREFIX + json_ipfs_hash;
          mintSend(account, ipfs_json_uri);
          console.log("Nft hash:", json_ipfs_hash);
        }
      }

      setMintButtonPushed(false);
    };
    if (mintButtonPushed) {
      let json = {
        name: name + " #" + totalSupply,
        description: description,
        animation_url: IPFS_PREFIX + ipfsHash + "?seed=" + seed,
        image: IPFS_PREFIX + ipfsHash + "/" + THUMBNAIL_FILENAME,
        external_url:
          WEB_URI + "/collections/" + collectionAddress + "/" + totalSupply,
        attributes: [
          {
            trait_type: "Seed",
            value: seed,
          },
        ],
      };
      pushAndMint(json);
    }
  }, [mintButtonPushed]);

  const isMining = mintState.status === "Mining";

  return (
    <>
      {chainId === 4 ? (
        <button
          className="text-slate-300 font-body bg-slate-800 hover:bg-slate-600 transition-colors rounded-lg px-3 py-1 border-2 border-slate-600 w-full"
          onClick={() => {
            setMintButtonPushed(true);
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
      ) : (
        <button
          disabled
          className="text-slate-300 font-body bg-slate-800 hover:bg-slate-600 transition-colors rounded-lg px-3 py-1 border-2 border-slate-600 w-full"
        >
          {account
            ? "Connect to Rinkeby network to mint" //TODO change rinkeby
            : "Connect account to mint"}
        </button>
      )}

      {mintState.status === "Success" ? (
        <SuccessAlert id="hideMe" />
      ) : (
        <div></div>
      )}
    </>
  );
}
