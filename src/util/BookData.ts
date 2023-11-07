/**
 * Every book consits of a title, aithor, id, blurb, and an array of pages,
 * 
 * For each Page in a book: there is content which is displayed on the right hand side, this is an array of sentences or strings.
 * Each page can have an image, this is what u want to change to an activity name
 * 
 * Any activity that requires an answer should be set in an array, even if it is just one answer, this is the only way to 'normalize' answers for the 
 * help me butoon.
 * 
 */

export interface Page {
    content: string[],
    image: string, // Change me to activity like HokieBirdIFConditionActivity to display activity
    game: string | null
    props: PageProps, // any data you need to pass to the activity is set here
    showHelp?: boolean // only enable this if you have a props.ans and props.ans is an array with at least one vlaue!
}

export interface Book {
    BookId: number,
    author: string,
    title: string,
    blurb: string,
    pages: Page[],
    cover?: string
}

/**
 * This is just a Conglomerate of different attributes passed through various activities and gmaes. 
 * If you need more just add but ensure you have a ? after the attribute so the other games dont break
 */
export interface PageProps {
    type?: boolean,
    draggable?: boolean,
    images?: string[],
    pageNum?: number,
    bookId? : number,
    ans?: string[],
    statements?: string[],
    condition?: string,
    image?: string,
    ans_image?: string,
    effect?: string,
    code?: string,
    showIOLabels?: boolean,
    options?: number[],
}
