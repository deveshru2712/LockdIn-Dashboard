import React from "react";

export default function Footer() {
  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <div className="max-w-lg text-center">
        <p className="leading-relaxed font-medium text-gray-600">
          Set <strong>focused work sessions</strong> by temporarily blocking
          sites like <strong>social media</strong>,{" "}
          <strong>streaming platforms</strong>, and other{" "}
          <strong>digital distractions</strong>.
        </p>

        <div className="font-jakarta border-gray-200 pt-6">
          <p className="text-sm font-medium tracking-wide text-gray-500">
            <strong>Simple</strong> • <strong>Effective</strong> •{" "}
            <strong>Distraction-free</strong>
          </p>
        </div>
      </div>
      <h2 className="font-libre-baskerville text-center text-xl font-bold text-gray-700 italic">
        "The cost of being <strong>distracted</strong> is the{" "}
        <strong>life you could have lived</strong>."
      </h2>
    </div>
  );
}
