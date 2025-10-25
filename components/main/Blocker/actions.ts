"use server";
import prisma from "@/lib/db/prisma";
import { unstable_cache } from "next/cache";

export interface FrequentlyBlockedWebsite {
  name: string;
  domain: string;
}

// get the most frequent blocked website
const getMostFrequentlyBlockedSitesInternal = async (): Promise<
  FrequentlyBlockedWebsite[] | null
> => {
  try {
    const frequentlyBlockedWebsite = await prisma.predefinedWebsite.findMany({
      select: { name: true, domain: true },
    });

    return frequentlyBlockedWebsite;
  } catch (error) {
    console.error(
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
    revalidate: 1, // 10 hour
    tags: ["frequently-blocked-websites"],
  },
);
