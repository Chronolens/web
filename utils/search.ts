// utils/search.ts

export const postSearchQuery = async (query: string) => {
    if (!query) {
      alert("Search query cannot be empty");
      return;
    }
  
    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }), // Sending the search query as a JSON object
      });
  
      if (response.ok) {
        const data = await response.json();
        // Process the search results here or redirect, for example:
        console.log("Search results:", data);
        // Optionally redirect or update UI with the search results.
        // Example: window.location.href = `/search-results?query=${query}`;
      } else {
        console.error("Failed to fetch search results");
        alert("Error during search. Please try again.");
      }
    } catch (error) {
      console.error("An error occurred during the search:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  };
  