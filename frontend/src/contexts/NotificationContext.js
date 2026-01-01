// import React, { createContext, useEffect, useReducer } from 'react'
// import axios from 'axios'

// const reducer = (state, action) => {
//     switch (action.type) {
//         case 'LOAD_NOTIFICATIONS': {
//             return {
//                 ...state,
//                 notifications: action.payload,
//             }
//         }
//         case 'DELETE_NOTIFICATION': {
//             return {
//                 ...state,
//                 notifications: action.payload,
//             }
//         }
//         case 'CLEAR_NOTIFICATIONS': {
//             return {
//                 ...state,
//                 notifications: action.payload,
//             }
//         }
//         default: {
//             return { ...state }
//         }
//     }
// }

// const NotificationContext = createContext({
//     notifications: [],
//     deleteNotification: () => {},
//     clearNotifications: () => {},
//     getNotifications: () => {},
//     createNotification: () => {},
// })

// export const NotificationProvider = ({ settings, children }) => {
//     const [state, dispatch] = useReducer(reducer, [])

//     const deleteNotification = async (notificationID) => {
//         try {
//             const res = await axios.post('/api/notification/delete', {
//                 id: notificationID,
//             })
//             dispatch({
//                 type: 'DELETE_NOTIFICATION',
//                 payload: res.data,
//             })
//         } catch (e) {
//             console.error(e)
//         }
//     }

//     const clearNotifications = async () => {
//         try {
//             const res = await axios.post('/api/notification/delete-all')
//             dispatch({
//                 type: 'CLEAR_NOTIFICATIONS',
//                 payload: res.data,
//             })
//         } catch (e) {
//             console.error(e)
//         }
//     }

//     const getNotifications = async () => {
//         try {
//             const res = await axios.get('/api/notification')
//             dispatch({
//                 type: 'LOAD_NOTIFICATIONS',
//                 payload: res.data,
//             })
//         } catch (e) {
//             console.error(e)
//         }
//     }
//     const createNotification = async (notification) => {
//         try {
//             const res = await axios.post('/api/notification/add', {
//                 notification,
//             })
//             dispatch({
//                 type: 'CREATE_NOTIFICATION',
//                 payload: res.data,
//             })
//         } catch (e) {
//             console.error(e)
//         }
//     }

//     useEffect(() => {
//         getNotifications()
//     }, [])

//     return (
//         <NotificationContext.Provider
//             value={{
//                 notifications: state.notifications,
//                 deleteNotification,
//                 clearNotifications,
//                 getNotifications,
//                 createNotification,
//             }}
//         >
//             {children}
//         </NotificationContext.Provider>
//     )
// }

// export default NotificationContext
import React, { createContext, useEffect, useReducer } from "react";
import axios from "axios";

const reducer = (state, action) => {
  switch (action.type) {
    case "LOAD_NOTIFICATIONS":
      return {
        ...state,
        notifications: action.payload,
      };
    case "DELETE_NOTIFICATION":
      return {
        ...state,
        notifications: state.notifications.filter(
          (notification) => notification.id !== action.payload
        ),
      };
    case "CLEAR_NOTIFICATIONS":
      return {
        ...state,
        notifications: [],
      };
    default:
      return { ...state };
  }
};

const initialState = {
  notifications: [],
};

const NotificationContext = createContext({
  notifications: [],
  deleteNotification: () => {},
  clearNotifications: () => {},
  getNotifications: () => {},
  createNotification: () => {},
});

export const NotificationProvider = ({ settings, children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const apiUrl = process.env.REACT_APP_API_URL.trim();
  const deleteNotification = async (notificationID) => {
    try {
      await axios.post("/api/notification/delete", { id: notificationID });
      dispatch({
        type: "DELETE_NOTIFICATION",
        payload: notificationID,
      });
    } catch (e) {
      console.error(e);
    }
  };

  const clearNotifications = async () => {
    try {
      await axios.post("/api/notification/delete-all");
      dispatch({
        type: "CLEAR_NOTIFICATIONS",
      });
    } catch (e) {
      console.error(e);
    }
  };

  const getNotifications = async () => {
    try {
      const res = await axios.get("/api/notification");
      dispatch({
        type: "LOAD_NOTIFICATIONS",
        payload: res.data,
      });
    } catch (e) {
      console.error(e);
    }
  };

  const createNotification = async (notification) => {
    try {
      await axios.post("/api/notification/add", { notification });
      getNotifications();
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/get-all-notices`);
        dispatch({
          type: "LOAD_NOTIFICATIONS",
          payload: response.data,
        });
      } catch (error) {
        console.error("Error fetching notices:", error);

        if (error.response) {
          console.error("Server responded with:", error.response.data);
        }
      }
    };

    fetchNotices();
  }, []);

  //   useEffect(() => {
  //     const fetchNotifications = async () => {
  //       await getNotifications();
  //       if (state.notifications.length === 0) {
  //         const dummyNotifications = [
  //           {
  //             id: 1,
  //             title: "Dummy Notification 1",
  //             message: "This is a dummy notification.",
  //             date: new Date().toISOString(),
  //           },
  //           {
  //             id: 2,
  //             title: "Dummy Notification 2",
  //             message: "This is another dummy notification.",
  //             date: new Date().toISOString(),
  //           },
  //         ];
  //         dummyNotifications.forEach((notification) =>
  //           createNotification(notification)
  //         );
  //       }
  //     };
  //     fetchNotifications();
  //   }, []);

  return (
    <NotificationContext.Provider
      value={{
        notifications: state.notifications,
        deleteNotification,
        clearNotifications,
        getNotifications,
        createNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
