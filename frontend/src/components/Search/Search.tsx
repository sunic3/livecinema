import React, { useEffect, useRef, useState } from 'react';
import cn from 'classnames';

import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';

import './searchAnimate.scss';

import { CSSTransition } from 'react-transition-group';

import styles from './Search.module.scss';
import useDebouncedFunction from '../../helpers/debounce';
import { MovieShort } from '../../interfaces';
import SearchItems from './SearchItems';

type SearchProps = {
  search: boolean;
  setSearch: (state: boolean) => void;
};

const Search: React.FC<SearchProps> = ({ search, setSearch }) => {
  const [value, setValue] = useState('');
  const [focus, setFocus] = useState(false);
  const [anime, setAnime] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<MovieShort[] | null>([]);

  const refInput = useRef<HTMLInputElement>(null);

  const debouncedValueLogging: (
    search: string
  ) => Promise<MovieShort[] | null> = useDebouncedFunction(500);

  useEffect(() => {
    setResults(null);

    debouncedValueLogging(value).then((data) => {
      setResults(data);
    });
  }, [value]);

  useEffect(() => {
    setShowResults(focus && !!value);
  }, [value, focus]);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const onBlur = () => {
    setTimeout(() => setFocus(false), 100);
    !value && setAnime(false);
  };

  // if (!search) return <SearchIcon onClick={() => setSearch(true)} />;

  return (
    <CSSTransition
      timeout={300}
      in={anime}
      classNames="searchBlock"
      onEnter={() => {
        setSearch(true);
        setTimeout(() => {
          refInput.current?.focus();
        }, 100);
      }}
      onExited={() => setSearch(false)}
    >
      <div className={styles.container}>
        <input
          className={cn(styles.search, !search && styles.search__hide)}
          value={value}
          autoFocus={true}
          onChange={onChange}
          onFocus={() => setFocus(true)}
          onBlur={onBlur}
          ref={refInput}
        />
        {anime ? (
          <CloseIcon
            className={styles.search_icon}
            onClick={() => {
              setValue('');
              setAnime(false);
            }}
          />
        ) : (
          <SearchIcon
            className={styles.search_icon}
            onClick={() => setAnime(true)}
          />
        )}
        {showResults && (
          <div className={styles.results_container}>
            <SearchItems results={results} />
          </div>
        )}
      </div>
    </CSSTransition>
  );
};

export default Search;
