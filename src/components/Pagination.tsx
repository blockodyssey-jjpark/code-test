import styles from './pagination.module.css';

type Params = {
  total: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

const Pagination = ({ total, currentPage, setCurrentPage }: Params) => {
  return (
    <div className={styles.pagination}>
      <button type="button">{'<<'}</button>
      <button type="button">{'<'}</button>
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
      <button type="button">{'>'}</button>
      <button type="button">{'>>'}</button>
    </div>
  );
};

export default Pagination;
