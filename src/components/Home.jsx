import React from "react";

export default function Home() {
  return (
    <div>
      <section className="flex flex-col items-center p-10 py-20 gap-6 h-[600px] w-full bg-[#eef0fc]">
        <h1 className="text-[30px] font-bold text-center">
          Exhibition Curator
        </h1>
        <h2 className="text-[60px] font-bold text-center">
          Curate your exhibition
        </h2>
        <article className="flex flex-col items-center p-10 py-20 gap-3 h-[600px] w-full text-center">
          <h3 className="text-[30px] font-bold text-center">
            About Exhibition Curator
          </h3>
          <p className="text-center">
            Exhibition Curator is a place to build your own personal collection
            by browsing the two public art collections.
          </p>
          <p>Create an account to curate your exhibition</p>
        </article>
      </section>
    </div>
  );
}
