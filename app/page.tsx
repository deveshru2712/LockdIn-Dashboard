"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Zap, X, ShieldBan } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import FloatingMenu from "@/components/FloatingMenu";

export default function Home() {
  const [blockedUrls, setBlockedUrls] = useState<string[]>([]);
  const [inputUrl, setInputUrl] = useState("");

  const addUrl = () => {
    if (inputUrl.trim() && !blockedUrls.includes(inputUrl.trim())) {
      setBlockedUrls([...blockedUrls, inputUrl.trim()]);
      setInputUrl("");
    }
  };

  const removeUrl = (urlToRemove: string) => {
    setBlockedUrls(blockedUrls.filter((url) => url !== urlToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addUrl();
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-8">
      <div className="mx-auto flex max-w-2xl flex-col items-center justify-center gap-12">
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
          <h1 className="text-5xl font-bold tracking-tight text-gray-900">
            Ready to Lock In ?
          </h1>
          <p className="mx-auto max-w-md text-lg leading-relaxed font-medium text-gray-700">
            Block distracting websites and reclaim your productivity
          </p>
        </div>
        <div className="font-jakarta w-full max-w-lg space-y-6">
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Enter website URL to block (e.g., facebook.com)"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 bg-white/70"
            />
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={addUrl}
                  size="sm"
                  className="cursor-pointer px-3"
                >
                  <ShieldBan size={28} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Block</p>
              </TooltipContent>
            </Tooltip>
          </div>

          {/* Container for blocked URLs */}
          {blockedUrls.length > 0 && (
            <div className="space-y-3">
              <Separator />
              <h3 className="text-sm font-medium text-gray-600">
                Blocked Websites
              </h3>
              <div className="flex flex-wrap gap-2 rounded-md border bg-white/95 px-2.5 py-2 shadow-md">
                {blockedUrls.map((url, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="flex items-center gap-1 px-2 py-1 transition-all duration-300 hover:bg-slate-50"
                  >
                    <span className="text-xs">{url}</span>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          onClick={() => removeUrl(url)}
                          className="hover:text-destructive ml-1 cursor-pointer rounded-sm p-0.5"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Unblock</p>
                      </TooltipContent>
                    </Tooltip>
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* floating menu */}
        <FloatingMenu />

        <div className="max-w-lg space-y-6 text-center">
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
      </div>
    </div>
  );
}
