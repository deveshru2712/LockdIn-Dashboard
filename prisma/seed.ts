import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const predefinedWebsites = [
    {
      name: "Facebook",
      url: "facebook.com",
      domain: "facebook",
    },
    {
      name: "Instagram",
      url: "instagram.com",
      domain: "instagram",
    },
    {
      name: "Twitter",
      url: "twitter.com",
      domain: "twitter",
    },
    {
      name: "YouTube",
      url: "youtube.com",
      domain: "youtube",
    },
    {
      name: "Netflix",
      url: "netflix.com",
      domain: "netflix",
    },
    {
      name: "Reddit",
      url: "reddit.com",
      domain: "reddit",
    },
    {
      name: "LinkedIn",
      url: "linkedin.com",
      domain: "linkedin",
    },
    {
      name: "Pinterest",
      url: "pinterest.com",
      domain: "pinterest",
    },
  ];

  for (const website of predefinedWebsites) {
    await prisma.predefinedWebsite.upsert({
      where: { url: website.url },
      update: website,
      create: website,
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
