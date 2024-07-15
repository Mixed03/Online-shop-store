type CollectionType = {
  _id: string;
  title: string;
  products: number;
  image: string;
};

type SizeType = {
  size: string;
  stock: number;
  _id?: string; // Optional fields in case they are included in the response
  id?: string;
};

type ProductType = {
  _id: string;
  title: string;
  description: string;
  media: string[];
  category: string;
  collections: string[];
  tags: string[];
  sizes: SizeType[];
  colors: string[];
  price: number;
  expense: number;
  inventory: number;
  createdAt: Date;
  updatedAt: Date;
};

type UserType = {
  clerkId: string;
  wishlist: [string];
  createdAt: string;
  updatedAt: string;
};

type OrderType = {
  shippingAddress: Object;
  _id: string;
  customerClerkId: string;
  products: [OrderItemType]
  shippingRate: string;
  totalAmount: number
}

type OrderItemType = {
  product: ProductType;
  color: string;
  size: string;
  quantity: number;
  _id: string;
}