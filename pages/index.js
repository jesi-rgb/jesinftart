import Head from "next/head";
import Image from "next/image";
import Layout from "../components/Layout";

export default function Home() {
  return (
    <Layout>
      <section className="text-gray-300 font-body">
        <div className="container px-5 py-24 mx-auto">
          <h1 className="text-6xl font-bold font-titles text-center text-gray-100 mb-20">
            Jesi NFT Market Place
          </h1>
          <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6">
            <div className="p-4 md:mx-auto md:max-w-sm flex">
              <div className="flex-grow pl-6">
                <h2 className="text-gray-100 text-lg font-bold mb-2">
                  Cock and Bolardas gimme my banana
                </h2>
                <p className="leading-relaxed text-base">
                  Hola alex esto es una prueba que dices te mola?
                </p>
                <a className="mt-3 text-indigo-500 inline-flex items-center">
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
