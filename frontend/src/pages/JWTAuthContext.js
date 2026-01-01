import React, { createContext, useEffect, useReducer } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  isInitialised: false,
  user: null,
};

const apiUrl = process.env.REACT_APP_API_URL;

const isValidToken = (jwtToken) => {
  if (!jwtToken) return false;

  try {
    const decodedToken = jwtDecode(jwtToken);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp > currentTime;
  } catch (error) {
    console.error("Token validation error:", error);
    return false;
  }
};

const setSession = (jwtToken) => {
  if (jwtToken) {
    localStorage.setItem("jwtToken", jwtToken);
    axios.defaults.headers.common.Authorization = `Bearer ${jwtToken}`;
  } else {
    localStorage.removeItem("jwtToken");
    delete axios.defaults.headers.common.Authorization;
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case "INIT": {
      const { isAuthenticated, user } = action.payload;
      return {
        ...state,
        isAuthenticated,
        isInitialised: true,
        user,
      };
    }
    case "LOGIN": {
      const { user } = action.payload;
      return {
        ...state,
        isAuthenticated: true,
        user,
      };
    }
    case "LOGOUT": {
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    }
    case "REGISTER": {
      const { user } = action.payload;
      return {
        ...state,
        isAuthenticated: true,
        user,
      };
    }
    default: {
      return state;
    }
  }
};

const AuthContext = createContext({
  ...initialState,
  method: "JWT",
  login: () => Promise.resolve(),
  logout: () => {},
  register: () => Promise.resolve(),
});

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initAuth = async () => {
      const jwtToken = localStorage.getItem("jwtToken");
      const storedUser = JSON.parse(localStorage.getItem("user"));

      if (jwtToken && isValidToken(jwtToken)) {
        setSession(jwtToken);
        dispatch({
          type: "INIT",
          payload: {
            isAuthenticated: true,
            user: storedUser,
          },
        });
      } else {
        dispatch({
          type: "INIT",
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };

    initAuth();
  }, []);

  const login = async (identifier, password, role) => {
    try {
      const response = await axios.post(`${apiUrl}/api/login`, {
        identifier,
        password,
        role,
      });

      if (response.status === 200) {
        const { token, user } = response.data;
        setSession(token);
        localStorage.setItem("user", JSON.stringify(user));
        dispatch({
          type: "LOGIN",
          payload: { user },
        });
        return response;
      } else {
        console.error("Login failed with status:", response.status);
        return response;
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const response = await axios.post(`${apiUrl}/api/register`, userData);
      console.log(response.data);
      if (response.status === 201) {
        const { token, user } = response.data;
        setSession(token);
        dispatch({
          type: "REGISTER",
          payload: { user },
        });
      } else {
        // Handle non-200 responses if needed
        console.error(`Unexpected response status: ${response.status}`);
        // You might want to set an error state or show an error message here
      }
    } catch (error) {
      // Handle errors that occur during the request
      console.error("Registration error:", error);

      if (error.response) {
        console.error("Response error:", error.response.data);
      } else if (error.request) {
        console.error("No response error:", error.request);
      } else {
        console.error("Setup error:", error.message);
      }
    }
  };

  const logout = () => {
    setSession(null);
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
  };

  if (!state.isInitialised) {
    return;
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: "JWT",
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
