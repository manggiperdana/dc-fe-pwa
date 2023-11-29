import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateUser from "./pages/CreateUser";
import EditUser from "./pages/EditUser";
import PrivateRoute from "./middlewares/PrivateRoute";
import PublicRoute from "./middlewares/PublicRoute";

let deferredPrompt: any;
function App() {
  const [installable, setInstallable] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const handleInstallClick = (e: any) => {
    // Hide the app provided install promotion
    setInstallable(false);
    // Show the install prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult: any) => {
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the install prompt");
      } else {
        console.log("User dismissed the install prompt");
      }
    });
  };
  useEffect(() => {
    function onlineHandler() {
      setIsOnline(true);
    }

    function offlineHandler() {
      setIsOnline(false);
    }

    window.addEventListener("online", onlineHandler);
    window.addEventListener("offline", offlineHandler);
    window.addEventListener("beforeinstallprompt", (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      deferredPrompt = e;
      // Update UI notify the user they can install the PWA
      setInstallable(true);
    });

    window.addEventListener("appinstalled", () => {
      // Log install to analytics
      console.log("INSTALL: Success");
    });

    return () => {
      window.removeEventListener("online", onlineHandler);
      window.removeEventListener("offline", offlineHandler);
    };
  }, []);
  return (
    <>
      {installable && (
        <div className="relative z-100 bg-indigo-900 text-center py-4 lg:px-4">
          <div
            className="p-2 bg-indigo-800 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex"
            role="alert"
          >
            <span
              onClick={handleInstallClick}
              className="flex rounded-full cursor-pointer bg-indigo-500 uppercase px-2 py-1 text-xs font-bold mr-3"
            >
              Install
            </span>
            <span className="font-semibold mr-2 text-left flex-auto">
              Get App in homescreen
            </span>
            <svg
              className="fill-current opacity-75 h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z" />
            </svg>
          </div>
        </div>
      )}
      <div>
        {!isOnline ? (
          <p className="text-center w-full bg-indigo-500 text-white">You are offline. Please check your internet connection.</p>
        ) : null}
      </div>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/user/create" element={<CreateUser />} />
          <Route path="/user/edit/:userId" element={<EditUser />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
