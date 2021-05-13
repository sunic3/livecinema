# livecinema

Курсовой проект для Тинькофф Финтех, курс Frontend'а.

## Usage
[livecinema](https://livecinema.vercel.app/feed)

## Installation
```
cd backend
python -m venv myenv
- source myenv/bin/activate (Linux/MacOs)
- myenv\Scripts\activate (Windows)
pip install -r req.txt
python manage.py makemigrations
python manage.py migrate
python manage.py runserver

cd frontend
- в файле src/constants.ts установить BACKEND = 'http://127.0.0.1:8000'
npm install
npm run start
```
