export const base64 = {
  encode: (data: string) => Buffer.from(data).toString("base64"),
  decode: (data: string) => Buffer.from(data, "base64").toString("utf8"),
};
