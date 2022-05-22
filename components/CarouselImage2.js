/* eslint-disable @next/next/no-img-element */
import { shrinkHash } from "@/lib/utils";
export default function CarouselImage2({ contractAddress, tokenId, img }) {
  return (
    <>
      <div className="lg:w-max lg:flex-shrink-0 text-gray-600 hover:text-gray-300 transition-colors">
        <div className="flex-col ">
          <a href={`/collections/${contractAddress}/${tokenId}`}>
            <img src={img} alt="" width={500} height={500} />
          </a>
          <div className="w-48 font-body truncate ...">
            {shrinkHash("hash")}
          </div>
        </div>
      </div>
    </>
  );
}
