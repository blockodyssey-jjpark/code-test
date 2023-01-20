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

const useGetData = () => {
  return useQuery<QueryResponse>(['products'], () =>
    fetch('https://dummyjson.com/products?limit=100').then((res) => {
      const json = res.json();
      if (!res.ok) {
        throw new Error('Fail');
      }
      return json;
    })
  );
};

export default useGetData;