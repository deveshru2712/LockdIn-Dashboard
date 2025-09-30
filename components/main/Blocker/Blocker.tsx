"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
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
import { authClient } from "@/lib/auth/auth-client";
import {
  FrequentlyBlockedWebsite,
  getCachedMostFrequentlyBlockedSites,
} from "./actions";
import { useRouter } from "next/navigation";

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

  const { data: session } = authClient.useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session?.user) {
      const storedBlockedWebsites = localStorage.getItem("blocked-website");
      if (storedBlockedWebsites) {
        const blockedWebsites = JSON.parse(storedBlockedWebsites);
        setBlockedUrls(blockedWebsites);
      }
    } else {
      // make a db call here
    }
  }, [session?.user]);

  useEffect(() => {
    const fetchFrequentlyBlockedWebsite = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await getCachedMostFrequentlyBlockedSites();
        if (result) {
          setFrequentlyBlockedWebsite(result);
        } else {
          setError("Unable to load website suggestions");
        }
      } catch (err) {
        console.error("Error fetching frequently blocked websites:", err);
        setError("Failed to load suggestions");
      } finally {
        setIsLoading(false);
      }
    };
    fetchFrequentlyBlockedWebsite();
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

  const validateAndNormalizeUrl = (
    url: string,
  ): { isValid: boolean; normalized: string } => {
    const trimmed = url.trim();

    // Basic URL validation - allows domains with or without protocol
    const urlPattern =
      /^(?:https?:\/\/)?(?:www\.)?[\w-]+(?:\.[\w-]+)+(?:\/.*)?$/;
    const isValid = urlPattern.test(trimmed);

    // Remove protocol and www. for consistent storage
    const normalized = trimmed
      .replace(/^https?:\/\//, "")
      .replace(/^www\./, "")
      .toLowerCase()
      .trim();

    return { isValid, normalized };
  };

  const addUrl = () => {
    const trimmedUrl = inputUrl.trim();

    if (!trimmedUrl) {
      return;
    }

    const { isValid, normalized } = validateAndNormalizeUrl(trimmedUrl);

    if (!isValid) {
      setError("Please enter a valid URL (e.g., facebook.com)");
      return;
    }

    if (blockedUrls.includes(normalized)) {
      setError("This website is already blocked");
      return;
    }

    if (session?.user) {
      // make a db call
    } else {
      // store it in localstorage
      setBlockedUrls([...blockedUrls, normalized]);
      localStorage.setItem(
        "blocked-website",
        JSON.stringify([...blockedUrls, normalized]),
      );
      setInputUrl("");
      setShowSuggestions(false);
      setError(null);
    }
  };

  const removeUrl = (urlToRemove: string) => {
    if (session?.user) {
      // make a db call
      // setBlockedUrls(blockedUrls.filter((url) => url !== urlToRemove));
    } else {
      setBlockedUrls(blockedUrls.filter((url) => url !== urlToRemove));

      const storedBlockedWebsites = localStorage.getItem("blocked-website");
      if (storedBlockedWebsites) {
        const blockedWebsites = JSON.parse(storedBlockedWebsites);
        const filteredWebsites = blockedWebsites.filter(
          (url: string) => url !== urlToRemove,
        );
        localStorage.setItem(
          "blocked-website",
          JSON.stringify(filteredWebsites),
        );
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addUrl();
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (url: string) => {
    const { normalized } = validateAndNormalizeUrl(url);

    if (!blockedUrls.includes(normalized)) {
      setBlockedUrls([...blockedUrls, normalized]);
    }

    if (session?.user) {
      // make a db call
    } else {
      localStorage.setItem(
        "blocked-website",
        JSON.stringify([...blockedUrls, normalized]),
      );

      setInputUrl("");
      setShowSuggestions(false);
      inputRef.current?.focus();
    }
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
              aria-label="Website URL to block"
              aria-describedby={error ? "url-error" : undefined}
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
                aria-label="Block website"
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
              aria-label="Common websites to block"
            >
              <div className="p-2">
                <p className="mb-2 px-2 text-xs text-gray-500">
                  Common websites:
                </p>
                <div className="space-y-1">
                  {frequentlyBlockedWebsite.map((website) => {
                    const { normalized } = validateAndNormalizeUrl(website.url);
                    const isAlreadyBlocked = blockedUrls.includes(normalized);

                    return (
                      <button
                        key={website.url}
                        onClick={() => handleSuggestionClick(website.url)}
                        disabled={isAlreadyBlocked}
                        className={`flex w-full items-center justify-between rounded-sm px-3 py-2 text-left text-sm transition-colors duration-150 ${
                          isAlreadyBlocked
                            ? "cursor-not-allowed opacity-50"
                            : "hover:bg-gray-50"
                        }`}
                        role="option"
                        aria-selected={isAlreadyBlocked}
                      >
                        <span className="font-medium">{website.name}</span>
                        <span className="text-xs text-gray-400">
                          {isAlreadyBlocked ? "Already blocked" : website.url}
                        </span>
                      </button>
                    );
                  })}
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
            Blocked Websites ({blockedUrls.length})
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
        </div>
      )}
    </div>
  );
}
