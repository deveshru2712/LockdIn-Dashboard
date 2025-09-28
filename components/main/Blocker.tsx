"use client";
import React, { useState } from "react";
import FloatingMenu from "../FloatingMenu";
import { Input } from "../ui/input";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Button } from "../ui/button";
import { ShieldBan, X } from "lucide-react";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { authClient } from "@/lib/auth/auth-client";
import { useRouter } from "next/navigation";

export default function Blocker() {
  const [blockedUrls, setBlockedUrls] = useState<string[]>([]);
  const [inputUrl, setInputUrl] = useState("");

  const { data: session } = authClient.useSession();
  const router = useRouter();

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
    <>
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
    </>
  );
}
