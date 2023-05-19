import opentelemetry from '@opentelemetry/api';
import {
  BatchSpanProcessor,
  ConsoleSpanExporter,
} from '@opentelemetry/sdk-trace-base';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { NodeTracerProvider } from '@opentelemetry/sdk-trace-node';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
// import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-grpc';

// Optionally register instrumentation libraries
registerInstrumentations({
  instrumentations: [],
});

const resource = Resource.default().merge(
  new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'service-name-here',
    [SemanticResourceAttributes.SERVICE_VERSION]: '0.1.0',
  }),
);

const provider = new NodeTracerProvider({
  resource,
});

const consoleExporter = new ConsoleSpanExporter();
const consoleProcessor = new BatchSpanProcessor(consoleExporter);

const exporter = new OTLPTraceExporter({
  url: process.env.EXPORTER_ENDPOINT,
});
console.log(
  exporter.getDefaultUrl({
    url: process.env.EXPORTER_ENDPOINT,
  }),
);
const processor = new BatchSpanProcessor(exporter);

provider.addSpanProcessor(processor);
provider.addSpanProcessor(consoleProcessor);

provider.register();

export const tracer = opentelemetry.trace.getTracer('otel-service-tracer');
