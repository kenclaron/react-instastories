import random from "random";
import React from "react";

interface UserStory {
  id: string;
  liked: boolean;
  likes?: number;
  viewed: boolean;
  views?: number;
}

interface UserStoriesContextValue {
  readonly stories: Map<string, UserStory>;
  like(id: string): void;
  unlike(id: string): void;
  view(id: string): void;
}

type ConfigurationObject<T> = {
  [K in keyof T as undefined extends T[K] ? K : never]: boolean;
};

const MIN_INT = 100;
const MAX_INT = 300;

function generate(
  id: string,
  config: Partial<ConfigurationObject<UserStory>> = {}
): UserStory {
  random.use(id);

  return {
    id,
    liked: false,
    ...(config.likes && { likes: random.int(MIN_INT, MAX_INT) }),
    viewed: false,
    ...(config.views && { views: random.int(MIN_INT, MAX_INT) })
  };
}

export function useUserStories(
  ids: string[],
  config?: Partial<ConfigurationObject<UserStory>>
): UserStoriesContextValue {
  const [stories, setStories] = React.useState<Map<string, UserStory>>(
    new Map()
  );

  React.useEffect(() => {
    const map = new Map();

    ids.forEach((id) => map.set(id, generate(id, config)));

    setStories(map);
  }, [ids, config]);

  function update(id: string, properties: Partial<UserStory>) {
    setStories((prev) => {
      const stories = new Map(prev);
      const story = stories.get(id);

      if (!story) throw new Error(`Story with id ${id} is not exists.`);

      return stories.set(id, { ...story, ...properties });
    });
  }

  function like(id: string) {
    update(id, { liked: true });
  }

  function unlike(id: string) {
    update(id, { liked: false });
  }

  function view(id: string) {
    update(id, { viewed: true });
  }

  return React.useMemo<UserStoriesContextValue>(
    () => ({ stories, like, unlike, view }),
    [stories, like, unlike, view]
  );
}

export const UserStoriesContext = React.createContext<UserStoriesContextValue>({
  stories: new Map(),
  like: () => {},
  unlike: () => {},
  view: () => {}
});

export function useUserStoriesContext() {
  return React.useContext(UserStoriesContext);
}

export function useUserStory(id: string) {
  const context = React.useContext(UserStoriesContext);

  return context.stories.get(id);
}
