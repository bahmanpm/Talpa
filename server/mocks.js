import casual from "casual";

export const mocks = {
  String: () => casual.word,
  Int: () => casual.integer(1, 10),
  Float: () => casual.double(-50, 50),
  GPSPosition: () => [casual.latitude, casual.longitude],
  DateTime: () => `${casual.date()} ${casual.time()}`,
  Query: () => ({
    machines: () => [...new Array(casual.integer(5, 10))],
    sensorData: () => [...new Array(casual.integer(15, 20))],
  }),
};
