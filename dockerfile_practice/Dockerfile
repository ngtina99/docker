FROM python:3.11
WORKDIR /app
ADD . /app
RUN pip install flask redis
EXPOSE 80
CMD ["python", "app.py"]