// store.js
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import tagsReducer from './TagsSlice';
import productReducer from './AllReelsSlice'
import filterSlice from './FilterSlice';
import likeReelSlice from './LikeReelSlice';
import profileNotesSlice from './ProfileNotesSlice';
import ProfileAddressSlice from './ProfileAddressSlice';
import AuctionOngoingSlice from './AuctionOngoingSlice';
import ShopFilterListSlice from './ShopFilterListSlice';
import ShopProductListSlice from './ShopProductListSlice';
import TransactionSlice from './TransactionSlice';
import CalendarNotificationsSlice from './CalendarNotificationsSlice';
import CartListSlice from './CartListSlice';
import ProfileDetailsSlice from './ProfileDetailsSlice';
import OrderListSlice from './OrderListSlice';
import ExploreFilterListSlice from './ExploreFilterListSlice';
import ExploreDataListSlice from './ExploreDataListSlice';
import DeepLinkingSlice from './DeepLinkingSlice';
import GetEcomAndExploreCarosalImageSlice from './GetEcomAndExploreCarosalImageSlice'
import MyCouponSlice from './MyCouponSlice'
import MyPlansSlice from './MyPlansSlice';
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  // transforms: [JSOGTransform]

};

const rootReducer = combineReducers({
  tags: tagsReducer,
  product: productReducer,
  filter: filterSlice,
  likeReel: likeReelSlice,
  profileNotes: profileNotesSlice,
  profileAddress: ProfileAddressSlice,
  auctionOngoing: AuctionOngoingSlice,
  shopFilterList: ShopFilterListSlice,
  exploreFilterList: ExploreFilterListSlice,
  shopProductList: ShopProductListSlice,
  transactionSlice: TransactionSlice,
  calendarNotificationsSlice: CalendarNotificationsSlice,
  cartList: CartListSlice,
  profileDetails: ProfileDetailsSlice,
  orderList: OrderListSlice,
  exploreData: ExploreDataListSlice,
  deeplinkData: DeepLinkingSlice,
  carosalImageData: GetEcomAndExploreCarosalImageSlice,
  myCouponData: MyCouponSlice,
  myPlans: MyPlansSlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch