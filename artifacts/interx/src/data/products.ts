import headphonesImg from "@/assets/headphones.png";
import cameraImg from "@/assets/camera.png";
import sneakersImg from "@/assets/sneakers.png";
import consoleImg from "@/assets/console.png";
import iphoneBackImg from "@assets/image_1777792596654.png";
import iphoneFrontImg from "@assets/image_1777792606688.png";
import iphoneBatteryImg from "@assets/image_1777792617158.png";
import iphoneSideImg from "@assets/image_1777792625718.png";
import iphoneSide2Img from "@assets/image_1777792632796.png";
import iphoneTopImg from "@assets/image_1777792641567.png";
import iphoneGridImg from "@assets/截屏2026-05-03_16.17.36_1777792670400.png";

export type Condition = "Mint" | "Good" | "Fair";

export interface Seller {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  reviewCount: number;
  country: string;
  countryCode: string;
  flag: string;
  city: string;
  memberSince: string;
  responseTime: string;
  totalSales: number;
  verified: boolean;
}

export interface Product {
  id: string;
  title: string;
  images: string[];
  price: number;
  location: string;
  city: string;
  countryCode: string;
  flag: string;
  condition: Condition;
  shipping: string;
  category: string;
  description: string;
  specs: Record<string, string>;
  seller: Seller;
  views: number;
  saves: number;
  listedAt: string;
}

const sellers: Record<string, Seller> = {
  kenji: {
    id: "seller-1",
    name: "kenji.trade",
    avatar: "",
    rating: 4.9,
    reviewCount: 312,
    country: "Japan",
    countryCode: "JP",
    flag: "🇯🇵",
    city: "Tokyo",
    memberSince: "2021",
    responseTime: "< 1 hour",
    totalSales: 528,
    verified: true,
  },
  dieter: {
    id: "seller-2",
    name: "dieter.collectibles",
    avatar: "",
    rating: 4.8,
    reviewCount: 97,
    country: "Germany",
    countryCode: "DE",
    flag: "🇩🇪",
    city: "Berlin",
    memberSince: "2020",
    responseTime: "< 3 hours",
    totalSales: 143,
    verified: true,
  },
  jordanking: {
    id: "seller-3",
    name: "jordanking_nyc",
    avatar: "",
    rating: 4.7,
    reviewCount: 211,
    country: "United States",
    countryCode: "US",
    flag: "🇺🇸",
    city: "New York",
    memberSince: "2022",
    responseTime: "< 6 hours",
    totalSales: 89,
    verified: false,
  },
  londontech: {
    id: "seller-4",
    name: "london.tech",
    avatar: "",
    rating: 4.95,
    reviewCount: 441,
    country: "United Kingdom",
    countryCode: "GB",
    flag: "🇬🇧",
    city: "London",
    memberSince: "2019",
    responseTime: "< 2 hours",
    totalSales: 702,
    verified: true,
  },
  sfmac: {
    id: "seller-5",
    name: "sfmac_resale",
    avatar: "",
    rating: 4.85,
    reviewCount: 178,
    country: "United States",
    countryCode: "US",
    flag: "🇺🇸",
    city: "San Francisco",
    memberSince: "2022",
    responseTime: "< 4 hours",
    totalSales: 234,
    verified: true,
  },
  genevawatch: {
    id: "seller-6",
    name: "geneva.watch",
    avatar: "",
    rating: 5.0,
    reviewCount: 62,
    country: "Switzerland",
    countryCode: "CH",
    flag: "🇨🇭",
    city: "Geneva",
    memberSince: "2020",
    responseTime: "< 24 hours",
    totalSales: 38,
    verified: true,
  },
  toronto_furn: {
    id: "seller-7",
    name: "toronto_furn",
    avatar: "",
    rating: 4.6,
    reviewCount: 55,
    country: "Canada",
    countryCode: "CA",
    flag: "🇨🇦",
    city: "Toronto",
    memberSince: "2023",
    responseTime: "< 12 hours",
    totalSales: 47,
    verified: false,
  },
  seoulplay: {
    id: "seller-8",
    name: "seoulplay.kr",
    avatar: "",
    rating: 4.92,
    reviewCount: 390,
    country: "South Korea",
    countryCode: "KR",
    flag: "🇰🇷",
    city: "Seoul",
    memberSince: "2021",
    responseTime: "< 1 hour",
    totalSales: 815,
    verified: true,
  },
};

export const PRODUCTS: Product[] = [
  {
    id: "1",
    title: "白色苹果 17 Air 256G 国行",
    images: [iphoneBackImg, iphoneFrontImg, iphoneSideImg, iphoneSide2Img, iphoneTopImg, iphoneGridImg],
    price: 3155,
    location: "杭州, CN",
    city: "Hangzhou",
    countryCode: "CN",
    flag: "🇨🇳",
    condition: "Mint",
    shipping: "可自提",
    category: "手机",
    description:
      "白色苹果17 Air 256G 国行，成色几乎全新，外观很新，循环次数少，电池健康度高，功能全正常。全原装无拆无修，带原包装盒和配件，系统流畅，支持5G双卡，细节可聊，价格可聊。",
    specs: {
      品牌: "Apple/苹果",
      型号: "iPhone 17",
      存储容量: "256GB",
      版本: "大陆国行",
      成色: "几乎全新",
      拆修和功能: "无任何维修",
    },
    seller: sellers.seoulplay,
    views: 7,
    saves: 45,
    listedAt: "刚刚",
  },
  {
    id: "2",
    title: "Vintage Leica M3 Rangefinder Camera — Silver Chrome",
    images: [cameraImg, cameraImg, cameraImg],
    price: 1850,
    location: "Berlin, DE",
    city: "Berlin",
    countryCode: "DE",
    flag: "🇩🇪",
    condition: "Good",
    shipping: "45",
    category: "Cameras",
    description:
      "A stunning 1957 Leica M3 double-stroke in silver chrome. Recently serviced by a certified Leica technician in Hamburg — CLA completed, shutter speeds accurate, rangefinder patch bright and clear. Some brassing on top plate edges, consistent with age and honest use. A true collector's piece that still shoots beautifully.",
    specs: {
      Year: "1957",
      Type: "Double Stroke",
      Finish: "Silver Chrome",
      Shutter: "1/1000 — 1s + B",
      Rangefinder: "Bright, aligned",
      Service: "CLA 2024",
      Meter: "None (external)",
    },
    seller: sellers.dieter,
    views: 889,
    saves: 54,
    listedAt: "5 days ago",
  },
  {
    id: "3",
    title: "Nike Air Jordan 1 Retro High OG 'Chicago' (2015)",
    images: [sneakersImg, sneakersImg, sneakersImg],
    price: 850,
    location: "New York, US",
    city: "New York",
    countryCode: "US",
    flag: "🇺🇸",
    condition: "Fair",
    shipping: "Free",
    category: "Sneakers",
    description:
      "Authentic 2015 Nike Air Jordan 1 Retro High OG Chicago. Size US 10. Worn maybe 15 times over the years, kept in a climate-controlled closet since 2019. Shows light creasing on the toe box and some yellowing on the midsole — standard for age. No holes, no tears. OG box included but has wear.",
    specs: {
      Size: "US 10 / EU 44",
      Year: "2015",
      Colorway: "White/Black-Varsity Red",
      Style: "555088-101",
      Box: "Included (worn)",
      "Lace dubrae": "Yes",
      Auth: "StockX verified",
    },
    seller: sellers.jordanking,
    views: 2310,
    saves: 192,
    listedAt: "1 week ago",
  },
  {
    id: "4",
    title: "PlayStation 5 Console — Disc Edition",
    images: [consoleImg, consoleImg, consoleImg],
    price: 399,
    location: "London, UK",
    city: "London",
    countryCode: "GB",
    flag: "🇬🇧",
    condition: "Mint",
    shipping: "15",
    category: "Gaming",
    description:
      "PlayStation 5 Disc Edition in perfect working condition. Purchased July 2023, selling because I moved to PC gaming. Comes with original box, one DualSense controller, all cables, and HDMI 2.1 cable. Console has been kept in an entertainment unit — no pets, no smokers household.",
    specs: {
      Storage: "825GB SSD",
      Region: "PAL (UK)",
      Controllers: "1x DualSense (White)",
      Version: "CFI-1216A",
      "4K": "Yes",
      Cables: "HDMI 2.1 + USB-C",
      Box: "Full retail box",
    },
    seller: sellers.londontech,
    views: 3401,
    saves: 278,
    listedAt: "3 days ago",
  },
  {
    id: "5",
    title: "Apple MacBook Pro M3 Max 14-inch 36GB RAM",
    images: [headphonesImg, headphonesImg],
    price: 2800,
    location: "San Francisco, US",
    city: "San Francisco",
    countryCode: "US",
    flag: "🇺🇸",
    condition: "Mint",
    shipping: "Free",
    category: "Computers",
    description:
      "14-inch MacBook Pro with M3 Max chip, 36GB unified memory, 1TB SSD in Space Black. Used for 4 months for light creative work. Battery health at 99% (71 cycles). Comes with original 140W USB-C power adapter and box. No dents, no scratches. Screen is perfect.",
    specs: {
      Chip: "M3 Max (14-core CPU)",
      Memory: "36GB Unified",
      Storage: "1TB SSD",
      Display: "14.2-inch Liquid Retina XDR",
      Battery: "99% health / 71 cycles",
      Color: "Space Black",
      OS: "macOS Sequoia",
    },
    seller: sellers.sfmac,
    views: 5100,
    saves: 430,
    listedAt: "1 day ago",
  },
  {
    id: "6",
    title: "Rolex Submariner Date 116610LN Black Dial",
    images: [cameraImg, cameraImg, cameraImg],
    price: 11500,
    location: "Geneva, CH",
    city: "Geneva",
    countryCode: "CH",
    flag: "🇨🇭",
    condition: "Good",
    shipping: "120",
    category: "Watches",
    description:
      "2019 Rolex Submariner Date in steel with black dial and bezel. Complete set with original box, papers, and additional links. Serviced by Rolex Geneva in 2023. Reference 116610LN. Light wear on bracelet from daily use. Bezel insert perfect — no fading. A classic investment-grade timepiece.",
    specs: {
      Reference: "116610LN",
      Year: "2019",
      Material: "Oystersteel",
      Dial: "Black",
      Bezel: "Black Ceramic",
      "Box & Papers": "Complete",
      Service: "Rolex 2023",
    },
    seller: sellers.genevawatch,
    views: 1890,
    saves: 145,
    listedAt: "4 days ago",
  },
  {
    id: "7",
    title: "Herman Miller Aeron Chair — Size B, Fully Loaded",
    images: [sneakersImg, sneakersImg],
    price: 650,
    location: "Toronto, CA",
    city: "Toronto",
    countryCode: "CA",
    flag: "🇨🇦",
    condition: "Fair",
    shipping: "80",
    category: "Furniture",
    description:
      "Herman Miller Aeron Remastered, Size B (medium), Graphite with PostureFit SL, fully adjustable arms, lumbar support, and tilt limiter. Purchased 2022. Some surface scratches on the armrests from daily use, mesh is in excellent condition. Perfect for a home office upgrade.",
    specs: {
      Size: "B (Medium)",
      Color: "Graphite",
      "Lumbar Support": "PostureFit SL",
      Arms: "Fully adjustable 4D",
      Mesh: "8Z Pellicle",
      Year: "2022",
      "Local Only": "Ship or local pickup",
    },
    seller: sellers.toronto_furn,
    views: 741,
    saves: 39,
    listedAt: "2 weeks ago",
  },
  {
    id: "8",
    title: "个人闲置苹果15 国行 128GB 粉色",
    images: [iphoneBackImg, iphoneFrontImg, iphoneBatteryImg, iphoneSideImg, iphoneSide2Img, iphoneTopImg, iphoneGridImg],
    price: 2436,
    location: "玉林, CN",
    city: "Yulin",
    countryCode: "CN",
    flag: "🇨🇳",
    condition: "Mint",
    shipping: "包邮",
    category: "手机",
    description:
      "个人闲置苹果15，国行128G，粉色，成色新，可以当主力机，带壳带膜，保存很好，到手即用。爱思全绿屏面容正常，放心用。",
    specs: {
      品牌: "Apple/苹果",
      型号: "iPhone 15",
      存储容量: "128GB",
      运行内存: "6GB",
      版本: "大陆国行",
      成色: "细微磕碰划痕",
      拆修和功能: "无任何维修",
    },
    seller: sellers.seoulplay,
    views: 1250,
    saves: 45,
    listedAt: "3小时前",
  },
];

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}
