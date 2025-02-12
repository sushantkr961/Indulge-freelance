import AsyncStorage from '@react-native-async-storage/async-storage';

const LikedReelsStorage = {
  async getLikedReels() {
    try {
      const likedReels = await AsyncStorage.getItem('likedReels');
      return likedReels ? JSON.parse(likedReels) : [];
    } catch (error) {
    
      return [];
    }
  },

  async setLikedReels(likedReels) {
    try {
      await AsyncStorage.setItem('likedReels', JSON.stringify(likedReels));
    } catch (error) {
      
    }
  },
};

export default LikedReelsStorage;

