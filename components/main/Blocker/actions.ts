"use server";
import { prisma } from "@/lib/db/prisma";
import { unstable_cache } from "next/cache";

export interface FrequentlyBlockedWebsite {
  name: string;
  url: string;
}

const getMostFrequentlyBlockedSitesInternal = async (): Promise<
  FrequentlyBlockedWebsite[] | null
> => {
  try {
    const frequentlyBlockedWebsite = await prisma.predefinedWebsite.findMany({
      select: { name: true, url: true },
    });

    return frequentlyBlockedWebsite;
  } catch (error) {
    console.log(
      "Error occurred while fetching the frequently blocked website",
      error,
    );
    return null;
  }
};

export const getCachedMostFrequentlyBlockedSites = unstable_cache(
  getMostFrequentlyBlockedSitesInternal,
  ["most-frequently-blocked-sites"],
  {
    revalidate: 3600, // 1 hour
    tags: ["frequently-blocked-websites"],
  },
);
