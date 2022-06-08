import casual from "casual";

export const mocks = {
  String: () => casual.word,
  Int: () => casual.integer(1, 10),
  GPSPosition: () => ({
    latitude: casual.latitude,
    longitude: casual.longitude,
  }),
  DateTime: () => ({
    datetime: `${casual.date()} ${casual.time()}`,
  }),
};
