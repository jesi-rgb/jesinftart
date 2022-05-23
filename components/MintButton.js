import {
  useContractFunction,
  useEthers,
  useNotifications,
} from "@usedapp/core";
import JesiArt from "@/contracts/JesiArt.json";
import { utils } from "ethers";
import { Contract } from "@ethersproject/contracts";
import { JESI_ART_CONTRACT_ADDRESS } from "@/lib/utils";
import { Snackbar, CircularProgress } from "@material-ui/core";
import { useState, useEffect } from "react";
import { Alert } from "@material-ui/lab";
import SuccessAlert from "./SucessAlert";
// import "tw-elements";

export default function MintButton({ nftUri: nftUri }) {
  const minting_tx_name = "Mint NFT";

  // Get contract
  const jesiArtAbi = JesiArt.abi;
  const jesiArtInterface = new utils.Interface(jesiArtAbi);
  const jesiArtContract = new Contract(
    JESI_ART_CONTRACT_ADDRESS,
    jesiArtInterface
  );

  const { send: mintSend, state: mintState } = useContractFunction(
    jesiArtContract,
    "create_ntf",
    { transactionName: minting_tx_name }
  );

  const isMining = mintState.status === "Mining";

  return (
    <>
      <button
        className="text-slate-300 font-body bg-slate-800 hover:bg-slate-600 transition-colors rounded-lg px-3 py-1 border-2 border-slate-600 w-full"
        onClick={() => {
          mintSend(nftUri);
        }}
      >
        {isMining ? (
          <span className="">
            Minting...{" "}
            <div
              className="spinner-grow inline-block w-4 h-4 bg-current rounded-full opacity-0"
              role="status"
            ></div>
          </span>
        ) : (
          "Mint NFT"
        )}
      </button>
      {/* <Snackbar open={mintState.status === "Success"} autoHideDuration={200}>
        <Alert severity="success">Mint approved!</Alert>
      </Snackbar> */}

      {mintState.status === "Success" ? (
        <SuccessAlert id="hideMe" />
      ) : (
        <div></div>
      )}
    </>
  );
} // TODO change snackbar and alert because it throws an exception and you can make it more beautiful, Jesi
