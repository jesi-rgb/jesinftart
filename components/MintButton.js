import { useContractFunction, useEthers } from "@usedapp/core";
import JesiArt from "@/contracts/JesiArt.json";
import { constants, utils } from "ethers";
import { Contract } from "@ethersproject/contracts";
import { JESI_ART_CONTRACT_ADDRESS } from "@/lib/utils";

export default function MintButton() {
  const { account, chainId, activateBrowserWallet, deactivate, error } =
    useEthers();
  const isConnected = account !== undefined;

  const jesiArtAbi = JesiArt.abi;
  const jesiArtInterface = new utils.Interface(jesiArtAbi);
  const jesiArtContract = new Contract(
    JESI_ART_CONTRACT_ADDRESS,
    jesiArtInterface
  );

  const { send: mintSend, state: mintState } = useContractFunction(
    jesiArtContract,
    "create_ntf",
    { transactionName: "Mint NFT" }
  );

  const jsonURI =
    "https://ipfs.io/ipfs/Qmd9MCGtdVz2miNumBHDbvj8bigSgTwnr4SbyH6DNnpWdt?filename=0-PUG.json"; // TODO remove and upload own json
  const mint = () => {
    console.log(mintState);
    return mintSend(jsonURI);
  };

  return (
    <button
      className="text-slate-300 font-body bg-slate-800 hover:bg-slate-600 transition-colors rounded-lg px-3 py-1 border-2 border-slate-600 w-full"
      onClick={mint}
    >
      Mint NFT
    </button>
  );
}
