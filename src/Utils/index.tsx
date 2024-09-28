import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { Dimensions, Platform } from "react-native";
export let PHONE_NUMBER = "";

export async function isLoggedIn() {
  let logIn = false;
  try {
    const data = await AsyncStorage.getItem("token");
    console.log(data, "data");
    // if (data) {
    const storedTokens = JSON.parse(data);
    const tokensExist = storedTokens && storedTokens.length > 0;
    console.log(tokensExist, "tokenexist");

    logIn = tokensExist !== null ? true : false;
    // } else {
    //     logIn = false;
    // }
    return logIn;
  } catch (error) {
    console.error("Error retrieving data:", error);
    logIn = false;
    return logIn;
  }
  // return logIn;
}
export const combineDateAndTime = (dateString: any, timeString: any) => {
  const date = new Date(dateString);

  const [time, period] = timeString.split(" ");
  const [hours, minutes] = time.split(":").map((part: any) => parseInt(part));

  let adjustedHours = hours;
  if (period === "PM" && hours !== 12) {
    adjustedHours += 12;
  } else if (period === "AM" && hours === 12) {
    adjustedHours = 0; // Handle 12 AM (midnight)
  }

  date.setHours(adjustedHours);
  date.setMinutes(minutes);

  return date;
};
export const windowWidth = Dimensions.get("window").width;
export const windowHeight = Dimensions.get("screen").height;
const flowerStatuses = [
  "Orchids",
  "Roses",
  "Hydrangeas",
  "Peonies",
  "Dahlias",
  "Daffodils",
  "Other",
];
const statusOptions = ["Single", "Dating", "Married", "Choose not to say"];
const travelStatuses = ["Every Week", "Holiday Season", "Every Month", "Other"];
const stayStatuses = ["Modern Hotels", "Heritage Hotels", "Boutique Hotels"];
const preferStatuses = ["Window Seat", "Aisle Seat", "Center Seat"];
const foodStatuses = ["Vegetarian", "Non-Vegetarian"];
const dietStatuses = [
  "Not on a diet",
  "Keto",
  "Intermittent Fasting",
  "Vegan",
  "Paleo",
  "Dash",
  "Raw Food Diet",
];
const coffeeStatuses = [
  "Arabica",
  "Robusta",
  "Latte",
  "Cappuccino",
  "Americano",
  "Espresso",
  "Doppio",
  "Filter",
  "Other",
];
const languageStatuses = [
  "French",
  "Chinese",
  "Japanese",
  "Indian",
  "Italian",
  "Greek",
  "Spanish",
  "Mediterranean",
  "Lebanese",
  "Moroccan",
  "Thai",
  "Turkish",
  "English",
  "Other",
];
const tasteData = [
  { index: 1, answer: "", question: "You are a" },
  { index: 2, answer: "", question: "You were born on" },
  {
    index: 3,
    answer: "",
    question: "Your marital status",
    optionsArray: statusOptions,
  },
  {
    index: 4,
    answer: "",
    question: "Are you a pet parent? What is their name?",
  },
  { index: 5, answer: "", question: "What is your favourite sport?" },
  {
    index: 6,
    answer: "",
    question: "The BEST brand according to you is.....?",
  },
  { index: 7, answer: "", question: "The Designer you ADORE..." },
  { index: 8, answer: "", question: "One Book that you recommend everyone" },
  { index: 9, answer: "", question: "The country you want to escape to?" },
  { index: 10, answer: "", question: "The car you love...?" },
  {
    index: 11,
    answer: "",
    question: "The actor/actress you are head over heels for",
  },
  { index: 12, answer: "", question: "The favourite artist?" },
  { index: 13, answer: "", question: "The favourite watch" },
  {
    index: 14,
    answer: "",
    question: "Is there any specific kind of food that you are allergic to?",
  },
  { index: 15, answer: "", question: "Your go-to drink?" },
  { index: 16, answer: "", question: "Your favourite food is?" },
  { index: 17, answer: "", question: "A restaurant cannot stop recommending?" },
  { index: 18, answer: "", question: "The dessert of your dreams" },
  {
    index: 19,
    answer: "",
    question: "Which is the car you travel most frequently in?",
  },
  { index: 20, answer: "", question: "What is your blood group?" },
  { index: 21, answer: "", question: "Are you diabetic?" },
  {
    index: 22,
    answer: "",
    question: "What do you usually need assistance with?",
  },
  { index: 23, answer: "", question: "What city do you reside in?" },
  {
    index: 24,
    answer: "",
    question:
      "Is there anything regarding your lifestyle that you would like to specify?",
  },
  { index: 25, answer: "", question: "We never got your name" },
  {
    index: 26,
    answer: "",
    question: "Also your company and designation please",
  },
  { index: 27, answer: "", question: "How do you find you on Instagram?" },
  { index: 28, answer: "", question: "Your LinkedIn profile" },
  { index: 29, answer: "", question: " Where do we send you the mail" },
  {
    index: 30,
    answer: "",
    question: "You prefer",
    optionsArray: preferStatuses,
  },
  {
    index: 31,
    answer: "",
    question: "You are a..",
    optionsArray: foodStatuses,
  },
  {
    index: 32,
    answer: "",
    question: "You like your stays in",
    optionsArray: stayStatuses,
  },
  {
    index: 33,
    answer: "",
    question: "Your ideal coffee is",
    optionsArray: coffeeStatuses,
  },
  {
    index: 34,
    answer: "",
    question: "How often do you travel",
    optionsArray: travelStatuses,
  },
  {
    index: 35,
    answer: "",
    question: "Are you currently on any form of diet?",
    optionsArray: dietStatuses,
  },
  {
    index: 36,
    answer: "",
    question: "The cuisine that makes your mouth water",
    optionsArray: languageStatuses,
  },
  {
    index: 37,
    answer: "",
    question: "Which is the flower you adore?",
    optionsArray: flowerStatuses,
  },
];
const FAQSDATA = [
  {
    id: 0,
    question: "Is there a cost benefit with INDULGE?",
    answer:
      "INDULGE is NOT a discounting platform. We are enabler optimised to support you and offer convenience. Think of it as an EA but on steroids (with global access)",
  },
  {
    id: 1,
    question: "What is the scope of requests I can make?",
    answer:
      "No request is too big. From sending flowers to jets and sails, restaurant reservations to sports and music tickets, buying bags and watches to medical assistance- we will cover you.",
  },
  {
    id: 2,
    question: "How many people can use the membership?",
    answer:
      "You and a +1 can use an individual membership wherein you will be addressed by the same team. In case the 2 individuals wish to keep their requests isolated from the other- another membership has to be activated.",
  },
  {
    id: 3,
    question: "How do I make payments for my request?",
    answer:
      "Mode of payment can be UPI, bank transfer (domestic or international), credit and debit card",
  },
  {
    id: 4,
    question: "How is Indulge different from having an EA?",
    answer: `EAs are available 7 hrs a day vs Indulge is available 24/7. Sick leaves or loss of contact with an EA can hamper your operations but Indulge offers a team of 7 so someone is always available. The scope of access with Indulge is global vs selective and predominantly local with an EA. When an EA leaves, there is loss of data (in terms of understanding your temperament, taste etc). You need not worry about that if a concierge manager leaves Indulge. They are under a heavy NDA and the data remains with Indulge so the service is consistent.`,
  },
  {
    id: 5,
    question: "Can I have a trial?",
    answer: `Our trial membership is available at INR 40,000 a month. You can experience the concierge team and then move onto the standard membership.`,
  },
  {
    id: 6,
    question: "Suggest a few things I can ask Indulge?",
    answer: `Arrange a bunch of peonies for my wife
Help me procure a Rolex Pepsi
Find me a Birkin 25 with gold hardware
Please get me 5 hospitality tickets to Euro cup
Plan my itinerary for Albania.
We are bored.Suggest something to do with the kids over the weekend
Arrange a private jet from Mumbai to Delhi`,
  },
];
export {
  flowerStatuses,
  statusOptions,
  travelStatuses,
  stayStatuses,
  preferStatuses,
  foodStatuses,
  dietStatuses,
  coffeeStatuses,
  languageStatuses,
  tasteData,
  FAQSDATA,
};

export const getCurrencySymbol = (region: string) => {
  switch (region) {
    case "IN":
      return "₹"; // Indian Rupee
    case "AE":
      return "د.إ"; // UAE Dirham
    case "GB":
      return "£"; // British Pound
    case "EU":
      return "€"; // Euro
    case "US":
      return "$"; // US Dollar
    default:
      return "$"; // Default to US Dollar if region is not recognized
  }
};
export const formatValue = (value: number) => {
  if (typeof value !== "number" || isNaN(value)) {
    return "0"; // or handle the error case as needed
  }
  if (value >= 10000000) {
    // 1 crore (10 million)
    return `${(value / 10000000).toFixed(2)}Cr`;
  } else if (value >= 100000) {
    // 1 lakh (100 thousand)
    return `${(value / 100000).toFixed(2)}L`;
  } else if (value >= 1000) {
    // 1 thousand
    return `${(value / 1000).toFixed(2)}k`;
  } else {
    return value.toFixed(2).toString();
  }
};

// Function to parse the URL into path and params
export const parseDeepLinkUrl = (url: string) => {
  console.log("URLLL=====", url);
  // Handle URLs starting with "ind://"
  // Remove the protocol (e.g., "ind://") and the trailing slash if it exists
  const strippedUrl = url.replace(/^ind:\/\//, "").replace(/\/$/, "");

  // Split the remaining URL by slashes
  const parts = strippedUrl.split("/");
  console.log("parts", parts);

  // The first part is the path (e.g., "Shop")
  const path = parts[0];

  // The second part is the ID (e.g., "66a8f843431a6667cb9ee953")
  const id = parts[1];

  return { path, id };

  // // Handle URLs with "http://" or "https://"
  // if (url.startsWith('http://') || url.startsWith('https://')) {
  //     const urlObj = new URL(url);

  //     // Extract the path and id from the query parameters
  //     const path = urlObj.searchParams.get('path');
  //     const id = urlObj.searchParams.get('id');
  //     console.log("path id ===== httpppppppppppp:", path, id)
  //     return { path, id };
  // }

  // const strippedUrl = url.replace(/^ind:\/\//, '').replace(/\/$/, '');

  // // Split the remaining URL by slashes
  // const parts = strippedUrl.split('/');
  // console.log("parts", parts);

  // // The first part is the path (e.g., "Shop")
  // const path = parts[0];

  // // The second part is the ID (e.g., "66a8f843431a6667cb9ee953")
  // const id = parts[1];
  // return { path, id };
};
export const extractPathAndId = (url: any) => {
  let regex;
  if (url.startsWith("ind://")) {
    // Regular expression for 'ind://' URLs
    regex = /ind:\/\/([^\/]+)\/([^\/]+)/;
  } else {
    // Regular expression for 'https://' or 'http://' URLs
    regex = /[?&]path=([^&]+)&id=([^&]+)/;
  }

  // Use the regular expression to find matches
  const matches = url.match(regex);

  // If matches are found, extract path and id, otherwise return null values
  if (matches) {
    const path = matches[1];
    const id = matches[2];
    return { path, id };
  } else {
    return { path: null, id: null };
  }
};
export const getTimeLeft = (auctionStartTime: any, auctionEndTime: any) => {
  const startTime = new Date(auctionStartTime).getTime();
  const now = new Date().getTime();

  let endTime;
  if (typeof auctionEndTime === "number") {
    // Convert hours to milliseconds
    endTime = startTime + auctionEndTime * 60 * 60 * 1000;
  } else {
    throw new Error("Invalid auctionEndTime format");
  }

  let timeLeft = endTime - now;

  if (timeLeft < 0) {
    return "Auction has ended";
  }

  const hours = Math.floor(timeLeft / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);

  const formatNumber = (number: any) => (number < 10 ? `0${number}` : number);

  return `${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(
    seconds
  )}`;
};

export const getAmountByRegion = (data: any, regionCode: any) => {
  const result = data.find((item: any) => item.region === regionCode);
  return result ? result.amount : null;
};

const [reelsData, setReelsData] = [
  {
    _id: "65b74d22d83bd8983596efee",
    title: "Hermès Kelly Picnic,",
    description: "A perfect blend of osseo wicker and luxurious leather",
    // "videoUrl": Video_1, //"blob:4CC0538A-9DEF-4CDF-AC8F-FA89B0EAD812?offset=0&size=7216777"
    // "videoUrl": "https://d13pwi6da1y6cp.cloudfront.net/Bags%2FRetail_Bags_Minibagcollection.mp4",
    // "thumbNail": ImageForThumbnail1,
    tags: ["Bags"],
    likeCount: 6,
    __v: 0,
  },
  {
    _id: "65a140d84accac0e5905f325",
    title: "Hermès Mini Kelly Bag",
    description: "The Icon of Chic Sophistication",
    // "videoUrl": Video_2, // "blob:4CC0538A-9DEF-4CDF-AC8F-FA89B0EAD812?offset=0&size=7216777",
    // "videoUrl": "https://d13pwi6da1y6cp.cloudfront.net/Bags%2F%23Bag%20%23Louisvuitton%20%23trend%20%23news.mp4",
    tags: ["Bags"],
    // "thumbNail": ImageForThumbnail2,

    likeCount: 5,
    __v: 0,
  },
  {
    _id: "65a140d84accac0e5905f3251",
    title: "BMW",
    description: "BMW : The ultimate driving machine",
    // "videoUrl": BMW,
    // "videoUrl": "https://d13pwi6da1y6cp.cloudfront.net/Bags%2F%23Bag%20%23Louisvuitton%20%23trend%20%23news.mp4",
    tags: ["Automobiles"],
    // "thumbNail": ImageForThumbnail2,

    likeCount: 5,
    __v: 0,
  },
  {
    _id: "65a140d84accac0e5905f3252",
    title: "Patek Phillipe Aquanaut   ",
    description: "Crafted for the Modern Explorer: Patek Philippe Aquanaut.",
    // "videoUrl": Patek_Philippe_Aquanaut,
    // "videoUrl": "https://d13pwi6da1y6cp.cloudfront.net/Bags%2F%23Bag%20%23Louisvuitton%20%23trend%20%23news.mp4",
    tags: ["Watches"],
    // "thumbNail": ImageForThumbnail2,
    likeCount: 5,
    __v: 0,
  },
  {
    _id: "65b74a65d83bd8983596ef2f",
    title: "Top Bags",
    // "videoUrl": Video_5,
    // "videoUrl": "https://d13pwi6da1y6cp.cloudfront.net/Bags%2FRetail_Bags_Jacquemus_minibag.mp4",
    tags: ["Bags", "Fashion"],
    // "thumbNail": ImageForThumbnail5,
    likeCount: 0,
    __v: 0,
  },
  {
    _id: "65a140d84accac0e5905f32521",
    title: "Timeless Luxury ",
    description: "Rolex: The ultimate symbol of Luxury",
    // "videoUrl": ROlex_Panda,
    // "videoUrl": "https://d13pwi6da1y6cp.cloudfront.net/Bags%2F%23Bag%20%23Louisvuitton%20%23trend%20%23news.mp4",
    tags: ["Watches"],
    // "thumbNail": ImageForThumbnail2,

    likeCount: 5,
    __v: 0,
  },
  // {
  //     "_id": "65a13e9f4accac0e5905f0c4",
  //     "title": "Explore the World's Most Prestigious Art Fair",
  //     "description": "Uncover Masterpieces at the Forefront of Global Artistry",
  //     "videoUrl": Video_6,
  //     "tags": [
  //         "Art"
  //     ],
  //     "thumbNail": ImageForThumbnail6,
  //     "likeCount": 11,
  //     // "videoUrl": "https://d13pwi6da1y6cp.cloudfront.net/Art%2FMost%20popular%20art%20expo.mp4",
  //     "__v": 0
  // },
];
