import { useState } from 'react';
import { TextileBaleData } from '../utils/types';

const usePostBale = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);

  const postBale = async (newBale: TextileBaleData) => {
    setLoading(true);
    setError('');
    setSuccess(false);

    const formData = new FormData();
    formData.append('waste_type', newBale.waste_type);
    formData.append('weight', newBale.weight.toString());
    formData.append('location', newBale.location);
    formData.append('phone_number', newBale.phone_number.toString());
    formData.append('price', newBale.price.toString());
    formData.append('posted_by', newBale.posted_by.toString());

    // Append the image file directly to the form data if it exists
    if (newBale.image) {
      formData.append('image', newBale.image);
    }

    try {
      const response = await fetch('/api/textile-bales/', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      const result = await response.json();
      setSuccess(true);
      return result;
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return { postBale, loading, error, success };
};

export default usePostBale;