/* eslint-disable @next/next/no-img-element */
export default function IPFSImage({ hash }) {
  return (
    <>
      <div className="lg:w-max lg:flex-shrink-0 text-gray-600 hover:text-gray-300 transition-colors">
        <div className="flex-col ">
          <a href={`https://${hash}.ipfs.infura-ipfs.io/`}>
            <img
              src={`https://${hash}.ipfs.infura-ipfs.io/`}
              alt=""
              width={500}
              height={500}
            />
          </a>
        </div>
      </div>
    </>
  );
}
