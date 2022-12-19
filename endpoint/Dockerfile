FROM python:3.8-slim-buster

EXPOSE 8000

WORKDIR /app

COPY . .

RUN pip install --upgrade pip

RUN pip install -r requirements.txt

CMD gunicorn --bind 0.0.0.0:8000 api.wsgi