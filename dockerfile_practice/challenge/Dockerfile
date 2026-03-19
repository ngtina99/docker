FROM python:3.11-slim

RUN apt-get update && apt-get install -y nano iputils-ping

RUN pip install flask redis matplotlib

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]