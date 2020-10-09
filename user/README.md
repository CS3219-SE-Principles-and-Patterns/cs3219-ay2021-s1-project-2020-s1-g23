## Running Locally
1. Install `node` and `npm`
2. Install dependencies: `npm install`
3. Create a `.env` file in the project root and set `DBUSERNAME` and `DBPASSWORD` environment variables
4. `npm run dev`

## Supported endpoints
1. Get all users: HTTP GET Request to `/user`
2. Get one user: HTTP GET Request to `/user/{user_id}`
3. New user: HTTP POST Request to `/user` with JSON formatted body containing `email`, `password` and `nickname`
4. Update user: HTTP PUT Request to `/user/{user_id}` with JSON formatted body containing `email`, `password` or `nickname`
5. Delete user: HTTP DELETE Request to `user/{user_id}`
