# OpenTelemetry in Node with Elastic Observability

This project showcase how to instrument a microservice written in [Node](https://nodejs.org/) using [OpenTelemetry](https://opentelemetry.io/), to produce telemetry data (traces and metrics) to [Elastic Observability](https://www.elastic.co/observability).

## Run with the collector

The Node microservice sends the traces and metrics to a collector that forwards them to Elastic Observability.

```bash
docker compose -f run-with-collector.yaml up -d
```

## Run without the collector

The Node microservice sends the traces and metrics directly to Elastic Observability.

```bash
docker compose -f run-without-collector.yaml up -d
```

## Accessing Elastic Observability

After executing the services you can reach the Elastic Observability application in the following URL:

```bash
http://localhost:5601/app/apm/services
```

Use the following credentials:

```bash
User: admin
Pass: changeme
```

## Invoking the microservice API

Once everything is running, periodic requests will be sent to the microservice, so you don't need to issue any requests by yourself. However, if you want to do it anyway, just execute:

```bash
curl -X GET http://localhost:8000/
```

# License

This project is licensed under the [Apache 2.0 License](./LICENSE).