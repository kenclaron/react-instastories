export class Utility {
  static debug(...data: unknown[]) {
    if (process.env.NODE_ENV !== "development") return;

    console.debug("[WEBSITE]", ...data);
  }
}

export default Utility;
