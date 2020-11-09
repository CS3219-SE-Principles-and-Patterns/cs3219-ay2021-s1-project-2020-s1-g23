FROM python:3.7.7-stretch

WORKDIR /app

ADD . /app

# COPY .env ./.env

ARG DB_URL

ENV DB_URL=${DB_URL}

RUN pip install -r requirements.txt

EXPOSE 5000

CMD ["python", "app.py"]