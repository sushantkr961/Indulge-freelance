export type RootStackParamList = {
  Home: undefined;
  Referral: undefined;
  ReferFriend: undefined;
  TrackReferral: undefined;
  ReferFriendForm: {
    contact: {
      id: string;
      name: string;
      mobileNo: string | number;
      status?: string;
    };
  };
};
