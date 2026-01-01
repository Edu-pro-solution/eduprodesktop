// // import { useEffect, useState } from "react";
// // import axios from "axios";

// // const useFetch = (url) => {
// //   const [data, setData] = useState(null);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState(null);
// //   const apiUrl = process.env.REACT_APP_API_URL;

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       if (!url) return;
// //       setLoading(true);
// //       console.log("Fetching data from URL:", url);
// //       try {
// //         const token = localStorage.getItem("jwtToken");
// //         const headers = token ? { Authorization: `Bearer ${token}` } : {};
// //         const response = await axios.get(`${apiUrl}/api${url}`, { headers });
// //         console.log("Data fetched successfully:", response.data);
// //         setData(response.data.length > 0 ? response.data : null);

// //         setError(null);
// //       } catch (err) {
// //         console.error("Error fetching data:", err);
// //         setError(err);
// //         setData(null);
// //       } finally {
// //         setLoading(false);
// //         console.log("Loading state set to false");
// //       }
// //     };

// //     fetchData();
// //   }, [url]);

// //   const reFetch = async () => {
// //     setLoading(true);
// //     console.log("Re-fetching data from URL:", url);
// //     try {
// //       const token = localStorage.getItem("jwtToken");
// //       const headers = token ? { Authorization: `Bearer ${token}` } : {};
// //       const res = await axios.get(`${apiUrl}/api${url}`, { headers });
// //       console.log("Re-fetch successful:", res.data);
// //       setData(res.data.length > 0 ? res.data : null);
// //       setError(null);
// //     } catch (err) {
// //       console.error("Error re-fetching data:", err);
// //       setError(err);
// //       setData(null);
// //     }
// //     setLoading(false);
// //     console.log("Loading state set to false after re-fetch");
// //   };

// //   return { data, loading, error, reFetch };
// // };

// // export default useFetch;

// import { useEffect, useState } from "react";
// import axios from "axios";

// const useFetch = (url) => {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const apiUrl = process.env.REACT_APP_API_URL;

//   useEffect(() => {
//     const fetchData = async () => {
//       if (!url) return;
//       setLoading(true);
//       console.log("Fetching data from URL:", url);
//       try {
//         let headers = {};
//         const token = localStorage.getItem("jwtToken");

//         // Conditionally set the Authorization header only for certain routes
//         if (url.includes("/protected-route")) {
//           headers = token ? { Authorization: `Bearer ${token}` } : {};
//         }

//         const response = await axios.get(`${apiUrl}/api${url}`, { headers });
//         console.log("Data fetched successfully:", response.data);
//         setData(response.data.length > 0 ? response.data : null);
//         setError(null);
//       } catch (err) {
//         console.error("Error fetching data:", err);
//         setError(err);
//         setData(null);
//       } finally {
//         setLoading(false);
//         console.log("Loading state set to false");
//       }
//     };

//     fetchData();
//   }, [url]);

//   const reFetch = async () => {
//     setLoading(true);
//     console.log("Re-fetching data from URL:", url);
//     try {
//       const token = localStorage.getItem("jwtToken");
//       const headers = token ? { Authorization: `Bearer ${token}` } : {};
//       const res = await axios.get(`${apiUrl}/api${url}`, { headers });
//       console.log("Re-fetch successful:", res.data);
//       setData(res.data.length > 0 ? res.data : null);
//       setError(null);
//     } catch (err) {
//       console.error("Error re-fetching data:", err);
//       setError(err);
//       setData(null);
//     }
//     setLoading(false);
//     console.log("Loading state set to false after re-fetch");
//   };

//   return { data, loading, error, reFetch };
// };

// export default useFetch;

// import { useEffect, useState } from "react";
// import axios from "axios";

// const useFetch = (url) => {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const apiUrl = process.env.REACT_APP_API_URL;

//   useEffect(() => {
//     const fetchData = async () => {
//       if (!url) return; // No URL provided, do nothing

//       setLoading(true);
//       console.log("Fetching data from URL:", url);

//       try {
//         let headers = {};
//         const token = localStorage.getItem("jwtToken");

//         // Conditionally set the Authorization header only if the URL requires it
//         if (url.includes("/protected-route")) {
//           // Adjust this condition as needed
//           headers = token ? { Authorization: `Bearer ${token}` } : {};
//         }

//         const response = await axios.get(`${apiUrl}/api${url}`, { headers });
//         console.log("Data fetched successfully:", response.data);

//         // Adjust according to your API's response structure
//         setData(response.data.data ? response.data.data : response.data);

//         setError(null);
//       } catch (err) {
//         console.error("Error fetching data:", err);
//         setError(err);
//         setData(null);
//       } finally {
//         setLoading(false);
//         console.log("Loading state set to false");
//       }
//     };

//     fetchData();
//   }, [url]);

//   const reFetch = async () => {
//     setLoading(true);
//     console.log("Re-fetching data from URL:", url);

//     try {
//       const token = localStorage.getItem("jwtToken");
//       const headers = token ? { Authorization: `Bearer ${token}` } : {};
//       const res = await axios.get(`${apiUrl}/api${url}`, { headers });
//       console.log("Re-fetch successful:", res.data);

//       // Adjust according to your API's response structure
//       setData(res.data.data ? res.data.data : res.data);

//       setError(null);
//     } catch (err) {
//       console.error("Error re-fetching data:", err);
//       setError(err);
//       setData(null);
//     }

//     setLoading(false);
//     console.log("Loading state set to false after re-fetch");
//   };

//   return { data, loading, error, reFetch };
// };

// export default useFetch;

// import { useEffect, useState } from "react";
// import axios from "axios";

// const useFetch = (url) => {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const apiUrl = process.env.REACT_APP_API_URL;

//   useEffect(() => {
//     const fetchData = async () => {
//       if (!url) return; // No URL, no fetch
//       setLoading(true);
//       console.log("Fetching data from URL:", url);

//       try {
//         // Get the token from localStorage
//         const token = localStorage.getItem("jwtToken");
//         const headers = token ? { Authorization: `Bearer ${token}` } : {};

//         const response = await axios.get(`${apiUrl}/api${url}`, { headers });
//         console.log("Data fetched successfully:", response.data);
//         setData(response.data.length > 0 ? response.data : null);
//         setError(null);
//       } catch (err) {
//         console.error("Error fetching data:", err);
//         setError(err);
//         setData(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [url]);

//   const reFetch = async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem("jwtToken");
//       const headers = token ? { Authorization: `Bearer ${token}` } : {};
//       const res = await axios.get(`${apiUrl}/api${url}`, { headers });
//       setData(res.data.length > 0 ? res.data : null);
//       setError(null);
//     } catch (err) {
//       console.error("Error re-fetching data:", err);
//       setError(err);
//       setData(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { data, loading, error, reFetch };
// };

// export default useFetch;

import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      if (!url) return; // No URL provided, do nothing

      setLoading(true);
      console.log("Fetching data from URL:", url);

      try {
        let headers = {};
        const token = localStorage.getItem("jwtToken");

        // Conditionally set the Authorization header only if the URL requires it
        if (url.includes("/protected-route")) {
          // Adjust this condition as needed
          headers = token ? { Authorization: `Bearer ${token}` } : {};
        }

        const response = await axios.get(`${apiUrl}/api${url}`, { headers });
        console.log("Data fetched successfully:", response.data);

        // Adjust according to your API's response structure
        setData(response.data.data ? response.data.data : response.data);

        setError(null);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err);
        setData(null);
      } finally {
        setLoading(false);
        console.log("Loading state set to false");
      }
    };

    fetchData();
  }, [url]);

  const reFetch = async () => {
    setLoading(true);
    console.log("Re-fetching data from URL:", url);

    try {
      const token = localStorage.getItem("jwtToken");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const res = await axios.get(`${apiUrl}/api${url}`, { headers });
      console.log("Re-fetch successful:", res.data);

      // Adjust according to your API's response structure
      setData(res.data.data ? res.data.data : res.data);

      setError(null);
    } catch (err) {
      console.error("Error re-fetching data:", err);
      setError(err);
      setData(null);
    }

    setLoading(false);
    console.log("Loading state set to false after re-fetch");
  };

  return { data, loading, error, reFetch };
};

export default useFetch;
