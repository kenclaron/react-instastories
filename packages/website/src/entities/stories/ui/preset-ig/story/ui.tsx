import {
  TransitionStep,
  useStoriesContext,
  useStory,
  useTimerContext,
  useViewerContext
} from "@react-instastories/base";
import { useIndexes } from "@react-instastories/external";

import React from "react";
import { useMediaQuery } from "react-responsive";

import {
  Image,
  preventEvent,
  useAuthorLinkMailto,
  weeksBetween
} from "../../../../../shared";
import {
  useReadyViewerContext,
  useUserStoriesContext,
  useUserStory
} from "../../../lib";
import * as Instagram from "../custom";

import styles from "./styles.module.scss";

interface IStoryProps {
  readonly author: string;
  readonly createdAt: Date;
  readonly description: React.ReactNode;
  readonly hue?: number;
  readonly id: string;
  readonly title?: React.ReactNode;
}

export function Story({
  author,
  createdAt,
  description,
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
  const desktop = useMediaQuery({ query: "(width >= 768px)" });
  const authorLink = useAuthorLinkMailto();

  const [comment, setComment] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  const { ref, index } = useStory();
  const { story } = useIndexes();

  const mail = React.useMemo(
    () => [authorLink, comment].filter(Boolean).join("?subject="),
    [comment]
  );

  const timePassed = React.useMemo(
    () => `${weeksBetween(new Date(), createdAt)} w`,
    []
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
    if (viewer.transition.step !== TransitionStep.Entered) return;
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
  }, [stories.current, desktop, viewer.transition.step]);

  React.useEffect(() => {
    if (viewer.transition.step !== TransitionStep.Entered) return;
    if (readyViewer.ready) return;

    const element = ref.current;

    if (!element) return;
    if (index <= stories.current + 1 && index >= stories.current - 1) {
      if (element.style.display === "none") element.style.display = "";
      return;
    }
    if (!desktop) return;

    const delay = (Math.abs(index - stories.current) - 1) * 0.1;

    element.style.transition = `opacity 0.4s ease ${delay}s`;

    moveAtPosition(element, index > stories.current);

    const onResize = () => moveAtPosition(element, index > stories.current);

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [desktop, viewer.transition.step]);

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

  return (
    <>
      {desktop && !story.current ? (
        <>
          <button
            className={styles["fullstory-action"]}
            onClick={() => stories.show(story.index)}
          >
            <picture>
              <Image
                alt="Icon"
                height={78}
                src={`/stories/ig/${id}.svg`}
                width={78}
              />
            </picture>
            <div>
              <p>{author}</p>
              <p>{timePassed}</p>
            </div>
          </button>
          <div style={{ height: "5em" }} />
        </>
      ) : (
        <address>
          <picture className={styles["logo"]}>
            <Image
              alt="Icon"
              height={78}
              src={`/stories/ig/${id}.svg`}
              width={78}
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
            {timePassed}
          </time>
          {desktop && (
            <Instagram.Controls.Stories.Timer className={styles["pause"]} />
          )}
        </address>
      )}

      <picture className={styles["background"]}>
        <Image
          alt="Background Image"
          height={960}
          src="/stories/ig/background.svg"
          style={{ filter: `hue-rotate(${hue}deg)` }}
          width={540}
        />
      </picture>
      {title && <h1 className={styles["title"]}>{title}</h1>}
      <div>
        <div className={styles["description"]}>{description}</div>
      </div>

      {!desktop || story.current ? (
        <form onSubmit={onSubmit}>
          <div className={styles["container"]}>
            <input
              ref={inputRef}
              placeholder="Reply to author..."
              onBlur={() => timer.setManually(false)}
              onChange={(event) => setComment(event.target.value)}
              onFocus={() => timer.setManually(true)}
            />
            <div>
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
                    alt="Send"
                    height={32}
                    src="/stories/shared/send.svg"
                    width={32}
                  />
                </picture>
              </a>
            </div>
          </div>
        </form>
      ) : (
        <div />
      )}
    </>
  );
}

export default Story;
