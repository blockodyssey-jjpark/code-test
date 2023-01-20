import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setCurrentPage } from '../slices/pageSlice';

import styles from './pageBtn.module.css';

type Props = {
  number: number;
};

const PageBtn = ({ number }: Props) => {
  const dispatch = useAppDispatch();
  const { currentPage } = useAppSelector((state) => state.page);

  return (
    <button
      key={number}
      type="button"
      onClick={() => {
        dispatch(setCurrentPage(number));
      }}
      className={(number === currentPage && styles.current) || ''}
    >
      {number + 1}
    </button>
  );
};

export default PageBtn;
