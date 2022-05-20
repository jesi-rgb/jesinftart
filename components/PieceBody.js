import IPFSImage from "./IPFSImage";
import { shrinkHash } from "@/lib/utils";

export default function PieceBody(slug) {
  return (
    <>
      <div className="flex flex-col items-center mx-auto max-w-md lg:max-w-max lg:flex-row lg:space-y-0 lg:space-x-44">
        {/* Image and hash */}
        <div className="w-full flex-col mb-10 space-y-6 mt-14 mx-auto lg:max-w-min lg:w-1/2 lg:mb-0">
          <h1 className="text-4xl lg:text-6xl font-titles text-gray-100 mx-auto">
            Title placeholder
          </h1>
          <div className="mx-auto">
            <IPFSImage hash={slug} />
          </div>
          <div className="">
            <div className="text-gray-200 font-titles"> Hash:</div>
            <div className="text-gray-400 font-body text-xs lg:text-lg w-min">
              {" "}
              {slug.content}
            </div>
          </div>
        </div>
        {/* NFT DATA */}
        <div className="flex flex-col space-y-6 w-full lg:w-1/2">
          <div>
            <div className="text-gray-200 font-titles"> Description</div>
            <div className="text-gray-400 font-body text-justify">
              {" "}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.{" "}
            </div>
          </div>
          <div className="flex flex-row font-body">
            <div className="flex text-gray-200 font-titles">Price</div>
            <div className="flex text-gray-400 ml-4">50</div>
            <div className="flex text-gray-400 ml-4">ETH</div>
          </div>
          <div className="flex flex-row font-body">
            <div className="flex text-gray-200 font-titles">Owner</div>
            <div
              className="flex text-gray-400 ml-4 truncate ..."
              alt="0000002304990291348102934801293481029348"
            >
              {shrinkHash("0000002304990291348102934801293481029348")}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
