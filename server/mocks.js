import casual from "casual";

export const mocks = {
  String: () => casual.word,
  Int: () => casual.integer(1, 10),
  GPSPosition: () => [casual.latitude, casual.longitude],
  DateTime: () => `${casual.date()} ${casual.time()}`,
  Query: () => ({
    machines: () => [...new Array(casual.integer(5, 10))],
  }),
};
