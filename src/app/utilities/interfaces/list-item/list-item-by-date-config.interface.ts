export interface IListByDateConfig {
  componentTitle?: string;
  hasTitle?: boolean;
  hasAddButton?: boolean;

  noResultFoundTitle?: string;
  noResultFoundTitleCssClass?: string;
  noResultFoundDescription?: string;
  noResultFoundDescriptionCssClass?: string;
  noResultFoundIcon?: string;
  noResultFoundIconCssClass?: string;

  dateData?: string;
  listItemDataSet?: string;
}
