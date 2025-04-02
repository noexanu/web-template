import { type Meta, type StoryObj } from "@storybook/react";

import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  component: Button,
  parameters: {
    layout: "centered",
  },
};

type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    children: "test",
  },
};

export default meta;
