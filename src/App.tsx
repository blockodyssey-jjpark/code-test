import React, { useEffect, useState } from 'react';
import useGetData from './hooks/useGetData';

import Pagination from './components/Pagination';
import Search from './components/Search';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { setCurrentPage, setTotal } from './slices/pageSlice';

function App() {
  const dispatch = useAppDispatch();

  // search params 관련
  const searchParams = window.location.search;
  const searchParamsObj = new URLSearchParams(searchParams);

  // 데이터 가져오기
  const { data } = useGetData({
    condition: searchParamsObj.get('condition') || 'all',
    keyword: searchParamsObj.get('keyword') || '',
  });

  // 페이지 관련
  const { currentPage } = useAppSelector((state) => state.page);
  const [pageSize, setPageSize] = useState(10); // TODO: 쿼리로 관리

  // 데이터 또는 페이지당 행 변경 시
  useEffect(() => {
    dispatch(setCurrentPage(0));
    dispatch(setTotal((data?.length || 0) / pageSize));
  }, [data?.length, dispatch, pageSize]);

  function onChangePerPage(e: React.ChangeEvent<HTMLSelectElement>) {
    setPageSize(Number(e.target.value));
  }

  return (
    <div className="App">
      <h1>Frontend Code Test</h1>
      {/* 검색 영역 */}
      <Search />

      {/* 목록 영역 */}
      <div>검색된 데이터 {data?.length || '0'}건</div>

      <table>
        <thead>
          <tr>
            <th>상품번호</th>
            <th>상품명</th>
            <th>브랜드</th>
            <th>상품내용</th>
            <th>가격</th>
            <th>상품</th>
            <th>재고</th>
          </tr>
        </thead>
        <tbody>
          {data
            ?.slice(currentPage * pageSize, currentPage * pageSize + pageSize)
            .map((data, idx) => (
              <tr key={idx}>
                <td>{data.id}</td>
                <td>{data.title}</td>
                <td>{data.brand}</td>
                <td title={data.description}>
                  {data.description.length > 40
                    ? data.description.slice(0, 40) + '...'
                    : data.description}
                </td>
                <td>
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    maximumFractionDigits: 0,
                  }).format(data.price)}
                </td>
                <td>{data.rating}</td>
                <td>{data.stock}</td>
              </tr>
            ))}
          {data?.length === 0 && (
            <tr>
              <td colSpan={7}>검색 결과가 없습니다.</td>
            </tr>
          )}
        </tbody>
      </table>
      {/* 페이지네이션 */}
      {data?.length !== 0 && (
        <div>
          <div>
            페이지당 행:
            <select onChange={onChangePerPage}>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </div>
          <Pagination />
        </div>
      )}
    </div>
  );
}

export default App;
