"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Zap, Plus, X } from "lucide-react";

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
      <div className="font-jakarta mx-auto flex max-w-2xl flex-col items-center justify-center gap-12">
        <Badge
          variant={"default"}
          className="border-slate-200 px-2 py-1.5 shadow backdrop-blur-sm"
        >
          <Zap color="lightblue" />
          <span className="ml-1 text-lg text-shadow-2xs">
            Reclaim Your Focus
          </span>
        </Badge>

        <div className="space-y-8 text-center">
          <h1 className="font-sans text-5xl font-bold tracking-tight text-gray-900">
            Ready to Lock In ?
          </h1>
          <p className="font-jakarta mx-auto max-w-md text-lg leading-relaxed font-normal text-gray-700">
            Block distracting websites and reclaim your productivity
          </p>
        </div>

        <div className="w-full max-w-lg space-y-6">
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Enter website URL to block (e.g., facebook.com)"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
            />
            <Button onClick={addUrl} size="sm" className="px-3">
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {/* Container for blocked URLs */}
          {blockedUrls.length > 0 && (
            <div className="space-y-3">
              <Separator />
              <h3 className="text-sm font-medium text-gray-600">
                Blocked Websites
              </h3>
              <div className="flex flex-wrap gap-2">
                {blockedUrls.map((url, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="flex items-center gap-1 px-2 py-1"
                  >
                    <span className="text-xs">{url}</span>
                    <button
                      onClick={() => removeUrl(url)}
                      className="hover:text-destructive ml-1"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="max-w-lg space-y-6 text-center">
          <p className="leading-relaxed font-medium text-gray-600">
            Set focused work sessions by temporarily blocking sites like social
            media, streaming platforms, and other digital distractions.
          </p>

          <div className="border-gray-200 pt-6">
            <p className="text-sm font-medium tracking-wide text-gray-500">
              Simple • Effective • Distraction-free
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
