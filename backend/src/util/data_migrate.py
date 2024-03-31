import json
import asyncio
from prisma import Prisma
import argparse

client = Prisma()


async def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("id", type=int)
    args = parser.parse_args()
    id = args.id

    # Connect to the database
    await client.connect()

    # Open and load the JSON file
    with open("../frontend/src/util/books.json", "r") as file:
        books = json.load(file)

    book = [book for book in books if book["BookId"] == id][0]
    if not book:
        print(f"Book with id {id} not found")
        return
    # Create book record
    created_book = await client.book.create(
        {
            "title": book["title"],
            "bookCover": book["bookCover"],
            "blurb": book["blurb"],
            "coverImage": book["cover"] if book.get("cover") else None,
            "author": book["author"],
            "gradeRange": book["gradeRange"],
            "category": book["category"],
            "pages": {
                "create": [  # type: ignore
                    {
                        "content": json.dumps(page["content"]),
                        "image": page["image"],
                        "props": json.dumps(page.get("props", {})),
                        "pageNumber": i + 1,
                    }
                    for i, page in enumerate(book["pages"])
                ]
            },
        }
    )

    print(f"Inserted book: {created_book.title}")

    # Disconnect the database
    await client.disconnect()


# Run the main function
asyncio.run(main())
