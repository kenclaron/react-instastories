import {
  TransitionStep,
  useStoriesContext,
  useStory,
  useTimerContext,
  useViewerContext
} from "@react-instastories/base";
import { useIndexes } from "@react-instastories/external";

import classNames from "classnames";
import React from "react";
import { useMediaQuery } from "react-responsive";

import { Image, preventEvent } from "../../../../../shared";
import { useAuthorLinkMailto } from "../../../../../shared/lib/useAuthorLinkMailto";
import {
  useReadyViewerContext,
  useUserStoriesContext,
  useUserStory
} from "../../../lib";
import useWindowResize from "../../../lib/useWindowResized";

import styles from "./styles.module.scss";

interface IStoryProps {
  readonly author: string;
  readonly createdAt: Date;
  readonly description: React.ReactNode;
  readonly hue?: number;
  readonly grayscale?: number;
  readonly id: string;
  readonly title?: React.ReactNode;
}

export function Story({
  author,
  createdAt,
  description,
  grayscale = 0,
  hue = 0,
  id,
  title
}: IStoryProps) {
  const userStories = useUserStoriesContext();
  const readyViewer = useReadyViewerContext();
  const viewer = useViewerContext();
  const stories = useStoriesContext();
  const timer = useTimerContext();
  const userStory = useUserStory(id);
  const desktop = useMediaQuery({ query: "(width >= 600px)" });
  const resized = useWindowResize();
  const authorLink = useAuthorLinkMailto();

  const [comment, setComment] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  const { ref, index } = useStory();
  const { story } = useIndexes();

  const [classNameFullstory, setClassNameFullstory] = React.useState(
    classNames(
      styles["fullstory-action"],
      desktop && !story.current && styles["fullstory-action--visible"]
    )
  );

  const mail = React.useMemo(
    () => [authorLink, comment].filter(Boolean).join("?subject="),
    [comment]
  );

  const classNamePicture = classNames(
    styles["background"],
    desktop && !story.current && styles["background--full"]
  );

  const handleLike = React.useCallback(() => {
    if (!userStory) throw new Error("Story does not exists.");

    if (userStory.liked) return userStories.unlike(userStory.id);
    else return userStories.like(userStory.id);
  }, [userStory, userStories]);

  const moveAtPosition = (element: HTMLElement, next?: boolean) => {
    window.requestAnimationFrame(() => {
      element.style.transform = next
        ? "scale(0.4) translate(calc(150% + 8em + 0.75em + 4em), -125%)"
        : "scale(0.4) translate(calc(-400% - 8em - 1.25em - 4em), -125%)";
      readyViewer.setReady(true);
    });
  };

  const onSubmit: React.FormEventHandler<HTMLFormElement> = React.useCallback(
    (event) => {
      window.location.href = mail;
      preventEvent(event);
    },
    [mail]
  );

  React.useEffect(() => {
    if (!readyViewer.ready) return;

    const element = ref.current;

    if (!element) return;
    if (index <= stories.current + 1 && index >= stories.current - 1) {
      if (element.style.display === "none") element.style.display = "";
      element.style.transform = "";
      return;
    }
    if (!desktop) return;

    moveAtPosition(element, index > stories.current);

    const onResize = () => moveAtPosition(element, index > stories.current);

    window.addEventListener("resize", onResize);

    return () => window.removeEventListener("resize", onResize);
  }, [stories.current]);

  React.useEffect(() => {
    if (readyViewer.ready) return;
    if (viewer.transition.step !== TransitionStep.Entered) return;

    const element = ref.current;

    if (!element) return;
    if (index <= stories.current + 1 && index >= stories.current - 1) {
      if (element.style.display === "none") element.style.display = "";
      return;
    }
    if (!desktop) return;

    const delay = (Math.abs(index - stories.current) - 1) * 0.25;

    element.style.transition = `opacity 0.4s ease ${delay}s`;

    moveAtPosition(element, index > stories.current);

    const onResize = () => moveAtPosition(element, index > stories.current);

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [viewer.transition.step]);

  React.useEffect(() => {
    if (viewer.transition.step === TransitionStep.Entered) {
      window.requestAnimationFrame(() => readyViewer.setReady(true));
    }
  }, [viewer.transition.step]);

  React.useEffect(() => {
    if (!ref.current || !readyViewer.ready) return;

    ref.current.style.transition = "";
  }, [ref.current, readyViewer.ready]);

  React.useEffect(() => {
    if (!userStory) throw new Error("Story does not exists.");
    if (!story.current) return;

    userStories.view(userStory.id);
  }, [userStory?.id]);

  React.useEffect(() => {
    setClassNameFullstory(
      classNames(
        styles["fullstory-action"],
        resized && styles["fullstory-action--prevent"],
        desktop && !story.current && styles["fullstory-action--visible"]
      )
    );
  }, [desktop, resized]);

  return (
    <>
      {desktop && (
        <button
          className={classNameFullstory}
          onClick={() => stories.show(story.index)}
        >
          <picture>
            <Image
              alt="Avatar"
              height={32}
              src={`/stories/tg/${id}.svg`}
              width={32}
            />
          </picture>
          <p>{author}</p>
        </button>
      )}
      <picture className={classNamePicture}>
        <Image
          alt="Background"
          height={960}
          src="/stories/tg/background.svg"
          style={{ filter: `hue-rotate(${hue}deg) grayscale(${grayscale})` }}
          width={540}
        />
      </picture>
      <address className={styles["address"]}>
        <picture className={styles["logo"]}>
          <Image
            alt="Avatar"
            height={32}
            src={`/stories/tg/${id}.svg`}
            width={32}
          />
        </picture>
        <span>{author}</span>
        <time
          dateTime={createdAt.toISOString()}
          title={createdAt.toLocaleDateString("en-GB", {
            year: "numeric",
            month: "long",
            day: "numeric"
          })}
        >
          {createdAt.toLocaleDateString("en-GB")}
        </time>
      </address>
      <div className={styles["text"]} onPointerDown={preventEvent}>
        <h1>{title}</h1>
        <div>{description}</div>
      </div>
      <div className={styles["container"]}>
        <div className={styles["input"]}>
          <form onSubmit={onSubmit}>
            <input
              ref={inputRef}
              placeholder="Reply privately..."
              onBlur={() => timer.setManually(false)}
              onChange={(event) => setComment(event.target.value)}
              onFocus={() => timer.setManually(true)}
            />
            <Image
              alt="triangle"
              className={styles["triangle"]}
              height={24}
              src="/stories/tg/triangle.svg"
              width={24}
            />
          </form>
        </div>
        <button
          className="action-item action-item--rounded action-item--tertiary"
          title={userStory?.liked ? "Unlike" : "Like"}
          type="button"
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
        <a
          className="action-item action-item--rounded action-item--tertiary"
          href={mail}
          title="Send Mail"
        >
          <picture>
            <Image
              alt="Send Icon"
              height={32}
              src="/stories/shared/send.svg"
              width={32}
            />
          </picture>
        </a>
      </div>
    </>
  );
}

export default Story;
