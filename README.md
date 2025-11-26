# 🍹 Drinks2U

Drinks2U is a simple beverage ordering system with:

- A **Client Area** for staff to request drinks
- An **Admin Panel** to manage and track all orders
- A **Node.js + Express + TypeScript** backend with **SQLite** for storage
- A **React + TypeScript + Vite + Tailwind CSS** frontend

It was designed for use at events to allow staff to request drinks and for the bar team to track and prepare orders efficiently.

---

## ✨ Features

### Client Area

- Simple form to request a beverage:
  - Lanyard Staff (3-digit registration code)
  - Beverage (predefined options)
  - Quantity (max 3 digits)
- Form validation
- Success and error messages
- Fully in English (UK)

### Admin Panel

- View all orders in a table
- See:
  - Order ID
  - Lanyard Staff
  - Beverage
  - Quantity
  - Date/Time
  - Status
- Status workflow:
  - New orders start as `Pending`
  - Admin can mark as `Ready`
  - Admin can delete orders
- Visual status badges (Pending / Ready)
- Error handling (e.g. backend offline)

### Backend

- Node.js + Express + TypeScript
- SQLite database using `better-sqlite3`
- REST API:
  - `GET /api/orders` – list all orders
  - `POST /api/orders` – create a new order
  - `PATCH /api/orders/:id/status` – update order status (Pending/Ready)
  - `DELETE /api/orders/:id` – delete an order
  - `GET /api/health` – health check

---

## 🧱 Tech Stack

### Frontend

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

### Backend

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [better-sqlite3](https://github.com/WiseLibs/better-sqlite3) (SQLite)

---

## 📁 Project Structure

```text
drinks2u/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.ts
│   │   ├── controllers/
│   │   │   └── orderController.ts
│   │   ├── models/
│   │   │   └── Order.ts
│   │   ├── routes/
│   │   │   └── orderRoutes.ts
│   │   └── server.ts
│   ├── drinks2u.db
│   ├── package.json
│   ├── tsconfig.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AdminArea.tsx
│   │   │   └── ClientArea.tsx
│   │   ├── types/
│   │   │   └── index.ts
│   │   ├── utils/
│   │   │   └── api.ts
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── public/
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── postcss.config.js
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm
- SQLite (`sqlite3` CLI is useful but optional)

---

## ⚙️ Backend Setup

1. Navigate to the backend folder:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create an `.env` file (optional, default port is 3001):

```env
PORT=3001
```

4. Start the development server:

```bash
npm run dev
```

You should see:

```text
✅ Database connected
🚀 Server running on http://localhost:3001
```

The backend will automatically create a `drinks2u.db` SQLite database file and an `orders` table if they do not already exist.

### API Endpoints

- `GET /api/health`
  Health check endpoint.

- `GET /api/orders`
  Returns a list of all orders.

- `POST /api/orders`
  Create a new order.

  **Request body:**

  ```json
  {
    "registration": "123",
    "beverage": "Beer",
    "quantity": 2
    }
  ```

- `PATCH /api/orders/:id/status`
  Update the status of an order.

  **Request body:**

  ```json
  {
    "status": "Pending" | "Ready"
  }
  ```

- `DELETE /api/orders/:id`
  Delete an order by ID.

---

## 💻 Frontend Setup

1. Navigate to the frontend folder:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

By default, Vite runs on `http://localhost:5173`.

The frontend is configured to call the backend at:

```ts
// frontend/src/utils/api.ts
const API_URL = 'http://localhost:3001/api';
```

Make sure the backend is up and running on that address.

---

## 🧩 Frontend Behaviour

### Client Area

- **Lanyard Staff**
  - Text field, numeric only
  - Maximum 3 digits (e.g. `123`)

- **Beverage**
  - Dropdown with predefined options:
    - Water
    - Beer
    - Gin
    - Pink Gin
    - Smirnoff Cola
    - Captain Morgan

- **Quantity (UNI)**
  - Numeric text field
  - Maximum 3 digits

- On submit:
  - Validates fields
  - Sends a `POST /api/orders` request
  - Shows success or error message

### Admin Panel

- Loads orders from `GET /api/orders` on mount
- Shows:
  - `id`, `registration`, `beverage`, `quantity`, `timestamp`, `status`
- Status:
  - `Pending` (yellow badge)
  - `Ready` (green badge)
- Actions:
  - **Ready** button:
    - Visible only when status is `Pending`
    - Calls `PATCH /api/orders/:id/status` with `{ "status": "Ready" }`
  - **Delete** button:
    - Confirms and then calls `DELETE /api/orders/:id`

---

## 📊 Database

The database is a single SQLite file: `backend/drinks2u.db`.

### Table: `orders`

```sql
CREATE TABLE IF NOT EXISTS orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  registration TEXT NOT NULL,
  beverage TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  status TEXT DEFAULT 'Pending',
  timestamp TEXT NOT NULL
);
```

### Inspecting the Database

Using the SQLite CLI:

```bash
cd backend
sqlite3 drinks2u.db
```

Inside the SQLite prompt:

```sql
.headers on
.mode column
SELECT * FROM orders;
.schema orders;
.exit
```

---

## 📤 Exporting Orders to CSV / Excel

You can export the `orders` table to CSV and open it in Excel.

From the `backend` folder:

```bash
sqlite3 drinks2u.db
```

Then:

```sql
.headers on
.mode csv
.output orders.csv
SELECT * FROM orders;
.output stdout
.exit
```

This creates `orders.csv` in the `backend` folder, which you can open directly in Excel and save as `.xlsx`.

---

## 🔧 Common Issues

### Backend not responding

- Check that the backend is running:

  ```bash
  cd backend
  npm run dev
  ```

- Test in the browser:

  - Open [http://localhost:3001/api/health](http://localhost:3001/api/health)

### CORS errors

If you see CORS errors in the browser console, ensure `cors` is enabled in `server.ts`:

```ts
import cors from 'cors';

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
```

### Database schema mismatch

If you changed column names (e.g. from `registro` to `registration`) and things broke:

1. Stop the backend
2. Delete the old database:

   ```bash
   cd backend
   rm drinks2u.db
   ```

3. Start the backend again:

   ```bash
   npm run dev
   ```

A fresh database with the correct schema will be created.

---

## 🧪 Possible Improvements

- Authentication for the admin panel
- Filtering and searching orders
- Pagination for large order volumes
- Export only `Ready` orders
- Docker setup for easier deployment

---

## 📄 Licence

This project is intended for internal/event use.
Feel free to adapt it to your own needs.
```
