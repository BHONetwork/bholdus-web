type MediaType = {
  id?: string | number;
  alternativeText?: string;
  mime?: string;
  url: string;
};

export type VideoProps = {
  video: MediaType;
  poster: MediaType;
  className?: string;
  [other: string]: any;
};
