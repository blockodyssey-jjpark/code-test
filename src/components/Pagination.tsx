import styles from './pagination.module.css';

type Params = {
  total: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

const Pagination = ({ total, currentPage, setCurrentPage }: Params) => {
  return (
    <div className={styles.buttons}>
      {Array.from({ length: total }, (_, idx) => idx).map((number) => {
        console.log(number, currentPage, number === currentPage);
        return (
          <button
            key={number}
            onClick={() => {
              setCurrentPage(number);
            }}
            className={(number === currentPage && styles.current) || ''}
          >
            {number + 1}
          </button>
        );
      })}
    </div>
  );
};

export default Pagination;
