import React, { useState } from 'react';
import usePostProduct from '../../hooks/usePostProduct';

const ProductForm = () => {
  const { postProduct, loading, error, success } = usePostProduct();
  const [product, setProduct] = useState({
    product_name: '',
    price: '',
    material: '',
    description: '',
    image: null as File | null,  // Explicitly define image as either File or null
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; 
    if (file) {
      setProduct(prev => ({ ...prev, image: file }));  
    }
  };
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('product_name', product.product_name);
    formData.append('price', product.price);
    formData.append('material', product.material);
    formData.append('description', product.description);
    if (product.image) formData.append('image', product.image);

    try {
      const result = await postProduct(formData);
      console.log('Product created:', result);
    } catch (err) {
      console.error('Failed to create product:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-8 bg-white rounded-lg shadow-md space-y-6">
      <h2 className="text-3xl font-bold text-center text-forestgreen">Add a New Product</h2>

      <div className="flex flex-col space-y-4">
        <input
          type="text"
          name="product_name"
          placeholder="Product Name"
          onChange={handleChange}
          value={product.product_name}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-forestgreen"
        />
        <input
          type="text"
          name="price"
          placeholder="Price"
          onChange={handleChange}
          value={product.price}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-forestgreen"
        />
        <input
          type="text"
          name="material"
          placeholder="Material"
          onChange={handleChange}
          value={product.material}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-forestgreen"
        />
        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          value={product.description}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-forestgreen"
        />

        <input
          type="file"
          name="image"
          onChange={handleFileChange}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-forestgreen"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-forestgreen text-white font-bold rounded-md hover:bg-forestgreen/90 disabled:opacity-50"
        >
          {loading ? 'Uploading...' : 'Add Product'}
        </button>

        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-center">Product added successfully!</p>}
      </div>
    </form>
  );
};

export default ProductForm;
