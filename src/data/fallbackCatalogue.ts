// Fallback catalogue for serverless resilience when SQLite is offline
export interface ProductVariantData {
  id: string;
  productId: string;
  weight: string;
  price: number;
  stock: number;
  isActive: boolean;
  unit?: string | null;
  comparePrice?: number | null;
  sku?: string | null;
  [key: string]: any;
}

export interface ProductImageData {
  id: string;
  url: string;
  altText: string | null;
  productId?: string;
  sortOrder?: number;
  [key: string]: any;
}

export interface CategoryData {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  image?: string | null;
  sortOrder?: number;
  isActive?: boolean;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  [key: string]: any;
}

export interface ProductData {
  id: string;
  name: string;
  slug: string;
  description: string;
  categoryId: string;
  ingredients?: string | null;
  allergens?: string | null;
  isVegetarian: boolean;
  isFeatured: boolean;
  isBestSeller: boolean;
  isActive: boolean;
  priceConfigured: boolean;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  category: CategoryData;
  variants: ProductVariantData[];
  images: ProductImageData[];
  [key: string]: any;
}

export const FALLBACK_CATEGORIES: CategoryData[] = [
  {
    "id": "cmvlvxkxe0001q005ura3oa4s",
    "name": "Snacks & Chaat",
    "slug": "snacks-chaat",
    "description": null,
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c4/Samosas%2C_snack_food_at_Wikipedia%27s_16th_Birthday_celebration_in_Chittagong_%2801%29.jpg/960px-Samosas%2C_snack_food_at_Wikipedia%27s_16th_Birthday_celebration_in_Chittagong_%2801%29.jpg",
    "isActive": true,
    "sortOrder": 1,
    "createdAt": "2026-10-24T04:14:47.091Z",
    "updatedAt": "2026-10-24T04:24:17.469Z"
  },
  {
    "id": "cmvlvxkxh0002q005b8ykhq3t",
    "name": "Traditional Mithai",
    "slug": "traditional-mithai",
    "description": null,
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/96/Basavanagudi_Kadalekai_Parishe_%282025%29_Bangalore_%2886%29.jpg/960px-Basavanagudi_Kadalekai_Parishe_%282025%29_Bangalore_%2886%29.jpg",
    "isActive": true,
    "sortOrder": 2,
    "createdAt": "2026-10-24T04:14:47.094Z",
    "updatedAt": "2026-10-24T04:24:17.476Z"
  },
  {
    "id": "cmvlvxkxk0003q0053q1zfslb",
    "name": "Kaju & Dry Fruits",
    "slug": "kaju-dry-fruits",
    "description": null,
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ac/Kaju_katli_sweet.jpg/960px-Kaju_katli_sweet.jpg",
    "isActive": true,
    "sortOrder": 3,
    "createdAt": "2026-10-24T04:14:47.097Z",
    "updatedAt": "2026-10-24T04:24:17.480Z"
  },
  {
    "id": "cmvlvxkxo0004q005c3y2vep8",
    "name": "Barfi & Milk Sweets",
    "slug": "barfi-milk-sweets",
    "description": null,
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f1/Almond_Khoa_based_burfi_Mumbai_India_%28cropped%29.jpg/960px-Almond_Khoa_based_burfi_Mumbai_India_%28cropped%29.jpg",
    "isActive": true,
    "sortOrder": 4,
    "createdAt": "2026-10-24T04:14:47.100Z",
    "updatedAt": "2026-10-24T04:24:17.486Z"
  },
  {
    "id": "cmvlvxkxr0005q005xepsh40r",
    "name": "Laddu",
    "slug": "laddu",
    "description": null,
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c1/Laddu_Sweet.JPG/960px-Laddu_Sweet.JPG",
    "isActive": true,
    "sortOrder": 5,
    "createdAt": "2026-10-24T04:14:47.103Z",
    "updatedAt": "2026-10-24T04:24:17.491Z"
  },
  {
    "id": "cmvlvxkxu0006q005inhelkqy",
    "name": "Festive Sweet Gift Boxes",
    "slug": "festive-gift-boxes",
    "description": null,
    "image": "https://upload.wikimedia.org/wikipedia/commons/a/aa/Indian_Sweets.JPG",
    "isActive": true,
    "sortOrder": 6,
    "createdAt": "2026-10-24T04:14:47.107Z",
    "updatedAt": "2026-10-24T04:39:50.958Z"
  }
];

export const FALLBACK_PRODUCTS: ProductData[] = [
  {
    "id": "cmvlvxky10009q005r35ossp2",
    "name": "Desi Samosa",
    "slug": "desi-samosa",
    "description": "Golden fried crispy pastry filled with spiced potato and peas, served with sweet saunth and mint chutney.",
    "categoryId": "cmvlvxkxe0001q005ura3oa4s",
    "ingredients": null,
    "allergens": null,
    "isVegetarian": true,
    "isFeatured": true,
    "isBestSeller": true,
    "isActive": true,
    "priceConfigured": true,
    "createdAt": "2026-10-24T04:14:47.113Z",
    "updatedAt": "2026-10-24T04:37:36.675Z",
    "category": {
      "id": "cmvlvxkxe0001q005ura3oa4s",
      "name": "Snacks & Chaat",
      "slug": "snacks-chaat",
      "description": null,
      "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c4/Samosas%2C_snack_food_at_Wikipedia%27s_16th_Birthday_celebration_in_Chittagong_%2801%29.jpg/960px-Samosas%2C_snack_food_at_Wikipedia%27s_16th_Birthday_celebration_in_Chittagong_%2801%29.jpg",
      "isActive": true,
      "sortOrder": 1,
      "createdAt": "2026-10-24T04:14:47.091Z",
      "updatedAt": "2026-10-24T04:24:17.469Z"
    },
    "variants": [
      {
        "id": "cmvlwqxpy0003pjq5gi2gmfs9",
        "productId": "cmvlvxky10009q005r35ossp2",
        "weight": "1 piece",
        "unit": null,
        "price": 22,
        "comparePrice": null,
        "stock": 44,
        "sku": null,
        "isActive": true
      },
      {
        "id": "cmvlwqxq20005pjq5dv26k0mr",
        "productId": "cmvlvxky10009q005r35ossp2",
        "weight": "2 pieces",
        "unit": null,
        "price": 44,
        "comparePrice": null,
        "stock": 50,
        "sku": null,
        "isActive": true
      }
    ],
    "images": [
      {
        "id": "cmvlwqxpp0001pjq532uyl3uj",
        "productId": "cmvlvxky10009q005r35ossp2",
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c4/Samosas%2C_snack_food_at_Wikipedia%27s_16th_Birthday_celebration_in_Chittagong_%2801%29.jpg/960px-Samosas%2C_snack_food_at_Wikipedia%27s_16th_Birthday_celebration_in_Chittagong_%2801%29.jpg",
        "altText": "Desi Samosa",
        "sortOrder": 0
      }
    ]
  },
  {
    "id": "cmvlvxky5000fq005u66san1o",
    "name": "Khaman Dhokla",
    "slug": "khaman-dhokla",
    "description": "Soft, spongy steamed gram flour cakes tempered with mustard seeds and green chillies.",
    "categoryId": "cmvlvxkxe0001q005ura3oa4s",
    "ingredients": null,
    "allergens": null,
    "isVegetarian": true,
    "isFeatured": true,
    "isBestSeller": false,
    "isActive": true,
    "priceConfigured": true,
    "createdAt": "2026-10-24T04:14:47.118Z",
    "updatedAt": "2026-10-24T04:37:36.715Z",
    "category": {
      "id": "cmvlvxkxe0001q005ura3oa4s",
      "name": "Snacks & Chaat",
      "slug": "snacks-chaat",
      "description": null,
      "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c4/Samosas%2C_snack_food_at_Wikipedia%27s_16th_Birthday_celebration_in_Chittagong_%2801%29.jpg/960px-Samosas%2C_snack_food_at_Wikipedia%27s_16th_Birthday_celebration_in_Chittagong_%2801%29.jpg",
      "isActive": true,
      "sortOrder": 1,
      "createdAt": "2026-10-24T04:14:47.091Z",
      "updatedAt": "2026-10-24T04:24:17.469Z"
    },
    "variants": [
      {
        "id": "cmvlwqxqx000fpjq5cy0tcoll",
        "productId": "cmvlvxky5000fq005u66san1o",
        "weight": "250g",
        "unit": null,
        "price": 85,
        "comparePrice": null,
        "stock": 50,
        "sku": null,
        "isActive": true
      },
      {
        "id": "cmvlwqxr0000hpjq5rls6ex1k",
        "productId": "cmvlvxky5000fq005u66san1o",
        "weight": "500g",
        "unit": null,
        "price": 170,
        "comparePrice": null,
        "stock": 50,
        "sku": null,
        "isActive": true
      }
    ],
    "images": [
      {
        "id": "cmvlwqxqq000dpjq5hf4bef9m",
        "productId": "cmvlvxky5000fq005u66san1o",
        "url": "https://upload.wikimedia.org/wikipedia/commons/6/65/Dhokla_on_Gujrart.jpg",
        "altText": "Khaman Dhokla",
        "sortOrder": 0
      }
    ]
  },
  {
    "id": "cmvlvxky9000lq005o9lb9lh4",
    "name": "Aloo Tikki Chaat",
    "slug": "aloo-tikki-chaat",
    "description": "Crisp golden potato patties served with sweet curd, green chutney, and tamarind saunth.",
    "categoryId": "cmvlvxkxe0001q005ura3oa4s",
    "ingredients": null,
    "allergens": null,
    "isVegetarian": true,
    "isFeatured": false,
    "isBestSeller": true,
    "isActive": true,
    "priceConfigured": true,
    "createdAt": "2026-10-24T04:14:47.121Z",
    "updatedAt": "2026-10-24T04:37:36.737Z",
    "category": {
      "id": "cmvlvxkxe0001q005ura3oa4s",
      "name": "Snacks & Chaat",
      "slug": "snacks-chaat",
      "description": null,
      "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c4/Samosas%2C_snack_food_at_Wikipedia%27s_16th_Birthday_celebration_in_Chittagong_%2801%29.jpg/960px-Samosas%2C_snack_food_at_Wikipedia%27s_16th_Birthday_celebration_in_Chittagong_%2801%29.jpg",
      "isActive": true,
      "sortOrder": 1,
      "createdAt": "2026-10-24T04:14:47.091Z",
      "updatedAt": "2026-10-24T04:24:17.469Z"
    },
    "variants": [
      {
        "id": "cmvlwqxrh000lpjq5ykl473qx",
        "productId": "cmvlvxky9000lq005o9lb9lh4",
        "weight": "1 Plate (2 pcs)",
        "unit": null,
        "price": 70,
        "comparePrice": null,
        "stock": 50,
        "sku": null,
        "isActive": true
      }
    ],
    "images": [
      {
        "id": "cmvlwqxrc000jpjq5z8x9xt2a",
        "productId": "cmvlvxky9000lq005o9lb9lh4",
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d1/Aloo_Tikki_served_with_chutneys.jpg/960px-Aloo_Tikki_served_with_chutneys.jpg",
        "altText": "Aloo Tikki Chaat",
        "sortOrder": 0
      }
    ]
  },
  {
    "id": "cmvlvxkyd000pq005d9jzgreq",
    "name": "Dahi Vada",
    "slug": "dahi-vada",
    "description": "Soft lentil dumplings soaked in thick sweet curd, sprinkled with roasted cumin.",
    "categoryId": "cmvlvxkxe0001q005ura3oa4s",
    "ingredients": null,
    "allergens": null,
    "isVegetarian": true,
    "isFeatured": false,
    "isBestSeller": false,
    "isActive": true,
    "priceConfigured": true,
    "createdAt": "2026-10-24T04:14:47.126Z",
    "updatedAt": "2026-10-24T04:37:36.755Z",
    "category": {
      "id": "cmvlvxkxe0001q005ura3oa4s",
      "name": "Snacks & Chaat",
      "slug": "snacks-chaat",
      "description": null,
      "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c4/Samosas%2C_snack_food_at_Wikipedia%27s_16th_Birthday_celebration_in_Chittagong_%2801%29.jpg/960px-Samosas%2C_snack_food_at_Wikipedia%27s_16th_Birthday_celebration_in_Chittagong_%2801%29.jpg",
      "isActive": true,
      "sortOrder": 1,
      "createdAt": "2026-10-24T04:14:47.091Z",
      "updatedAt": "2026-10-24T04:24:17.469Z"
    },
    "variants": [
      {
        "id": "cmvlwqxs4000ppjq5zwfjn0lw",
        "productId": "cmvlvxkyd000pq005d9jzgreq",
        "weight": "1 Plate (2 pcs)",
        "unit": null,
        "price": 80,
        "comparePrice": null,
        "stock": 50,
        "sku": null,
        "isActive": true
      }
    ],
    "images": [
      {
        "id": "cmvlwqxrw000npjq5iin2z4bm",
        "productId": "cmvlvxkyd000pq005d9jzgreq",
        "url": "https://upload.wikimedia.org/wikipedia/commons/2/2d/Dahi_bhalla_or_dahi_wada_or_dahi_bada.PNG",
        "altText": "Dahi Vada",
        "sortOrder": 0
      }
    ]
  },
  {
    "id": "cmvlvxkyh000tq005zkdeza5w",
    "name": "Atta Golgappe",
    "slug": "atta-golgappe",
    "description": "Crispy whole wheat puris with spicy mint water, sweet saunth, and potato-chickpea filling.",
    "categoryId": "cmvlvxkxe0001q005ura3oa4s",
    "ingredients": null,
    "allergens": null,
    "isVegetarian": true,
    "isFeatured": false,
    "isBestSeller": false,
    "isActive": true,
    "priceConfigured": true,
    "createdAt": "2026-10-24T04:14:47.130Z",
    "updatedAt": "2026-10-24T04:37:36.777Z",
    "category": {
      "id": "cmvlvxkxe0001q005ura3oa4s",
      "name": "Snacks & Chaat",
      "slug": "snacks-chaat",
      "description": null,
      "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c4/Samosas%2C_snack_food_at_Wikipedia%27s_16th_Birthday_celebration_in_Chittagong_%2801%29.jpg/960px-Samosas%2C_snack_food_at_Wikipedia%27s_16th_Birthday_celebration_in_Chittagong_%2801%29.jpg",
      "isActive": true,
      "sortOrder": 1,
      "createdAt": "2026-10-24T04:14:47.091Z",
      "updatedAt": "2026-10-24T04:24:17.469Z"
    },
    "variants": [
      {
        "id": "cmvlwqxsn000tpjq5ngv8ddq0",
        "productId": "cmvlvxkyh000tq005zkdeza5w",
        "weight": "Pack of 10 pcs",
        "unit": null,
        "price": 50,
        "comparePrice": null,
        "stock": 38,
        "sku": null,
        "isActive": true
      }
    ],
    "images": [
      {
        "id": "cmvlwqxsg000rpjq5l99blx2s",
        "productId": "cmvlvxkyh000tq005zkdeza5w",
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e9/Pani_Puri1.JPG/960px-Pani_Puri1.JPG",
        "altText": "Atta Golgappe",
        "sortOrder": 0
      }
    ]
  },
  {
    "id": "cmvlvxkyl000xq005c4fmlxy5",
    "name": "Desi Ghee Jalebi",
    "slug": "desi-ghee-jalebi",
    "description": "Freshly fried hot and crispy spirals of jalebi soaked in fragrant saffron sugar syrup.",
    "categoryId": "cmvlvxkxh0002q005b8ykhq3t",
    "ingredients": null,
    "allergens": null,
    "isVegetarian": true,
    "isFeatured": true,
    "isBestSeller": true,
    "isActive": true,
    "priceConfigured": true,
    "createdAt": "2026-10-24T04:14:47.133Z",
    "updatedAt": "2026-10-24T04:37:36.842Z",
    "category": {
      "id": "cmvlvxkxh0002q005b8ykhq3t",
      "name": "Traditional Mithai",
      "slug": "traditional-mithai",
      "description": null,
      "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/96/Basavanagudi_Kadalekai_Parishe_%282025%29_Bangalore_%2886%29.jpg/960px-Basavanagudi_Kadalekai_Parishe_%282025%29_Bangalore_%2886%29.jpg",
      "isActive": true,
      "sortOrder": 2,
      "createdAt": "2026-10-24T04:14:47.094Z",
      "updatedAt": "2026-10-24T04:24:17.476Z"
    },
    "variants": [
      {
        "id": "cmvlwqxuf001jpjq5trtaujkp",
        "productId": "cmvlvxkyl000xq005c4fmlxy5",
        "weight": "250g",
        "unit": null,
        "price": 81,
        "comparePrice": null,
        "stock": 50,
        "sku": null,
        "isActive": true
      },
      {
        "id": "cmvlwqxui001lpjq5q92zx4yx",
        "productId": "cmvlvxkyl000xq005c4fmlxy5",
        "weight": "500g",
        "unit": null,
        "price": 160,
        "comparePrice": null,
        "stock": 50,
        "sku": null,
        "isActive": true
      },
      {
        "id": "cmvlwqxum001npjq59ds1qs6o",
        "productId": "cmvlvxkyl000xq005c4fmlxy5",
        "weight": "1kg",
        "unit": null,
        "price": 320,
        "comparePrice": null,
        "stock": 50,
        "sku": null,
        "isActive": true
      }
    ],
    "images": [
      {
        "id": "cmvlwqxu8001hpjq5xauad827",
        "productId": "cmvlvxkyl000xq005c4fmlxy5",
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/96/Basavanagudi_Kadalekai_Parishe_%282025%29_Bangalore_%2886%29.jpg/960px-Basavanagudi_Kadalekai_Parishe_%282025%29_Bangalore_%2886%29.jpg",
        "altText": "Desi Ghee Jalebi",
        "sortOrder": 0
      }
    ]
  },
  {
    "id": "cmvlvxkyo0013q0055mkgp026",
    "name": "Rasbhari",
    "slug": "rasbhari",
    "description": "Mini bite-sized juicy cottage cheese sweets dipped in light cardamom syrup. A Bikaner Bijnor specialty.",
    "categoryId": "cmvlvxkxh0002q005b8ykhq3t",
    "ingredients": null,
    "allergens": null,
    "isVegetarian": true,
    "isFeatured": true,
    "isBestSeller": true,
    "isActive": true,
    "priceConfigured": true,
    "createdAt": "2026-10-24T04:14:47.136Z",
    "updatedAt": "2026-10-24T04:37:36.902Z",
    "category": {
      "id": "cmvlvxkxh0002q005b8ykhq3t",
      "name": "Traditional Mithai",
      "slug": "traditional-mithai",
      "description": null,
      "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/96/Basavanagudi_Kadalekai_Parishe_%282025%29_Bangalore_%2886%29.jpg/960px-Basavanagudi_Kadalekai_Parishe_%282025%29_Bangalore_%2886%29.jpg",
      "isActive": true,
      "sortOrder": 2,
      "createdAt": "2026-10-24T04:14:47.094Z",
      "updatedAt": "2026-10-24T04:24:17.476Z"
    },
    "variants": [
      {
        "id": "cmvlwqxw70027pjq5a7wb1bxy",
        "productId": "cmvlvxkyo0013q0055mkgp026",
        "weight": "250g",
        "unit": null,
        "price": 110,
        "comparePrice": null,
        "stock": 50,
        "sku": null,
        "isActive": true
      },
      {
        "id": "cmvlwqxwc0029pjq51ji6p6iu",
        "productId": "cmvlvxkyo0013q0055mkgp026",
        "weight": "500g",
        "unit": null,
        "price": 220,
        "comparePrice": null,
        "stock": 50,
        "sku": null,
        "isActive": true
      },
      {
        "id": "cmvlwqxwh002bpjq5z1n28lse",
        "productId": "cmvlvxkyo0013q0055mkgp026",
        "weight": "1kg",
        "unit": null,
        "price": 440,
        "comparePrice": null,
        "stock": 50,
        "sku": null,
        "isActive": true
      }
    ],
    "images": [
      {
        "id": "cmvlwqxw00025pjq5spukmayb",
        "productId": "cmvlvxkyo0013q0055mkgp026",
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/39/Rasgulla.jpg/960px-Rasgulla.jpg",
        "altText": "Rasbhari",
        "sortOrder": 0
      }
    ]
  },
  {
    "id": "cmvlvxkys0019q005tq871zc4",
    "name": "Kala Jamun",
    "slug": "kala-jamun",
    "description": "Deep fried rich mawa dumplings with caramelized dark crust and dry fruit stuffing.",
    "categoryId": "cmvlvxkxh0002q005b8ykhq3t",
    "ingredients": null,
    "allergens": null,
    "isVegetarian": true,
    "isFeatured": false,
    "isBestSeller": true,
    "isActive": true,
    "priceConfigured": true,
    "createdAt": "2026-10-24T04:14:47.140Z",
    "updatedAt": "2026-10-24T04:37:36.968Z",
    "category": {
      "id": "cmvlvxkxh0002q005b8ykhq3t",
      "name": "Traditional Mithai",
      "slug": "traditional-mithai",
      "description": null,
      "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/96/Basavanagudi_Kadalekai_Parishe_%282025%29_Bangalore_%2886%29.jpg/960px-Basavanagudi_Kadalekai_Parishe_%282025%29_Bangalore_%2886%29.jpg",
      "isActive": true,
      "sortOrder": 2,
      "createdAt": "2026-10-24T04:14:47.094Z",
      "updatedAt": "2026-10-24T04:24:17.476Z"
    },
    "variants": [
      {
        "id": "cmvlwqxy4002npjq57b33mx73",
        "productId": "cmvlvxkys0019q005tq871zc4",
        "weight": "250g",
        "unit": null,
        "price": 130,
        "comparePrice": null,
        "stock": 50,
        "sku": null,
        "isActive": true
      },
      {
        "id": "cmvlwqxy9002ppjq5pl9zgdrm",
        "productId": "cmvlvxkys0019q005tq871zc4",
        "weight": "500g",
        "unit": null,
        "price": 260,
        "comparePrice": null,
        "stock": 50,
        "sku": null,
        "isActive": true
      },
      {
        "id": "cmvlwqxyd002rpjq55r1uxgkx",
        "productId": "cmvlvxkys0019q005tq871zc4",
        "weight": "1kg",
        "unit": null,
        "price": 520,
        "comparePrice": null,
        "stock": 50,
        "sku": null,
        "isActive": true
      }
    ],
    "images": [
      {
        "id": "cmvlwqxxv002lpjq5f2hiusgm",
        "productId": "cmvlvxkys0019q005tq871zc4",
        "url": "https://upload.wikimedia.org/wikipedia/commons/c/c1/Gulab-jamun-wallpaper-1.jpg",
        "altText": "Kala Jamun",
        "sortOrder": 0
      }
    ]
  },
  {
    "id": "cmvlvxkyv001fq005fvtsctcy",
    "name": "Spongy Bengali Rasgulla",
    "slug": "spongy-bengali-rasgulla",
    "description": "Super soft, airy, and juicy chhena balls soaked in pristine sugar syrup.",
    "categoryId": "cmvlvxkxh0002q005b8ykhq3t",
    "ingredients": null,
    "allergens": null,
    "isVegetarian": true,
    "isFeatured": false,
    "isBestSeller": true,
    "isActive": true,
    "priceConfigured": true,
    "createdAt": "2026-10-24T04:14:47.144Z",
    "updatedAt": "2026-10-24T04:37:36.934Z",
    "category": {
      "id": "cmvlvxkxh0002q005b8ykhq3t",
      "name": "Traditional Mithai",
      "slug": "traditional-mithai",
      "description": null,
      "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/96/Basavanagudi_Kadalekai_Parishe_%282025%29_Bangalore_%2886%29.jpg/960px-Basavanagudi_Kadalekai_Parishe_%282025%29_Bangalore_%2886%29.jpg",
      "isActive": true,
      "sortOrder": 2,
      "createdAt": "2026-10-24T04:14:47.094Z",
      "updatedAt": "2026-10-24T04:24:17.476Z"
    },
    "variants": [
      {
        "id": "cmvlwqxx5002fpjq5x5imk42c",
        "productId": "cmvlvxkyv001fq005fvtsctcy",
        "weight": "250g",
        "unit": null,
        "price": 130,
        "comparePrice": null,
        "stock": 50,
        "sku": null,
        "isActive": true
      },
      {
        "id": "cmvlwqxxa002hpjq5d73n3pwj",
        "productId": "cmvlvxkyv001fq005fvtsctcy",
        "weight": "500g",
        "unit": null,
        "price": 260,
        "comparePrice": null,
        "stock": 50,
        "sku": null,
        "isActive": true
      },
      {
        "id": "cmvlwqxxf002jpjq5uqwshlud",
        "productId": "cmvlvxkyv001fq005fvtsctcy",
        "weight": "1kg",
        "unit": null,
        "price": 520,
        "comparePrice": null,
        "stock": 50,
        "sku": null,
        "isActive": true
      }
    ],
    "images": [
      {
        "id": "cmvlwqxwv002dpjq5y1fsvvr3",
        "productId": "cmvlvxkyv001fq005fvtsctcy",
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/39/Rasgulla.jpg/960px-Rasgulla.jpg",
        "altText": "Spongy Bengali Rasgulla",
        "sortOrder": 0
      }
    ]
  },
  {
    "id": "cmvlvxkyz001lq005ztnvv3hg",
    "name": "Rajbhog",
    "slug": "rajbhog",
    "description": "Royal yellow chhena sweet stuffed with pistachios and infused with Kashmiri saffron.",
    "categoryId": "cmvlvxkxh0002q005b8ykhq3t",
    "ingredients": null,
    "allergens": null,
    "isVegetarian": true,
    "isFeatured": false,
    "isBestSeller": false,
    "isActive": true,
    "priceConfigured": true,
    "createdAt": "2026-10-24T04:14:47.147Z",
    "updatedAt": "2026-10-24T04:37:37.029Z",
    "category": {
      "id": "cmvlvxkxh0002q005b8ykhq3t",
      "name": "Traditional Mithai",
      "slug": "traditional-mithai",
      "description": null,
      "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/96/Basavanagudi_Kadalekai_Parishe_%282025%29_Bangalore_%2886%29.jpg/960px-Basavanagudi_Kadalekai_Parishe_%282025%29_Bangalore_%2886%29.jpg",
      "isActive": true,
      "sortOrder": 2,
      "createdAt": "2026-10-24T04:14:47.094Z",
      "updatedAt": "2026-10-24T04:24:17.476Z"
    },
    "variants": [
      {
        "id": "cmvlwqxzo0035pjq5oz7xtg70",
        "productId": "cmvlvxkyz001lq005ztnvv3hg",
        "weight": "2 pcs",
        "unit": null,
        "price": 80,
        "comparePrice": null,
        "stock": 50,
        "sku": null,
        "isActive": true
      },
      {
        "id": "cmvlwqxzr0037pjq5vwwhgl88",
        "productId": "cmvlvxkyz001lq005ztnvv3hg",
        "weight": "500g",
        "unit": null,
        "price": 280,
        "comparePrice": null,
        "stock": 50,
        "sku": null,
        "isActive": true
      }
    ],
    "images": [
      {
        "id": "cmvlwqxzg0033pjq5bl1tymzv",
        "productId": "cmvlvxkyz001lq005ztnvv3hg",
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/39/Rasgulla.jpg/960px-Rasgulla.jpg",
        "altText": "Rajbhog",
        "sortOrder": 0
      }
    ]
  },
  {
    "id": "cmvlvxkz2001qq005f4auxkob",
    "name": "Kesari Rasmalai",
    "slug": "kesari-rasmalai",
    "description": "Delicate cottage cheese patties immersed in chilled clotted saffron cream milk.",
    "categoryId": "cmvlvxkxh0002q005b8ykhq3t",
    "ingredients": null,
    "allergens": null,
    "isVegetarian": true,
    "isFeatured": true,
    "isBestSeller": true,
    "isActive": true,
    "priceConfigured": true,
    "createdAt": "2026-10-24T04:14:47.151Z",
    "updatedAt": "2026-10-24T04:37:37.051Z",
    "category": {
      "id": "cmvlvxkxh0002q005b8ykhq3t",
      "name": "Traditional Mithai",
      "slug": "traditional-mithai",
      "description": null,
      "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/96/Basavanagudi_Kadalekai_Parishe_%282025%29_Bangalore_%2886%29.jpg/960px-Basavanagudi_Kadalekai_Parishe_%282025%29_Bangalore_%2886%29.jpg",
      "isActive": true,
      "sortOrder": 2,
      "createdAt": "2026-10-24T04:14:47.094Z",
      "updatedAt": "2026-10-24T04:24:17.476Z"
    },
    "variants": [
      {
        "id": "cmvlwqy09003bpjq524b7pwfn",
        "productId": "cmvlvxkz2001qq005f4auxkob",
        "weight": "2 pcs",
        "unit": null,
        "price": 90,
        "comparePrice": null,
        "stock": 50,
        "sku": null,
        "isActive": true
      },
      {
        "id": "cmvlwqy0c003dpjq5yty10h5d",
        "productId": "cmvlvxkz2001qq005f4auxkob",
        "weight": "4 pcs",
        "unit": null,
        "price": 180,
        "comparePrice": null,
        "stock": 50,
        "sku": null,
        "isActive": true
      }
    ],
    "images": [
      {
        "id": "cmvlwqy030039pjq57o2anjc1",
        "productId": "cmvlvxkz2001qq005f4auxkob",
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ae/Ras_Malai_2.JPG/960px-Ras_Malai_2.JPG",
        "altText": "Kesari Rasmalai",
        "sortOrder": 0
      }
    ]
  },
  {
    "id": "cmvlvxkz6001vq0051l956o43",
    "name": "Kaju Katli (Pure Silver Vark)",
    "slug": "kaju-katli-pure-silver-vark",
    "description": "Diamond-shaped classic cashew fudge made from select high-grade cashews and real silver leaf.",
    "categoryId": "cmvlvxkxk0003q0053q1zfslb",
    "ingredients": null,
    "allergens": null,
    "isVegetarian": true,
    "isFeatured": true,
    "isBestSeller": true,
    "isActive": true,
    "priceConfigured": true,
    "createdAt": "2026-10-24T04:14:47.154Z",
    "updatedAt": "2026-10-24T04:37:37.156Z",
    "category": {
      "id": "cmvlvxkxk0003q0053q1zfslb",
      "name": "Kaju & Dry Fruits",
      "slug": "kaju-dry-fruits",
      "description": null,
      "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ac/Kaju_katli_sweet.jpg/960px-Kaju_katli_sweet.jpg",
      "isActive": true,
      "sortOrder": 3,
      "createdAt": "2026-10-24T04:14:47.097Z",
      "updatedAt": "2026-10-24T04:24:17.480Z"
    },
    "variants": [
      {
        "id": "cmvlwqy36004lpjq545nghs2g",
        "productId": "cmvlvxkz6001vq0051l956o43",
        "weight": "250g",
        "unit": null,
        "price": 280,
        "comparePrice": null,
        "stock": 50,
        "sku": null,
        "isActive": true
      },
      {
        "id": "cmvlwqy3a004npjq5nvafxah4",
        "productId": "cmvlvxkz6001vq0051l956o43",
        "weight": "500g",
        "unit": null,
        "price": 550,
        "comparePrice": null,
        "stock": 50,
        "sku": null,
        "isActive": true
      },
      {
        "id": "cmvlwqy3d004ppjq52alogrri",
        "productId": "cmvlvxkz6001vq0051l956o43",
        "weight": "1kg",
        "unit": null,
        "price": 1050,
        "comparePrice": null,
        "stock": 50,
        "sku": null,
        "isActive": true
      }
    ],
    "images": [
      {
        "id": "cmvlwqy2z004jpjq53tlqyjuq",
        "productId": "cmvlvxkz6001vq0051l956o43",
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ac/Kaju_katli_sweet.jpg/960px-Kaju_katli_sweet.jpg",
        "altText": "Kaju Katli (Pure Silver Vark)",
        "sortOrder": 0
      }
    ]
  },
  {
    "id": "cmvlvxkz90021q005g66ilv20",
    "name": "Kaju Anjeer Roll",
    "slug": "kaju-anjeer-roll",
    "description": "Rich paste of dried Afghan figs and chopped crunchy nuts rolled into cashew crust.",
    "categoryId": "cmvlvxkxk0003q0053q1zfslb",
    "ingredients": null,
    "allergens": null,
    "isVegetarian": true,
    "isFeatured": false,
    "isBestSeller": false,
    "isActive": true,
    "priceConfigured": true,
    "createdAt": "2026-10-24T04:14:47.157Z",
    "updatedAt": "2026-10-24T04:37:37.257Z",
    "category": {
      "id": "cmvlvxkxk0003q0053q1zfslb",
      "name": "Kaju & Dry Fruits",
      "slug": "kaju-dry-fruits",
      "description": null,
      "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ac/Kaju_katli_sweet.jpg/960px-Kaju_katli_sweet.jpg",
      "isActive": true,
      "sortOrder": 3,
      "createdAt": "2026-10-24T04:14:47.097Z",
      "updatedAt": "2026-10-24T04:24:17.480Z"
    },
    "variants": [
      {
        "id": "cmvlwqy60005ppjq5ekm6ivgb",
        "productId": "cmvlvxkz90021q005g66ilv20",
        "weight": "250g",
        "unit": null,
        "price": 320,
        "comparePrice": null,
        "stock": 50,
        "sku": null,
        "isActive": true
      },
      {
        "id": "cmvlwqy64005rpjq5m5v0x5i6",
        "productId": "cmvlvxkz90021q005g66ilv20",
        "weight": "500g",
        "unit": null,
        "price": 620,
        "comparePrice": null,
        "stock": 50,
        "sku": null,
        "isActive": true
      }
    ],
    "images": [
      {
        "id": "cmvlwqy5r005npjq5uct7u15a",
        "productId": "cmvlvxkz90021q005g66ilv20",
        "url": "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=800&q=80",
        "altText": "Kaju Anjeer Roll",
        "sortOrder": 0
      }
    ]
  },
  {
    "id": "cmvlvxkzc0026q00542r24f11",
    "name": "Kaju Paan",
    "slug": "kaju-paan",
    "description": "Exquisite betel-leaf shaped cashew sweet filled with aromatic gulkand and fennel.",
    "categoryId": "cmvlvxkxk0003q0053q1zfslb",
    "ingredients": null,
    "allergens": null,
    "isVegetarian": true,
    "isFeatured": false,
    "isBestSeller": false,
    "isActive": true,
    "priceConfigured": true,
    "createdAt": "2026-10-24T04:14:47.160Z",
    "updatedAt": "2026-10-24T04:37:37.281Z",
    "category": {
      "id": "cmvlvxkxk0003q0053q1zfslb",
      "name": "Kaju & Dry Fruits",
      "slug": "kaju-dry-fruits",
      "description": null,
      "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ac/Kaju_katli_sweet.jpg/960px-Kaju_katli_sweet.jpg",
      "isActive": true,
      "sortOrder": 3,
      "createdAt": "2026-10-24T04:14:47.097Z",
      "updatedAt": "2026-10-24T04:24:17.480Z"
    },
    "variants": [
      {
        "id": "cmvlwqy6o005vpjq5zgyvi5f3",
        "productId": "cmvlvxkzc0026q00542r24f11",
        "weight": "250g",
        "unit": null,
        "price": 310,
        "comparePrice": null,
        "stock": 50,
        "sku": null,
        "isActive": true
      },
      {
        "id": "cmvlwqy6s005xpjq56qr5bzap",
        "productId": "cmvlvxkzc0026q00542r24f11",
        "weight": "500g",
        "unit": null,
        "price": 600,
        "comparePrice": null,
        "stock": 50,
        "sku": null,
        "isActive": true
      }
    ],
    "images": [
      {
        "id": "cmvlwqy6h005tpjq5ar74lzyc",
        "productId": "cmvlvxkzc0026q00542r24f11",
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ac/Kaju_katli_sweet.jpg/960px-Kaju_katli_sweet.jpg",
        "altText": "Kaju Paan",
        "sortOrder": 0
      }
    ]
  },
  {
    "id": "cmvlvxkzf002bq0050bj4btv6",
    "name": "Special Milk Cake",
    "slug": "special-milk-cake",
    "description": "Grainy, caramelized milk delicacy prepared by slow cooking full cream dairy milk.",
    "categoryId": "cmvlvxkxo0004q005c3y2vep8",
    "ingredients": null,
    "allergens": null,
    "isVegetarian": true,
    "isFeatured": true,
    "isBestSeller": true,
    "isActive": true,
    "priceConfigured": true,
    "createdAt": "2026-10-24T04:14:47.164Z",
    "updatedAt": "2026-10-24T04:37:37.335Z",
    "category": {
      "id": "cmvlvxkxo0004q005c3y2vep8",
      "name": "Barfi & Milk Sweets",
      "slug": "barfi-milk-sweets",
      "description": null,
      "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f1/Almond_Khoa_based_burfi_Mumbai_India_%28cropped%29.jpg/960px-Almond_Khoa_based_burfi_Mumbai_India_%28cropped%29.jpg",
      "isActive": true,
      "sortOrder": 4,
      "createdAt": "2026-10-24T04:14:47.100Z",
      "updatedAt": "2026-10-24T04:24:17.486Z"
    },
    "variants": [
      {
        "id": "cmvlwqy84006hpjq51znya0jq",
        "productId": "cmvlvxkzf002bq0050bj4btv6",
        "weight": "250g",
        "unit": null,
        "price": 160,
        "comparePrice": null,
        "stock": 50,
        "sku": null,
        "isActive": true
      },
      {
        "id": "cmvlwqy86006jpjq5j39be5mz",
        "productId": "cmvlvxkzf002bq0050bj4btv6",
        "weight": "500g",
        "unit": null,
        "price": 320,
        "comparePrice": null,
        "stock": 50,
        "sku": null,
        "isActive": true
      },
      {
        "id": "cmvlwqy8a006lpjq5jdlsxypd",
        "productId": "cmvlvxkzf002bq0050bj4btv6",
        "weight": "1kg",
        "unit": null,
        "price": 640,
        "comparePrice": null,
        "stock": 50,
        "sku": null,
        "isActive": true
      }
    ],
    "images": [
      {
        "id": "cmvlwqy7x006fpjq5niakgbj6",
        "productId": "cmvlvxkzf002bq0050bj4btv6",
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f1/Almond_Khoa_based_burfi_Mumbai_India_%28cropped%29.jpg/960px-Almond_Khoa_based_burfi_Mumbai_India_%28cropped%29.jpg",
        "altText": "Special Milk Cake",
        "sortOrder": 0
      }
    ]
  },
  {
    "id": "cmvlvxkzk002hq005y9zlruhq",
    "name": "Doda Barfi",
    "slug": "doda-barfi",
    "description": "Traditional dark fudgy sweet made with sprouted wheat, milk, nuts, and pure ghee.",
    "categoryId": "cmvlvxkxo0004q005c3y2vep8",
    "ingredients": null,
    "allergens": null,
    "isVegetarian": true,
    "isFeatured": false,
    "isBestSeller": true,
    "isActive": true,
    "priceConfigured": true,
    "createdAt": "2026-10-24T04:14:47.169Z",
    "updatedAt": "2026-10-24T04:37:37.376Z",
    "category": {
      "id": "cmvlvxkxo0004q005c3y2vep8",
      "name": "Barfi & Milk Sweets",
      "slug": "barfi-milk-sweets",
      "description": null,
      "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f1/Almond_Khoa_based_burfi_Mumbai_India_%28cropped%29.jpg/960px-Almond_Khoa_based_burfi_Mumbai_India_%28cropped%29.jpg",
      "isActive": true,
      "sortOrder": 4,
      "createdAt": "2026-10-24T04:14:47.100Z",
      "updatedAt": "2026-10-24T04:24:17.486Z"
    },
    "variants": [
      {
        "id": "cmvlwqy98006zpjq51vo6pxeg",
        "productId": "cmvlvxkzk002hq005y9zlruhq",
        "weight": "250g",
        "unit": null,
        "price": 155,
        "comparePrice": null,
        "stock": 50,
        "sku": null,
        "isActive": true
      },
      {
        "id": "cmvlwqy9c0071pjq5cpg7rsix",
        "productId": "cmvlvxkzk002hq005y9zlruhq",
        "weight": "500g",
        "unit": null,
        "price": 310,
        "comparePrice": null,
        "stock": 50,
        "sku": null,
        "isActive": true
      },
      {
        "id": "cmvlwqy9f0073pjq5up5dtgx3",
        "productId": "cmvlvxkzk002hq005y9zlruhq",
        "weight": "1kg",
        "unit": null,
        "price": 620,
        "comparePrice": null,
        "stock": 50,
        "sku": null,
        "isActive": true
      }
    ],
    "images": [
      {
        "id": "cmvlwqy92006xpjq57p3fshjl",
        "productId": "cmvlvxkzk002hq005y9zlruhq",
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f1/Almond_Khoa_based_burfi_Mumbai_India_%28cropped%29.jpg/960px-Almond_Khoa_based_burfi_Mumbai_India_%28cropped%29.jpg",
        "altText": "Doda Barfi",
        "sortOrder": 0
      }
    ]
  },
  {
    "id": "cmvlvxkzo002nq005jpzd4v7g",
    "name": "Bikaneri Peda",
    "slug": "bikaneri-peda",
    "description": "Creamy semi-soft mawa sweet flavoured with green cardamom and saffron.",
    "categoryId": "cmvlvxkxo0004q005c3y2vep8",
    "ingredients": null,
    "allergens": null,
    "isVegetarian": true,
    "isFeatured": false,
    "isBestSeller": false,
    "isActive": true,
    "priceConfigured": true,
    "createdAt": "2026-10-24T04:14:47.173Z",
    "updatedAt": "2026-10-24T04:14:47.173Z",
    "category": {
      "id": "cmvlvxkxo0004q005c3y2vep8",
      "name": "Barfi & Milk Sweets",
      "slug": "barfi-milk-sweets",
      "description": null,
      "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f1/Almond_Khoa_based_burfi_Mumbai_India_%28cropped%29.jpg/960px-Almond_Khoa_based_burfi_Mumbai_India_%28cropped%29.jpg",
      "isActive": true,
      "sortOrder": 4,
      "createdAt": "2026-10-24T04:14:47.100Z",
      "updatedAt": "2026-10-24T04:24:17.486Z"
    },
    "variants": [
      {
        "id": "cmvlvxkzo002pq00597uiy7u8",
        "productId": "cmvlvxkzo002nq005jpzd4v7g",
        "weight": "250g",
        "unit": null,
        "price": 140,
        "comparePrice": null,
        "stock": 50,
        "sku": null,
        "isActive": true
      },
      {
        "id": "cmvlvxkzo002qq0053t2lhxpr",
        "productId": "cmvlvxkzo002nq005jpzd4v7g",
        "weight": "500g",
        "unit": null,
        "price": 280,
        "comparePrice": null,
        "stock": 50,
        "sku": null,
        "isActive": true
      }
    ],
    "images": [
      {
        "id": "cmvlw9t7z000x5chn8jwh7sa1",
        "productId": "cmvlvxkzo002nq005jpzd4v7g",
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/91/Indian_Sweet_Dessert_Peda_in_a_white_bone_china_plate.jpg/960px-Indian_Sweet_Dessert_Peda_in_a_white_bone_china_plate.jpg",
        "altText": "Bikaneri Peda",
        "sortOrder": 0
      }
    ]
  },
  {
    "id": "cmvlvxkzs002sq005ca4oo4gu",
    "name": "5 Star Laddu",
    "slug": "5-star-laddu",
    "description": "Signature rich dry-fruit loaded royal laddu made in pure Bikaner desi ghee.",
    "categoryId": "cmvlvxkxr0005q005xepsh40r",
    "ingredients": null,
    "allergens": null,
    "isVegetarian": true,
    "isFeatured": true,
    "isBestSeller": true,
    "isActive": true,
    "priceConfigured": true,
    "createdAt": "2026-10-24T04:14:47.176Z",
    "updatedAt": "2026-10-24T04:37:37.456Z",
    "category": {
      "id": "cmvlvxkxr0005q005xepsh40r",
      "name": "Laddu",
      "slug": "laddu",
      "description": null,
      "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c1/Laddu_Sweet.JPG/960px-Laddu_Sweet.JPG",
      "isActive": true,
      "sortOrder": 5,
      "createdAt": "2026-10-24T04:14:47.103Z",
      "updatedAt": "2026-10-24T04:24:17.491Z"
    },
    "variants": [
      {
        "id": "cmvlwqybg0083pjq5t8e9zivl",
        "productId": "cmvlvxkzs002sq005ca4oo4gu",
        "weight": "250g",
        "unit": null,
        "price": 430,
        "comparePrice": null,
        "stock": 50,
        "sku": null,
        "isActive": true
      },
      {
        "id": "cmvlwqybj0085pjq5tobnh1rm",
        "productId": "cmvlvxkzs002sq005ca4oo4gu",
        "weight": "500g",
        "unit": null,
        "price": 850,
        "comparePrice": null,
        "stock": 50,
        "sku": null,
        "isActive": true
      },
      {
        "id": "cmvlwqybm0087pjq5bqrhxxbx",
        "productId": "cmvlvxkzs002sq005ca4oo4gu",
        "weight": "1kg",
        "unit": null,
        "price": 1700,
        "comparePrice": null,
        "stock": 50,
        "sku": null,
        "isActive": true
      }
    ],
    "images": [
      {
        "id": "cmvlwqyba0081pjq5qgdu57nq",
        "productId": "cmvlvxkzs002sq005ca4oo4gu",
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c1/Laddu_Sweet.JPG/960px-Laddu_Sweet.JPG",
        "altText": "5 Star Laddu",
        "sortOrder": 0
      }
    ]
  },
  {
    "id": "cmvlvxkzv002yq005vdtex05p",
    "name": "Motichoor Desi Ghee Laddu",
    "slug": "motichoor-desi-ghee-laddu",
    "description": "Tiny gram flour pearls fried in pure ghee, simmered in sugar syrup and shaped into aromatic laddus.",
    "categoryId": "cmvlvxkxr0005q005xepsh40r",
    "ingredients": null,
    "allergens": null,
    "isVegetarian": true,
    "isFeatured": true,
    "isBestSeller": true,
    "isActive": true,
    "priceConfigured": true,
    "createdAt": "2026-10-24T04:14:47.180Z",
    "updatedAt": "2026-10-24T04:37:37.479Z",
    "category": {
      "id": "cmvlvxkxr0005q005xepsh40r",
      "name": "Laddu",
      "slug": "laddu",
      "description": null,
      "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c1/Laddu_Sweet.JPG/960px-Laddu_Sweet.JPG",
      "isActive": true,
      "sortOrder": 5,
      "createdAt": "2026-10-24T04:14:47.103Z",
      "updatedAt": "2026-10-24T04:24:17.491Z"
    },
    "variants": [
      {
        "id": "cmvlwqyc2008bpjq5q6q2uwfc",
        "productId": "cmvlvxkzv002yq005vdtex05p",
        "weight": "250g",
        "unit": null,
        "price": 120,
        "comparePrice": null,
        "stock": 50,
        "sku": null,
        "isActive": true
      },
      {
        "id": "cmvlwqyc6008dpjq5uc4t1mwj",
        "productId": "cmvlvxkzv002yq005vdtex05p",
        "weight": "500g",
        "unit": null,
        "price": 240,
        "comparePrice": null,
        "stock": 50,
        "sku": null,
        "isActive": true
      },
      {
        "id": "cmvlwqyc9008fpjq57qhgro3w",
        "productId": "cmvlvxkzv002yq005vdtex05p",
        "weight": "1kg",
        "unit": null,
        "price": 480,
        "comparePrice": null,
        "stock": 50,
        "sku": null,
        "isActive": true
      }
    ],
    "images": [
      {
        "id": "cmvlwqybw0089pjq58nbumuti",
        "productId": "cmvlvxkzv002yq005vdtex05p",
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c1/Laddu_Sweet.JPG/960px-Laddu_Sweet.JPG",
        "altText": "Motichoor Desi Ghee Laddu",
        "sortOrder": 0
      }
    ]
  },
  {
    "id": "cmvlvxkzz0034q0058bh4suym",
    "name": "Besan Laddu",
    "slug": "besan-laddu",
    "description": "Roasted gram flour with pure ghee, sugar, cardamom, and almond flakes.",
    "categoryId": "cmvlvxkxr0005q005xepsh40r",
    "ingredients": null,
    "allergens": null,
    "isVegetarian": true,
    "isFeatured": false,
    "isBestSeller": false,
    "isActive": true,
    "priceConfigured": true,
    "createdAt": "2026-10-24T04:14:47.183Z",
    "updatedAt": "2026-10-24T04:14:47.183Z",
    "category": {
      "id": "cmvlvxkxr0005q005xepsh40r",
      "name": "Laddu",
      "slug": "laddu",
      "description": null,
      "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c1/Laddu_Sweet.JPG/960px-Laddu_Sweet.JPG",
      "isActive": true,
      "sortOrder": 5,
      "createdAt": "2026-10-24T04:14:47.103Z",
      "updatedAt": "2026-10-24T04:24:17.491Z"
    },
    "variants": [
      {
        "id": "cmvlvxkzz0036q0057f6thdqe",
        "productId": "cmvlvxkzz0034q0058bh4suym",
        "weight": "250g",
        "unit": null,
        "price": 125,
        "comparePrice": null,
        "stock": 50,
        "sku": null,
        "isActive": true
      },
      {
        "id": "cmvlvxkzz0037q005lz136x5x",
        "productId": "cmvlvxkzz0034q0058bh4suym",
        "weight": "500g",
        "unit": null,
        "price": 250,
        "comparePrice": null,
        "stock": 50,
        "sku": null,
        "isActive": true
      }
    ],
    "images": [
      {
        "id": "cmvlw9t8v00135chnr8xqrwog",
        "productId": "cmvlvxkzz0034q0058bh4suym",
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c1/Laddu_Sweet.JPG/960px-Laddu_Sweet.JPG",
        "altText": "Besan Laddu",
        "sortOrder": 0
      }
    ]
  },
  {
    "id": "cmvlvxl09003kq0059q7m2rls",
    "name": "Chhappan Bhog Mix Gift Box",
    "slug": "chhappan-bhog-mix-gift-box",
    "description": "Curated celebration gift box packed with Kaju Katli, Milk Cake, Dry Fruit Laddu, and Peda.",
    "categoryId": "cmvlvxkxu0006q005inhelkqy",
    "ingredients": null,
    "allergens": null,
    "isVegetarian": true,
    "isFeatured": true,
    "isBestSeller": false,
    "isActive": true,
    "priceConfigured": true,
    "createdAt": "2026-10-24T04:14:47.194Z",
    "updatedAt": "2026-10-24T04:14:47.194Z",
    "category": {
      "id": "cmvlvxkxu0006q005inhelkqy",
      "name": "Festive Sweet Gift Boxes",
      "slug": "festive-gift-boxes",
      "description": null,
      "image": "https://upload.wikimedia.org/wikipedia/commons/a/aa/Indian_Sweets.JPG",
      "isActive": true,
      "sortOrder": 6,
      "createdAt": "2026-10-24T04:14:47.107Z",
      "updatedAt": "2026-10-24T04:39:50.958Z"
    },
    "variants": [
      {
        "id": "cmvlvxl09003mq0059c9ejauf",
        "productId": "cmvlvxl09003kq0059q7m2rls",
        "weight": "500g Box",
        "unit": null,
        "price": 420,
        "comparePrice": null,
        "stock": 50,
        "sku": null,
        "isActive": true
      },
      {
        "id": "cmvlvxl09003nq005n75qbig2",
        "productId": "cmvlvxl09003kq0059q7m2rls",
        "weight": "1kg Royal Box",
        "unit": null,
        "price": 820,
        "comparePrice": null,
        "stock": 50,
        "sku": null,
        "isActive": true
      }
    ],
    "images": [
      {
        "id": "cmvlw9t9r00195chngbr63zws",
        "productId": "cmvlvxl09003kq0059q7m2rls",
        "url": "https://upload.wikimedia.org/wikipedia/commons/a/aa/Indian_Sweets.JPG",
        "altText": "Chhappan Bhog Mix Gift Box",
        "sortOrder": 0
      }
    ]
  },
  {
    "id": "cmvlwqxq70007pjq5byahzewg",
    "name": "Samosa Chaat",
    "slug": "samosa-chaat",
    "description": "Crushed hot samosa layered with chhole gravy, sweet yogurt, spicy mint chutney, and sev.",
    "categoryId": "cmvlvxkxe0001q005ura3oa4s",
    "ingredients": null,
    "allergens": null,
    "isVegetarian": true,
    "isFeatured": false,
    "isBestSeller": true,
    "isActive": true,
    "priceConfigured": true,
    "createdAt": "2026-10-24T04:37:36.703Z",
    "updatedAt": "2026-10-24T04:37:36.703Z",
    "category": {
      "id": "cmvlvxkxe0001q005ura3oa4s",
      "name": "Snacks & Chaat",
      "slug": "snacks-chaat",
      "description": null,
      "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c4/Samosas%2C_snack_food_at_Wikipedia%27s_16th_Birthday_celebration_in_Chittagong_%2801%29.jpg/960px-Samosas%2C_snack_food_at_Wikipedia%27s_16th_Birthday_celebration_in_Chittagong_%2801%29.jpg",
      "isActive": true,
      "sortOrder": 1,
      "createdAt": "2026-10-24T04:14:47.091Z",
      "updatedAt": "2026-10-24T04:24:17.469Z"
    },
    "variants": [
      {
        "id": "cmvlwqxqf000bpjq5batlqfam",
        "productId": "cmvlwqxq70007pjq5byahzewg",
        "weight": "1 Plate",
        "unit": null,
        "price": 60,
        "comparePrice": null,
        "stock": 50,
        "sku": null,
        "isActive": true
      }
    ],
    "images": [
      {
        "id": "cmvlwqxqb0009pjq5alj2wcuk",
        "productId": "cmvlwqxq70007pjq5byahzewg",
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a0/Dahi_puri%2C_Doi_phuchka.jpg/960px-Dahi_puri%2C_Doi_phuchka.jpg",
        "altText": "Samosa Chaat",
        "sortOrder": 0
      }
    ]
  },
  {
    "id": "cmvlwqxsr000vpjq5iz8tmu89",
    "name": "Suji Golgappe",
    "slug": "suji-golgappe",
    "description": "Extra crunchy semolina puris served with chilled hing-zeera pani and sweet chutney.",
    "categoryId": "cmvlvxkxe0001q005ura3oa4s",
    "ingredients": null,
    "allergens": null,
    "isVegetarian": true,
    "isFeatured": false,
    "isBestSeller": false,
    "isActive": true,
    "priceConfigured": true,
    "createdAt": "2026-10-24T04:37:36.795Z",
    "updatedAt": "2026-10-24T04:37:36.795Z",
    "category": {
      "id": "cmvlvxkxe0001q005ura3oa4s",
      "name": "Snacks & Chaat",
      "slug": "snacks-chaat",
      "description": null,
      "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c4/Samosas%2C_snack_food_at_Wikipedia%27s_16th_Birthday_celebration_in_Chittagong_%2801%29.jpg/960px-Samosas%2C_snack_food_at_Wikipedia%27s_16th_Birthday_celebration_in_Chittagong_%2801%29.jpg",
      "isActive": true,
      "sortOrder": 1,
      "createdAt": "2026-10-24T04:14:47.091Z",
      "updatedAt": "2026-10-24T04:24:17.469Z"
    },
    "variants": [
      {
        "id": "cmvlwqxsy000zpjq52kxsqvyo",
        "productId": "cmvlwqxsr000vpjq5iz8tmu89",
        "weight": "Pack of 10 pcs",
        "unit": null,
        "price": 60,
        "comparePrice": null,
        "stock": 50,
        "sku": null,
        "isActive": true
      }
    ],
    "images": [
      {
        "id": "cmvlwqxsu000xpjq5g53mvfog",
        "productId": "cmvlwqxsr000vpjq5iz8tmu89",
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e9/Pani_Puri1.JPG/960px-Pani_Puri1.JPG",
        "altText": "Suji Golgappe",
        "sortOrder": 0
      }
    ]
  },
  {
    "id": "cmvlwqxt30011pjq5k6vw69e8",
    "name": "Khasta Kachori",
    "slug": "khasta-kachori",
    "description": "Crispy flaky puffed pastry stuffed with spiced urad dal filling and hing aroma.",
    "categoryId": "cmvlvxkxe0001q005ura3oa4s",
    "ingredients": null,
    "allergens": null,
    "isVegetarian": true,
    "isFeatured": false,
    "isBestSeller": true,
    "isActive": true,
    "priceConfigured": true,
    "createdAt": "2026-10-24T04:37:36.808Z",
    "updatedAt": "2026-10-24T04:37:36.808Z",
    "category": {
      "id": "cmvlvxkxe0001q005ura3oa4s",
      "name": "Snacks & Chaat",
      "slug": "snacks-chaat",
      "description": null,
      "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c4/Samosas%2C_snack_food_at_Wikipedia%27s_16th_Birthday_celebration_in_Chittagong_%2801%29.jpg/960px-Samosas%2C_snack_food_at_Wikipedia%27s_16th_Birthday_celebration_in_Chittagong_%2801%29.jpg",
      "isActive": true,
      "sortOrder": 1,
      "createdAt": "2026-10-24T04:14:47.091Z",
      "updatedAt": "2026-10-24T04:24:17.469Z"
    },
    "variants": [
      {
        "id": "cmvlwqxta0015pjq5bl991e61",
        "productId": "cmvlwqxt30011pjq5k6vw69e8",
        "weight": "2 pieces",
        "unit": null,
        "price": 50,
        "comparePrice": null,
        "stock": 50,
        "sku": null,
        "isActive": true
      },
      {
        "id": "cmvlwqxte0017pjq5lc6sxvjt",
        "productId": "cmvlwqxt30011pjq5k6vw69e8",
        "weight": "4 pieces",
        "unit": null,
        "price": 100,
        "comparePrice": null,
        "stock": 50,
        "sku": null,
        "isActive": true
      }
    ],
    "images": [
      {
        "id": "cmvlwqxt70013pjq56965bn8r",
        "productId": "cmvlwqxt30011pjq5k6vw69e8",
        "url": "https://upload.wikimedia.org/wikipedia/commons/8/8f/Rajasthani_Raj_Kachori.jpg",
        "altText": "Khasta Kachori",
        "sortOrder": 0
      }
    ]
  },
  {
    "id": "cmvlwqxtk0019pjq5x14e1vjm",
    "name": "Papdi Mathri",
    "slug": "papdi-mathri",
    "description": "Traditional crisp and flaky salted savory crackers, perfect with evening tea.",
    "categoryId": "cmvlvxkxe0001q005ura3oa4s",
    "ingredients": null,
    "allergens": null,
    "isVegetarian": true,
    "isFeatured": false,
    "isBestSeller": false,
    "isActive": true,
    "priceConfigured": true,
    "createdAt": "2026-10-24T04:37:36.824Z",
    "updatedAt": "2026-10-24T04:37:36.824Z",
    "category": {
      "id": "cmvlvxkxe0001q005ura3oa4s",
      "name": "Snacks & Chaat",
      "slug": "snacks-chaat",
      "description": null,
      "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c4/Samosas%2C_snack_food_at_Wikipedia%27s_16th_Birthday_celebration_in_Chittagong_%2801%29.jpg/960px-Samosas%2C_snack_food_at_Wikipedia%27s_16th_Birthday_celebration_in_Chittagong_%2801%29.jpg",
      "isActive": true,
      "sortOrder": 1,
      "createdAt": "2026-10-24T04:14:47.091Z",
      "updatedAt": "2026-10-24T04:24:17.469Z"
    },
    "variants": [
      {
        "id": "cmvlwqxtr001dpjq5gilmqakc",
        "productId": "cmvlwqxtk0019pjq5x14e1vjm",
        "weight": "500g Pack",
        "unit": null,
        "price": 140,
        "comparePrice": null,
        "stock": 50,
        "sku": null,
        "isActive": true
      },
      {
        "id": "cmvlwqxtw001fpjq5bks49553",
        "productId": "cmvlwqxtk0019pjq5x14e1vjm",
        "weight": "1kg Pack",
        "unit": null,
        "price": 280,
        "comparePrice": null,
        "stock": 50,
        "sku": null,
        "isActive": true
      }
    ],
    "images": [
      {
        "id": "cmvlwqxtn001bpjq552zsnebz",
        "productId": "cmvlwqxtk0019pjq5x14e1vjm",
        "url": "https://upload.wikimedia.org/wikipedia/commons/8/8f/Rajasthani_Raj_Kachori.jpg",
        "altText": "Papdi Mathri",
        "sortOrder": 0
      }
    ]
  },
  {
    "id": "cmvlwqxuq001ppjq5x67dcl6a",
    "name": "Paneer Jalebi",
    "slug": "paneer-jalebi",
    "description": "Soft cottage-cheese spirals fried till deep golden and immersed in thick cardamom syrup.",
    "categoryId": "cmvlvxkxh0002q005b8ykhq3t",
    "ingredients": null,
    "allergens": null,
    "isVegetarian": true,
    "isFeatured": false,
    "isBestSeller": true,
    "isActive": true,
    "priceConfigured": true,
    "createdAt": "2026-10-24T04:37:36.866Z",
    "updatedAt": "2026-10-24T04:37:36.866Z",
    "category": {
      "id": "cmvlvxkxh0002q005b8ykhq3t",
      "name": "Traditional Mithai",
      "slug": "traditional-mithai",
      "description": null,
      "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/96/Basavanagudi_Kadalekai_Parishe_%282025%29_Bangalore_%2886%29.jpg/960px-Basavanagudi_Kadalekai_Parishe_%282025%29_Bangalore_%2886%29.jpg",
      "isActive": true,
      "sortOrder": 2,
      "createdAt": "2026-10-24T04:14:47.094Z",
      "updatedAt": "2026-10-24T04:24:17.476Z"
    },
    "variants": [
      {
        "id": "cmvlwqxuy001tpjq5igw62gch",
        "productId": "cmvlwqxuq001ppjq5x67dcl6a",
        "weight": "250g",
        "unit": null,
        "price": 140,
        "comparePrice": null,
        "stock": 50,
        "sku": null,
        "isActive": true
      },
      {
        "id": "cmvlwqxv1001vpjq5i9oumt2p",
        "productId": "cmvlwqxuq001ppjq5x67dcl6a",
        "weight": "500g",
        "unit": null,
        "price": 280,
        "comparePrice": null,
        "stock": 50,
        "sku": null,
        "isActive": true
      }
    ],
    "images": [
      {
        "id": "cmvlwqxuu001rpjq531meki8j",
        "productId": "cmvlwqxuq001ppjq5x67dcl6a",
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/96/Basavanagudi_Kadalekai_Parishe_%282025%29_Bangalore_%2886%29.jpg/960px-Basavanagudi_Kadalekai_Parishe_%282025%29_Bangalore_%2886%29.jpg",
        "altText": "Paneer Jalebi",
        "sortOrder": 0
      }
    ]
  },
  {
    "id": "cmvlwqxv6001xpjq5bto09xnq",
    "name": "Shahi Imarti",
    "slug": "shahi-imarti",
    "description": "Intricately swirled urad dal sweet fried in pure desi ghee and glazed with saffron syrup.",
    "categoryId": "cmvlvxkxh0002q005b8ykhq3t",
    "ingredients": null,
    "allergens": null,
    "isVegetarian": true,
    "isFeatured": false,
    "isBestSeller": false,
    "isActive": true,
    "priceConfigured": true,
    "createdAt": "2026-10-24T04:37:36.882Z",
    "updatedAt": "2026-10-24T04:37:36.882Z",
    "category": {
      "id": "cmvlvxkxh0002q005b8ykhq3t",
      "name": "Traditional Mithai",
      "slug": "traditional-mithai",
      "description": null,
      "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/96/Basavanagudi_Kadalekai_Parishe_%282025%29_Bangalore_%2886%29.jpg/960px-Basavanagudi_Kadalekai_Parishe_%282025%29_Bangalore_%2886%29.jpg",
      "isActive": true,
      "sortOrder": 2,
      "createdAt": "2026-10-24T04:14:47.094Z",
      "updatedAt": "2026-10-24T04:24:17.476Z"
    },
    "variants": [
      {
        "id": "cmvlwqxvg0021pjq5k7hco671",
        "productId": "cmvlwqxv6001xpjq5bto09xnq",
        "weight": "250g",
        "unit": null,
        "price": 110,
        "comparePrice": null,
        "stock": 50,
        "sku": null,
        "isActive": true
      },
      {
        "id": "cmvlwqxvl0023pjq59wao87eh",
        "productId": "cmvlwqxv6001xpjq5bto09xnq",
        "weight": "500g",
        "unit": null,
        "price": 220,
        "comparePrice": null,
        "stock": 50,
        "sku": null,
        "isActive": true
      }
    ],
    "images": [
      {
        "id": "cmvlwqxvb001zpjq5yutntder",
        "productId": "cmvlwqxv6001xpjq5bto09xnq",
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e6/JalebiIndia.jpg/960px-JalebiIndia.jpg",
        "altText": "Shahi Imarti",
        "sortOrder": 0
      }
    ]
  },
  {
    "id": "cmvlwqxyj002tpjq5sqxtbegg",
    "name": "Gulab Jamun (Desi Ghee)",
    "slug": "gulab-jamun-desi-ghee",
    "description": "Melt-in-mouth golden khoya dumplings gently soaked in rose-cardamom sugar syrup.",
    "categoryId": "cmvlvxkxh0002q005b8ykhq3t",
    "ingredients": null,
    "allergens": null,
    "isVegetarian": true,
    "isFeatured": true,
    "isBestSeller": true,
    "isActive": true,
    "priceConfigured": true,
    "createdAt": "2026-10-24T04:37:37.004Z",
    "updatedAt": "2026-10-24T04:37:37.004Z",
    "category": {
      "id": "cmvlvxkxh0002q005b8ykhq3t",
      "name": "Traditional Mithai",
      "slug": "traditional-mithai",
      "description": null,
      "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/96/Basavanagudi_Kadalekai_Parishe_%282025%29_Bangalore_%2886%29.jpg/960px-Basavanagudi_Kadalekai_Parishe_%282025%29_Bangalore_%2886%29.jpg",
      "isActive": true,
      "sortOrder": 2,
      "createdAt": "2026-10-24T04:14:47.094Z",
      "updatedAt": "2026-10-24T04:24:17.476Z"
    },
    "variants": [
      {
        "id": "cmvlwqxyt002xpjq5pmiwuaow",
        "productId": "cmvlwqxyj002tpjq5sqxtbegg",
        "weight": "250g",
        "unit": null,
        "price": 125,
        "comparePrice": null,
        "stock": 50,
        "sku": null,
        "isActive": true
      },
      {
        "id": "cmvlwqxyy002zpjq5ju1yh918",
        "productId": "cmvlwqxyj002tpjq5sqxtbegg",
        "weight": "500g",
        "unit": null,
        "price": 250,
        "comparePrice": null,
        "stock": 50,
        "sku": null,
        "isActive": true
      },
      {
        "id": "cmvlwqxz30031pjq58vsvqx1i",
        "productId": "cmvlwqxyj002tpjq5sqxtbegg",
        "weight": "1kg",
        "unit": null,
        "price": 500,
        "comparePrice": null,
        "stock": 50,
        "sku": null,
        "isActive": true
      }
    ],
    "images": [
      {
        "id": "cmvlwqxyp002vpjq5ju4j4nkj",
        "productId": "cmvlwqxyj002tpjq5sqxtbegg",
        "url": "https://upload.wikimedia.org/wikipedia/commons/c/c1/Gulab-jamun-wallpaper-1.jpg",
        "altText": "Gulab Jamun (Desi Ghee)",
        "sortOrder": 0
      }
    ]
  },
  {
    "id": "cmvlwqy0i003fpjq56cey6v51",
    "name": "Angoori Petha",
    "slug": "angoori-petha",
    "description": "Translucent grape-sized ash gourd candied sweets soaked in sugar syrup.",
    "categoryId": "cmvlvxkxh0002q005b8ykhq3t",
    "ingredients": null,
    "allergens": null,
    "isVegetarian": true,
    "isFeatured": false,
    "isBestSeller": false,
    "isActive": true,
    "priceConfigured": true,
    "createdAt": "2026-10-24T04:37:37.074Z",
    "updatedAt": "2026-10-24T04:37:37.074Z",
    "category": {
      "id": "cmvlvxkxh0002q005b8ykhq3t",
      "name": "Traditional Mithai",
      "slug": "traditional-mithai",
      "description": null,
      "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/96/Basavanagudi_Kadalekai_Parishe_%282025%29_Bangalore_%2886%29.jpg/960px-Basavanagudi_Kadalekai_Parishe_%282025%29_Bangalore_%2886%29.jpg",
      "isActive": true,
      "sortOrder": 2,
      "createdAt": "2026-10-24T04:14:47.094Z",
      "updatedAt": "2026-10-24T04:24:17.476Z"
    },
    "variants": [
      {
        "id": "cmvlwqy0o003jpjq56jkp1b9b",
        "productId": "cmvlwqy0i003fpjq56cey6v51",
        "weight": "500g",
        "unit": null,
        "price": 160,
        "comparePrice": null,
        "stock": 50,
        "sku": null,
        "isActive": true
      },
      {
        "id": "cmvlwqy0r003lpjq5gf225e1f",
        "productId": "cmvlwqy0i003fpjq56cey6v51",
        "weight": "1kg",
        "unit": null,
        "price": 300,
        "comparePrice": null,
        "stock": 50,
        "sku": null,
        "isActive": true
      }
    ],
    "images": [
      {
        "id": "cmvlwqy0l003hpjq59cpm5d2f",
        "productId": "cmvlwqy0i003fpjq56cey6v51",
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/bc/Petha_kesari.JPG/960px-Petha_kesari.JPG",
        "altText": "Angoori Petha",
        "sortOrder": 0
      }
    ]
  },
  {
    "id": "cmvlwqy0x003npjq5u9qvn09i",
    "name": "Lachha Rabri",
    "slug": "lachha-rabri",
    "description": "Slow-simmered whole milk thickened into layers of rich malai clotted cream.",
    "categoryId": "cmvlvxkxh0002q005b8ykhq3t",
    "ingredients": null,
    "allergens": null,
    "isVegetarian": true,
    "isFeatured": false,
    "isBestSeller": true,
    "isActive": true,
    "priceConfigured": true,
    "createdAt": "2026-10-24T04:37:37.089Z",
    "updatedAt": "2026-10-24T04:37:37.089Z",
    "category": {
      "id": "cmvlvxkxh0002q005b8ykhq3t",
      "name": "Traditional Mithai",
      "slug": "traditional-mithai",
      "description": null,
      "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/96/Basavanagudi_Kadalekai_Parishe_%282025%29_Bangalore_%2886%29.jpg/960px-Basavanagudi_Kadalekai_Parishe_%282025%29_Bangalore_%2886%29.jpg",
      "isActive": true,
      "sortOrder": 2,
      "createdAt": "2026-10-24T04:14:47.094Z",
      "updatedAt": "2026-10-24T04:24:17.476Z"
    },
    "variants": [
      {
        "id": "cmvlwqy14003rpjq5d01586qb",
        "productId": "cmvlwqy0x003npjq5u9qvn09i",
        "weight": "250g",
        "unit": null,
        "price": 140,
        "comparePrice": null,
        "stock": 50,
        "sku": null,
        "isActive": true
      },
      {
        "id": "cmvlwqy18003tpjq5l1fjisq5",
        "productId": "cmvlwqy0x003npjq5u9qvn09i",
        "weight": "500g",
        "unit": null,
        "price": 280,
        "comparePrice": null,
        "stock": 50,
        "sku": null,
        "isActive": true
      }
    ],
    "images": [
      {
        "id": "cmvlwqy10003ppjq5m4e0r6vr",
        "productId": "cmvlwqy0x003npjq5u9qvn09i",
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/bb/Homemade_Rabri.jpg/960px-Homemade_Rabri.jpg",
        "altText": "Lachha Rabri",
        "sortOrder": 0
      }
    ]
  },
  {
    "id": "cmvlwqy1e003vpjq5lzuc1hav",
    "name": "Desi Ghee Soan Papdi",
    "slug": "desi-ghee-soan-papdi",
    "description": "Crisp, flaky, and layered traditional sweet made with gram flour and cardamom.",
    "categoryId": "cmvlvxkxh0002q005b8ykhq3t",
    "ingredients": null,
    "allergens": null,
    "isVegetarian": true,
    "isFeatured": false,
    "isBestSeller": false,
    "isActive": true,
    "priceConfigured": true,
    "createdAt": "2026-10-24T04:37:37.106Z",
    "updatedAt": "2026-10-24T04:37:37.106Z",
    "category": {
      "id": "cmvlvxkxh0002q005b8ykhq3t",
      "name": "Traditional Mithai",
      "slug": "traditional-mithai",
      "description": null,
      "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/96/Basavanagudi_Kadalekai_Parishe_%282025%29_Bangalore_%2886%29.jpg/960px-Basavanagudi_Kadalekai_Parishe_%282025%29_Bangalore_%2886%29.jpg",
      "isActive": true,
      "sortOrder": 2,
      "createdAt": "2026-10-24T04:14:47.094Z",
      "updatedAt": "2026-10-24T04:24:17.476Z"
    },
    "variants": [
      {
        "id": "cmvlwqy1l003zpjq54kckw7fk",
        "productId": "cmvlwqy1e003vpjq5lzuc1hav",
        "weight": "500g Box",
        "unit": null,
        "price": 180,
        "comparePrice": null,
        "stock": 50,
        "sku": null,
        "isActive": true
      },
      {
        "id": "cmvlwqy1o0041pjq5q4lfo439",
        "productId": "cmvlwqy1e003vpjq5lzuc1hav",
        "weight": "1kg Box",
        "unit": null,
        "price": 350,
        "comparePrice": null,
        "stock": 50,
        "sku": null,
        "isActive": true
      }
    ],
    "images": [
      {
        "id": "cmvlwqy1i003xpjq5vjgbcbyv",
        "productId": "cmvlwqy1e003vpjq5lzuc1hav",
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/df/Son_papadi.jpg/960px-Son_papadi.jpg",
        "altText": "Desi Ghee Soan Papdi",
        "sortOrder": 0
      }
    ]
  },
  {
    "id": "cmvlwqy1t0043pjq5uj27croh",
    "name": "Batisa",
    "slug": "batisa",
    "description": "Rich, melt-in-the-mouth flaky gram flour and desi ghee specialty square sweet.",
    "categoryId": "cmvlvxkxh0002q005b8ykhq3t",
    "ingredients": null,
    "allergens": null,
    "isVegetarian": true,
    "isFeatured": false,
    "isBestSeller": false,
    "isActive": true,
    "priceConfigured": true,
    "createdAt": "2026-10-24T04:37:37.122Z",
    "updatedAt": "2026-10-24T04:37:37.122Z",
    "category": {
      "id": "cmvlvxkxh0002q005b8ykhq3t",
      "name": "Traditional Mithai",
      "slug": "traditional-mithai",
      "description": null,
      "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/96/Basavanagudi_Kadalekai_Parishe_%282025%29_Bangalore_%2886%29.jpg/960px-Basavanagudi_Kadalekai_Parishe_%282025%29_Bangalore_%2886%29.jpg",
      "isActive": true,
      "sortOrder": 2,
      "createdAt": "2026-10-24T04:14:47.094Z",
      "updatedAt": "2026-10-24T04:24:17.476Z"
    },
    "variants": [
      {
        "id": "cmvlwqy200047pjq5rg6jfk6p",
        "productId": "cmvlwqy1t0043pjq5uj27croh",
        "weight": "500g Box",
        "unit": null,
        "price": 190,
        "comparePrice": null,
        "stock": 50,
        "sku": null,
        "isActive": true
      },
      {
        "id": "cmvlwqy240049pjq5wd3o3hem",
        "productId": "cmvlwqy1t0043pjq5uj27croh",
        "weight": "1kg Box",
        "unit": null,
        "price": 370,
        "comparePrice": null,
        "stock": 50,
        "sku": null,
        "isActive": true
      }
    ],
    "images": [
      {
        "id": "cmvlwqy1x0045pjq5xzccjfw8",
        "productId": "cmvlwqy1t0043pjq5uj27croh",
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/df/Son_papadi.jpg/960px-Son_papadi.jpg",
        "altText": "Batisa",
        "sortOrder": 0
      }
    ]
  },
  {
    "id": "cmvlwqy2b004bpjq5s2y8sjjx",
    "name": "Chandrakala",
    "slug": "chandrakala",
    "description": "Crescent pastry stuffed with sweetened khoya, nuts, and dipped in sugar glaze.",
    "categoryId": "cmvlvxkxh0002q005b8ykhq3t",
    "ingredients": null,
    "allergens": null,
    "isVegetarian": true,
    "isFeatured": false,
    "isBestSeller": false,
    "isActive": true,
    "priceConfigured": true,
    "createdAt": "2026-10-24T04:37:37.140Z",
    "updatedAt": "2026-10-24T04:37:37.140Z",
    "category": {
      "id": "cmvlvxkxh0002q005b8ykhq3t",
      "name": "Traditional Mithai",
      "slug": "traditional-mithai",
      "description": null,
      "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/96/Basavanagudi_Kadalekai_Parishe_%282025%29_Bangalore_%2886%29.jpg/960px-Basavanagudi_Kadalekai_Parishe_%282025%29_Bangalore_%2886%29.jpg",
      "isActive": true,
      "sortOrder": 2,
      "createdAt": "2026-10-24T04:14:47.094Z",
      "updatedAt": "2026-10-24T04:24:17.476Z"
    },
    "variants": [
      {
        "id": "cmvlwqy2j004fpjq59uruzlyy",
        "productId": "cmvlwqy2b004bpjq5s2y8sjjx",
        "weight": "250g",
        "unit": null,
        "price": 150,
        "comparePrice": null,
        "stock": 50,
        "sku": null,
        "isActive": true
      },
      {
        "id": "cmvlwqy2m004hpjq5rpklx1nw",
        "productId": "cmvlwqy2b004bpjq5s2y8sjjx",
        "weight": "500g",
        "unit": null,
        "price": 300,
        "comparePrice": null,
        "stock": 50,
        "sku": null,
        "isActive": true
      }
    ],
    "images": [
      {
        "id": "cmvlwqy2g004dpjq5h5fvw2q2",
        "productId": "cmvlwqy2b004bpjq5s2y8sjjx",
        "url": "https://upload.wikimedia.org/wikipedia/commons/a/aa/Indian_Sweets.JPG",
        "altText": "Chandrakala",
        "sortOrder": 0
      }
    ]
  },
  {
    "id": "cmvlwqy3g004rpjq5qjkr2ktt",
    "name": "Kaju Mix Sweets",
    "slug": "kaju-mix-sweets",
    "description": "Assorted premium cashew sweets including rolls, diamonds, and dry fruit bites.",
    "categoryId": "cmvlvxkxk0003q0053q1zfslb",
    "ingredients": null,
    "allergens": null,
    "isVegetarian": true,
    "isFeatured": false,
    "isBestSeller": false,
    "isActive": true,
    "priceConfigured": true,
    "createdAt": "2026-10-24T04:37:37.181Z",
    "updatedAt": "2026-10-24T04:37:37.181Z",
    "category": {
      "id": "cmvlvxkxk0003q0053q1zfslb",
      "name": "Kaju & Dry Fruits",
      "slug": "kaju-dry-fruits",
      "description": null,
      "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ac/Kaju_katli_sweet.jpg/960px-Kaju_katli_sweet.jpg",
      "isActive": true,
      "sortOrder": 3,
      "createdAt": "2026-10-24T04:14:47.097Z",
      "updatedAt": "2026-10-24T04:24:17.480Z"
    },
    "variants": [
      {
        "id": "cmvlwqy3p004vpjq59umb9sza",
        "productId": "cmvlwqy3g004rpjq5qjkr2ktt",
        "weight": "500g Box",
        "unit": null,
        "price": 580,
        "comparePrice": null,
        "stock": 50,
        "sku": null,
        "isActive": true
      },
      {
        "id": "cmvlwqy3t004xpjq5ht9peo4v",
        "productId": "cmvlwqy3g004rpjq5qjkr2ktt",
        "weight": "1kg Box",
        "unit": null,
        "price": 1100,
        "comparePrice": null,
        "stock": 50,
        "sku": null,
        "isActive": true
      }
    ],
    "images": [
      {
        "id": "cmvlwqy3k004tpjq58uc78gpb",
        "productId": "cmvlwqy3g004rpjq5qjkr2ktt",
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ac/Kaju_katli_sweet.jpg/960px-Kaju_katli_sweet.jpg",
        "altText": "Kaju Mix Sweets",
        "sortOrder": 0
      }
    ]
  },
  {
    "id": "cmvlwqy3y004zpjq5mnqnkr0h",
    "name": "Kaju Fry (Salted)",
    "slug": "kaju-fry-salted",
    "description": "Jumbo whole cashews gently roasted in pure desi ghee and sprinkled with Himalayan salt.",
    "categoryId": "cmvlvxkxk0003q0053q1zfslb",
    "ingredients": null,
    "allergens": null,
    "isVegetarian": true,
    "isFeatured": false,
    "isBestSeller": true,
    "isActive": true,
    "priceConfigured": true,
    "createdAt": "2026-10-24T04:37:37.198Z",
    "updatedAt": "2026-10-24T04:37:37.198Z",
    "category": {
      "id": "cmvlvxkxk0003q0053q1zfslb",
      "name": "Kaju & Dry Fruits",
      "slug": "kaju-dry-fruits",
      "description": null,
      "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ac/Kaju_katli_sweet.jpg/960px-Kaju_katli_sweet.jpg",
      "isActive": true,
      "sortOrder": 3,
      "createdAt": "2026-10-24T04:14:47.097Z",
      "updatedAt": "2026-10-24T04:24:17.480Z"
    },
    "variants": [
      {
        "id": "cmvlwqy470053pjq5rmigycrf",
        "productId": "cmvlwqy3y004zpjq5mnqnkr0h",
        "weight": "250g",
        "unit": null,
        "price": 320,
        "comparePrice": null,
        "stock": 50,
        "sku": null,
        "isActive": true
      },
      {
        "id": "cmvlwqy4b0055pjq5tyhm556x",
        "productId": "cmvlwqy3y004zpjq5mnqnkr0h",
        "weight": "500g",
        "unit": null,
        "price": 620,
        "comparePrice": null,
        "stock": 50,
        "sku": null,
        "isActive": true
      }
    ],
    "images": [
      {
        "id": "cmvlwqy430051pjq5pvahhxe5",
        "productId": "cmvlwqy3y004zpjq5mnqnkr0h",
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ac/Kaju_katli_sweet.jpg/960px-Kaju_katli_sweet.jpg",
        "altText": "Kaju Fry (Salted)",
        "sortOrder": 0
      }
    ]
  },
  {
    "id": "cmvlwqy4f0057pjq5f5nx0kv7",
    "name": "Kaju Bites",
    "slug": "kaju-bites",
    "description": "Bite-sized cubes of rich cashews combined with pistachios and roasted almond bits.",
    "categoryId": "cmvlvxkxk0003q0053q1zfslb",
    "ingredients": null,
    "allergens": null,
    "isVegetarian": true,
    "isFeatured": false,
    "isBestSeller": false,
    "isActive": true,
    "priceConfigured": true,
    "createdAt": "2026-10-24T04:37:37.215Z",
    "updatedAt": "2026-10-24T04:37:37.215Z",
    "category": {
      "id": "cmvlvxkxk0003q0053q1zfslb",
      "name": "Kaju & Dry Fruits",
      "slug": "kaju-dry-fruits",
      "description": null,
      "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ac/Kaju_katli_sweet.jpg/960px-Kaju_katli_sweet.jpg",
      "isActive": true,
      "sortOrder": 3,
      "createdAt": "2026-10-24T04:14:47.097Z",
      "updatedAt": "2026-10-24T04:24:17.480Z"
    },
    "variants": [
      {
        "id": "cmvlwqy4r005bpjq5h5x8df3g",
        "productId": "cmvlwqy4f0057pjq5f5nx0kv7",
        "weight": "250g",
        "unit": null,
        "price": 320,
        "comparePrice": null,
        "stock": 50,
        "sku": null,
        "isActive": true
      },
      {
        "id": "cmvlwqy4w005dpjq5ikey2su3",
        "productId": "cmvlwqy4f0057pjq5f5nx0kv7",
        "weight": "500g",
        "unit": null,
        "price": 620,
        "comparePrice": null,
        "stock": 50,
        "sku": null,
        "isActive": true
      }
    ],
    "images": [
      {
        "id": "cmvlwqy4l0059pjq588lqt2mz",
        "productId": "cmvlwqy4f0057pjq5f5nx0kv7",
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ac/Kaju_katli_sweet.jpg/960px-Kaju_katli_sweet.jpg",
        "altText": "Kaju Bites",
        "sortOrder": 0
      }
    ]
  },
  {
    "id": "cmvlwqy55005fpjq5fknyg19g",
    "name": "Kaju Samosa Sweet",
    "slug": "kaju-samosa-sweet",
    "description": "Delicate mini cashew shells stuffed with gulkand and dry fruit masala.",
    "categoryId": "cmvlvxkxk0003q0053q1zfslb",
    "ingredients": null,
    "allergens": null,
    "isVegetarian": true,
    "isFeatured": false,
    "isBestSeller": false,
    "isActive": true,
    "priceConfigured": true,
    "createdAt": "2026-10-24T04:37:37.241Z",
    "updatedAt": "2026-10-24T04:37:37.241Z",
    "category": {
      "id": "cmvlvxkxk0003q0053q1zfslb",
      "name": "Kaju & Dry Fruits",
      "slug": "kaju-dry-fruits",
      "description": null,
      "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ac/Kaju_katli_sweet.jpg/960px-Kaju_katli_sweet.jpg",
      "isActive": true,
      "sortOrder": 3,
      "createdAt": "2026-10-24T04:14:47.097Z",
      "updatedAt": "2026-10-24T04:24:17.480Z"
    },
    "variants": [
      {
        "id": "cmvlwqy5d005jpjq5jhokowc4",
        "productId": "cmvlwqy55005fpjq5fknyg19g",
        "weight": "250g",
        "unit": null,
        "price": 310,
        "comparePrice": null,
        "stock": 50,
        "sku": null,
        "isActive": true
      },
      {
        "id": "cmvlwqy5h005lpjq520ayy7xo",
        "productId": "cmvlwqy55005fpjq5fknyg19g",
        "weight": "500g",
        "unit": null,
        "price": 600,
        "comparePrice": null,
        "stock": 50,
        "sku": null,
        "isActive": true
      }
    ],
    "images": [
      {
        "id": "cmvlwqy59005hpjq50gq2e8r6",
        "productId": "cmvlwqy55005fpjq5fknyg19g",
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ac/Kaju_katli_sweet.jpg/960px-Kaju_katli_sweet.jpg",
        "altText": "Kaju Samosa Sweet",
        "sortOrder": 0
      }
    ]
  },
  {
    "id": "cmvlwqy6w005zpjq5361ndyfs",
    "name": "Dry Fruits Laddu",
    "slug": "dry-fruits-laddu",
    "description": "Sugar-free energy laddu made with chopped dates, cashews, almonds, and pistachios.",
    "categoryId": "cmvlvxkxk0003q0053q1zfslb",
    "ingredients": null,
    "allergens": null,
    "isVegetarian": true,
    "isFeatured": false,
    "isBestSeller": true,
    "isActive": true,
    "priceConfigured": true,
    "createdAt": "2026-10-24T04:37:37.304Z",
    "updatedAt": "2026-10-24T04:37:37.304Z",
    "category": {
      "id": "cmvlvxkxk0003q0053q1zfslb",
      "name": "Kaju & Dry Fruits",
      "slug": "kaju-dry-fruits",
      "description": null,
      "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ac/Kaju_katli_sweet.jpg/960px-Kaju_katli_sweet.jpg",
      "isActive": true,
      "sortOrder": 3,
      "createdAt": "2026-10-24T04:14:47.097Z",
      "updatedAt": "2026-10-24T04:24:17.480Z"
    },
    "variants": [
      {
        "id": "cmvlwqy740063pjq51wqcmzue",
        "productId": "cmvlwqy6w005zpjq5361ndyfs",
        "weight": "250g",
        "unit": null,
        "price": 300,
        "comparePrice": null,
        "stock": 50,
        "sku": null,
        "isActive": true
      },
      {
        "id": "cmvlwqy780065pjq5tteh0ory",
        "productId": "cmvlwqy6w005zpjq5361ndyfs",
        "weight": "500g",
        "unit": null,
        "price": 580,
        "comparePrice": null,
        "stock": 50,
        "sku": null,
        "isActive": true
      }
    ],
    "images": [
      {
        "id": "cmvlwqy6z0061pjq5zzen25pl",
        "productId": "cmvlwqy6w005zpjq5361ndyfs",
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c1/Laddu_Sweet.JPG/960px-Laddu_Sweet.JPG",
        "altText": "Dry Fruits Laddu",
        "sortOrder": 0
      }
    ]
  },
  {
    "id": "cmvlwqy7d0067pjq5yjxw8ibg",
    "name": "Aam Papad Sweet",
    "slug": "aam-papad-sweet",
    "description": "Traditional spiced layered mango pulp confection, sweet and tangy.",
    "categoryId": "cmvlvxkxk0003q0053q1zfslb",
    "ingredients": null,
    "allergens": null,
    "isVegetarian": true,
    "isFeatured": false,
    "isBestSeller": false,
    "isActive": true,
    "priceConfigured": true,
    "createdAt": "2026-10-24T04:37:37.321Z",
    "updatedAt": "2026-10-24T04:37:37.321Z",
    "category": {
      "id": "cmvlvxkxk0003q0053q1zfslb",
      "name": "Kaju & Dry Fruits",
      "slug": "kaju-dry-fruits",
      "description": null,
      "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ac/Kaju_katli_sweet.jpg/960px-Kaju_katli_sweet.jpg",
      "isActive": true,
      "sortOrder": 3,
      "createdAt": "2026-10-24T04:14:47.097Z",
      "updatedAt": "2026-10-24T04:24:17.480Z"
    },
    "variants": [
      {
        "id": "cmvlwqy7k006bpjq5te8nw3ut",
        "productId": "cmvlwqy7d0067pjq5yjxw8ibg",
        "weight": "250g",
        "unit": null,
        "price": 90,
        "comparePrice": null,
        "stock": 50,
        "sku": null,
        "isActive": true
      },
      {
        "id": "cmvlwqy7n006dpjq5s7ew67vk",
        "productId": "cmvlwqy7d0067pjq5yjxw8ibg",
        "weight": "500g",
        "unit": null,
        "price": 180,
        "comparePrice": null,
        "stock": 50,
        "sku": null,
        "isActive": true
      }
    ],
    "images": [
      {
        "id": "cmvlwqy7g0069pjq58rotp1yb",
        "productId": "cmvlwqy7d0067pjq5yjxw8ibg",
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ac/Kaju_katli_sweet.jpg/960px-Kaju_katli_sweet.jpg",
        "altText": "Aam Papad Sweet",
        "sortOrder": 0
      }
    ]
  },
  {
    "id": "cmvlwqy8e006npjq58ohnjutf",
    "name": "Bikaneri Barfi",
    "slug": "bikaneri-barfi",
    "description": "Classic rich khoya barfi cooked in desi ghee with silver vark and cardamom.",
    "categoryId": "cmvlvxkxo0004q005c3y2vep8",
    "ingredients": null,
    "allergens": null,
    "isVegetarian": true,
    "isFeatured": false,
    "isBestSeller": true,
    "isActive": true,
    "priceConfigured": true,
    "createdAt": "2026-10-24T04:37:37.358Z",
    "updatedAt": "2026-10-24T04:37:37.358Z",
    "category": {
      "id": "cmvlvxkxo0004q005c3y2vep8",
      "name": "Barfi & Milk Sweets",
      "slug": "barfi-milk-sweets",
      "description": null,
      "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f1/Almond_Khoa_based_burfi_Mumbai_India_%28cropped%29.jpg/960px-Almond_Khoa_based_burfi_Mumbai_India_%28cropped%29.jpg",
      "isActive": true,
      "sortOrder": 4,
      "createdAt": "2026-10-24T04:14:47.100Z",
      "updatedAt": "2026-10-24T04:24:17.486Z"
    },
    "variants": [
      {
        "id": "cmvlwqy8l006rpjq5lgoik7ci",
        "productId": "cmvlwqy8e006npjq58ohnjutf",
        "weight": "250g",
        "unit": null,
        "price": 150,
        "comparePrice": null,
        "stock": 50,
        "sku": null,
        "isActive": true
      },
      {
        "id": "cmvlwqy8p006tpjq51w1dab69",
        "productId": "cmvlwqy8e006npjq58ohnjutf",
        "weight": "500g",
        "unit": null,
        "price": 300,
        "comparePrice": null,
        "stock": 50,
        "sku": null,
        "isActive": true
      },
      {
        "id": "cmvlwqy8s006vpjq5q22jx5yn",
        "productId": "cmvlwqy8e006npjq58ohnjutf",
        "weight": "1kg",
        "unit": null,
        "price": 600,
        "comparePrice": null,
        "stock": 50,
        "sku": null,
        "isActive": true
      }
    ],
    "images": [
      {
        "id": "cmvlwqy8i006ppjq5lvqg1v47",
        "productId": "cmvlwqy8e006npjq58ohnjutf",
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f1/Almond_Khoa_based_burfi_Mumbai_India_%28cropped%29.jpg/960px-Almond_Khoa_based_burfi_Mumbai_India_%28cropped%29.jpg",
        "altText": "Bikaneri Barfi",
        "sortOrder": 0
      }
    ]
  },
  {
    "id": "cmvlwqy9j0075pjq5y16mzyar",
    "name": "Nariyal Barfi",
    "slug": "nariyal-barfi",
    "description": "Fine desiccated coconut cooked in sweet reduced milk and cardamom.",
    "categoryId": "cmvlvxkxo0004q005c3y2vep8",
    "ingredients": null,
    "allergens": null,
    "isVegetarian": true,
    "isFeatured": false,
    "isBestSeller": false,
    "isActive": true,
    "priceConfigured": true,
    "createdAt": "2026-10-24T04:37:37.399Z",
    "updatedAt": "2026-10-24T04:37:37.399Z",
    "category": {
      "id": "cmvlvxkxo0004q005c3y2vep8",
      "name": "Barfi & Milk Sweets",
      "slug": "barfi-milk-sweets",
      "description": null,
      "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f1/Almond_Khoa_based_burfi_Mumbai_India_%28cropped%29.jpg/960px-Almond_Khoa_based_burfi_Mumbai_India_%28cropped%29.jpg",
      "isActive": true,
      "sortOrder": 4,
      "createdAt": "2026-10-24T04:14:47.100Z",
      "updatedAt": "2026-10-24T04:24:17.486Z"
    },
    "variants": [
      {
        "id": "cmvlwqy9p0079pjq5djhk8g1y",
        "productId": "cmvlwqy9j0075pjq5y16mzyar",
        "weight": "250g",
        "unit": null,
        "price": 140,
        "comparePrice": null,
        "stock": 50,
        "sku": null,
        "isActive": true
      },
      {
        "id": "cmvlwqy9t007bpjq50gfc27yy",
        "productId": "cmvlwqy9j0075pjq5y16mzyar",
        "weight": "500g",
        "unit": null,
        "price": 280,
        "comparePrice": null,
        "stock": 50,
        "sku": null,
        "isActive": true
      }
    ],
    "images": [
      {
        "id": "cmvlwqy9m0077pjq58dn1v18c",
        "productId": "cmvlwqy9j0075pjq5y16mzyar",
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f1/Almond_Khoa_based_burfi_Mumbai_India_%28cropped%29.jpg/960px-Almond_Khoa_based_burfi_Mumbai_India_%28cropped%29.jpg",
        "altText": "Nariyal Barfi",
        "sortOrder": 0
      }
    ]
  },
  {
    "id": "cmvlwqy9x007dpjq5dvm081vb",
    "name": "Chocolate Barfi",
    "slug": "chocolate-barfi",
    "description": "Dual layer barfi combining rich cocoa fudge with traditional white khoya mawa.",
    "categoryId": "cmvlvxkxo0004q005c3y2vep8",
    "ingredients": null,
    "allergens": null,
    "isVegetarian": true,
    "isFeatured": false,
    "isBestSeller": false,
    "isActive": true,
    "priceConfigured": true,
    "createdAt": "2026-10-24T04:37:37.413Z",
    "updatedAt": "2026-10-24T04:37:37.413Z",
    "category": {
      "id": "cmvlvxkxo0004q005c3y2vep8",
      "name": "Barfi & Milk Sweets",
      "slug": "barfi-milk-sweets",
      "description": null,
      "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f1/Almond_Khoa_based_burfi_Mumbai_India_%28cropped%29.jpg/960px-Almond_Khoa_based_burfi_Mumbai_India_%28cropped%29.jpg",
      "isActive": true,
      "sortOrder": 4,
      "createdAt": "2026-10-24T04:14:47.100Z",
      "updatedAt": "2026-10-24T04:24:17.486Z"
    },
    "variants": [
      {
        "id": "cmvlwqya3007hpjq5byfykehb",
        "productId": "cmvlwqy9x007dpjq5dvm081vb",
        "weight": "250g",
        "unit": null,
        "price": 155,
        "comparePrice": null,
        "stock": 50,
        "sku": null,
        "isActive": true
      },
      {
        "id": "cmvlwqya7007jpjq5nqxn6cfj",
        "productId": "cmvlwqy9x007dpjq5dvm081vb",
        "weight": "500g",
        "unit": null,
        "price": 310,
        "comparePrice": null,
        "stock": 50,
        "sku": null,
        "isActive": true
      }
    ],
    "images": [
      {
        "id": "cmvlwqya0007fpjq57rzzt6yz",
        "productId": "cmvlwqy9x007dpjq5dvm081vb",
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f1/Almond_Khoa_based_burfi_Mumbai_India_%28cropped%29.jpg/960px-Almond_Khoa_based_burfi_Mumbai_India_%28cropped%29.jpg",
        "altText": "Chocolate Barfi",
        "sortOrder": 0
      }
    ]
  },
  {
    "id": "cmvlwqyac007lpjq5wi50zg7q",
    "name": "Kaju Kesar Barfi",
    "slug": "kaju-kesar-barfi",
    "description": "Deluxe mawa and cashew squares infused with natural saffron extracts.",
    "categoryId": "cmvlvxkxo0004q005c3y2vep8",
    "ingredients": null,
    "allergens": null,
    "isVegetarian": true,
    "isFeatured": false,
    "isBestSeller": false,
    "isActive": true,
    "priceConfigured": true,
    "createdAt": "2026-10-24T04:37:37.428Z",
    "updatedAt": "2026-10-24T04:37:37.428Z",
    "category": {
      "id": "cmvlvxkxo0004q005c3y2vep8",
      "name": "Barfi & Milk Sweets",
      "slug": "barfi-milk-sweets",
      "description": null,
      "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f1/Almond_Khoa_based_burfi_Mumbai_India_%28cropped%29.jpg/960px-Almond_Khoa_based_burfi_Mumbai_India_%28cropped%29.jpg",
      "isActive": true,
      "sortOrder": 4,
      "createdAt": "2026-10-24T04:14:47.100Z",
      "updatedAt": "2026-10-24T04:24:17.486Z"
    },
    "variants": [
      {
        "id": "cmvlwqyaj007ppjq5dtq02ln5",
        "productId": "cmvlwqyac007lpjq5wi50zg7q",
        "weight": "250g",
        "unit": null,
        "price": 190,
        "comparePrice": null,
        "stock": 50,
        "sku": null,
        "isActive": true
      },
      {
        "id": "cmvlwqyam007rpjq58szsd95v",
        "productId": "cmvlwqyac007lpjq5wi50zg7q",
        "weight": "500g",
        "unit": null,
        "price": 380,
        "comparePrice": null,
        "stock": 50,
        "sku": null,
        "isActive": true
      }
    ],
    "images": [
      {
        "id": "cmvlwqyaf007npjq526o1ycz2",
        "productId": "cmvlwqyac007lpjq5wi50zg7q",
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f1/Almond_Khoa_based_burfi_Mumbai_India_%28cropped%29.jpg/960px-Almond_Khoa_based_burfi_Mumbai_India_%28cropped%29.jpg",
        "altText": "Kaju Kesar Barfi",
        "sortOrder": 0
      }
    ]
  },
  {
    "id": "cmvlwqyar007tpjq5r0dsi93i",
    "name": "Special Bikaneri Peda",
    "slug": "special-bikaneri-peda",
    "description": "Creamy semi-soft mawa sweet flavoured with green cardamom and saffron.",
    "categoryId": "cmvlvxkxo0004q005c3y2vep8",
    "ingredients": null,
    "allergens": null,
    "isVegetarian": true,
    "isFeatured": false,
    "isBestSeller": false,
    "isActive": true,
    "priceConfigured": true,
    "createdAt": "2026-10-24T04:37:37.443Z",
    "updatedAt": "2026-10-24T04:37:37.443Z",
    "category": {
      "id": "cmvlvxkxo0004q005c3y2vep8",
      "name": "Barfi & Milk Sweets",
      "slug": "barfi-milk-sweets",
      "description": null,
      "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f1/Almond_Khoa_based_burfi_Mumbai_India_%28cropped%29.jpg/960px-Almond_Khoa_based_burfi_Mumbai_India_%28cropped%29.jpg",
      "isActive": true,
      "sortOrder": 4,
      "createdAt": "2026-10-24T04:14:47.100Z",
      "updatedAt": "2026-10-24T04:24:17.486Z"
    },
    "variants": [
      {
        "id": "cmvlwqyax007xpjq5nueh890u",
        "productId": "cmvlwqyar007tpjq5r0dsi93i",
        "weight": "250g",
        "unit": null,
        "price": 140,
        "comparePrice": null,
        "stock": 50,
        "sku": null,
        "isActive": true
      },
      {
        "id": "cmvlwqyb0007zpjq53pdc25we",
        "productId": "cmvlwqyar007tpjq5r0dsi93i",
        "weight": "500g",
        "unit": null,
        "price": 280,
        "comparePrice": null,
        "stock": 50,
        "sku": null,
        "isActive": true
      }
    ],
    "images": [
      {
        "id": "cmvlwqyau007vpjq5g2t47mu3",
        "productId": "cmvlwqyar007tpjq5r0dsi93i",
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/91/Indian_Sweet_Dessert_Peda_in_a_white_bone_china_plate.jpg/960px-Indian_Sweet_Dessert_Peda_in_a_white_bone_china_plate.jpg",
        "altText": "Special Bikaneri Peda",
        "sortOrder": 0
      }
    ]
  },
  {
    "id": "cmvlwqycc008hpjq5s0gbxb4w",
    "name": "Besan Laddu (Desi Ghee)",
    "slug": "besan-laddu-desi-ghee",
    "description": "Slow-roasted gram flour with pure ghee, sugar, cardamom, and almond flakes.",
    "categoryId": "cmvlvxkxr0005q005xepsh40r",
    "ingredients": null,
    "allergens": null,
    "isVegetarian": true,
    "isFeatured": false,
    "isBestSeller": false,
    "isActive": true,
    "priceConfigured": true,
    "createdAt": "2026-10-24T04:37:37.501Z",
    "updatedAt": "2026-10-24T04:37:37.501Z",
    "category": {
      "id": "cmvlvxkxr0005q005xepsh40r",
      "name": "Laddu",
      "slug": "laddu",
      "description": null,
      "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c1/Laddu_Sweet.JPG/960px-Laddu_Sweet.JPG",
      "isActive": true,
      "sortOrder": 5,
      "createdAt": "2026-10-24T04:14:47.103Z",
      "updatedAt": "2026-10-24T04:24:17.491Z"
    },
    "variants": [
      {
        "id": "cmvlwqycj008lpjq5qyz85n19",
        "productId": "cmvlwqycc008hpjq5s0gbxb4w",
        "weight": "250g",
        "unit": null,
        "price": 125,
        "comparePrice": null,
        "stock": 50,
        "sku": null,
        "isActive": true
      },
      {
        "id": "cmvlwqycn008npjq5dwrge280",
        "productId": "cmvlwqycc008hpjq5s0gbxb4w",
        "weight": "500g",
        "unit": null,
        "price": 250,
        "comparePrice": null,
        "stock": 50,
        "sku": null,
        "isActive": true
      },
      {
        "id": "cmvlwqycq008ppjq5fjpr5ok9",
        "productId": "cmvlwqycc008hpjq5s0gbxb4w",
        "weight": "1kg",
        "unit": null,
        "price": 500,
        "comparePrice": null,
        "stock": 50,
        "sku": null,
        "isActive": true
      }
    ],
    "images": [
      {
        "id": "cmvlwqycg008jpjq5qk7lica1",
        "productId": "cmvlwqycc008hpjq5s0gbxb4w",
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c1/Laddu_Sweet.JPG/960px-Laddu_Sweet.JPG",
        "altText": "Besan Laddu (Desi Ghee)",
        "sortOrder": 0
      }
    ]
  },
  {
    "id": "cmvlwqyct008rpjq5wpir7vky",
    "name": "Atta Laddu",
    "slug": "atta-laddu",
    "description": "Whole wheat flour roasted in desi ghee with gond and crunchy chopped nuts.",
    "categoryId": "cmvlvxkxr0005q005xepsh40r",
    "ingredients": null,
    "allergens": null,
    "isVegetarian": true,
    "isFeatured": false,
    "isBestSeller": false,
    "isActive": true,
    "priceConfigured": true,
    "createdAt": "2026-10-24T04:37:37.517Z",
    "updatedAt": "2026-10-24T04:37:37.517Z",
    "category": {
      "id": "cmvlvxkxr0005q005xepsh40r",
      "name": "Laddu",
      "slug": "laddu",
      "description": null,
      "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c1/Laddu_Sweet.JPG/960px-Laddu_Sweet.JPG",
      "isActive": true,
      "sortOrder": 5,
      "createdAt": "2026-10-24T04:14:47.103Z",
      "updatedAt": "2026-10-24T04:24:17.491Z"
    },
    "variants": [
      {
        "id": "cmvlwqycz008vpjq5bh1pu2gx",
        "productId": "cmvlwqyct008rpjq5wpir7vky",
        "weight": "250g",
        "unit": null,
        "price": 130,
        "comparePrice": null,
        "stock": 50,
        "sku": null,
        "isActive": true
      },
      {
        "id": "cmvlwqyd3008xpjq54qi4rhl0",
        "productId": "cmvlwqyct008rpjq5wpir7vky",
        "weight": "500g",
        "unit": null,
        "price": 260,
        "comparePrice": null,
        "stock": 50,
        "sku": null,
        "isActive": true
      }
    ],
    "images": [
      {
        "id": "cmvlwqycw008tpjq5lpwgnyyb",
        "productId": "cmvlwqyct008rpjq5wpir7vky",
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c1/Laddu_Sweet.JPG/960px-Laddu_Sweet.JPG",
        "altText": "Atta Laddu",
        "sortOrder": 0
      }
    ]
  },
  {
    "id": "cmvlwqyd7008zpjq59q63z8cf",
    "name": "Navratan Laddu",
    "slug": "navratan-laddu",
    "description": "Festive laddu packed with nine distinct dry fruits, seeds, and aromatic spices.",
    "categoryId": "cmvlvxkxr0005q005xepsh40r",
    "ingredients": null,
    "allergens": null,
    "isVegetarian": true,
    "isFeatured": false,
    "isBestSeller": false,
    "isActive": true,
    "priceConfigured": true,
    "createdAt": "2026-10-24T04:37:37.531Z",
    "updatedAt": "2026-10-24T04:37:37.531Z",
    "category": {
      "id": "cmvlvxkxr0005q005xepsh40r",
      "name": "Laddu",
      "slug": "laddu",
      "description": null,
      "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c1/Laddu_Sweet.JPG/960px-Laddu_Sweet.JPG",
      "isActive": true,
      "sortOrder": 5,
      "createdAt": "2026-10-24T04:14:47.103Z",
      "updatedAt": "2026-10-24T04:24:17.491Z"
    },
    "variants": [
      {
        "id": "cmvlwqyde0093pjq555mzdojo",
        "productId": "cmvlwqyd7008zpjq59q63z8cf",
        "weight": "250g",
        "unit": null,
        "price": 220,
        "comparePrice": null,
        "stock": 50,
        "sku": null,
        "isActive": true
      },
      {
        "id": "cmvlwqydh0095pjq53svu64wf",
        "productId": "cmvlwqyd7008zpjq59q63z8cf",
        "weight": "500g",
        "unit": null,
        "price": 430,
        "comparePrice": null,
        "stock": 50,
        "sku": null,
        "isActive": true
      }
    ],
    "images": [
      {
        "id": "cmvlwqydb0091pjq52yg3b8p5",
        "productId": "cmvlwqyd7008zpjq59q63z8cf",
        "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c1/Laddu_Sweet.JPG/960px-Laddu_Sweet.JPG",
        "altText": "Navratan Laddu",
        "sortOrder": 0
      }
    ]
  },
  {
    "id": "cmvlwqyet009lpjq54wo8spuj",
    "name": "Chhappan Bhog Royal Mix Gift Box",
    "slug": "chhappan-bhog-royal-mix-gift-box",
    "description": "Curated royal celebration gift box packed with Kaju Katli, Milk Cake, Dry Fruit Laddu, and Peda.",
    "categoryId": "cmvlvxkxu0006q005inhelkqy",
    "ingredients": null,
    "allergens": null,
    "isVegetarian": true,
    "isFeatured": true,
    "isBestSeller": false,
    "isActive": true,
    "priceConfigured": true,
    "createdAt": "2026-10-24T04:37:37.589Z",
    "updatedAt": "2026-10-24T04:37:37.589Z",
    "category": {
      "id": "cmvlvxkxu0006q005inhelkqy",
      "name": "Festive Sweet Gift Boxes",
      "slug": "festive-gift-boxes",
      "description": null,
      "image": "https://upload.wikimedia.org/wikipedia/commons/a/aa/Indian_Sweets.JPG",
      "isActive": true,
      "sortOrder": 6,
      "createdAt": "2026-10-24T04:14:47.107Z",
      "updatedAt": "2026-10-24T04:39:50.958Z"
    },
    "variants": [
      {
        "id": "cmvlwqyf1009ppjq558qhiah5",
        "productId": "cmvlwqyet009lpjq54wo8spuj",
        "weight": "500g Box",
        "unit": null,
        "price": 420,
        "comparePrice": null,
        "stock": 50,
        "sku": null,
        "isActive": true
      },
      {
        "id": "cmvlwqyf3009rpjq548wzfvng",
        "productId": "cmvlwqyet009lpjq54wo8spuj",
        "weight": "1kg Royal Box",
        "unit": null,
        "price": 820,
        "comparePrice": null,
        "stock": 50,
        "sku": null,
        "isActive": true
      }
    ],
    "images": [
      {
        "id": "cmvlwqyex009npjq5q4r0xlxu",
        "productId": "cmvlwqyet009lpjq54wo8spuj",
        "url": "https://upload.wikimedia.org/wikipedia/commons/a/aa/Indian_Sweets.JPG",
        "altText": "Chhappan Bhog Royal Mix Gift Box",
        "sortOrder": 0
      }
    ]
  },
  {
    "id": "cmvlwqyf7009tpjq5y4p84swn",
    "name": "Celebration Mix Box",
    "slug": "celebration-mix-box",
    "description": "Handpicked selection of daily favourites: Gulab Jamun, Rasgulla, and Besan Laddu.",
    "categoryId": "cmvlvxkxu0006q005inhelkqy",
    "ingredients": null,
    "allergens": null,
    "isVegetarian": true,
    "isFeatured": false,
    "isBestSeller": false,
    "isActive": true,
    "priceConfigured": true,
    "createdAt": "2026-10-24T04:37:37.604Z",
    "updatedAt": "2026-10-24T04:37:37.604Z",
    "category": {
      "id": "cmvlvxkxu0006q005inhelkqy",
      "name": "Festive Sweet Gift Boxes",
      "slug": "festive-gift-boxes",
      "description": null,
      "image": "https://upload.wikimedia.org/wikipedia/commons/a/aa/Indian_Sweets.JPG",
      "isActive": true,
      "sortOrder": 6,
      "createdAt": "2026-10-24T04:14:47.107Z",
      "updatedAt": "2026-10-24T04:39:50.958Z"
    },
    "variants": [
      {
        "id": "cmvlwqyff009xpjq5fcf80o2w",
        "productId": "cmvlwqyf7009tpjq5y4p84swn",
        "weight": "500g Box",
        "unit": null,
        "price": 260,
        "comparePrice": null,
        "stock": 50,
        "sku": null,
        "isActive": true
      },
      {
        "id": "cmvlwqyfi009zpjq5p2osiiff",
        "productId": "cmvlwqyf7009tpjq5y4p84swn",
        "weight": "1kg Box",
        "unit": null,
        "price": 500,
        "comparePrice": null,
        "stock": 50,
        "sku": null,
        "isActive": true
      }
    ],
    "images": [
      {
        "id": "cmvlwqyfb009vpjq5rg7z9eaa",
        "productId": "cmvlwqyf7009tpjq5y4p84swn",
        "url": "https://upload.wikimedia.org/wikipedia/commons/a/aa/Indian_Sweets.JPG",
        "altText": "Celebration Mix Box",
        "sortOrder": 0
      }
    ]
  }
];
