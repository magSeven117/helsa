'use client';

import { Input } from '@/libs/shadcn-ui/components/input';
import { Loader2, Search, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { SidebarTrigger } from '../side-bar/sidabar-trigger';

const TopBar = () => {
  return (
    <div className="flex w-full justify-between items-center pl-4  p-8">
      <div className="md:hidden">
        <SidebarTrigger />
      </div>
      <div className='w-full ml-5 max-sm:hidden'>
        <Searcher />
      </div>
    </div>
  );
};

export default TopBar;

const Searcher = () => {
  const [term, setTerm] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const handleChange = (e: any) => {
    setTerm(e.target.value);
  };
  const searchResults = async (search: string) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    setResults([
      {
        title: 'Jose Veliz',
        description: 'Diabetes type 2',
        age: 25,
        last_consult: '2021-10-10',
        image: 'https://avatars.githubusercontent.com/u/1403241?v=4',
      },
    ]);
    setIsSearching(false);
  };
  useEffect(() => {
    if (!term || term === '') {
      setResults([]);
      setIsSearching(false);
      return;
    }
    setIsSearching(true);
    const timeout = setTimeout(async () => {
      await searchResults(term);
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [term]);
  return (
    <div className='w-full rounded-full flex relative items-center gap-2 max-md:w-1/2'>
      <div className='box-border h-10 w-10 bg-secondary rounded-full flex justify-center items-center shadow-none '>
        {term ? <X className='w-4 h-4' /> : <Search className='w-4 h-4' />}
      </div>
      <Input className='border border-secondary bg-background outline-none text-secondary-foreground rounded-full box-border w-4/5' placeholder="Search" onChange={handleChange} />
      {isSearching && (
        <div className='z-50 absolute bg-background w-4/5 h-[250px] rounded shadow border left-[50px] top-[50px]'>
          <div className='flex justify-center items-center h-full'>
            <Loader2 className='h-[50px] w-[50px] text-primary animate-spin'></Loader2>
          </div>
        </div>
      )}
      {!isSearching && term && results.length > 0 && (
        <div className='z-50 absolute bg-background w-4/5 h-[250px] rounded shadow border left-[50px] top-[50px]'>
          {results.map((result, index) => (
            <div key={index} className='flex gap-2 p-2 cursor-pointer hover:bg-border'>
              <img src={result.image} alt={result.title} className='h-[50px] w-[50px] rounded-full' />
              <div className='flex flex-col justify-center'>
                <div className='font-bold text-[1rem]'>
                  {result.title} - <span className="font-bold">{result.age} years</span>
                </div>
                <div className='text-xs'>
                  {result.description} - <span className="italic">last consult {result.last_consult}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {!isSearching && term && results.length === 0 && (
        <div className='z-50 absolute bg-background w-4/5 h-[250px] rounded shadow border left-[50px] top-[50px]'>
          <div className='flex justify-center items-center h-full text-xl font-bold'>No results found</div>
        </div>
      )}
    </div>
  );
};
