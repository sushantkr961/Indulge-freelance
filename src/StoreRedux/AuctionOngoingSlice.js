import {
  getMyBidsApi,
  getOngoingBidsApi,
  getWonBidsApi,
} from "../Service/AuctionApi/AuctionApiServices";
import { STATUSES } from "./objects";

const { createSlice } = require("@reduxjs/toolkit");

const AuctionOngoingSlice = createSlice({
  name: "auctionOngoing",
  initialState: {
    onGoingBidData: [],
    guideAuctionData: [
      {
        id: 1,
        question:
          "How soon before the auction can a prospective buyer register for bidding?",
        answer: `If you haven't registered for bidding with us before, we recommend initiating the registration process at least four business days before the auction to ensure a smooth experience.`,
        type: 1,
      },
      {
        id: 2,
        question: "What steps does the registration process entail?",
        subTitle:
          "You can complete the registration process in a few straightforward steps:",
        verification:
          "Complete your KYC process. You can contact us to receive a link or log in to your account and complete the process through your dashboard.",
        deposit:
          "Make the required deposit. You can request a link from us or log in to your account to complete this step via your dashboard.",
        biddingAccess:
          "Once your deposit is confirmed, you will receive your bidding access on the app.",
        type: 2,
      },
      {
        id: 3,
        question: "What documents are required for submission?",
        subTitle:
          "To complete the verification process, Indulge Auction asks prospective bidders to provide the following documents:",
        type: 1,
        answer: `(i) A government-issued identity proof; (ii) A government-issued residence proof; (iii) PAN and Aadhar details to confirm tax residency status; (iv) For entities, Indulge Auction may request additional documents, such as a Board resolution and the memorandum of association, for verification.`,
      },
      {
        id: 4,
        question: "Can I update my contact details after registering?",
        answer: `Once registered, bidders cannot change their email address or phone number. However,you can update other profile details as needed. If you need to change your residence or contact information, please contact our customer care team for assistance.`,
        type: 1,
      },
      {
        id: 5,
        question: "How does the bidding process work?",
        subTitle:
          "Here’s a step-by-step guide to placing your bids once the auction goes live on our website:",
        answer: `a) Visit the Indulge Auction website and choose the live auction you wish to participate in.
        
b) Find the specific lot you want to bid on and click the "Bid" button to confirm your bid amount, available in either INR or USD. Please note that all bids are final and cannot be cancelled once placed.
        
c) If you are outbid during the live auction, you can place a new bid with a 10% increment over the current highest bid.
        
d) Continue bidding on your selected lots until they reach their scheduled closing time. To stay informed, remember to click the "Refresh" button regularly.
        
e) The winning bid will be the highest bid that meets or exceeds the reserve price set for that lot.
        
f) If a bid is placed within the last three minutes before a lot’s scheduled closing time, the closing time will be extended by three minutes. This extension will continue until no further bids are placed within the final three minutes.`,
        type: 1,
      },
      {
        id: 6,
        question: "What is the starting bid value?",
        answer: `The opening bid is typically set at 10% below the lower estimate of the item. For no-reserve auctions, the opening bid will be XXXX. Generally, the house holds the opening bid, with subsequent bids placed above this amount.`,
        type: 1,
      },
      {
        id: 7,
        question: "Is there a limit on the number of bids I can place?",
        answer: `There are no restrictions on the number of bids you can place, provided they are within the assigned bid limits. Indulge Auction may impose limits on the maximum number of bids a bidder can submit.`,
        type: 1,
      },
      {
        id: 8,
        question: "Are there any bidding limits?",

        answer: `Bidders will be informed of their bidding limits, if any, which can also be viewed on your
dashboard. If you wish to increase your bid limit, you can do so by making an additionaldeposit.

Once the bidding limit is reached, the bidder will be unable to place further bids. However,Indulge Auction may allow an increase in bidding limits upon request.

BIDDING LIMITS ARE LINKED TO THE SECURITY DEPOSIT AMOUNT
        
Security Deposit | Bid Limit
20,000 | 2,00,000
50,000 | 5,00,000
1,00,000 | 10,00,000
1,50,000 | 15,00,000 and above

Alternatively, you can also increase bid limits via a bank transfer. Our bank account details are provided below.
        
Indulge UPI : indulge.global@ybl
Indulge bank details :
Rbl A/c Details:-
A/c number - 409985555550
Alc name - Pricetime Technologies Pvt Ltd
Bank name - Rbl bank
Bank Branch - Kukatpally
IFSC Code - RATNO000208`,
        type: 1,
      },
      {
        id: 9,
        question: "What is an absentee/proxy bid?",
        answer: `a) Absentee or Proxy Bids are bids placed by a Registered Bidder in an auction, either before the auction begins or during a live auction. In this case, the system automatically places bids on behalf of the Registered Bidder, following the maximum bid amounts set by the bidder.
        
b) A Proxy Bid submitted before an auction (known as a pre-auction Proxy Bid) must be placed at least 24 hours prior to the start of the auction. Pre-auction Proxy Bids can be revoked if done more than 24 hours before the auction begins.
        
c) Proxy Bids made during a live auction cannot be canceled once they are placed.
        `,
        type: 1,
      },
      {
        id: 10,
        question: "Will there be phone bidding?",
        answer: `a) Phone bidding is offered as a complimentary service for all Registered Bidders by Indulge Auction.
        
b) Requests for Phone Bids should be submitted no less than 24 hours before the auction begins.
        
c) For telephone bids, when the Lot is about to be auctioned, our team at Indulge Auction will make every effort to contact the Bidder by phone. If successful, the Bidder can participate in the auction with the guidance of Indulge Auction staff.
        
d) The Bidder will need to provide their Login credentials, including the account password, to an Indulge Auction representative, who will then place the bid on their behalf.
        `,
        type: 1,
      },
      {
        id: 11,
        question: "Can I cancel my live or proxy bid?",
        answer:
          "Once a Bidder has placed a bid or a proxy bid, they cannot retract or cancel the bid.",
        type: 1,
      },
      {
        id: 12,
        question: "How do I pay for my purchase?",
        answer: `After a successful bid, you will promptly receive an email containing an invoice that outlines the total purchase price, including the hammer price, applicable margin, and other buyer-related charges. Please note that all sales within India are subject to GST, with rates ranging from 3% to 28% depending on the category.
        
You are required to complete the payment within seven business days of receiving the invoice. Please note that any payment delays will incur a monthly interest charge of 2%.
        
Alternatively, you can also increase bid limits via a bank transfer. Our bank account details are provided below.
        
Indulge UPI : indulge.global@ybl
Indulge bank details :
Rbl A/c Details:-
A/c number - 409985555550
Alc name - Pricetime Technologies Pvt Ltd
Bank name - Rbl bank
Bank Branch - Kukatpally
IFSC Code - RATN0000208`,
        type: 1,
      },
    ],
    status: STATUSES.IDLE,
    error: "",
    myBidData: [],
    wonBidData: {},
  },
  reducers: {
    addMyBid(state, action) {
      const newBid = action.payload;
      const existingIndex = state.myBidData.findIndex(
        (bid) => bid.bidId === newBid.bidId
      );

      if (existingIndex !== -1) {
        // If bid with same bidId already exists, replace it
        state.myBidData[existingIndex] = newBid;
      } else {
        // Otherwise, add the new bid
        state.myBidData.push(newBid);
      }
    },
    setOngoingBidData(state, action) {
      state.onGoingBidData = action.payload;
    },
    setMyBidData(state, action) {
      state.myBidData = action.payload;
    },
    setWonBidData(state, action) {
      state.wonBidData = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const {
  setWonBidData,
  addMyBid,
  setStatus,
  setOngoingBidData,
  setError,
  setMyBidData,
} = AuctionOngoingSlice.actions;
export default AuctionOngoingSlice.reducer;

export function fetchOngoingBidData(userId) {
  return async function fetchOngoingBidDataThunk(dispatch, getState) {
    dispatch(setStatus(STATUSES.LOADING));
    dispatch(setOngoingBidData([]));
    try {
      const responseData = await getOngoingBidsApi(userId);
      dispatch(setOngoingBidData(responseData));
      dispatch(setStatus(STATUSES.IDLE));
    } catch (err) {
      console.error("responseData::err", err);
      // dispatch(setError(err));
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
}

export function fetchMyBidData(userId) {
  console.log("responseData::userIduserIduserId", userId);

  return async function fetchMyBidDataThunk(dispatch, getState) {
    dispatch(setStatus(STATUSES.LOADING));
    dispatch(setMyBidData([]));
    try {
      const responseData = await getMyBidsApi(userId);
      dispatch(setMyBidData(convertDataFormat(responseData)));
      dispatch(setStatus(STATUSES.IDLE));
    } catch (err) {
      console.error("responseData::err", err);
      dispatch(setError(err));
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
}

const convertDataFormat = (data) => {
  return data
    .map((order) => {
      return order.products
        .filter((productItem) => productItem.product !== null)
        .map((productItem) => {
          const product = productItem.product;
          return {
            _id: product._id,
            name: product.name,
            images: product.images,
            mainImage: product.mainImage,
            video: product.video || null, // Assuming some products might not have a video
            prices: product.prices,
            description: product.description || "", // Assuming description might be missing
            productType: product.productType,
            auctionEndTime: product.auctionEndTime,
            categories: product.categories,
            __v: product.__v || 0, // Defaulting to 0 if not present
            auctionStartTime: product.auctionStartTime,
            lastBiddedAmount: product.lastBiddedAmount,
            myBidValue: productItem.totalPrice,
          };
        });
    })
    .flat(); // Flatten the array if nested
};

export function fetchWonBidData(id) {
  console.log("responseData::idididididid::::", id);
  return async function fetchWonBidDataThunk(dispatch, getState) {
    dispatch(setWonBidData({}));
    try {
      const responseData = await getWonBidsApi(id);
      dispatch(setWonBidData(responseData));
    } catch (err) {
      dispatch(setWonBidData({}));
      console.log("responseData::err", err);
    }
  };
}
