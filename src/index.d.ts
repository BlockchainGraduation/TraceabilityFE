interface MarketType {
  id?: string;
  order_type?: string;
  order_id?: string;
  order_by?: string;
  hash_data?: string;
  created_at?: string;
  product?: {
    id?: string;
    product_type?: string;
    product_status?: string;
    name?: string;
    description?: string;
    price?: string;
    quantity?: string;
    banner?: string;
    created_by?: string;
    created_at?: string;
    user?: {
      id?: string;
      avatar?: string;
      username?: string;
      email?: string;
    };
  };
  comments?: {
    content?: string;
    marketplace_id?: string;
    user_id?: string;
    id?: string;
    created_at?: string;
    user?: string;
    reply_comments?: string;
  };
}
interface TopSellingType {
  Product?: {
    name?: string;
    number_of_sales?: number;
    banner?: string;
    created_by?: string;
    description?: string;
    created_at?: string;
    price?: number;
    updated_at?: string;
    quantity?: number;
    hashed_data?: string;
    id?: string;
    product_status?: string;
    product_type?: string;
  };
  total_quantity?: number;
  total_sales?: number;
}
