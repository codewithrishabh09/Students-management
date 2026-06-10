# Run Instructions

<!-- Connect Databse -->
sudo systemctl start mongod

<!-- Run Backend (FASTAPI) -->
cd "/home/rishabh/Documents/Web Developement/Students management /student-management/backend"
python3 -m venv venv
source venv/bin/activate
uvicorn main:app --reload --host 0.0.0.0 --port 8000

<!-- Run Frontend (React) -->
cd "/home/rishabh/Documents/Web Developement/Students management /student-management/frontend"
npm install
npm start
