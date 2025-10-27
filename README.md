# 🛡️ PassShield

**PassShield** is a full-stack web application that analyzes password strength using entropy-based metrics, character set analysis, and real-world cracking simulations. It provides users with detailed insights into password security through an intuitive, modern interface.

---

## 🚀 Key Features

- **Password Strength Scoring:** Rates passwords on a scale of 0–100 based on multiple factors.  
- **Entropy Calculation:** Estimates password complexity in bits.  
- **Character Set Detection:** Identifies use of lowercase, uppercase, digits, and special characters.  
- **Common Password Detection:** Flags passwords appearing in known leak databases or wordlists.  
- **Time-to-Crack Estimation:** Simulates attack scenarios (brute-force, dictionary, hybrid).  
- **Modern UI:** Built with React for real-time feedback and smooth user experience.  

---

## 🧩 Project Structure

```
PassShield/
├── backend/ # Flask API
│ ├── app.py # Main server (exposes /analyze_password)
│ ├── password_cracker.py # Entropy, charset, and time-to-crack logic
│ └── requirements.txt
└── frontend/ # React App (UI)
├── src/components/PasswordAnalyzer.js
└── package.json

```

---

## 🧠 Tech Stack

- **Frontend:** React (Create React App)  
- **Backend:** Python 3.9+ with Flask  
- **Communication:** REST API (Frontend → Backend)  
- **Local Development Ports:**  
  - Frontend → `http://localhost:3000`  
  - Backend → `http://localhost:8000`  

---

## ⚙️ Run Locally (macOS / Linux / Windows)

### 🖥️ Backend Setup

```bash
# Create and activate a virtual environment
python3 -m venv .venv
source .venv/bin/activate           # macOS / Linux
.venv\Scripts\activate              # Windows

# Navigate to backend and install dependencies
cd backend
pip install -r requirements.txt

# Run Flask server
python3 app.py

``` 
By default, the backend runs on port 8000.
If there’s a conflict, change the port in app.py or stop the conflicting process.

### 💻 Frontend Setup

```bash
# Navigate to frontend folder
cd ../frontend

# Install dependencies
npm install

# Start the React development server
npm start
```
Then open http://localhost:3000 in your browser.
