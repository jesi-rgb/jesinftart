import Link from "next/link";

export default function Footer() {
  return (
    <>
      <footer className="text-gray-400 font-titles mx-auto mt-10">
        <div className="container py-8 mx-auto flex items-center xl:flex-row flex-col space-y-2 xl:space-y-0 xl:space-x-6">
          <div className="mb-4 xl:mb-0 flex title-font font-medium items-center md:justify-start justify-center text-gray-400 text-xl hover:text-gray-300 transition-colors">
            <Link href="/">WebOS</Link>
          </div>
          <div className="text-sm">
            <a
              href="https://twitter.com/jesi_rgb"
              className="text-gray-500 hover:text-gray-300 transition-colors"
              rel="noopener noreferrer"
              target="_blank"
            >
              @jesi_rgb
            </a>
          </div>
          <div className="text-sm">
            <a
              href="https://github.com/jesi-rgb"
              className="text-gray-500 hover:text-gray-300 transition-colors"
              rel="noopener noreferrer"
              target="_blank"
            >
              /jesi-rgb
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
