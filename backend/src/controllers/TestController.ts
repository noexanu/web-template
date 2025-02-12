import { type TestData } from "./TestController.types";
import { type TestService } from "../services/TestService";

export class TestController {
  constructor(private testService: TestService) {}

  test = ({ text }: TestData) => {
    return this.testService.test(text);
  };
}
