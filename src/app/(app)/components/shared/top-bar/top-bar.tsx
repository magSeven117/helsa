'use client';

import { Input } from '@/libs/shadcn-ui/components/input';
import { Loader2, Search, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { SidebarTrigger } from '../side-bar/sidabar-trigger';
import styles from './styles.module.css';

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
    <div className={styles.topbar_searcher}>
      <div className={styles.topbar_searcher_icon}>
        {term ? <X className={styles.icon} /> : <Search className={styles.icon} />}
      </div>
      <Input className={styles.topbar_searcher_input} placeholder="Search" onChange={handleChange} />
      {isSearching && (
        <div className={styles.searcher_result_container}>
          <div className={styles.icon_loader_container}>
            <Loader2 className={styles.icon_loader}></Loader2>
          </div>
        </div>
      )}
      {!isSearching && term && results.length > 0 && (
        <div className={styles.searcher_result_container}>
          {results.map((result, index) => (
            <div key={index} className={styles.searcher_result_item}>
              <img src={result.image} alt={result.title} className={styles.searcher_result_item_image} />
              <div className={styles.searcher_result_item_content}>
                <div className={styles.searcher_result_item_title}>
                  {result.title} - <span className="font-bold">{result.age} years</span>
                </div>
                <div className={styles.searcher_result_item_description}>
                  {result.description} - <span className="italic">last consult {result.last_consult}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {!isSearching && term && results.length === 0 && (
        <div className={styles.searcher_result_container}>
          <div className={styles.searcher_result_not_found}>No results found</div>
        </div>
      )}
    </div>
  );
};
