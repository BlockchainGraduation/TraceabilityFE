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
  survey?: {
    name?: string;
    phone?: string;
    device?: string;
    yearOld?: string;
    education?: string;
    introduce?: string;
    user_role?: string;
    numericKeypad?: string;
    japaneseAbility?: string;
    digitsExperience?: string;
    aphabetExperience?: string;
  };
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
  id?: number;
  product_id?: ProductType;
  create_at?: string;
  create_by?: string;
}

interface ProductType {
  id?: number;
  banner?: [
    {
      id?: number;
      image?: string;
      create_at?: string;
      product?: number;
    }
  ];
  growup?: [
    {
      id?: number;
      growup_images?: [
        {
          id?: number;
          image?: string;
          create_at?: string;
          growup_id?: number;
        }
      ];
      title?: string;
      description?: string;
      product_id?: number;
    }
  ];
  comments?: [
    {
      id?: number;
      description?: string;
      create_at?: string;
      product_id?: number;
      user_id?: string;
    }
  ];
  detail_decriptions?: [
    {
      id?: number;
      title?: string;
      description?: string;
      image?: string;
      product_id?: number;
    }
  ];
  total_transaction?: number;
  create_by?: UserType;
  name?: string;
  avatar?: string;
  description?: string;
  price?: number;
  quantity?: number;
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
interface StatisticalUserType {
  product?: {
    product_count?: number;
    public_product_count?: number;
    private_product_count?: number;
  };
  transaction?: {
    transaction_count?: number;
    pendding_transaction_count?: number;
    accept_transaction_count?: number;
    reject_transaction_count?: number;
    done_transaction_count?: number;
  };
  sales?: {
    transaction_sales_count?: number;
    accept_transaction_sales_count?: number;
    pendding_transaction_sales_count?: number;
    reject_transaction_sales_count?: number;
    done_transaction_sales_count?: number;
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
  id?: number;
  description?: string;
  create_at?: string;
  product_id?: number;
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
  product_id?: ProductType;
}
interface DetailTransactionType {
  id?: number;
  create_by?: UserType;
  quantity?: number;
  price?: number;
  active?: boolean;
  status?: string;
  is_reject?: boolean;
  create_at?: string;
  product_id?: ProductType;
}

interface NotificationItemType {
  active?: boolean;
  create_by?: UserType;
  id?: number;
  notification_type?: string;
  product_id?: ProductType;
  create_at?: string;
}

interface StatisticalProductType {
  transaction?: {
    transaction_count?: number;
    pendding_transaction_count?: number;
    reject_transaction_count?: number;
    done_transaction_count?: number;
    accept_transaction_count?: number;
  };
}
