import Image from "next/image";
export default function IPFSImage({ hash }) {
  return (
    <>
      <div>
        <Image
          src={"https://ipfs.io/ipfs/" + hash}
          alt=""
          width={500}
          height={500}
        />
      </div>
    </>
  );
}
