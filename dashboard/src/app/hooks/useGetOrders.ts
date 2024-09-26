export interface OrderData {
  order_number: string;
  phone_number: number; // Consider making this string if you want to support formatted numbers
  quantity: number;
  total_price: number;
  location: string;
  status: string;
  product: number;
  user: number;
}

const url = "/api/orders";

export const postOrder = async (orderData: OrderData) => {
  console.log(orderData);
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData), // Send the OrderData object
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("Full response from server:", text);

      // Handle different status codes
      if (response.status >= 500) {
        throw new Error("We are experiencing technical difficulties. Please try again later.");
      } else if (response.status === 400) {
        throw new Error("Invalid credentials. Please try again.");
      } else {
        throw new Error("Something went wrong. Please try again.");
      }
    }

    // Parse and return the JSON response
    return await response.json();
  } catch (error) {
    console.error("Error during order submission:", error);
    throw new Error((error as Error).message);
  }
};

