// import React, { createContext, useEffect, useReducer } from "react";
// import { jwtDecode } from "jwt-decode";
// import axios from "axios";

// const initialState = {
//   isAuthenticated: false,
//   isInitialised: false,
//   user: null,
// };

// const apiUrl = process.env.REACT_APP_API_URL;
// console.log("API URL:", apiUrl);

// const isValidToken = (jwtToken) => {
//   if (!jwtToken) {
//     return false;
//   }

//   const decodedToken = jwtDecode(jwtToken);
//   const currentTime = Date.now() / 1000;

//   return decodedToken.exp > currentTime;
// };

// const setSession = (jwtToken) => {
//   if (jwtToken) {
//     localStorage.setItem("jwtToken", jwtToken);
//     axios.defaults.headers.common.Authorization = `Bearer ${jwtToken}`;
//   } else {
//     localStorage.removeItem("jwtToken");
//     delete axios.defaults.headers.common.Authorization;
//   }
// };

// const reducer = (state, action) => {
//   switch (action.type) {
//     case "INIT":
//       return {
//         ...state,
//         isAuthenticated: action.payload.isAuthenticated,
//         isInitialised: true,
//         user: action.payload.user,
//       };
//     case "LOGIN":
//     case "REGISTER":
//       return {
//         ...state,
//         isAuthenticated: true,
//         user: action.payload.user,
//       };
//     case "LOGOUT":
//       return {
//         ...state,
//         isAuthenticated: false,
//         user: null,
//       };
//     default:
//       return state;
//   }
// };

// const AuthContext = createContext({
//   ...initialState,
//   method: "JWT",
//   login: () => Promise.resolve(),
//   logout: () => {},
//   register: () => Promise.resolve(),
// });

// export const AuthProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(reducer, initialState);

//   // useEffect(() => {
//   //   const initAuth = async () => {
//   //     const jwtToken = localStorage.getItem("jwtToken");

//   //     if (jwtToken && isValidToken(jwtToken)) {
//   //       setSession(jwtToken);

//   //       try {
//   //         const response = await axios.get(`${apiUrl}/api/auth/profile`);
//   //         const { user } = response.data;
//   //         dispatch({
//   //           type: "INIT",
//   //           payload: {
//   //             isAuthenticated: true,
//   //             user,
//   //           },
//   //         });
//   //       } catch (err) {
//   //         dispatch({
//   //           type: "INIT",
//   //           payload: {
//   //             isAuthenticated: false,
//   //             user: null,
//   //           },
//   //         });
//   //       }
//   //     } else {
//   //       dispatch({
//   //         type: "INIT",
//   //         payload: {
//   //           isAuthenticated: false,
//   //           user: null,
//   //         },
//   //       });
//   //     }
//   //   };

//   //   initAuth();
//   // });

//   useEffect(() => {
//     const initAuth = async () => {
//       const jwtToken = localStorage.getItem("jwtToken");

//       if (jwtToken && isValidToken(jwtToken)) {
//         setSession(jwtToken);

//         try {
//           const response = await axios.get(`${apiUrl}/api/auth/profile`);
//           const { user } = response.data;
//           dispatch({
//             type: "INIT",
//             payload: {
//               isAuthenticated: true,
//               user,
//             },
//           });
//         } catch (err) {
//           dispatch({
//             type: "INIT",
//             payload: {
//               isAuthenticated: false,
//               user: null,
//             },
//           });
//         }
//       } else {
//         dispatch({
//           type: "INIT",
//           payload: {
//             isAuthenticated: false,
//             user: null,
//           },
//         });
//       }
//     };

//     initAuth();
//   }, [apiUrl]); // Add dependency array

//   // const login = async (email, password) => {
//   //   try {
//   //     const response = await axios.post(`${apiUrl}/api/auth/login`, {
//   //       email,
//   //       password,
//   //     });

//   //     if (response.status === 200) {
//   //       const { token, user } = response.data;

//   //       localStorage.setItem("user", JSON.stringify(user));
//   //       setSession(token);

//   //       dispatch({
//   //         type: "LOGIN",
//   //         payload: { user },
//   //       });

//   //       return response;
//   //     } else {
//   //       return response;
//   //     }
//   //   } catch (error) {
//   //     throw error;
//   //   }
//   // };

//   const login = async (email, password) => {
//     try {
//       const response = await axios.post(
//         `${apiUrl}/api/auth/login`,

//         { email, password },
//         {
//           withCredentials: true, // Include credentials with the request
//         }
//       );

//       if (response.status === 200) {
//         const { token, user } = response.data;

//         localStorage.setItem("user", JSON.stringify(user));
//         setSession(token);

//         dispatch({
//           type: "LOGIN",
//           payload: { user },
//         });

//         return response;
//       } else {
//         return response;
//       }
//     } catch (error) {
//       throw error;
//     }
//   };

//   // const register = async (fullname, email, phone, address, password) => {
//   //   try {
//   //     const response = await axios.post(`${apiUrl}/api/auth/signup`, {
//   //       fullname,
//   //       email,
//   //       phone,
//   //       address,
//   //       password, // This matches your backend field for the hashed password
//   //     });

//   //     if (response.status === 201) {
//   //       const { token, user } = response.data;

//   //       // Set the token in session (or localStorage)
//   //       setSession(token);
//   //       localStorage.setItem("user", JSON.stringify(user));

//   //       // Dispatch action to update state
//   //       dispatch({
//   //         type: "REGISTER",
//   //         payload: { user },
//   //       });

//   //       return response;
//   //     } else {
//   //       return response;
//   //     }
//   //   } catch (error) {
//   //     // Handle error
//   //     console.error(
//   //       "Error during registration:",
//   //       error.response?.data?.message || error.message
//   //     );
//   //     throw error;
//   //   }
//   // };

//   const register = async (fullname, phone, username, email, password) => {
//     try {
//       console.log("Sending request to API...");
//       const response = await axios.post(`${apiUrl}/api/auth/signup`, {
//         fullname,
//         phone,
//         username,
//         email, // Optional
//         password, // Optional
//       });

//       console.log("API Response:", response); // Debugging

//       if (response.status === 201) {
//         const { token, user } = response.data;

//         // Save token and user in local storage or context
//         setSession(token);
//         localStorage.setItem("user", JSON.stringify(user));
//         dispatch({
//           type: "REGISTER",
//           payload: { user },
//         });

//         return response;
//       } else {
//         return response;
//       }
//     } catch (error) {
//       console.error(
//         "Registration error:",
//         error.response?.data?.message || error.message
//       );
//       throw error;
//     }
//   };

//   const logout = () => {
//     setSession(null);
//     localStorage.removeItem("user");
//     localStorage.removeItem("lastSession");
//     dispatch({ type: "LOGOUT" });
//   };

//   if (!state.isInitialised) {
//     return;
//   }

//   return (
//     <AuthContext.Provider
//       value={{
//         ...state,
//         method: "JWT",
//         login,
//         logout,
//         register,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContext;
const useAuth = () => {
  const register = async (
    fullname,
    phone,
    username,
    email,
    password
  ) => {
    return await window.api.register({
      fullname,
      phone,
      username,
      email,
      password,
    });
  };

  return { register };
};

export default useAuth;
