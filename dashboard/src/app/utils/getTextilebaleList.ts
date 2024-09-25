export const gettextilebalelist = async () => {

  try {
    const response = await fetch("/api/textilebale", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch textile bales");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    // More robust error handling
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred while fetching textile bales");
    }
  }
};
