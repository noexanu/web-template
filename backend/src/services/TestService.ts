export class TestService {
  constructor() {}

  test = (text?: string) => {
    const message = `hello${text ? " " + text : ""}`;

    return Promise.resolve(message);
  };
}
