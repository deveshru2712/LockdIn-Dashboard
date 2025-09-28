import { Zap } from "lucide-react";
import React from "react";
import { Badge } from "../ui/badge";

const Header = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <Badge
        variant={"default"}
        className="border-slate-200 px-2 py-1.5 shadow backdrop-blur-sm"
      >
        <Zap color="lightblue" />
        <span className="ml-1 text-base font-medium text-shadow-2xs">
          Reclaim Your Focus
        </span>
      </Badge>
      <div className="space-y-8 text-center font-sans">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
          Ready to Lock In ?
        </h1>
        <p className="mx-auto max-w-md text-lg leading-relaxed font-medium text-gray-700">
          Block distracting websites and reclaim your productivity
        </p>
      </div>
    </div>
  );
};

export default Header;
