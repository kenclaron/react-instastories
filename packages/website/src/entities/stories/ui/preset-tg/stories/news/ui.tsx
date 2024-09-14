import React from "react";

import { COMMON } from "../../../../../../shared";
import { Story } from "../../story";

function News() {
  return (
    <Story
      author="News"
      createdAt={new Date(COMMON.createdAt, 2, 8)}
      description={
        <>
          <p>
            Stay updated with the latest and most important news of the day.
            We`ve curated a selection of significant and interesting stories to
            keep you informed. Don`t miss out on our daily news roundup and stay
            ahead of the curve!
          </p>
          <p>#react-instastories #news #example</p>
        </>
      }
      hue={180}
      id="news"
      title="Top News Highlights of the Day"
    />
  );
}

export default News;
