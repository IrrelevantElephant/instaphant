FROM golang:1.22.2-bullseye as builder

COPY . /workdir
WORKDIR /workdir

ENV CGO_CPPFLAGS="-D_FORTIFY_SOURCE=2 -fstack-protector-all"
ENV GOFLAGS="-buildmode=pie"

RUN go build -ldflags "-s -w" -trimpath -o ./app

FROM gcr.io/distroless/base-debian11:nonroot
COPY --from=builder /workdir/app /bin/app

USER 65534

ENTRYPOINT ["/bin/app"]
