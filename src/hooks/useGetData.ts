import { useQuery } from '@tanstack/react-query';

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

type Options = {
  condition: string;
  keyword: string;
};

const useGetData = ({ condition, keyword }: Options) => {
  return useQuery<QueryResponse, unknown, Products[]>(
    ['products'],
    () =>
      fetch('https://dummyjson.com/products?limit=100').then((res) => {
        const json = res.json();
        if (!res.ok) {
          throw new Error('Fail');
        }
        return json;
      }),
    {
      select: (res: QueryResponse) => {
        // 검색 처리
        if (keyword) {
          return res.products.filter(({ title, brand, description }) => {
            const _title = title.toLowerCase();
            const _brand = brand.toLowerCase();
            const _description = description.toLowerCase();
            const _keyword = keyword.toLowerCase();

            if (condition === 'all') {
              return (
                _title.includes(_keyword) ||
                _brand.includes(_keyword) ||
                _description.includes(_keyword)
              );
            }
            if (condition === 'title') {
              return _title.includes(_keyword);
            }
            if (condition === 'brand') {
              return _brand.includes(_keyword);
            }
            if (condition === 'description') {
              return _description.includes(_keyword);
            }
            return false;
          });
        }
        return res.products;
      },
    }
  );
};

export default useGetData;
