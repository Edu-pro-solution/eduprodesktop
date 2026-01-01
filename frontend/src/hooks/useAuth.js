// import { useContext } from "react";
// import AuthContext from "../contexts/JWTAuthContext";

// const useAuth = () => useContext(AuthContext);

// // export default useAuth;
// const useAuth = () => {
//   const register = async (
//     fullname,
//     phone,
//     username,
//     email,
//     password
//   ) => {
//     if (!window.api?.register) {
//       throw new Error("Electron API not available");
//     }

//     return await window.api.register({
//       fullname,
//       phone,
//       username,
//       email,
//       password,
//     });
//   };

//   return { register };
// };

// export default useAuth;
// const useAuth = () => {
//   const register = async (fullname, phone, username, email, password) => {
//     console.log("useAuth.register called with:", { fullname, phone, username, email, password });

//     if (!window.api?.register) {
//       console.error("Electron API not available");
//       throw new Error("Electron API not available");
//     }

//     const response = await window.api.register({ fullname, phone, username, email, password });
//     console.log("useAuth.register response:", response);
//     return response;
//   };

//   return { register };
// };

// export default useAuth;

const useAuth = () => {
  const register = async (fullname, phone, username, email, password) => {
    console.log("useAuth.register called with:", { fullname, phone, username, email, password });

    if (!window.api?.register) {
      console.error("Electron API not available");
      throw new Error("Electron API not available");
    }

    const response = await window.api.register({ fullname, phone, username, email, password });
    console.log("useAuth.register response:", response);

    // Save user info locally if registration is successful
    if (response.status === 201 && response.user) {
      localStorage.setItem("user", JSON.stringify(response.user));
      console.log("User info saved to localStorage:", response.user);
    }

    return response;
  };

  return { register };
};

export default useAuth;
