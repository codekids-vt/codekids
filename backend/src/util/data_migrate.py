import argparse
import asyncio
import json

from prisma import Prisma

client = Prisma()


def load_book(book_id: int):
    # Open and load the JSON file
    with open("../frontend/src/util/books.json") as file:
        books = json.load(file)

    return next((book for book in books if book["BookId"] == book_id), None)


async def main(book):
    # Connect to the database
    await client.connect()

    # Create book record
    created_book = await client.book.create(
        {
            "title": book["title"],
            "bookCover": book["bookCover"],
            "blurb": book["blurb"],
            "coverImage": book["cover"] if book.get("cover") else None,
            "author": book["author"],
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
parser = argparse.ArgumentParser()
parser.add_argument("id", type=int)
args = parser.parse_args()

book = load_book(args.id)
if book is None:
    print(f"Book with id {args.id} not found")
else:
    asyncio.run(main(book))
