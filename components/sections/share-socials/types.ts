import { Enum } from "@martin_hotell/rex-tils";

export type SocialTypes = {
  [type: string]: {
    Icon: any;
    ShareComponent: any;
  };
};

export const SocialType = Enum("facebook", "telegram");

export type ShareSocialsProps = {
  url?: string;
  types: Enum<typeof SocialType>[];
};
