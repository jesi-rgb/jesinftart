/* eslint-disable @next/next/no-img-element */
import { shrinkHash } from "@/lib/utils";
export default function CarouselImage({ hash }) {
  return (
    <>
      <div className="lg:w-max lg:flex-shrink-0 text-gray-600 hover:text-gray-300 transition-colors">
        <div className="flex-col ">
          <a href={`/pieces/${hash}`}>
            <img
              src={`https://${hash}.ipfs.infura-ipfs.io/`}
              alt=""
              width={500}
              height={500}
            />
          </a>
          <div className="w-48 font-body truncate ...">{shrinkHash(hash)}</div>
        </div>
      </div>
    </>
  );
}
