export interface Page {
    content: string[],
    image: string,
    game: string | null
}

export interface Book {
    BookId: number,
    author: string,
    title: string,
    blurb: string,
    pages: Page[],
}
