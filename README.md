## Frontend Setup (React)

The frontend provides the user interface.

### Instructions
1. Install dependencies (if running locally with Node.js):
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Open your browser to the local address (usually `http://localhost:3000` or `http://localhost:5173`).

## Troubleshooting

- **"Could not connect to the server"**: Ensure `app.py` is running and the port is 5000.
- **Random Predictions**: If you see random results, check the backend console. If it says "model.pth not found", you need to copy your model file into the folder.
