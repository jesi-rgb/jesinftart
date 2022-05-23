import IPFSImage from "@/components/IPFSImage";
import { shrinkHash } from "@/lib/utils";
import MintButton from "@/components/MintButton";
import { useState, useEffect } from "react";
import React from "react";

export default function Ntf({ contract, tokenId }) {
  const [ipfsData, setIpfsData] = useState(undefined);
  const [nftUri, setNftUri] = useState(undefined);
  const [owner, setOwner] = useState(undefined);

  // Get the token URI in JSON format
  useEffect(() => {
    const getData = async () => {
      const token_uri_response = await fetch(
        `/api/callBlockchain?contractAddress=${contract}&method_name=tokenURI&args=[${tokenId}]`
      );
      setNftUri(await token_uri_response.text());

      const owner_of_response = await fetch(
        `/api/callBlockchain?contractAddress=${contract}&method_name=ownerOf&args=[${tokenId}]`
      );

      setOwner(await owner_of_response.text());
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
        {/* IMAGE AND TITLE */}
        <div className="w-full flex-col mb-10 space-y-6 mt-14 mx-auto lg:max-w-min lg:mb-0 lg:inline-block">
          <h1 className="text-5xl lg:text-6xl font-titles text-slate-100 mx-auto">
            {name}
          </h1>
          <div className="mx-auto">
            <IPFSImage url={img_uri} />
          </div>
        </div>

        {/* NFT DATA */}
        <div className="space-y-4 lg:w-full lg:inline-block">
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
          <div className="w-full">
            <MintButton />
          </div>
        </div>
      </div>
    </>
  );
}
