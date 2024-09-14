import React from "react";

import { COMMON } from "../../../../../../shared";
import { Story } from "../../story";

function Store() {
  return (
    <Story
      author="Store"
      createdAt={new Date(COMMON.createdAt, 2, 8)}
      description="It is very important that you take care of your health. The author of
        this story has been sleeping only 6 hours lately, although healthy sleep
        requires 8 hours. Don`t make the same mistake."
      hue={350}
      id="store"
      title="Discounts right now!"
    />
  );
}

export default Store;
