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
  let [seed, setSeed] = useState(getRandomInt(99999));

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

  useEffect(() => {
    reloadIframe();
  }, [seed]);

  useEffect(() => {
    window.addEventListener("resize", () => reloadIframe());
  }, [seed]);

  return (
    <>
      <div className="flex flex-col items-center mx-auto max-w-xs lg:max-w-xl xl:max-w-full xl:space-y-0 xl:grid xl:grid-cols-2 xl:gap-40 xl:items-end">
        {/* IMAGE TITLE and BUTTONS */}
        <div className="w-full flex-col mb-10 space-y-4 mt-14 mx-auto xl:mb-0 lg:inline-block">
          <h1 className="text-5xl xl:text-6xl font-titles text-slate-100 mx-auto">
            Title
          </h1>
          {/* CONTROL BUTTONS */}
          <div className="flex flex-row w-full place-content-evenly xl:place-content-start xl:space-x-4 py-5 xl:py-0">
            <button
              onClick={reloadIframe}
              className="group flex flex-row items-center space-x-1 text-slate-500 hover:text-slate-200 transition-colors duration-150"
            >
              <div className="font-body opacity-0 absolute right-0 top-0 xl:opacity-100 xl:relative">
                Reload
              </div>
              <ReloadIcon className="mt-0.5 xl:w-auto group-hover:rotate-180 transition-transform" />
            </button>

            <button
              onClick={() => {
                let newSeed = getRandomInt(99999);
                setSeed(() => newSeed);
                document.getElementById("inputValue").value = newSeed;
              }}
              className="group flex flex-row items-center space-x-1 text-slate-500 hover:text-slate-200 transition-colors duration-150"
            >
              <div className="font-body opacity-0 absolute right-0 top-0 xl:opacity-100 xl:relative">
                New seed
              </div>
              <MagicWandIcon className="mt-0.5 group-hover:rotate-12 transition-transform" />
            </button>

            <a href={img_uri ?? "#"}>
              <div className="group flex flex-row items-center space-x-1 text-slate-500 hover:text-slate-200 transition-colors duration-150">
                <div className="font-body opacity-0 absolute right-0 top-0 xl:opacity-100 xl:relative">
                  View on IPFS
                </div>
                <ArrowTopRightIcon className="mt-0.5 transform scale-125 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
            </a>
          </div>
          <div onResize={reloadIframe}>
            <CanvasScript
              url={
                "https://cloudflare-ipfs.com/ipfs/QmTiGR2DedqBaqgfrTHUspqurHDBLo7txpZXS5KTXUmLtu?seed=" +
                seed
              }
            />
          </div>
        </div>

        {/* NFT DATA */}
        <div className="space-y-4 lg:w-full xl:inline-block">
          <div>
            <div className="text-slate-200 font-titles"> Description</div>
            <div className="text-slate-400 font-body text-sm text-justify selection:bg-slate-200 selection:text-slate-800">
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

          {/* HASH */}
          <div className="flex flex-row">
            <div className="text-slate-200 font-titles w-full lg:w-screen">
              {" "}
              Seed
            </div>
            <form
              onKeyDown={(key) => {
                if (key.key == "Enter") {
                  setSeed(document.getElementById("inputValue").value);
                  console.log("mierda", seed);
                }
              }}
              //   onChange={(e) => (seed = e.target.value)}
            >
              <input
                className="text-slate-400 font-body bg-slate-800 table-cell text-right"
                type="text"
                id="inputValue"
                defaultValue={seed}
              />
            </form>
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
  var ifr = document.getElementById("iframe");
  let url = new URL(ifr.src);

  url.searchParams.set("seed", seed);

  ifr.src = url.href;
}

function reloadIframe() {
  console.log("reloading iframe");
  var ifr = document.getElementById("iframe");

  ifr.src = ifr.src;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
