import IPFSImage from "./IPFSImage";
import { shrinkHash } from "@/lib/utils";
import MintButton from "./MintButton";
import { useState, useEffect } from "react";

export default function PieceBody(slug) {
  const [ipfsData, setIpfsData] = useState();
  useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        "/api/nftinfo?hash=bafybeid7sjqlgojjauron7up723uhaac5rsxlkmd3c4sjtxjv5g6ws3xgy"
      );
      const data = await response.json();

      setIpfsData(data);
    };

    getData();
  }, []);
  console.log(ipfsData);

  const title = ipfsData?.name || "Title";

  const desc =
    ipfsData?.description ||
    "Lorem ipsum dolor sit amuptate velit esse cillum dolore eu fugiatnulla pariatur. Excepteur sint occaecat cupidatat non proident,sunt in culpa qui officia deserunt mollit anim id est laborum.";

  return (
    <>
      <div className="flex flex-col items-center mx-auto max-w-sm xl:max-w-max lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-44 lg:items-end">
        {/* IMAGE AND TITLE */}
        <div className="w-full flex-col mb-10 space-y-6 mt-14 mx-auto lg:max-w-min lg:mb-0 lg:inline-block">
          <h1 className="text-5xl lg:text-6xl font-titles text-slate-100 mx-auto">
            {title}
          </h1>
          <div className="mx-auto">
            <IPFSImage hash={slug} />
          </div>
        </div>
        {/* NFT DATA */}
        <div className="flex flex-col space-y-6 w-full lg:w-1/2">
          <div>
            <div className="text-slate-200 font-titles"> Description</div>
            <div className="text-slate-400 font-body text-justify">{desc}</div>
          </div>
          <div className="flex flex-row font-body">
            <div className="flex text-gray-200 font-titles">Price</div>
            <div className="flex text-gray-400 ml-4">50</div>
            <div className="flex text-gray-400 ml-4">ETH</div>
          </div>
          <div className="flex flex-row font-body">
            <div className="flex text-gray-200 font-titles">Owner</div>

            <div>
              <div className="flex text-gray-400 ml-4 truncate ...">
                {shrinkHash("0000002304990291348102934801293481029348")}
              </div>
              <div className="text-gray-400 ml-4 opacity-0 hover:opacity-100 transition-opacity duration-300">
                0000002304990291348102934801293481029348
              </div>
            </div>
          </div>
          <div className="">
            <div className="text-gray-200 font-titles"> Hash:</div>
            <div className="text-gray-400 font-body text-xs lg:text-lg w-min">
              {" "}
              {shrinkHash(slug.content)}
            </div>
          </div>
        </div>
        <MintButton />
      </div>
    </>
  );
}
