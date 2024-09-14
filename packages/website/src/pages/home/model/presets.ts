import {
  InstagramStories,
  SberPrimeStories,
  TelegramStories
} from "../../../entities";

export const APPS = {
  Telegram: {
    developer: "Telegram FZ-LLC.",
    Component: TelegramStories
  },
  Instagram: {
    developer: "Meta Platforms Inc.",
    Component: InstagramStories
  },
  SberPrime: {
    developer: "Sberbank PJSC.",
    Component: SberPrimeStories
  }
};
