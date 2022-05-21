/* eslint-disable @next/next/no-img-element */
export default function IPFSImage({ url }) {
  return (
    <>
      <div className="lg:w-max lg:flex-shrink-0 text-gray-600 hover:text-gray-300 transition-colors">
        <div className="flex-col ">
          <a href={url}>
            <img src={url} alt="" width={500} height={500} />
          </a>
        </div>
      </div>
    </>
  );
}
