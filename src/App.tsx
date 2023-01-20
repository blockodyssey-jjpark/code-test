import { useQuery } from '@tanstack/react-query';
import './App.css';

type Products = {
  brand: string;
  category: string;
  description: string;
  discountPercentage: number;
  id: number;
  images: string[];
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
  title: string;
};

type QueryResponse = {
  limit: number;
  products: Products[];
  skip: number;
  total: number;
};

function App() {
  const { data } = useQuery<QueryResponse>(['products'], () =>
    fetch('https://dummyjson.com/products?limit=100').then((res) => {
      const json = res.json();
      if (!res.ok) {
        throw new Error('Fail');
      }
      return json;
    })
  );

  console.log(data);

  return (
    <div className="App">
      <h1>Frontend Code Test</h1>
      {/* 검색 영역 */}
      <div>
        <h2>상품 검색</h2>
        <label>상품 검색</label>
        <select>
          <option value="all">전체</option>
          <option>상품명</option>
          <option>브랜드</option>
          <option>상품내용</option>
        </select>
        <input type="text" />
      </div>
      {/* 목록 영역 */}
      <div>검색된 데이터 {data?.total || '-'}건</div>
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
          {data?.products.map((data, idx) => (
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
        </tbody>
      </table>
    </div>
  );
}

export default App;
