import json
import asyncio
from prisma import Prisma

# Initialize Prisma client
client = Prisma()


async def main():
    # Connect to the database
    await client.connect()

    # Delete existing records from the Page table
    await client.page.delete_many()

    # Delete existing records from the Book table
    await client.book.delete_many()

    # Open and load the JSON file
    with open("../frontend/src/util/books.json", "r") as file:
        books = json.load(file)

    # Iterate over the books and insert them into the database
    for book in books:
        # Create book record
        created_book = await client.book.create(
            {
                "title": book["title"],
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
