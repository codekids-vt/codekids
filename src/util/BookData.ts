export interface Page {
    content: string[],
    image: string,
}

export interface Book {
    BookId: number,
    author: string,
    title: string,
    blurb: string,
    pages: Page[],
}
