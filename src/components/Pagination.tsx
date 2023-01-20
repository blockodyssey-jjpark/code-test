import styles from './pagination.module.css';

type Params = {
  total: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

const Pagination = ({ total, currentPage, setCurrentPage }: Params) => {
  function goToFirst() {
    setCurrentPage(0);
  }

  function goToPrev() {
    if (currentPage - 1 >= 0) setCurrentPage(currentPage - 1);
  }

  function goToNext() {
    if (currentPage + 1 < total) setCurrentPage(currentPage + 1);
  }

  function goToLast() {
    setCurrentPage(total - 1);
  }

  return (
    <div className={styles.pagination}>
      <button type="button" onClick={goToFirst}>
        {'<<'}
      </button>
      <button type="button" onClick={goToPrev}>
        {'<'}
      </button>
      <div className={styles.buttons}>
        {Array.from({ length: total }, (_, idx) => idx).map((number) => (
          <button
            key={number}
            type="button"
            onClick={() => {
              setCurrentPage(number);
            }}
            className={(number === currentPage && styles.current) || ''}
          >
            {number + 1}
          </button>
        ))}
      </div>
      <button type="button" onClick={goToNext}>
        {'>'}
      </button>
      <button type="button" onClick={goToLast}>
        {'>>'}
      </button>
    </div>
  );
};

export default Pagination;
