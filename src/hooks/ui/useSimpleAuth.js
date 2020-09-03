import { useState } from "react";

const useSimpleAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const isAuthenticated = () =>
    isLoggedIn || localStorage.getItem("bangazon_token") !== null;

  const register = (userInfo) => {
    return fetch("http://localhost:8000/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(userInfo),
    })
      .then((res) => res.json())
      .then((res) => {
        if ("token" in res) {
          localStorage.setItem("bangazon_token", res.token);
          setIsLoggedIn(true);
        }
      });
  };

  const getCustomer = () => {
      return fetch("http://localhost:8000/customer", {
          "method": "GET",
          "headers": {
              "Accept": "application/json",
              "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
          }
      })
      .then(response => response.json())
      .then((customer) => {
          localStorage.setItem("activeUser", customer)
      })
  }

  const login = (credentials) => {
    return fetch("http://localhost:8000/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(credentials),
    })
      .then((res) => res.json())
      .then((res) => {
        if ("valid" in res && res.valid && "token" in res) {
          localStorage.setItem("bangazon_token", res.token);
          localStorage.setItem("credentials", credentials.username);
          setIsLoggedIn(true);
        }
      });
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("bangazon_token");
    localStorage.removeItem("credentials");
    localStorage.removeItem("activeUser");
  };

  return { isAuthenticated, logout, login, register, getCustomer };
};

export default useSimpleAuth;