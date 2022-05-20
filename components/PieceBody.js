import IPFSImage from "./IPFSImage";

export default function PieceBody(slug) {
  return (
    <>
      <div className="flex-col space-y-6 px-5 mt-24 mx-auto lg:max-w-min sm:max-w-max">
        <div className="">
          <IPFSImage hash={slug} />
        </div>
        <div className="">
          <div className="text-gray-300 font-body"> Hash:</div>
          <div className="text-gray-500 font-body text-xs lg:text-lg w-min">
            {" "}
            {slug.content}
          </div>
        </div>
      </div>
    </>
  );
}
