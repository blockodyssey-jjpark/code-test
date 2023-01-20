import { useAppDispatch, useAppSelector } from '../app/hooks';
import { goToNextPage, goToPrevPage } from '../slices/pageSlice';
import PageBtn from './PageBtn';
import styles from './pagination.module.css';

const Pagination = () => {
  const dispatch = useAppDispatch();
  const { total } = useAppSelector((state) => state.page);

  function goToPrev() {
    dispatch(goToPrevPage());
  }

  function goToNext() {
    dispatch(goToNextPage());
  }

  return (
    <div className={styles.pagination}>
      <button type="button" onClick={goToPrev}>
        {'<'}
      </button>
      <div className={styles.buttons}>
        {total <= 6 &&
          Array.from({ length: total }, (_, idx) => idx).map((number) => (
            <PageBtn key={number} number={number} />
          ))}

        {total > 6 && (
          <>
            <PageBtn number={0} />
            <span>...</span>
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
