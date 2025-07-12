import { Media } from "@/payload-types";
import { DefaultNodeTypes } from "@payloadcms/richtext-lexical";
import {
  SerializedEditorState,
  SerializedLexicalNode,
} from "@payloadcms/richtext-lexical/lexical";
import {
  JSXConvertersFunction,
  RichText,
} from "@payloadcms/richtext-lexical/react";
import { Fragment, JSX } from "react";

const jsxConverters: JSXConvertersFunction<DefaultNodeTypes> = ({
  defaultConverters,
}) => ({
  ...defaultConverters,
  ...{
    upload: ({ node }) => {
      const media = node.value as Media;
      if (media.mimeType?.startsWith("image/")) {
        return (
          <img
            src={media.url!}
            alt={media.alt}
            className="rounded-lg object-cover"
          />
        );
      }
      if (media.mimeType?.startsWith("video/")) {
        return (
          <video
            controls
            className="rounded-lg object-cover"
            src={media.url!}
          ></video>
        );
      }
    },
    heading: ({ node }) => {
      const headingsSize = {
        h1: "text-3xl",
        h2: "text-2xl",
        h3: "text-xl",
        h4: "text-lg",
        h5: "text-base",
        h6: "text-sm",
      };
      const Tag = `${node.tag}` as keyof JSX.IntrinsicElements;
      return (
        <Tag
          id={
            (node.children[0] as any).text
              ?.toLowerCase()
              .replace(/[^a-z0-9]+/g, "-") ?? ""
          }
          className={`font-bold ${headingsSize[node.tag]} tracking-tight text-white my-5`}
        >
          {node.children.map((child: any, index) => (
            <Fragment key={index}>{child.text}</Fragment>
          ))}
        </Tag>
      );
    },
  },
});

export const Content = ({
  content,
}: {
  content: SerializedEditorState<SerializedLexicalNode>;
}) => {
  return <RichText data={content} converters={jsxConverters} />;
};

