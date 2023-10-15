# Data over Time

Easy data tracking.

### Deployment

To deploy the app you can follow these steps:

from the frontend directory:

`npm run build`

This will create a production build of the frontend in the `backend/public` directory.

from the backend directory:

`gcloud run deploy`

It's really that easy.


## Frontend

React app set up with Vite. Details of that [here](https://vitejs.dev/guide/).

`cd frontend`

`npm install`

`npm run dev`

Runs on [localhost:3000](http://localhost:3000). Available on your local network. Requests to the backend are [proxied](https://vitejs.dev/config/server-options.html#server-proxy) by the dev server. 

## Backend

Express. Nodemon for development. 

`cd backend`

`npm install`

`npm run start`

Listens on [port 3001](http://localhost:3001) 

### Generating secrets

For sessions you will need to define 2 env vars: `SESSION_SECRET` and `JWT_SECRET`. Generate random secrets using nodejs like this:
```js
crypto.randomBytes(64).toString('hex');
```

### launching chrome in debug mode
`flatpak run com.google.Chrome --remote-debugging-port=9222 --user-data-dir=remote-debug-profile`


### launching firebase emulator
`firebase emulators:start --project demo-test`
