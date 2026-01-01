// import React, { createContext, useContext, useState } from "react";

// // Create a context for sidebar state
// const SidebarContext = createContext();

// export const useSidebar = () => useContext(SidebarContext);

// export const SidebarProvider = ({ children }) => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const toggleSidebar = () => {
//     setIsSidebarOpen((prev) => !prev);
//     localStorage.setItem("isSidebarOpen", JSON.stringify(!isSidebarOpen));
//   };

//   return (
//     <SidebarContext.Provider value={{ isSidebarOpen, toggleSidebar }}>
//       {children}
//     </SidebarContext.Provider>
//   );
// };
// SidebarProvider.js
import React, { createContext, useContext, useState } from "react";

const SidebarContext = createContext();

export const useSidebar = () => useContext(SidebarContext);

export const SidebarProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
    console.log("Sidebar state:", !isSidebarOpen);
  };

  return (
    <SidebarContext.Provider value={{ isSidebarOpen, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};
