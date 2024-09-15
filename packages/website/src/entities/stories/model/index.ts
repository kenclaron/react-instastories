import {
  type PageProps,
  type PagesProps,
  type PreviewProps,
  type StoryProps
} from "@react-instastories/base";

export interface IStory {
  readonly name: string;
  readonly story?: {
    readonly props?: StoryProps;
  };
  readonly preview: {
    readonly props?: PreviewProps;
    readonly children: React.ReactElement;
  };
  readonly pages: {
    readonly props?: PagesProps;
    readonly children: {
      readonly props?: PageProps;
      readonly children: React.ReactElement;
    }[];
  };
}

export default IStory;
