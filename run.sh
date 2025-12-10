cd frontend

python ../backend/manage.py makemigrations && python ../backend/manage.py migrate
npm install

npm run dev &
python ../backend/manage.py runserver
