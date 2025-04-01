# ProForma Backend

## Setup Instructions

1. Upload this folder to your Hostinger server via File Manager or FTP.
2. SSH into your Hostinger server or use Terminal from the control panel.
3. Run `npm install` to install dependencies.
4. Edit the `.env` file with your actual database credentials.
5. Start the server:
   - For testing: `npm start`
   - For production: use `pm2 start server.js`

## API Endpoints

- `POST /api/proforma` - Save a scenario
- `GET /api/proforma` - List all scenarios
- `GET /api/proforma/:id` - Load a single scenario