# FirebaseProject1

## Description

This project demonstrates a Firebase-based application consisting of three main components:

1. **webApp**: A web-based interface for user interaction, requiring a modern browser to run. Requires a `.env` file for configuration (see `example.env` for reference).
2. **nodeServer1**: A backend server that handles Firebase-related tasks. Requires a `.env` file for configuration (see `example.env` for reference).
3. **nodeServer2**: A second backend server, also requiring a `.env` file for its configuration (template provided in `example.env`).

### Workflow:

- Start both servers.
- Open the `webApp` in your browser.
- Fill out the form and submit it.
- Upon successful execution, results will be displayed as an alert message.

---

## Installation

Follow these steps to set up and run the project:

1. Clone the Repository

```bash
git clone https://github.com/AnatoliiFesenko/FirebaseProject1
```

2. Install NPM packages (for nodeServer1 , nodeServer2 and webApp)

```bash
   npm install
```

3. Get a free API after create Firebase project https://console.firebase.google.com/project/your_project
   Add your API keys for webApp/.env

```bash
    VITE_PORT=your-webapp-port
    VITE_APP_API_KEY=your-api-key
    VITE_APP_AUTH_DOMAIN=your-auth-domain
    VITE_APP_PROJECT_ID=your-project-id
    VITE_APP_STORAGE_BUCKET=your-storage-bucket
    VITE_APP_MESSAGING_SENDER_ID=your-messaging-sender-id
    VITE_APP_APP_ID=your-app-id
    VITE_APP_MEASUREMENT_ID=your-measurement-id
    VITE_APP_VAPID_KEY=your-vapid-key
```

4. Complete all of the following steps:
   Go to the Firebase Console -> Select your project -> Settings -> Project settings -> Service accounts -> Generate new private key
   Save your private key.

5. Create .env for nodeServer1 and nodeServer2 (use exapmle.env) and add data.

```bash
   PORT=your-port
   PROJECT_ID=your-project-id
   PRIVATE_KEY_ID=your-private-key-id
   PRIVATE_KEY=your-private-key
   CLIENT_EMAIL=your-client-email
   CLIENT_ID=your-client-id
   CLIENT_X509_CERT_URL=your-client-x509-cert-url
```

6. Start nodeServer1 , nodeServer2 and webApp

```bash
   npm run dev
```
