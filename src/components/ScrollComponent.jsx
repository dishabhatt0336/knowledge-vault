"use client";
import React from "react";
import { ContainerScroll } from "@/components/UI/container-scroll-animation";

export function ScrollComponent() {
  return (
    <div className="flex flex-col overflow-hidden relative z-20 py-20">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-gray-100">
              Powerful DOC Assistant <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Built for You
              </span>
            </h1>
          </>
        }>
        <img
          src="/knowledgevault.jpeg"
          alt="Software Interface"
          height={1600}
          width={2560}
          className="mx-auto rounded-2xl object-cover max-h-[42rem] md:max-h-[48rem] object-left-top shadow-2xl border border-white/10"
          draggable={false}
        />
      </ContainerScroll>
    </div>
  );
}