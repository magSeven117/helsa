'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@helsa/ui/components/accordion';
import { AudioLines, Loader2, Video } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const History = () => {
  const [loading, setLoading] = useState(false);
  const [recordings, setRecordings] = useState<{ url: string }[]>([]);
  const [transcriptions, setTranscriptions] = useState<{ url: string; start_time: string }[]>([]);
  const params = useSearchParams();
  const id = params.get('id');

  useEffect(() => {
    const fetchRecordings = async () => {
      setLoading(true);
      try {
        if (!id) return null;
        const response = await fetch('/api/functions/get-recordings?id=' + id);
        if (!response.ok) {
          throw new Error('Failed to fetch recordings');
        }
        const data = await response.json();
        setRecordings(data.recordings);
      } catch (error) {
        console.error('Error fetching recordings:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchTranscriptions = async () => {
      try {
        if (!id) return null;
        const response = await fetch('/api/functions/get-transcription?id=' + id);
        if (!response.ok) {
          throw new Error('Failed to fetch transcriptions');
        }
        const data = await response.json();
        setTranscriptions(data.transcriptions);
      } catch (error) {
        console.error('Error fetching transcriptions:', error);
      }
    };
    fetchTranscriptions();
    fetchRecordings();
  }, [id]);

  if (loading) {
    return (
      <div className="flex w-full h-full items-center justify-center">
        <Loader2 className="size-10 animate-spin" />
      </div>
    );
  }

  if (recordings.length === 0) {
    return <div>No recordings available</div>;
  }

  return (
    <Accordion type="multiple" defaultValue={['recordings']}>
      <AccordionItem value="recordings">
        <AccordionTrigger>
          <div className="flex justify-start items-center gap-2">
            Grabaciones <Video className="size-4" />
          </div>
        </AccordionTrigger>
        <AccordionContent className="grid grid-cols-2 gap-4">
          {recordings.map((recording) => (
            <div key={recording.url} className="border-b py-3">
              <video src={recording.url} controls></video>
            </div>
          ))}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="transcriptions">
        <AccordionTrigger>
          <div className="flex justify-start items-center gap-2">
            Transcripciones <AudioLines className="size-4" />
          </div>
        </AccordionTrigger>
        <AccordionContent className="">
          {transcriptions.map((recording) => (
            <div key={recording.url} className="border-b py-3">
              <a href={recording.url} download={true} target="_blank">
                {recording.start_time}
              </a>
            </div>
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default History;
