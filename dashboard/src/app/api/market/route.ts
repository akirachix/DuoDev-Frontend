export async function POST(request: Request) {
  const baseUrl = process.env.BASE_URL;

  if (!baseUrl) {
      return new Response('Base URL is not configured', { status: 500 });
  }

  try {
      const formData = await request.formData();

      const productData = {
          product_name: formData.get('product_name'),
          price: formData.get('price'),
          material: formData.get('material'),
          description: formData.get('description'),
          image: formData.get('image'),
      };

      // Create a new FormData object to send as form data
      const formDataToSend = new FormData();
      formDataToSend.append('product_name', productData.product_name as string);
      formDataToSend.append('price', productData.price as string);
      formDataToSend.append('material', productData.material as string);
      formDataToSend.append('description', productData.description as string);

      // Append the image file if it exists
      if (productData.image) {
          formDataToSend.append('image', productData.image as Blob);
      }

      // Send the form data to the backend API
      const response = await fetch(`${baseUrl}/api/products/`, {
          method: 'POST',
          body: formDataToSend,
      });

      if (!response.ok) {
          const errorMessage = await response.text();
          return new Response(`Failed to create product: ${errorMessage}`, { status: response.status });
      }

      const result = await response.json();
      return new Response(JSON.stringify(result), {
          status: 201,
          headers: { 'Content-Type': 'application/json' },
      });

  } catch (error) {
      console.error('Error posting product:', error);
      return new Response('Server error', { status: 500 });
  }
}
