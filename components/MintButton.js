import { useContractFunction } from "@usedapp/core";
import JesiArt from "@/contracts/JesiArt.json";
import { utils } from "ethers";
import { Contract } from "@ethersproject/contracts";
import { JESI_ART_CONTRACT_ADDRESS } from "@/lib/utils";

import SuccessAlert from "./SucessAlert";
import LoadingPing from "./LoadingPing";

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
