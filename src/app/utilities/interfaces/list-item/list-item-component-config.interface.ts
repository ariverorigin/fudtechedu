import { IListItemConfig } from './list-item-config.interface';

export interface IListItemComponentConfig {
	hasHeader?: boolean;
	isLoading?: boolean;
	isScrolling?: boolean;
	isOptimizeContentList?: boolean;
	hideArrowRight?: boolean;
	noResultFoundTitle?: string;
	noResultFoundDescription?: string;
	title?: string;
	dataset?: Array<any>;
	listItemConfig?: IListItemConfig<{}>;
}
