import { unified } from "unified";

import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";

// note: this is UNSAFE! if anyone modifies this to take user input, make sure
// to modify this to avoid XSS
const markdownProcessor = unified()
  .use(remarkParse)
  .use(remarkRehype, {
    allowDangerousHtml: true
  })
  .use(rehypeStringify, {
    allowDangerousHtml: true
  });

export default async function MarkdownView({ content }: { content: string }) {
  const processedContent = await markdownProcessor.process(content);

  return (
    <section
      className="markdown-viewer"
      dangerouslySetInnerHTML={{ __html: processedContent.toString() }} 
    />
  );
}
