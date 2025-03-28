const mockFetchData = (token) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (token === "fake-jwt-token") {
          resolve({
            data: [
              { id: 1, title: "Fake Task 1" },
              { id: 2, title: "Fake Task 2" },
            ],
          });
        } else {
          reject(new Error("Unauthorized"));
        }
      }, 1000);
    });
  };
  
  export { mockFetchData };