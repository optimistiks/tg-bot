import { createLogger, stdSerializers } from "bunyan";

export default createLogger({
  name: "mikeLitorisBot",
  serializers: stdSerializers,
});
