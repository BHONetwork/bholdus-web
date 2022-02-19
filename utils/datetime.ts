import dayjs from "dayjs";

import "dayjs/locale/en";
import "dayjs/locale/vi";

export const formatDate = (lang: string, date: string): string => {
  if (lang === "vi") return dayjs(date).locale(lang).format("DD MMMM, YYYY");
  return dayjs(date).locale(lang).format("MMMM DD, YYYY");
};
