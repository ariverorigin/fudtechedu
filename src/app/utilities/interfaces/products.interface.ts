import { IMetaData } from 'src/app/utilities/interfaces';
import {
  EWoocommerceProductType,
  EWoocommerceProductStatus,
  EWooCommerceStockStatus,
} from 'src/app/utilities/enum';

export interface IProductCategory {
  id?: number;
  name?: string;
  slug?: string;
  image?: any;
  menu_order?: number;
}

export interface IProduct {
  id?: number;
  name?: string;
  slug?: string;
  permalink?: string;
  date_created?: string;
  date_created_gmt?: string;
  date_modified?: string;
  date_modified_gmt?: string;
  type?: EWoocommerceProductType;
  status?: EWoocommerceProductStatus;
  featured?: boolean;
  description?: string;
  short_description?: string;
  sku?: string;
  price?: string;
  regular_price?: string;
  sale_price?: string;
  date_on_sale_from?: string;
  date_on_sale_from_gmt?: string;
  date_on_sale_to?: string;
  date_on_sale_to_gmt?: string;
  price_html?: string;
  on_sale?: boolean;
  purchasable?: boolean;
  total_sales?: number;
  virtual?: boolean;
  downloadable?: boolean;
  downloads?: any[];
  download_limit?: number;
  download_expiry?: number;
  external_url?: string;
  button_text?: string;
  tax_status?: string;
  tax_class?: string;
  manage_stock?: boolean;
  stock_quantity?: number;
  stock_status?: EWooCommerceStockStatus;
  backorders?: 'no' | 'notify' | 'yes';
  backorders_allowed?: boolean;
  backordered?: boolean;
  sold_individually?: boolean;
  weight?: string;
  dimensions?: any;
  shipping_required?: boolean;
  shipping_taxable?: boolean;
  shipping_class?: string;
  shipping_class_id?: number;
  reviews_allowed?: boolean;
  average_rating?: string;
  rating_count?: number;
  related_ids?: any[];
  upsell_ids?: any[];
  cross_sell_ids?: any[];
  parent_id?: number;
  purchase_note?: string;
  categories?: IProductCategory[];
  tags?: any[];
  images?: any[];
  attributes?: any[];
  default_attributes?: any[];
  variations?: any[];
  variation_id?: any;
  product_id?: any;
  grouped_products?: any[];
  menu_order?: number;
  meta_data?: IMetaData[];
  thumbnail?: string;
}
