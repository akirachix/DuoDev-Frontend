// utils/postProduct.ts

import { Product } from './types';

const API_URL = 'https://eco-threads-hub-d1b29486e648.herokuapp.com/api/products/';

export const postProduct = async (product: Product) => {
  try {
    const formData = new FormData();
    formData.append('product_name', product.product_name);
    formData.append('price', product.price);
    formData.append('material', product.material);
    if (product.description) formData.append('description', product.description);
    if (product.image) formData.append('image', product.image);

    const response = await fetch(API_URL, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to post product');
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
