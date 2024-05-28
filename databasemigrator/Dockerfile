FROM golang:1.16 as builder

WORKDIR /app

# Disable cgo to remove gcc dependency
ENV CGO_ENABLED=0

RUN GOBIN=/app go install github.com/datastax/cql-proxy@latest

FROM nuvo/docker-cqlsh

USER root
RUN apk add --no-cache ca-certificates

EXPOSE 9042

COPY --from=builder /app/cql-proxy /usr/local/bin/cql-proxy

WORKDIR /scripts

COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

USER nobody

COPY *.cql .

ENTRYPOINT [ "entrypoint.sh" ]