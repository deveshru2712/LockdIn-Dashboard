import React from "react";

export default function Footer() {
  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <div className="max-w-lg text-center">
        <p className="leading-relaxed font-medium text-gray-600">
          Set focused work sessions by temporarily blocking sites like social
          media, streaming platforms, and other digital distractions.
        </p>

        <div className="font-jakarta border-gray-200 pt-6">
          <p className="text-sm font-medium tracking-wide text-gray-500">
            Simple • Effective • Distraction-free
          </p>
        </div>
      </div>
      <p className="font-libre-baskerville text-center text-xl font-bold text-gray-700 italic">
        "The cost of being distracted is the life you could have lived."
      </p>
    </div>
  );
}
