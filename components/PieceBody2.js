import IPFSImage from "@/components/IPFSImage";
import { shrinkHash } from "@/lib/utils";
import MintButton from "@/components/MintButton";
import { useState, useEffect } from "react";
import React from "react";
import Attribute from "./Attribute";
import { useRouter } from "next/router";

export default function Ntf({ contract, tokenId }) {
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

      setNftUri((await token_uri_response.text()).slice(1, -1));

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
  let img_uri = ipfsData?.image;
  let attributes = ipfsData?.attributes;
  //   const repeat = (arr, n) => [].concat(...Array(n).fill(arr));
  //   attributes = repeat(attributes ?? [{ Mod: 11 }], 4);
  let length = attributes?.length / 3;

  return (
    <>
      <div className="flex flex-col items-center mx-auto max-w-sm xl:max-w-max lg:space-y-0 xl:grid xl:grid-cols-2 xl:gap-44 xl:items-end">
        {/* IMAGE AND TITLE */}
        <div className="w-full flex-col mb-10 space-y-6 mt-14 mx-auto xl:max-w-min xl:mb-0 xl:inline-block">
          <h1 className="text-5xl xl:text-6xl font-titles text-slate-100 mx-auto">
            {name}
          </h1>
          <div className="">
            <IPFSImage url={img_uri} />
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
                {owner ? shrinkHash(owner) : "Retrieving owner..."}
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
          <div className="w-full">{nftUri ? <MintButton /> : <></>}</div>
        </div>
      </div>
    </>
  );
}
