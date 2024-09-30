// utils/getSellers.ts

import { SellersData } from './types';

export const getSellers = async (): Promise<SellersData> => {
  try {
    const response = await fetch('/api/sellers/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch sellers data');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    // More robust error handling
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('An unknown error occurred while fetching sellers data');
    }
  }
};
