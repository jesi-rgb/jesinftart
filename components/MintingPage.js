import { shrinkHash } from "@/lib/utils";
import MintButton from "@/components/MintButton";
import { useState, useEffect } from "react";
import React from "react";
import CanvasScript from "./CanvasScript";
import {
  ReloadIcon,
  ArrowTopRightIcon,
  MagicWandIcon,
} from "@radix-ui/react-icons";

export default function MintingPage({ contract, tokenId }) {
  const [ipfsData, setIpfsData] = useState(undefined);
  const [nftUri, setNftUri] = useState(undefined);

  // Get the token URI in JSON format
  useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        `/api/callBlockchain?contractAddress=${contract}&method_name=tokenURI&args=[${tokenId}]`
      );
      setNftUri(await response.text());
    };
    if (contract !== undefined && tokenId !== undefined) {
      getData();
    }
  }, [contract, tokenId]);

  // Get the JSON values form the URI obtained above
  useEffect(() => {
    const getData = async () => {
      const token_uri_response = await fetch(nftUri.slice(1, -1));

      setIpfsData(await token_uri_response.json());
    };
    if (nftUri !== undefined) {
      getData();
    }
  }, [nftUri]);

  let name = ipfsData?.name;
  let description = ipfsData?.description;
  let img_uri = ipfsData?.image;
  let attributes = ipfsData?.attributes;

  return (
    <>
      <div className="flex flex-col items-center mx-auto max-w-sm xl:max-w-max lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-44 lg:items-end">
        {/* IMAGE TITLE and BUTTONS */}
        <div className="w-full flex-col mb-10 space-y-2 mt-14 mx-auto lg:max-w-min lg:mb-0 lg:inline-block">
          <h1 className="text-5xl lg:text-6xl font-titles text-slate-100 mx-auto">
            Title
          </h1>
          {/* CONTROL BUTTONS */}
          <div className="flex flex-row space-x-5">
            <button
              onClick={reloadIframe}
              className="group flex flex-row items-center space-x-1 text-slate-500 hover:text-slate-200 transition-colors duration-150"
            >
              <div className="font-body">Reload</div>
              <ReloadIcon className="mt-0.5 group-hover:rotate-180 transition-transform" />
            </button>

            <button
              onClick={newSeedIframe}
              className="group flex flex-row items-center space-x-1 text-slate-500 hover:text-slate-200 transition-colors duration-150"
            >
              <div className="font-body">New seed</div>
              <MagicWandIcon className="mt-0.5 group-hover:rotate-12 transition-transform" />
            </button>

            <a href={img_uri ?? "#"}>
              <div className="group flex flex-row items-center space-x-1 text-slate-500 hover:text-slate-200 transition-colors duration-150">
                <div className="font-body">View on IPFS</div>
                <ArrowTopRightIcon className="transform scale-125 mt-0.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
            </a>
          </div>
          <div className="relative">
            <CanvasScript url={"http://127.0.0.1:5500?seed=1"} />
          </div>
        </div>

        {/* NFT DATA */}
        <div className="space-y-4 lg:w-full lg:inline-block">
          <div>
            <div className="text-slate-200 font-titles"> Description</div>
            <div className="text-slate-400 font-body text-sm text-justify">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
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
            <div className="text-slate-400 font-body">
              {" "}
              {shrinkHash("TODOadsfsdfdsfsdfsdfsdfds")}
            </div>
          </div>
          <div className="w-full">
            <MintButton />
          </div>
        </div>
      </div>
    </>
  );
}

function newSeedIframe() {
  let newSeed = getRandomInt(99999).toString();

  var ifr = document.getElementById("iframe");
  let url = new URL(ifr.src);

  url.searchParams.set("seed", newSeed);

  ifr.src = url.href;
}

function reloadIframe() {
  var ifr = document.getElementById("iframe");

  ifr.src = ifr.src;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
