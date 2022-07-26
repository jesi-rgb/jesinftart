import { IPFS_PROVIDER_URI, IPFS_PREFIX } from "@/lib/utils";
import MintButton from "@/components/MintButton";
import React from "react";
import CanvasScript from "./CanvasScript";
import {
  ReloadIcon,
  ArrowTopRightIcon,
  MagicWandIcon,
} from "@radix-ui/react-icons";

export default function MintingPage({
  name,
  symbol,
  description,
  seed,
  mintFee,
}) {
  return (
    <>
      <div className="flex flex-col items-center mx-auto max-w-xs lg:max-w-xl xl:max-w-full xl:space-y-0 xl:grid xl:grid-cols-2 xl:gap-40 xl:items-end">
        {/* IMAGE TITLE and BUTTONS */}
        <div className="w-full flex-col mb-10 space-y-4 mt-14 mx-auto xl:mb-0 lg:inline-block">
          <h1 className="text-5xl xl:text-6xl font-titles text-slate-100 mx-auto">
            {name + " (" + symbol + ")"}
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

            <a href={ipfs_animation ?? "#"}>
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
                IPFS_PROVIDER_URI +
                "QmTiGR2DedqBaqgfrTHUspqurHDBLo7txpZXS5KTXUmLtu?seed=" +
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
              {description}
            </div>
          </div>

          {/* Mint fee */}
          <div className="flex flex-row font-body">
            <div className="flex text-slate-200 font-titles w-1/4 lg:w-screen">
              Mint fee
            </div>
            <div className="w-3/4 flex flex-row space-x-3 lg:w-full lg:items-end">
              <div className="w-full"></div>
              <div className="text-slate-400">{mintFee}</div>
              <div className="text-slate-400">MATIC</div>
            </div>
          </div>

          {/* Minted */}
          <div className="flex flex-row font-body">
            <div className="flex text-slate-200 font-titles w-1/4 lg:w-screen">
              Minted
            </div>
            <div className="w-3/4 flex flex-row space-x-3 lg:w-full lg:items-end">
              <div className="w-full"></div>
              <div className="text-slate-400">
                {totalSupply + "/" + maxSupply}
              </div>
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
            {collectionAddress ? (
              <MintButton
                collectionAddress={collectionAddress}
                seed={seed}
                name={name}
                totalSupply={totalSupply}
                description={description}
                ipfsHash={ipfsData?.p5.replace(IPFS_PREFIX, "")}
              />
            ) : (
              <div></div>
            )}
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
