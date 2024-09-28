import { Text, View } from 'react-native'
import React from 'react'
import AboutUsStyle from './style';


const AboutUsScreen = () => {
    return (
        <View style={AboutUsStyle.container}>
            <Text style={AboutUsStyle.textStyle}>
                {`UNPARALLELED CONVENIENCE
No request is too big. You simply have to send your personal concierge team a WhatsApp message.

With a beautiful blend of AI, we cater to your needs 24×7. Our AI algorithm is attuned to your behavior, interests, and preferences. It works alongside your team at Indulge so that personal touch is not lost to speed.

We also know that you value us for our attention to detail and human expertise. Hence, your concierge manager is always monitoring your requests and intervenes the moment you ask for them.

So, savoring a bite of that fine Iranian beluga caviar or experiencing a private concert inside a volcano, whatever you desire, we make it happen. And, we make it happen now!`}
            </Text>
        </View>
    )
};

export default AboutUsScreen

