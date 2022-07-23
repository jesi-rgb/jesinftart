/* eslint-disable @next/next/no-img-element */
import { shrinkHash } from "@/lib/utils";

export default function CarouselImage2({ contractAddress, tokenId, img, big }) {
  console.log(big);
  return (
    <>
      <div
        className={
          "text-gray-600 hover:text-gray-300 transition-colors" + big
            ? "col-span-2 row-span-2"
            : ""
        }
      >
        <div className="flex-col">
          <a href={`/collections/${contractAddress}/${tokenId}`}>
            <img src={img} alt="" width={200} height={200} />
          </a>
          <div className="font-body truncate ...">{shrinkHash("hash")}</div>
        </div>
      </div>
    </>
  );
}
