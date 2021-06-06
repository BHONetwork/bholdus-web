import dayjs from "dayjs";

import "dayjs/locale/en";
import "dayjs/locale/vi";

export const formatDate = (lang: string, date: string): string => {
  return dayjs(date).locale(lang).format("MMMM DD, YYYY");
};
