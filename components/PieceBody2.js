import IPFSImage from "./IPFSImage";
import { shrinkHash } from "@/lib/utils";
import MintButton from "./MintButton";
import ConnectButton from "./ConnectButton";
import JesiArt from "@/contracts/JesiArt.json";
import { constants, utils } from "ethers";
import { Contract } from "@ethersproject/contracts";
import { useContractFunction, useCall, useEthers } from "@usedapp/core";
import { useState, useEffect } from "react";

export default function PieceBody2({ contract_address, token_id, slug }) {
  //   const { account, chainId, activateBrowserWallet, deactivate, error } =
  //     useEthers();
  //   const isConnected = account !== undefined;

  const jesiArtAbi = JesiArt.abi;
  const jesiArtInterface = new utils.Interface(jesiArtAbi);

  const jesiArtContract = new Contract(contract_address, jesiArtInterface);

  //   const { send: tokenURISend, state: tokenURIState } = useContractFunction(
  //     jesiArtContract,
  //     "tokenURI",
  //     { transactionName: "Get token URI" }
  //   );

  //   const token_uri = tokenURISend(token_id);
  //   console.log(token_uri);

  const { value: json_uri } =
    useCall({
      contract: jesiArtContract,
      method: "tokenURI",
      args: [token_id],
    }) ?? {};

  console.log(json_uri);

  const [ipfsData, setIpfsData] = useState();
  useEffect(() => {
    const getData = async () => {
      const response = await fetch(json_uri);

      const data = await response.json();

      setIpfsData(data);
    };

    getData();
  }, []);

  console.log(ipfsData);

  return (
    <>
      <div className="flex flex-col items-center mx-auto max-w-sm xl:max-w-max lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-44 lg:items-end">
        {/* IMAGE AND TITLE */}
        <div className="w-full flex-col mb-10 space-y-6 mt-14 mx-auto lg:max-w-min lg:mb-0 lg:inline-block">
          <h1 className="text-5xl lg:text-6xl font-titles text-slate-100 mx-auto">
            Title
          </h1>
          <div className="mx-auto">
            <IPFSImage hash={slug} />
          </div>
        </div>

        {/* NFT DATA */}
        <div className="space-y-4 lg:w-full lg:inline-block">
          <div>
            <div className="text-slate-200 font-titles"> Description</div>
            <div className="text-slate-400 font-body text-justify">
              {" "}
              Lorem ipsum dolor sit amuptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.{" "}
            </div>
          </div>

          {/* PRICE */}
          <div className="flex flex-row font-body">
            <div className="flex text-slate-200 font-titles w-1/4 lg:w-screen">
              Price
            </div>
            <div className="w-3/4 flex flex-row space-x-3 lg:w-full lg:items-end">
              <div className="w-full"></div>
              <div className="text-slate-400">50</div>
              <div className="text-slate-400">ETH</div>
            </div>
          </div>

          {/* OWNER */}
          <div className="flex flex-row font-body">
            <div className="flex text-slate-200 font-titles w-full lg:w-screen">
              Owner
            </div>
            <div>
              <div className="flex text-slate-400 lg:w-full truncate ...">
                {shrinkHash("0000002304990291348102934801293481029348")}
              </div>
            </div>
          </div>

          {/* HASH */}
          <div className="flex flex-row">
            <div className="text-slate-200 font-titles w-full lg:w-screen">
              {" "}
              Hash
            </div>
            <div className="text-slate-400 font-body"> {shrinkHash(slug)}</div>
          </div>
          <div className="w-full">
            <MintButton />
          </div>
        </div>
      </div>
    </>
  );
}

// async function getJSON(URI) {
//   try {
//     let response = await useFetch(URI);
//     let responseJson = await response.json();

//     return responseJson;
//   } catch (error) {
//     console.error(error);
//   }
// }
