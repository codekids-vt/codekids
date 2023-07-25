import path from "path";
import fs from "fs";

import { Prisma, PrismaClient, Tag } from "@prisma/client";
import matter from "gray-matter";

enum Color {
  RED = "red",
  YELLOW = "yellow",
  GREEN = "green",
  BLUE = "blue",
  VIOLET = "violet",
}

enum ColorCategory {
  // basic:
  EASY = Color.GREEN,
  MEDIUM = Color.YELLOW,
  HARD = Color.RED,
  
  // specific:
  PARTICIPATION = Color.VIOLET,
  ACTIVITY_TYPE = Color.BLUE,
}

const tags: Prisma.TagCreateInput[] = [
  // activity length:
  {
    name: "Short",
    color: ColorCategory.EASY
  },
  {
    name: "Medium Length",
    color: ColorCategory.MEDIUM
  },
  {
    name: "Long",
    color: ColorCategory.HARD
  },
  
  // activity difficulty:
  {
    name: "Easy",
    color: ColorCategory.EASY
  },
  {
    name: "Medium",
    color: ColorCategory.MEDIUM
  },
  {
    name: "Hard",
    color: ColorCategory.HARD
  },

  // activity language (if applicable):
  {
    name: "Scratch",
    color: ColorCategory.EASY
  },
  {
    name: "Python",
    color: ColorCategory.EASY
  },
  {
    name: "Java",
    color: ColorCategory.MEDIUM
  },
];

// activity participation:
[
  "Solo", "Groupwork",
].forEach((tagName) => {
  tags.push({
    name: tagName,
    color: ColorCategory.PARTICIPATION
  });
});

// activity content:
[
  "I/O", "Counting", "Sorting", "Programming", "Lab"
].forEach((tagName) => {
  tags.push({
    name: tagName,
    color: ColorCategory.ACTIVITY_TYPE
  });
});

// seeding:
const prisma = new PrismaClient();
const postDirectory = path.join(__dirname, "posts");

async function seed() {
  // tags:
  // save a record of tags for use later:
  const tagReference: { [name: string]: Tag } = {};

  for (const tagCreateInput of tags) {
    const updatedTag = await prisma.tag.upsert({
      where: { 
        name: tagCreateInput.name
      },
      update: {
        color: tagCreateInput.color
      },
      create: tagCreateInput
    });
    tagReference[updatedTag.name] = updatedTag;

    console.log(`Created/updated tag ${tagCreateInput.name}.`);
  }

  console.log("\nTag seeding completed successfully. 🌱");
  
  // posts:
  const posts = fs.readdirSync(postDirectory).filter(
    (fileName) => fileName.endsWith(".md")
  );

  for (const postFileName of posts) {
    const fileContents = fs.readFileSync(
      path.join(postDirectory, postFileName),
      "utf8"
    );
    const { data: metadata, content } = matter(fileContents);

    const { author, title, blurb, tags } = metadata;
    // find all the tags that do exist (to connect) and the ones that don't (to
    // create):
    const tagConnectInput = tags.map((name: string) => ({
      where: { name },
      create: {
        name,
        // leave color undefined
      },
    }));

    await prisma.post.upsert({
      where: { title: title },
      create: {
        author,
        title,
        blurb,
        tags: {
          connectOrCreate: tagConnectInput
        },
        content
      },
      update: {
        author,
        title,
        blurb,
        tags: {
          connectOrCreate: tagConnectInput
        },
        content,
      }
    });

    console.log(`\nCreated/updated post ${title} under file ${postFileName}.`);
    console.log(`Tags: ${tags.join(", ")}.`);
  }

  console.log("\nPost seeding completed successfully. 🌱");
}

try {
  seed();
}
catch (e: any) {
  console.log(e);
}
finally {
  prisma.$disconnect();
}
