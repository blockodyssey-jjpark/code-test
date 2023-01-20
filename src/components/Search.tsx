import { useRef } from 'react';

import styles from './search.module.css';

const Search = () => {
  const selectRef = useRef<HTMLSelectElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function onSubmitSearch(e: React.FormEvent) {
    e.preventDefault();

    window.location.replace(
      `${window.location.origin}?condition=${selectRef.current?.value}&keyword=${inputRef.current?.value}`
    );
  }

  // search params 관련
  const searchParams = window.location.search;
  const searchParamsObj = new URLSearchParams(searchParams);

  return (
    <form className={styles.search} onSubmit={onSubmitSearch}>
      <h2 className={styles.searchHeader}>상품 검색</h2>
      <select
        name="condition"
        ref={selectRef}
        defaultValue={searchParamsObj.get('condition') || 'all'}
      >
        <option value="all">전체</option>
        <option value="title">상품명</option>
        <option value="brand">브랜드</option>
        <option value="description">상품내용</option>
      </select>
      <input
        name="keyword"
        type="text"
        ref={inputRef}
        defaultValue={searchParamsObj.get('keyword') || ''}
      />
      <button type="submit">검색</button>
    </form>
  );
};

export default Search;
