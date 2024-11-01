import { cn } from '@/libs/shadcn-ui/utils/utils';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import MenuBar from './menu-bar';

interface EditorProps{
  className?: string;
  value: string;
  onChange: (e: any) => void;
}

const Editor = ({ className, value, onChange }: EditorProps) => {
  const editor = useEditor({
    autofocus: false,
    extensions: [StarterKit],
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });
  if (!editor) return null;
  return (
    <div className={cn('h-full border', className)}>
      <div className="flex p-4 py-2 border-y">
        <MenuBar editor={editor} />
      </div>
      <div className="prose w-full px-4 mb-2 py-3 overflow-y-scroll scroll-hidden">
        <EditorContent
          editor={editor}
          value={value}
          placeholder="Write your email here..."
          style={{
            minWidth: '100%',
            minHeight: '100%',
            border: 'none',
            outline: 'none',
          }}
        />
      </div>
    </div>
  );
};

export default Editor;
