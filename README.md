# Documentation

To run the program, please follow the instructions below.

## Step 1: run redis

```
docker compose up -d redis
```

## Step 2: run backend and frontend widget

```
docker-compose up back -d --build
```

```
docker-compose up front -d --build
```

## Step 3: Run Celery

```
docker compose up celery -d --build
```

```
docker compose up celery-beat -d --build
```

## Step 4: Open website

To use the function in website, please go to the `konigle-fs-task/widgets/test/store.html` then open in your browser.

Then you can try to submit email and reload website to see the result updated.

To check celery task, use this command:

```
docker compose logs -f 'celery'
```