import { ReactElement, createContext, useEffect, useState } from 'react';

interface Product {
  sku: string;
  name: string;
  price: number;
}
// const initialState: Product[] = [
//   {
//     sku: '0001',
//     name: 'Widget',
//     price: 9.99,
//   },
//   {
//     sku: '0002',
//     name: 'Premium Widget',
//     price: 19.99,
//   },
//   {
//     sku: '0003',
//     name: 'Deluxe Widget',
//     price: 29.99,
//   },
// ];

export type UseProductsContextType = { products: Product[] };

const ProductsContext = createContext<UseProductsContextType>({ products: [] });

type ChildrenType = { children?: ReactElement | ReactElement[] };

export const ProductsProvider = ({ children }: ChildrenType): ReactElement => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async (): Promise<void> => {
      try {
        const response = await fetch('http://localhost:3500/products');

        if (!response.ok) {
          throw new Error('Failed to fetch products.');
        }

        const data = await response.json();
        setProducts(data);
      } catch (err) {
        if (err instanceof Error) console.error(err.message);
      }
    };

    fetchProducts();
  }, []);

  return <ProductsContext.Provider value={{ products }}>{children}</ProductsContext.Provider>;
};
