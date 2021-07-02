import { IListItemButtonConfig } from "../list-item/list-item-button-config.interface";
import { NoItemViewType } from "../../enum";

export interface INoItemConfig {
  view?: NoItemViewType;
  title?: string;
  title_css_class?: string;
  description?: string;
  description_css_class?: string;
  icon?: string;
  icon_css_class?: string;
  image?: string;
  image_css_class?: string;
  button?: IListItemButtonConfig;
}
