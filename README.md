# 📝 Resume Editor

A smart, responsive Resume Editor built with **React** (Vite) and **FastAPI**, enhanced with Tailwind CSS and AI-powered section improvement.

---

## 📁 Project Structure

```
Resume-Editor/
├── frontend/   # React + Vite + TailwindCSS
├── backend/    # FastAPI app for resume enhancement & saving
└── README.md   # This file
```

---

## 🚀 Getting Started

### ✅ Prerequisites

Ensure the following are installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [Python](https://www.python.org/) (v3.10 or higher)
- [Git](https://git-scm.com/)

---

## ⚙️ Backend Setup (FastAPI)

```bash
cd backend
python -m venv venv
# Activate the virtual environment:
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

pip install -r requirements.txt

uvicorn main:app --reload
```

🧪 Test at: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

---

## 🎨 Frontend Setup (React + Tailwind CSS)

```bash
cd frontend
npm install
npm run dev
```

📂 App runs at: [http://localhost:5173](http://localhost:5173)

---

## ✨ Features

- 🔥 AI-enhanced resume sections
- 🎯 Editable inputs with real-time updates
- 🎨 Fully responsive Tailwind CSS layout
- 💾 Save and download resume as JSON
- ⚡ Vite dev server for fast development

---

## 🧠 Tech Stack

- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: FastAPI
- **Language**: JavaScript & Python
- **Others**: Axios, JSON handling, Blob download

---

## 📜 License

MIT © 2025

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first.

---

## 🧩 Future Enhancements

- PDF generation support
- Section templates
- Drag-and-drop reordering
- User authentication
