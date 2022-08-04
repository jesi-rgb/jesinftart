/* eslint-disable @next/next/no-img-element */
import { shrinkHash } from "@/lib/utils";

export default function CarouselImage({ contractAddress, tokenId, img, big }) {
  return (
    <>
      <div className="text-gray-600 hover:text-gray-300 transition-colors mx-auto">
        <div className={"flex-col "}>
          <a href={`/collections/${contractAddress}/${tokenId}`}>
            <img
              src={img}
              alt=""
              className="w-[180px] h-[180px] md:w-[230px] md:h-[230px] xl:w-[180px] xl:h-[180px]"
            />
          </a>
          <div className="font-body truncate ...">{shrinkHash("hash")}</div>
        </div>
      </div>
    </>
  );
}
