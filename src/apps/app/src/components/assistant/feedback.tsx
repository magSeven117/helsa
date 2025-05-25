import { Button } from '@helsa/ui/components/button';
import { Textarea } from '@helsa/ui/components/textarea';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';

type Props = {
  onClose: () => void;
};

export function AssistantFeedback({ onClose }: Props) {
  const [value, setValue] = useState('');

  const sendFeedbackAction = async () => {
    console.log('Feedback:', value);
  };

  return (
    <div className="h-full absolute top-0 left-0 right-0 bottom-0 z-[100] bg-background">
      <div className="p-5 flex items-center space-x-3">
        <button type="button" className="items-center border bg-accent p-1" onClick={onClose}>
          <ArrowLeft />
        </button>
        <h2>Send Feedback</h2>
      </div>
      <div className="p-4">
        <form className="space-y-4">
          <Textarea
            name="feedback"
            value={value}
            required
            autoFocus
            placeholder="Your feedback..."
            className="min-h-[320px] resize-none rounded-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
            onChange={(evt: any) => setValue(evt.target.value)}
          />

          <div className="mt-1 flex items-center justify-end">
            <Button type="button" onClick={() => sendFeedbackAction()}>
              Send
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
