"use client";

import { memo } from "react";
import ReactMarkdown from "react-markdown";
import { CodeBlock } from "./Code-block";
import remarkGfm from "remark-gfm";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface MarkdownContentProps {
  content: string;
}

export const MarkdownContent = memo(function MarkdownContent({
  content,
}: MarkdownContentProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]} // GitHub-flavored markdown for tables, task lists, etc.
      // rehypePlugins={[rehypeHighlight]} // Code syntax highlighting
      components={{
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        code({ inline, className, children, ...props }: any) {
          const match = /language-(\w+)/.exec(className || "");
          const language = match ? match[1] : "";

          if (!inline && language) {
            return (
              <CodeBlock
                language={language}
                value={String(children).replace(/\n$/, "")}
                title={language}
                {...props}
              />
            );
          }

          return (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
        table({ children }) {
          return <Table>{children}</Table>;
        },
        thead({ children }) {
          return <TableHeader>{children}</TableHeader>;
        },
        tbody({ children }) {
          return <TableBody>{children}</TableBody>;
        },
        tr({ children }) {
          return <TableRow>{children}</TableRow>;
        },
        td({ children }) {
          return <TableCell>{children}</TableCell>;
        },
        th({ children }) {
          return <TableHead>{children}</TableHead>;
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
});
