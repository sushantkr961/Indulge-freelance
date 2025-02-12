// import React, { useEffect, useState } from 'react';
// import { StyleSheet, Text, View, Alert } from 'react-native';
// import axios from "axios";
// // import { usePaymentSheet, initPaymentSheet, PlatformPay } from '@stripe/stripe-react-native';
// // import { PlatformPayButton, usePlatformPay } from '@stripe/stripe-react-native';

// function PaymentScreen() {
//     const {
//         isPlatformPaySupported,
//         createPlatformPayPaymentMethod,
//     } = usePlatformPay();

//     React.useEffect(() => {
//         // ... // see above
//     }, []);

//     const createPaymentMethod = async () => {
//         const { error, paymentMethod } = await createPlatformPayPaymentMethod({
//             googlePay: {
//                 amount: 12,
//                 currencyCode: 'USD',
//                 testEnv: true,
//                 merchantName: 'Test',
//                 merchantCountryCode: 'US',
//             },
//         });

//         if (error) {
//             Alert.alert(error.code, error.message);
//             return;
//         } else if (paymentMethod) {
//             Alert.alert(
//                 'Success',
//                 `The payment method was created successfully. paymentMethodId: ${paymentMethod.id}`
//             );
//         }
//     };

//     return (
//         <View >
//             <PlatformPayButton
//                 type={PlatformPay.ButtonType.GooglePayMark}
//                 onPress={createPaymentMethod}
//                 style={{
//                     width: '100%',
//                     height: 50,
//                 }}
//             />
//         </View>
//     );
// }
// export default PaymentScreen