import { useAppDispatch, useAppSelector } from '../app/hooks';
import { goToNextPage, goToPrevPage } from '../slices/pageSlice';
import PageBtn from './PageBtn';
import styles from './pagination.module.css';

const Pagination = () => {
  const dispatch = useAppDispatch();
  const { total, currentPage } = useAppSelector((state) => state.page);

  function goToPrev() {
    dispatch(goToPrevPage());
  }

  function goToNext() {
    dispatch(goToNextPage());
  }

  const isShowGoToStart = total > 6 && currentPage >= 4;
  const isStart = total <= 6 || currentPage < 4;
  const isCenter = total > 6 && currentPage > 3 && currentPage < total - 3;
  const isEnd = total > 6 && currentPage >= total - 3;
  const isShowGoToEnd = total > 6 && currentPage < total - 3;

  return (
    <div className={styles.pagination}>
      <button type="button" onClick={goToPrev}>
        {'<'}
      </button>
      <div className={styles.buttons}>
        {isShowGoToStart && (
          <>
            <PageBtn number={0} />
            <span>...</span>
          </>
        )}

        {isStart &&
          Array.from({ length: total <= 6 ? total : 5 }, (_, idx) => idx).map(
            (number) => <PageBtn key={number} number={number} />
          )}

        {isCenter &&
          Array.from({ length: 3 }, (_, idx) => currentPage - 1 + idx).map(
            (number) => <PageBtn key={number} number={number} />
          )}

        {isEnd &&
          Array.from({ length: 5 }, (_, idx) => total - 5 + idx).map(
            (number) => <PageBtn key={number} number={number} />
          )}

        {isShowGoToEnd && (
          <>
            <span>...</span>
            <PageBtn number={total - 1} />
          </>
        )}
      </div>
      <button type="button" onClick={goToNext}>
        {'>'}
      </button>
    </div>
  );
};

export default Pagination;
