import Attribute from "./Attribute";
import { useRouter } from "next/router";

import { shrinkHash, IPFS_PROVIDER_URI, IPFS_PREFIX } from "@/lib/utils";
import { useState, useEffect } from "react";
import React from "react";
import CanvasScript from "./CanvasScript";

import { ArrowTopRightIcon } from "@radix-ui/react-icons";

export default function PieceBody({ contract, tokenId }) {
  const router = useRouter();
  const [ipfsData, setIpfsData] = useState(undefined);
  const [nftUri, setNftUri] = useState(undefined);
  const [owner, setOwner] = useState(undefined);

  // Get the token URI in JSON format
  useEffect(() => {
    const getData = async () => {
      const token_uri_response = await fetch(
        `/api/callBlockchain?contractAddress=${contract}&method_name=tokenURI&args=[${tokenId}]`
      );

      if (token_uri_response.status !== 200) {
        router.replace("/404");
      }

      setNftUri(
        (await token_uri_response.text())
          .slice(1, -1)
          .replace(IPFS_PREFIX, IPFS_PROVIDER_URI)
      );

      const owner_of_response = await fetch(
        `/api/callBlockchain?contractAddress=${contract}&method_name=ownerOf&args=[${tokenId}]`
      );

      setOwner((await owner_of_response.text()).slice(1, -1));
    };
    if (contract !== undefined && tokenId !== undefined) {
      getData();
    }
  }, [contract, tokenId]);

  // Get the JSON values form the URI obtained above
  useEffect(() => {
    const getData = async () => {
      const token_uri_response = await fetch(nftUri);

      setIpfsData(await token_uri_response.json());
    };
    if (nftUri !== undefined) {
      getData();
    }
  }, [nftUri]);

  let name = ipfsData?.name;
  let description = ipfsData?.description;
  let ipfs_animation = ipfsData?.animation_url.replace(
    IPFS_PREFIX,
    IPFS_PROVIDER_URI
  );
  let attributes = ipfsData?.attributes;
  //   const repeat = (arr, n) => [].concat(...Array(n).fill(arr));
  //   attributes = repeat(attributes ?? [{ Mod: 11 }], 4);
  let length = attributes?.length / 3;

  return (
    <>
      <div className="flex flex-col items-center mx-auto max-w-sm xl:max-w-max lg:space-y-0 xl:grid xl:grid-cols-2 xl:gap-44 xl:items-end">
        {/* IMAGE TITLE and BUTTONS */}
        <div className="w-full flex-col mb-10 space-y-4 mt-14 mx-auto xl:mb-0 lg:inline-block">
          <h1 className="text-5xl xl:text-6xl font-titles text-slate-100 mx-auto">
            {name}
          </h1>
          {/* CONTROL BUTTONS */}
          <div className="flex flex-row w-full place-content-evenly xl:place-content-start xl:space-x-4 py-5 xl:py-0">
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
            <CanvasScript url={ipfs_animation} />
          </div>
        </div>

        {/* NFT DATA */}
        <div className="space-y-4 w-full inline-block">
          <div className="grid grid-flow-row grid-rows-{length} grid-cols-3 gap-3">
            {attributes?.map((a) => (
              <Attribute
                key={a.trait_type + a.value}
                trait_type={a.trait_type}
                value={a.value}
              />
            ))}
          </div>
          <div>
            <div className="text-slate-200 font-titles"> Description</div>
            <div className="text-slate-400 font-body text-justify">
              {description}
            </div>
          </div>

          {/* OWNER */}
          <div className="flex flex-row font-body">
            <div className="flex text-slate-200 font-titles w-full lg:w-screen">
              Owner
            </div>
            <div>
              <div className="flex text-slate-400 lg:w-full truncate ...">
                {owner ? shrinkHash(owner) : "Retrieving owner..."}
              </div>
            </div>
          </div>

          {/* HASH */}
          <div className="flex flex-row">
            <div className="text-slate-200 font-titles w-full lg:w-screen">
              {" "}
              Seed
            </div>
            <div className="text-slate-400 font-body">
              {ipfs_animation?.match(/\d+$/)[0]}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function reloadIframe() {
  var ifr = document.getElementById("iframe");

  ifr.src = ifr.src;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
