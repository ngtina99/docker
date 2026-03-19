FROM python:3.11-alpine

RUN apk add --no-cache \
    bash \
    nano \
    iputils \
    build-base \
    freetype-dev \
    libpng-dev

RUN pip install --no-cache-dir flask redis matplotlib

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]