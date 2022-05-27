import Link from "next/link";
import ConnectButton from "./ConnectButton";

export default function Header() {
  return (
    <>
      <header className="mx-auto max-w-xs lg:max-w-lg xl:max-w-full">
        <div className="mx-auto flex flex-row py-5 items-center align-middle">
          <div className="text-xl text-gray-100 font-titles mr-auto">
            <Link href="/">WebOS</Link>
          </div>

          <div className="ml-auto">
            <ConnectButton />
          </div>
        </div>
      </header>
    </>
  );
}
