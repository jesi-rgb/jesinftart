/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
export default function IPFSImage({ hash }) {
  return (
    <>
      <div className="lg:w-max lg:flex-shrink-0">
        <div className="flex-col ">
          <a href={`https://${hash}.ipfs.infura-ipfs.io/`}>
            <img
              src={`https://${hash}.ipfs.infura-ipfs.io/`}
              alt=""
              width={500}
              height={500}
            />
          </a>
          <p className="w-48 text-gray-400 font-body truncate ...">
            {shrinkHash(hash)}
          </p>
        </div>
      </div>
    </>
  );
}

function shrinkHash(hash) {
  let end = hash.slice(hash.length - 4);
  let start = hash.slice(0, 4);
  return start + "..." + end;
}
