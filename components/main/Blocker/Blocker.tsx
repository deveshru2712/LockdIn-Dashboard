"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { ShieldBan, X, Loader2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  FrequentlyBlockedWebsite,
  getCachedMostFrequentlyBlockedSites,
} from "./actions";
import { toast } from "sonner";
import sendBlockedSitesToExtension from "@/utils/sendBlockedListToExtension";
import { cn } from "@/lib/utils";

export default function Blocker() {
  const [blockedUrls, setBlockedUrls] = useState<string[]>([]);
  const [frequentlyBlockedWebsite, setFrequentlyBlockedWebsite] = useState<
    FrequentlyBlockedWebsite[] | null
  >(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [inputUrl, setInputUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchFrequentlyBlockedWebsite = async () => {
      setIsLoading(true);
      try {
        const result = await getCachedMostFrequentlyBlockedSites();
        if (result) setFrequentlyBlockedWebsite(result);
      } catch {
        setError("Failed to load suggestions");
      } finally {
        setIsLoading(false);
      }
    };
    fetchFrequentlyBlockedWebsite();
  }, []);

  useEffect(() => {
    const loadBlockedSites = async () => {
      if (typeof window === "undefined") return;
      const local = localStorage.getItem("blocked-website");
      const localList = local ? JSON.parse(local) : [];
      setBlockedUrls(localList);
      sendBlockedSitesToExtension(localList);
    };
    loadBlockedSites();
  }, []);

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

  const grabDomainUrl = (
    url: string,
  ): { isValid: boolean; normalized: string } => {
    let trimmed = url.trim();
    if (!/^https?:\/\//i.test(trimmed)) {
      trimmed = "https://" + trimmed;
    }
    try {
      const { hostname } = new URL(trimmed);
      const parts = hostname.split(".");
      const normalized =
        parts.length > 2 ? parts.slice(-2).join(".") : hostname;
      return { isValid: true, normalized };
    } catch {
      return { isValid: false, normalized: "" };
    }
  };

  const addUrl = async () => {
    const trimmedUrl = inputUrl.trim();
    if (!trimmedUrl) return;

    const { isValid, normalized } = grabDomainUrl(trimmedUrl);
    if (!isValid) {
      setError("Please enter a valid URL (e.g., facebook.com)");
      return;
    }

    if (blockedUrls.includes(normalized)) {
      setError("This website is already blocked");
      return;
    }

    const updatedList = [...blockedUrls, normalized];
    setBlockedUrls(updatedList);
    toast.success("website successfully blocked.");
    localStorage.setItem("blocked-website", JSON.stringify(updatedList));
    sendBlockedSitesToExtension(updatedList);
    setInputUrl("");
  };

  const removeUrl = async (urlToRemove: string) => {
    const updatedList = blockedUrls.filter((url) => url !== urlToRemove);
    setBlockedUrls(updatedList);
    localStorage.setItem("blocked-website", JSON.stringify(updatedList));
    sendBlockedSitesToExtension(updatedList);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addUrl();
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = async (url: string) => {
    const { normalized } = grabDomainUrl(url);
    if (blockedUrls.includes(normalized)) return;
    const updatedList = [...blockedUrls, normalized];
    setBlockedUrls(updatedList);
    toast.success("website successfully blocked.");
    localStorage.setItem("blocked-website", JSON.stringify(updatedList));
    sendBlockedSitesToExtension(updatedList);
  };

  const handleInputFocus = () => {
    if (frequentlyBlockedWebsite && frequentlyBlockedWebsite.length > 0) {
      setShowSuggestions(true);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputUrl(e.target.value);
    setError(null);
  };

  return (
    <div className="font-jakarta w-full max-w-lg space-y-6">
      <div className="relative">
        <div className="flex gap-2">
          <div className="flex-1">
            <Input
              ref={inputRef}
              type="text"
              placeholder="Enter website URL to block (e.g., facebook.com)"
              value={inputUrl}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onFocus={handleInputFocus}
              className="bg-white/70"
              disabled={isLoading}
            />
            {error && (
              <p id="url-error" className="mt-1 text-xs text-red-500">
                {error}
              </p>
            )}
          </div>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={addUrl}
                size="sm"
                className="px-3"
                disabled={isLoading || !inputUrl.trim()}
              >
                {isLoading ? (
                  <Loader2 size={28} className="animate-spin" />
                ) : (
                  <ShieldBan size={28} className="cursor-pointer" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Block</p>
            </TooltipContent>
          </Tooltip>
        </div>

        {showSuggestions &&
          frequentlyBlockedWebsite &&
          frequentlyBlockedWebsite.length > 0 && (
            <div
              ref={suggestionsRef}
              className="absolute top-full right-12 left-0 z-10 mt-1 max-h-60 overflow-y-auto rounded-md border border-gray-200 bg-white shadow-lg"
              role="listbox"
            >
              <div className="p-2">
                <p className="mb-2 px-2 text-xs text-gray-500">
                  <strong>Common websites:</strong>
                </p>
                <div className="space-y-1">
                  {frequentlyBlockedWebsite.map((website) => {
                    const { normalized } = grabDomainUrl(website.domain);
                    const isAlreadyBlocked = blockedUrls.includes(normalized);

                    return (
                      <button
                        key={website.domain}
                        onClick={() => handleSuggestionClick(website.domain)}
                        disabled={isAlreadyBlocked}
                        className={`flex w-full items-center justify-between rounded-sm px-3 py-2 text-left text-sm transition-colors duration-150 ${
                          isAlreadyBlocked
                            ? "cursor-not-allowed opacity-50"
                            : "hover:bg-gray-50"
                        }`}
                        role="option"
                      >
                        <span className="font-medium">{website.name}</span>
                        <span className="text-xs text-gray-400">
                          {isAlreadyBlocked
                            ? "Already blocked"
                            : website.domain}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
      </div>

      <motion.div
        initial={{ opacity: 0, filter: `blur(10px)` }}
        animate={{
          opacity: blockedUrls.length > 0 ? 1 : 0,
          filter: `blur(${blockedUrls.length > 0 ? 0 : 10}px)`,
        }}
        transition={{ duration: 0.7 }}
        className={cn("space-y-3")}
      >
        <Separator />
        <h3 className="text-sm font-medium text-gray-600">
          <strong>Currently Blocked</strong> ({blockedUrls.length})
        </h3>
        <div className="flex flex-wrap gap-2 rounded-md border bg-white/95 px-2.5 py-2 shadow-md">
          {blockedUrls.map((url) => (
            <Badge
              key={url}
              variant="secondary"
              className="flex items-center gap-1 px-2 py-1 transition-all duration-300 hover:bg-slate-50"
            >
              <span className="text-xs">{url}</span>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => removeUrl(url)}
                    className="hover:text-destructive ml-1 rounded-sm p-0.5"
                    aria-label={`Unblock ${url}`}
                  >
                    <X className="h-3 w-3 cursor-pointer" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Unblock</p>
                </TooltipContent>
              </Tooltip>
            </Badge>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
