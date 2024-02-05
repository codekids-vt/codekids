export default interface PostData {
  postId: number,
  author: string,
  title: string,
  blurb: string,
  tags: {
    name: string,
    color: string
  }[],
  content: string
}
