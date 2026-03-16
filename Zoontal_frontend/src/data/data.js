import { v4 as uuidv4 } from "uuid";

export const products = [
  {
    id: uuidv4(),
    productTitle: "Classic Khaki Chinos",
    thumbnail: "/images/Zoontal-catalogue (47).jpg",
    images: [
      "/images/Zoontal-catalogue (47).jpg",
      "/images/Zoontal-catalogue (132).jpg",
      "/images/Zoontal-catalogue (78).jpg"
    ],
    description: "Classic lightweight chinos designed for everyday comfort.",
    price: 3299,
    category: "t-shirts"
  },
  {
    id: uuidv4(),
    productTitle: "Urban Slim-Fit Chinos",
    thumbnail: "/images/Zoontal-catalogue (132).jpg",
    images: [
      "/images/Zoontal-catalogue (132).jpg",
      "/images/Zoontal-catalogue (164).jpg"
    ],
    description: "Modern slim-fit stretch chinos for premium mobility.",
    price: 3499,
    category: "jackets"
  },
  {
    id: uuidv4(),
    productTitle: "Tailored Stretch Chinos",
    thumbnail: "/images/Zoontal-catalogue (78).jpg",
    images: [
      "/images/Zoontal-catalogue (78).jpg",
      "/images/Zoontal-catalogue (103).jpg"
    ],
    description: "Tailored-fit chinos made with breathable cotton fabric.",
    price: 3199,
    category: "blouse"
  },
  {
    id: uuidv4(),
    productTitle: "Essential Everyday Chinos",
    thumbnail: "/images/Zoontal-catalogue (164).jpg",
    images: [
      "/images/Zoontal-catalogue (164).jpg",
      "/images/Zoontal-catalogue (28).jpg"
    ],
    description: "Everyday essential chinos with soft touch texture.",
    price: 3399,
    category: "shirts"
  },
  {
    id: uuidv4(),
    productTitle: "Premium Cotton Chinos",
    thumbnail: "/images/Zoontal-catalogue (103).jpg",
    images: [
      "/images/Zoontal-catalogue (103).jpg",
      "/images/Zoontal-catalogue (147).jpg"
    ],
    description: "Premium cotton chinos crafted for durability and style.",
    price: 3599,
    category: "t-shirts"
  },
  {
    id: uuidv4(),
    productTitle: "Minimalist Straight Chinos",
    thumbnail: "/images/Zoontal-catalogue (28).jpg",
    images: [
      "/images/Zoontal-catalogue (28).jpg",
      "/images/Zoontal-catalogue (56).jpg"
    ],
    description: "Minimalist straight-fit chinos with a clean silhouette.",
    price: 2999,
    category: "blouse"
  },
  {
    id: uuidv4(),
    productTitle: "Comfort Stretch Khakis",
    thumbnail: "/images/Zoontal-catalogue (56).jpg",
    images: [
      "/images/Zoontal-catalogue (56).jpg",
      "/images/Zoontal-catalogue (32).jpg"
    ],
    description: "Ultra comfortable stretch khakis perfect for long days.",
    price: 4199,
    category: "jackets"
  },
  {
    id: uuidv4(),
    productTitle: "Signature Slim Chinos",
    thumbnail: "/images/Zoontal-catalogue (147).jpg",
    images: [
      "/images/Zoontal-catalogue (147).jpg",
      "/images/Zoontal-catalogue (89).jpg"
    ],
    description: "Signature slim silhouette created with soft linen blend.",
    price: 5299,
    category: "shirts"
  },
  {
    id: uuidv4(),
    productTitle: "Casual Tapered Chinos",
    thumbnail: "/images/Zoontal-catalogue (89).jpg",
    images: [
      "/images/Zoontal-catalogue (89).jpg",
      "/images/Zoontal-catalogue (121).JPG"
    ],
    description: "Casual tapered chinos designed for an easy relaxed look.",
    price: 3799,
    category: "t-shirts"
  },
  {
    id: uuidv4(),
    productTitle: "Soft Touch Khaki Pants",
    thumbnail: "/images/Zoontal-catalogue (121).JPG",
    images: [
      "/images/Zoontal-catalogue (121).JPG",
      "/images/Zoontal-catalogue (143).jpg"
    ],
    description: "Khaki pants made with extra soft brushed cotton.",
    price: 4499,
    category: "shirts"
  }
];



export const collections = [
  {
    id: uuidv4(),
    collectionName: "Jackets",
    thumbnail: "/images/Zoontal-catalogue (50).jpg",
    description: "Warm and stylish winter jackets crafted for comfort.",
    slug: "jackets",
    season: "winter"
  },
  {
    id: uuidv4(),
    collectionName: "T-Shirts",
    thumbnail: "/images/Zoontal-catalogue (132).jpg",
    description: "Premium cotton tees designed for everyday wear.",
    slug: "t-shirts",
    season: "summer"
  },
 
  {
    id: uuidv4(),
    collectionName: "Shirts",
    thumbnail: "/images/Zoontal-catalogue (78).jpg",
    description: "Classic and modern shirt styles for every occasion.",
    slug: "shirts",
    season: "summer"
  },
  {
    id: uuidv4(),
    collectionName: "Blouses",
    thumbnail: "/images/Zoontal-catalogue (47).jpg",
    description: "Elegant blouses to pair with your favorite outfits.",
    slug: "blouse",
    season: "summer"
  }
];



export const blogPosts = [
  {
    id: uuidv4(),

    title: "Pashmina vs. Vicuna: Unveiling the Truth Behind the Hype",
    slug: "pashmina-vs-vicuna-unveiling-the-truth-behind-the-hype",

    excerpt:
      "In the ever-evolving world of luxury fabrics, trends come and go. We compare Vicuna to the timeless heritage of Pashmina.",

    coverImage: {
      url: "/images/blog_img_1.webp",
      alt: "Luxury pashmina and vicuna fabrics"
    },

    author: "Pashtush Editorial Team",
    publishedAt: "2024-06-21",
    status: "published",

    content: [
      {
        id: uuidv4(),
        type: "paragraph",
        data: {
          text:
            "In the ever-evolving world of luxury fabrics, trends come and go like the seasons. One such trend that’s recently hit the spotlight is Vicuna."
        }
      },
      {
        id: uuidv4(),
        type: "heading",
        data: {
          text: "1. Historical Royalty and Prestige",
          level: 2
        }
      },
      {
        id: uuidv4(),
        type: "paragraph",
        data: {
          text:
            "Pashmina has reigned supreme for centuries. It was the fabric of choice for emperors and nobility in the valleys of Kashmir."
        }
      },
      {
        id: uuidv4(),
        type: "image",
        data: {
          image: {
            url: "/images/blog_img_2.webp",
            alt: "Mughal royalty wearing traditional pashmina"
          }
        }
      }
    ],

    seo: {
      metaTitle: "Pashmina vs Vicuna | Truth Behind Luxury Fabric Hype",
      metaDescription:
        "Discover the real difference between Pashmina and Vicuna. Learn why Pashmina remains the ultimate luxury fabric."
    },

    createdAt: "2024-06-15",
    updatedAt: "2024-06-21"
  },

  {
    id: uuidv4(),

    title: "Shimmer & Shine: Styling Secrets for Pashtush Twilight Stoles",
    slug: "styling-secrets-pashtush-twilight-stoles",

    excerpt:
      "Discover elegant ways to style Pashtush Twilight Stoles for evenings, weddings, and festive occasions.",

    coverImage: {
      url: "/images/blog_img_2.webp",
      alt: "Pashtush twilight stoles styled for evening wear"
    },

    author: "Pashtush Editorial Team",
    publishedAt: "2024-06-15",
    status: "published",

    content: [
      {
        id: uuidv4(),
        type: "paragraph",
        data: {
          text:
            "Twilight stoles are designed to add subtle shimmer to your evening ensembles without overpowering your look."
        }
      },
      {
        id: uuidv4(),
        type: "heading",
        data: {
          text: "How to Style Twilight Stoles",
          level: 2
        }
      },
      {
        id: uuidv4(),
        type: "image",
        data: {
          image: {
            url: "/images/blog/twilight-stole-style.jpg",
            alt: "Styling Pashtush twilight stoles"
          }
        }
      }
    ],

    seo: {
      metaTitle: "How to Style Luxury Stoles | Pashtush Twilight Collection",
      metaDescription:
        "Learn how to style luxury Pashtush Twilight Stoles for weddings, parties, and elegant evenings."
    },

    createdAt: "2024-06-10",
    updatedAt: "2024-06-15"
  },
  {
  id: uuidv4(),

  title: "Pashmina vs. Vicuna: Unveiling the Truth Behind the Hype",
  slug: "pashmina-vs-vicuna-unveiling-the-truth-behind-the-hype",

  excerpt:
    "We break down the differences between Pashmina and Vicuna to uncover what truly defines luxury.",

  coverImage: {
    url: "/images/blog_img_3.webp",
    alt: "Pashmina and Vicuna luxury fabrics comparison"
  },

  author: "Pashtush Editorial Team",
  publishedAt: "2024-06-21",
  status: "published",

  content: [
    {
      id: uuidv4(),
      type: "paragraph",
      data: {
        text:
          "In the world of luxury textiles, Vicuna has recently gained attention, but Pashmina’s legacy remains unmatched."
      }
    },
    {
      id: uuidv4(),
      type: "heading",
      data: {
        text: "A Legacy Rooted in Royalty",
        level: 2
      }
    },
    {
      id: uuidv4(),
      type: "image",
      data: {
        image: {
          url: "/images/blog/pashmina-royalty.jpg",
          alt: "Royal heritage of Pashmina shawls"
        }
      }
    }
  ],

  seo: {
    metaTitle: "Pashmina vs Vicuna | Luxury Fabric Truth",
    metaDescription:
      "Explore the real differences between Pashmina and Vicuna and discover why Pashmina stands the test of time."
  },

  createdAt: "2024-06-18",
  updatedAt: "2024-06-21"
},

{
  id: uuidv4(),

  title: "The Art of Gifting: Choosing the Perfect Pashtush Shawl",
  slug: "art-of-gifting-perfect-pashtush-shawl",

  excerpt:
    "A thoughtfully chosen shawl can become a timeless gift. Learn how to pick the perfect Pashtush piece.",

  coverImage: {
    url: "/images/blog_img_4.webp",
    alt: "Luxury Pashtush shawls arranged for gifting"
  },

  author: "Pashtush Editorial Team",
  publishedAt: "2024-05-31",
  status: "published",

  content: [
    {
      id: uuidv4(),
      type: "paragraph",
      data: {
        text:
          "Gifting a Pashmina shawl is more than a gesture—it’s an expression of warmth, elegance, and heritage."
      }
    },
    {
      id: uuidv4(),
      type: "heading",
      data: {
        text: "Why Pashmina Makes the Perfect Gift",
        level: 2
      }
    },
    {
      id: uuidv4(),
      type: "image",
      data: {
        image: {
          url: "/images/blog/pashmina-gifting.jpg",
          alt: "Pashtush shawls in luxury gift boxes"
        }
      }
    }
  ],

  seo: {
    metaTitle: "Luxury Shawl Gifting Guide | Pashtush",
    metaDescription:
      "Discover how to choose the perfect luxury Pashtush shawl for weddings, anniversaries, and special occasions."
  },

  createdAt: "2024-05-28",
  updatedAt: "2024-05-31"
},

{
  id: uuidv4(),

  title: "The Art of Gifting: Choosing the Perfect Pashtush Shawl",
  slug: "art-of-gifting-perfect-pashtush-shawl",

  excerpt:
    "A thoughtfully chosen shawl can become a timeless gift. Learn how to pick the perfect Pashtush piece.",

  coverImage: {
    url: "/images/blog_img_5.jpg",
    alt: "Luxury Pashtush shawls arranged for gifting"
  },

  author: "Pashtush Editorial Team",
  publishedAt: "2024-05-31",
  status: "published",

  content: [
    {
      id: uuidv4(),
      type: "paragraph",
      data: {
        text:
          "Gifting a Pashmina shawl is more than a gesture—it’s an expression of warmth, elegance, and heritage."
      }
    },
    {
      id: uuidv4(),
      type: "heading",
      data: {
        text: "Why Pashmina Makes the Perfect Gift",
        level: 2
      }
    },
    {
      id: uuidv4(),
      type: "image",
      data: {
        image: {
          url: "/images/blog/pashmina-gifting.jpg",
          alt: "Pashtush shawls in luxury gift boxes"
        }
      }
    }
  ],

  seo: {
    metaTitle: "Luxury Shawl Gifting Guide | Pashtush",
    metaDescription:
      "Discover how to choose the perfect luxury Pashtush shawl for weddings, anniversaries, and special occasions."
  },

  createdAt: "2024-05-28",
  updatedAt: "2024-05-31"
},

  
];
