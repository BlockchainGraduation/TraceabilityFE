interface DataType {
  key: React.Key;
  buyer: ReactNode;
  quantity: number;
  price: number;
  time: string;
  status: ReactNode;
}
interface UserType {
  id?: string;
  last_login?: string;
  is_superuser?: boolean;
  username?: string;
  email?: string;
  is_staff?: boolean;
  date_joined?: string;
  introduce?: string;
  description?: string;
  fullname?: string;
  avatar?: string;
  user_banner?: [
    {
      image?: string;
      user?: string;
      create_at?: string;
    }
  ];
  phone?: string;
  account_balance?: string;
  wallet_address?: string;
  geographical_address?: string;
  role?: string;
  link?: {};
  confirm_status?: string;
  survey?: {};
  is_active?: boolean;
  is_delete?: boolean;
}
interface HistoryType {
  id?: string;
  product_id?: string;
  transaction_sf_id?: string;
  product?: {
    id?: string;
    product_type?: string;
    product_status?: string;
    name?: string;
    description?: string;
    price?: number;
    quantity?: number;
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
  transactions_fm?: {
    id?: string;
    product_id?: string;
    user_id?: string;
    price?: number;
    quantity?: number;
    created_at?: string;
    updated_at?: string;
    product?: {
      id?: string;
      product_type?: string;
      product_status?: string;
      name?: string;
      description?: string;
      price?: number;
      quantity?: number;
      banner?: number;
      created_by?: number;
      created_at?: number;
      user?: {
        id?: string;
        avatar?: string;
        username?: string;
        email?: string;
      };
    };
  };
  transactions_sf?: {
    id?: string;
    product_id?: string;
    user_id?: string;
    price?: number;
    quantity?: number;
    created_at?: string;
    updated_at?: string;
    product?: {
      id?: string;
      product_type?: string;
      product_status?: string;
      name?: string;
      description?: string;
      price?: number;
      quantity?: number;
      banner?: number;
      created_by?: number;
      created_at?: number;
      user?: {
        id?: string;
        avatar?: string;
        username?: string;
        email?: string;
      };
    };
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
interface CartItemType {
  id?: string;
  product_id?: string;
  user_id?: string;
  price?: number;
  quantity?: number;
  created_at?: string;
  product?: ProductType;
  user?: {
    id?: string;
    avatar?: string;
    username?: string;
    email?: string;
    phone?: string;
    system_role?: string;
  };
}

interface ProductType {
  id?: int;
  banner?: [
    {
      id?: int;
      image?: string;
      create_at?: string;
      product?: int;
    }
  ];
  growup?: [
    {
      id?: int;
      growup_images?: [
        {
          id?: int;
          image?: string;
          create_at?: string;
          growup_id?: int;
        }
      ];
      title?: string;
      description?: string;
      product_id?: int;
    }
  ];
  comments?: [
    {
      id?: int;
      description?: string;
      create_at?: string;
      product_id?: int;
      user_id?: string;
    }
  ];
  detail_decriptions?: [
    {
      id?: int;
      title?: string;
      description?: string;
      image?: string;
      product_id?: int;
    }
  ];
  total_transaction?: number;
  create_by?: UserType;
  name?: string;
  avatar?: string;
  description?: string;
  price?: int;
  quantity?: int;
  product_type?: string;
  product_status?: string;
  active?: boolean;
  create_at?: string;
  updated_at?: string;
  transaction_id?: {};
}
interface StatisticalSystemType {
  statistical_user?: {
    total_user?: number;
    member_count?: number;
    seedling_count?: number;
    farmer_count?: number;
    manufacturer_count?: number;
  };
  statistical_product?: {
    total_product?: number;
    seedling_count?: number;
    farmer_count?: number;
    manufacturer_count?: number;
    total_product?: number;
    total_sales?: number;
  };
  statistical_transaction_sf?: {
    total_transaction_sf?: number;
  };
  statistical_transaction_fm?: {
    total_transaction_fm?: number;
  };
}

interface GrowUpType {
  id?: string;
  product_farmer_id?: string;
  description?: string;
  image?: string;
  video?: string;
  hashed_data?: string;
  created_at?: string;
  product_farmer?: {
    id?: string;
    product_id?: string;
    transaction_sf_id?: string;
    product?: {
      id?: string;
      product_type?: string;
      product_status?: string;
      name?: string;
      description?: string;
      price?: number;
      quantity?: number;
      banner?: string;
      created_by?: string;
      created_at?: string;
      user?: {
        id?: string;
        avatar?: string;
        username?: string;
        email?: string;
        phone?: string;
      };
    };
  };
}
interface CommentItemType {
  id?: int;
  description?: string;
  create_at?: string;
  product_id?: int;
  user_id?: UserType;
}
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
    price?: number;
    quantity?: number;
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

interface TransactionType {
  id?: number;
  create_by?: UserType;
  quantity?: number;
  price?: number;
  active?: boolean;
  status?: string;
  is_reject?: boolean;
  create_at?: string;
  product_id?: number;
}

interface NotificationItemType {
  data?: {
    message?: string;
    params?: {
      product_id?: string;
      product_name?: string;
      notification_type?: string;
      marketplace_id?: string;
      action?: string;
    };
    data?: {
      created_at?: number;
      unread?: boolean;
      notification_id?: string;
    };
  };
  user?: {
    id?: string;
    avatar?: string;
    username?: string;
    email?: string;
    phone?: string;
    system_role?: string;
  };
}
