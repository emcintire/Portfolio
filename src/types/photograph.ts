export type Photograph = {
  alt: string;
  /**
   * Displayed size in pixels, recorded in the bucket by `npm run photos:optimize`.
   * Absent for a photograph uploaded since the script last ran.
   */
  height?: number;
  /** Absolute URL in the public Backblaze B2 bucket. */
  src: string;
  width?: number;
};
