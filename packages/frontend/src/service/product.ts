import { Paginated } from '../common/pagination';
import { useRequest } from './request';

export interface ProductResponse {
  id: number;
  name: string;
  sku: string;
  price: number;
}

export interface CreateProductRequest {
  sku: string;
  price: number;
  name: string;
}

export interface UpdateProductRequest {
  price: number;
  name: string;
}
export interface CartResponse {
  id: number;
  product: ProductResponse;
  quantity: number;
}

export interface CheckoutResponse {
  product: ProductResponse;
  price: number;
  discount: number;
  discountDescription: string;
  quantity: number;
}

export const useProduct = () => {
  const { client, loading, errorMessage } = useRequest();
  const findAll = (page: number, size = 100) => {
    return client.get<Paginated<ProductResponse>>(
      `/products?page=${page}&size${size}`,
    );
  };
  const addToCart = (productId: number, quantity: number) => {
    return client.put(`/carts`, {
      productId,
      quantity,
    });
  };
  const findAllCart = () => {
    return client.get<CartResponse[]>(`/carts`);
  };
  const removeCart = (productId: number) => {
    return client.delete(`/carts/${productId}`);
  };

  const checkout = () => {
    return client.get<CheckoutResponse[]>(`/carts/checkout`);
  };
  return {
    loading,
    errorMessage,
    findAll,
    findAllCart,
    addToCart,
    removeCart,
    checkout,
  };
};
