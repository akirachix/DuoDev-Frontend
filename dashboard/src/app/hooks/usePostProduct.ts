import { useState } from 'react';

const usePostProduct = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);

  const postProduct = async (formData: FormData) => {
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await fetch('/api/market', {
        method: 'POST',
        body: formData,
      });

      // Check if the response was not successful
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      // Parse the response if successful
      const result = await response.json();
      setSuccess(true); // Set success to true on successful request
      return result;
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
      throw error; // Re-throw the error to handle it in the component
    } finally {
      setLoading(false);
    }
  };

  // Return the necessary states and the function to be used in components
  return { postProduct, loading, error, success };
};

export default usePostProduct;
