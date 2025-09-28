"use client";
import type React from "react";
import { useState, useRef, useEffect } from "react";
import FloatingMenu from "../FloatingMenu";
import { Input } from "../ui/input";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Button } from "../ui/button";
import { ShieldBan, X } from "lucide-react";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { authClient } from "@/lib/auth/auth-client";
import { useRouter } from "next/navigation";

const COMMON_WEBSITES = [
  { name: "Spotify", url: "spotify.com" },
  { name: "YouTube", url: "youtube.com" },
  { name: "X (Twitter)", url: "x.com" },
  { name: "Instagram", url: "instagram.com" },
  { name: "ChatGPT", url: "chat.openai.com" },
  { name: "Facebook", url: "facebook.com" },
  { name: "Reddit", url: "reddit.com" },
];

export default function Blocker() {
  const [blockedUrls, setBlockedUrls] = useState<string[]>([]);
  const [inputUrl, setInputUrl] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const { data: session } = authClient.useSession();
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleClick = () => {
    if (session?.user) {
      addUrl();
    } else {
      router.push("/sign-in");
    }
  };

  const addUrl = () => {
    if (inputUrl.trim() && !blockedUrls.includes(inputUrl.trim())) {
      setBlockedUrls([...blockedUrls, inputUrl.trim()]);
      setInputUrl("");
      setShowSuggestions(false);
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

  const handleSuggestionClick = (url: string) => {
    setInputUrl(url);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  const handleInputFocus = () => {
    setShowSuggestions(true);
  };

  return (
    <>
      <div className="font-jakarta w-full max-w-lg space-y-6">
        <div className="relative">
          <div className="flex gap-2">
            <Input
              ref={inputRef}
              type="text"
              placeholder="Enter website URL to block (e.g., facebook.com)"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              onKeyPress={handleKeyPress}
              onFocus={handleInputFocus}
              className="flex-1 bg-white/70"
            />
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={handleClick}
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

          {showSuggestions && (
            <div
              ref={suggestionsRef}
              className="absolute top-full right-12 left-0 z-10 mt-1 max-h-60 overflow-y-auto rounded-md border border-gray-200 bg-white shadow-lg"
            >
              <div className="p-2">
                <p className="mb-2 px-2 text-xs text-gray-500">
                  Common websites:
                </p>
                <div className="space-y-1">
                  {COMMON_WEBSITES.map((website) => (
                    <button
                      key={website.url}
                      onClick={() => handleSuggestionClick(website.url)}
                      className="flex w-full items-center justify-between rounded-sm px-3 py-2 text-left text-sm transition-colors duration-150 hover:bg-gray-50"
                    >
                      <span className="font-medium">{website.name}</span>
                      <span className="text-xs text-gray-400">
                        {website.url}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
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
    </>
  );
}
