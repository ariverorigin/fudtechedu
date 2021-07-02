import { IListItemButtonConfig } from "./list-item-button-config.interface";

export interface IListItemConfig<T> {
  header?: string;
  body?: Array<T>;
  image?: string;
  status?: string;
  hasCheckbox?: boolean;
  button?: boolean;
  itemDetail?: boolean;

  title?: string;
  title_css_class?: string;
  title_is_multiple?: boolean /* this will make the title to be multiple */;
  title_multiple_property?: string /* this is the title loop property */;
  title_multiple_has_comma?: boolean /* this will add comma on multiple title data */;

  first_description?: string;
  first_description_show?: string /* this will only activate if first_description_show_has_condition is true */;
  first_description_show_has_condition?: boolean /* if this is true , it will check the first_desription_show for showing */;
  first_description_css_class?: string;
  first_description_is_multiple?: boolean /* this will make the first description to be multiple */;
  first_description_multiple_property?: string /* this is the first description loop property */;
  first_description_multiple_has_comma?: boolean /* this will add comma on multiple first description data */;

  second_description?: string;
  second_description_show?: string /* this will only activate if second_description_show_has_condition is true */;
  second_description_show_has_condition?: boolean /* if this is true , it will check the second_description_show for showing */;
  second_description_css_class?: string;
  second_description_is_multiple?: boolean /* this will make the second description to be multiple */;
  second_description_multiple_property?: string /* this is the first description loop property */;

  third_description?: string;
  third_description_show?: string /* this will only activate if third_description_show_has_condition is true */;
  third_description_show_has_condition?: boolean /* if this is true , it will check the third_description_show for showing */;
  third_description_css_class?: string;
  third_description_is_multiple?: boolean /* this will make the third description to be multiple */;
  third_description_multiple_property?: string /* this is the third description loop property */;

  fourth_description?: string;
  fourth_description_show?: string /* this will only activate if fourth_description_show_has_condition is true */;
  fourth_description_show_has_condition?: boolean /* if this is true , it will check the fourth_description_show for showing */;
  fourth_description_css_class?: string;
  fourth_description_is_multiple?: boolean /* this will make the fourth description to be multiple */;
  fourth_description_multiple_property?: string /* this is the fourth description loop property */;
  fourth_description_multiple_has_comma?: boolean /* this will add comma on multiple first description data */;

  fifth_description?: string;
  fifth_description_show?: string /* this will only activate if fifth_description_show_has_condition is true */;
  fifth_description_show_has_condition?: boolean /* if this is true , it will check the fifth_description_show for showing */;
  fifth_description_css_class?: string;
  fifth_description_is_multiple?: boolean /* this will make the fifth description to be multiple */;
  fifth_description_multiple_property?: string /* this is the fifth description loop property */;

  right_show_edit_icon?: boolean;

  right_description?: string;
  right_description_css_class?: string;
  right_description_is_stop_calculate_time?: boolean;
  right_description_show?: string;
  right_description_show_has_condition?: boolean /* if this is true , it will check the fifth_description_show for showing */;
  right_description_isDateTime?: boolean;
  right_description_format?: string;

  left_icon?: string;
  left_icon_css_class?: string;

  right_icon?: string;
  right_icon_css_class?: string;
  right_icon_searchset?: string;
  right_icon_input?: string;
  right_icon_can_view?: boolean;

  right_secondary_description?: string;
  right_secondary_description_css_class?: string;

  item_buttons?: Array<IListItemButtonConfig>;

  green_avatar_border_searchset?: string;
  green_avatar_border_input?: string;
  yellow_avatar_border_searchset?: string;
  yellow_avatar_border_input?: string;

  enableMore?: boolean;
  enableStatus?: boolean;
}
