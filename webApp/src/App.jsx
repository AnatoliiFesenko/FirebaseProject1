import { useEffect, useState } from "react";
import "./App.css";
import { getToken, onMessage } from "firebase/messaging";
import { messaging } from "./firebase/firebaseConfig";
import "react-toastify/dist/ReactToastify.css";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

function App() {
  const [token, setToken] = useState(null);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const { VITE_APP_VAPID_KEY } = import.meta.env;

  function waitForServiceWorkerActivation(registration) {
    return new Promise((resolve) => {
      if (registration.active) {
        resolve();
      } else {
        registration.addEventListener("updatefound", () => {
          const installingWorker = registration.installing;
          if (installingWorker) {
            installingWorker.addEventListener("statechange", () => {
              if (installingWorker.state === "activated") {
                resolve();
              }
            });
          }
        });
      }
    });
  }

  async function setupNotifications() {
    if (!("serviceWorker" in navigator)) {
      console.error("ServiceWorker is not supported in this browser.");
      return null;
    }

    try {
      console.log("Requesting permission...");
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        throw new Error("Notification permission not granted.");
      }
      console.log("Notification permission granted.");

      const registration = await navigator.serviceWorker.register(
        "/firebase-messaging-sw.js"
      );
      console.log("ServiceWorker registered:", registration);

      await waitForServiceWorkerActivation(registration);

      const token = await getToken(messaging, {
        vapidKey: VITE_APP_VAPID_KEY,
        serviceWorkerRegistration: registration,
      });

      if (token) {
        console.log("FCM Token:", token);
        return token;
      } else {
        console.error(
          "No registration token available. Request permission to generate one."
        );
        return null;
      }
    } catch (err) {
      console.error("An error occurred:", err);
      return null;
    }
  }

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const notificationToken = await setupNotifications();
        setToken(notificationToken);
        console.log("Notification Token:", notificationToken);
      } catch (error) {
        console.error("Error fetching notification token:", error);
      }
    };

    fetchToken();

    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });
  }, []);

  const sendMessage = () => {
    if (title && text && token) {
      socket.emit("sendMessage", { title, text, token });
    } else if (!token) {
      alert("FCM Token is not available. Ensure notifications are enabled.");
    } else {
      alert("Please fill in both fields.");
    }
  };

  onMessage(messaging, (payload) => {
    console.log("Message received: ", payload);
    alert(
      `Message: ${payload.notification.title} - ${payload.notification.body}`
    );
  });

  return (
    <>
      <div className="card">
        <h1>Send message</h1>
        <div className="input-group">
          <input
            type="text"
            id="title"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input-field"
          />
        </div>

        <div className="input-group">
          <input
            type="text"
            id="text"
            placeholder="Text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="input-field"
          />
        </div>

        <button id="sendMessage" onClick={sendMessage} className="send-button">
          Send Message
        </button>
      </div>
    </>
  );
}

export default App;
