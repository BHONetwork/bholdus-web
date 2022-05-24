export type BreadcrumbItemType = {
  link: string;
  label: string;
};
export interface BreadcrumbProps {
  className: string;
  breadcrumbList: Array<BreadcrumbItemType>;
}
