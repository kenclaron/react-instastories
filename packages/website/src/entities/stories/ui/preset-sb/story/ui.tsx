import React from "react";

import { Image } from "../../../../../shared";
import { useUserStoriesContext, useUserStory } from "../../../lib";

import styles from "./styles.module.scss";

interface IStoryProps {
  author: string;
  description: React.ReactNode;
  hue?: number;
  id: string;
  title?: React.ReactNode;
}

export function Story({
  author,
  description,
  hue = 0,
  id,
  title
}: IStoryProps) {
  const userStories = useUserStoriesContext();
  const userStory = useUserStory(id);

  const handleLike = React.useCallback(() => {
    if (!userStory) throw new Error("Story does not exists.");

    if (userStory.liked) return userStories.unlike(userStory.id);
    else return userStories.like(userStory.id);
  }, [userStory, userStories]);

  React.useEffect(() => {
    if (!userStory) throw new Error("Story does not exists.");

    userStories.view(userStory.id);
  }, [userStory?.id]);

  return (
    <>
      <picture className={styles["background"]}>
        <Image
          alt="Background Image"
          height={960}
          src="/stories/sb/background.svg"
          style={{ filter: `hue-rotate(${hue}deg)` }}
          width={540}
        />
      </picture>
      <address>
        <picture className={styles["logo"]}>
          <Image
            alt="Icon"
            height={36}
            src={`/stories/sb/${id}.svg`}
            width={36}
          />
        </picture>
        <span>{author}</span>
      </address>
      {title && <h1>{title}</h1>}
      <p className={styles["text"]}>{description}</p>
      <div className={styles["container"]}>
        <a
          className="dark nx-text-center action-item action-item--primary"
          href="/docs"
        >
          Learn more about react-instastories
        </a>
        <button
          className="action-item action-item--rounded action-item--tertiary"
          onClick={handleLike}
        >
          {userStory?.liked ? (
            <picture>
              <Image
                alt="Story liked"
                height={32}
                src="/stories/shared/liked.svg"
                width={32}
              />
            </picture>
          ) : (
            <picture>
              <Image
                alt="Story unliked"
                height={32}
                src="/stories/shared/unliked.svg"
                width={32}
              />
            </picture>
          )}
        </button>
      </div>
    </>
  );
}

export default Story;
