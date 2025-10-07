"use server";
import { getSession } from "@/lib/auth/utils";
import { prisma } from "@/lib/db/prisma";
import { revalidateTag, unstable_cache } from "next/cache";

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
    revalidate: 1, // 10 hour
    tags: ["frequently-blocked-websites"],
  },
);

// adding a new url to blocked list
export const addWebsiteToBlockedList = async (url: string) => {
  try {
    const session = await getSession();

    if (!session?.user) {
      return null;
    }

    const blockedWebsite = await prisma.blockedWebsite.create({
      data: {
        url,
        isActive: true,
        userId: session.user.id,
      },
    });

    // revalidating the user blocked website
    revalidateTag("user-blocked-website");

    return blockedWebsite;
  } catch (error) {
    console.error("Error adding blocked website:", error);
    return null;
  }
};

// remove an blocked url from the list
export const removeWebsiteFromBlockedList = async (url: string) => {
  try {
    const session = await getSession();

    if (!session?.user) {
      return null;
    }

    await prisma.blockedWebsite.delete({
      where: {
        userId_url: {
          userId: session.user.id,
          url: url,
        },
      },
    });

    revalidateTag("user-blocked-website");
  } catch (error) {
    console.error("Error removing blocked website:", error);
    return null;
  }
};

// get the user blocked url
const getUserBlockedUrl = async (userId: string): Promise<string[] | null> => {
  if (!userId) {
    return null;
  }

  try {
    const response = await prisma.blockedWebsite.findMany({
      where: { userId: userId },
      select: { url: true },
    });

    return response.map((item) => item.url);
  } catch (error) {
    console.log("Unable to fetch the user blocked url");
    return null;
  }
};

export const getCachedUserBlockedUrl = unstable_cache(
  async (userId: string) => getUserBlockedUrl(userId),
  ["blocked-website"],
  {
    revalidate: 3600,
    tags: [`user-blocked-website`],
  },
);

// runs after the user logged in to sync with local db
export async function syncLocalWithDb(blockedWebsites: string[]): Promise<{
  success: boolean;
  added?: string[];
  removed?: string[];
  error?: any;
}> {
  try {
    if (blockedWebsites.length === 0)
      return { success: true, added: [], removed: [] };

    const session = await getSession();
    if (!session?.user?.id)
      return { success: false, error: "No active session or user" };

    const dbSites = await prisma.blockedWebsite.findMany({
      where: { userId: session.user.id },
      select: { url: true },
    });
    const dbUrls = dbSites.map((site) => site.url);

    const toAdd = blockedWebsites.filter((url) => !dbUrls.includes(url));
    const toRemove = dbUrls.filter((url) => !blockedWebsites.includes(url));

    // adding new website
    if (toAdd.length > 0) {
      await prisma.blockedWebsite.createMany({
        data: toAdd.map((url) => ({ url, userId: session.user.id })),
        skipDuplicates: true,
      });
    }

    //removing
    if (toRemove.length > 0) {
      await prisma.blockedWebsite.deleteMany({
        where: { userId: session.user.id, url: { in: toRemove } },
      });
    }

    revalidateTag("user-blocked-website");

    return { success: true, added: toAdd, removed: toRemove };
  } catch (error) {
    console.error("Sync failed:", error);
    return { success: false, error };
  }
}
