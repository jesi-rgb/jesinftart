export default function Footer() {
  return (
    <>
      <footer className="text-gray-400 font-titles mx-auto max-w-screen-sm">
        <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
          <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-400">
            <span className="ml-3 text-xl">Jesi NFT Market Place</span>
          </a>
          <p className="text-sm sm:ml-4 sm:pl-4 sm:border-l-2  sm:py-2 sm:mt-0 mt-4">
            <a
              href="https://twitter.com/jesi_rgb"
              className="text-gray-500 ml-1 hover:text-gray-300"
              rel="noopener noreferrer"
              target="_blank"
            >
              @jesi_rgb
            </a>
          </p>
        </div>
      </footer>
    </>
  );
}
