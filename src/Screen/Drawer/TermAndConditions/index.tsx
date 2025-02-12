import { SafeAreaView, ScrollView, Text, View } from 'react-native'
import React from 'react'
import TAndCStyle from './style';
import DrawerScreensHeader from '../../../Components/DrawerScreensHeader';
import { useNavigation } from '@react-navigation/native';



const TermAndConditionsScreen = () => {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={TAndCStyle.container}>
            <DrawerScreensHeader
                style={TAndCStyle.headerStyle}
                title="Terms & Conditions"
                leftButtonAction={() => navigation.goBack()}
            />
            <ScrollView contentContainerStyle={TAndCStyle.container0}>
                {/* <WebView 
                source={{ uri: 'https://collectibles.global/pages/terms-of-use' }}
            /> */}
                <Text style={TAndCStyle.textStyle0}>INDULGE TERMS OF USE AND SERVICE</Text>
                <Text style={TAndCStyle.textStyle1}>1. YOUR APPROVAL</Text>
                <Text style={TAndCStyle.textStyle2}>
                    {`1.1	You may accept this Agreement only if:

(a)	if You are a natural Person, are of the legal age, eligibility and mental capability to form a binding contract.

(b)	if You are a juristic Person, are lawfully existing and have all the authorizations, permits and allowances to enter into this Agreement and form a binding contract. 

(c)	You are not legally barred or restricted from accessing the Platforms or using the Services or any part of it.

1.2	We do not want any Person to access the Services if such Person does not understand, approve of or accept each and every term specified in this Agreement. Hence, You are requested to read these Terms and Privacy Policy carefully and understand the Agreement before approving, accepting and agreeing to be bound by it.

1.3	You will be deemed to have accepted this Agreement by simply availing Services, including but not limited to, by:

(a)	creating a Registered Account; 

(b)	uploading, adding, storing and/ or displaying any Content on the Platform;

(c)	accessing or downloading the Platform or any Content thereof; and/ or

(d)	simply surfing and/ or browsing the Platform.
`}
                </Text>
                <Text style={TAndCStyle.textStyle1}>2. PROVISION OF SERVICES</Text>
                <Text style={TAndCStyle.textStyle2}>
                    {`2.1	Services provided to You are subject to Your acceptance and approval of this Agreement. You are requested not to use and/ or access the Platform, Services and/ or any part thereof if You do not approve of, agree with and accept each and every term of this Agreement. 

2.2	The purpose of the Platform and Services is to provide users an online Platform for accessing concierge and luxury lifestyle management products and services, including bookings for premium events, products, auctions and e-commerce.

2.3	In order to provide most parts of Services (“Registrable Services”), We may require You to become a member of Indulge by registering on the Platform by providing specific information and creating an account (“Registered Account”). You agree and understand that Registrable Services shall not be provided to You unless You register on the Platform and become a Registered User in the form and manner required by Us.

2.4	You agree and acknowledge that provision of Registrable Services to You is dependent on the information that You provide to access such Registrable Services. You shall ensure that all such information provided by You is always true, accurate, complete and updated.

2.5	While some parts of Services are available to Users free of cost, most parts of Services may be provided to the Users at a cost. We reserve the right to amend these Terms and impose a cost on free parts of Services in future. We will use reasonable efforts to give You a prior intimation as and when any part of free Service becomes a paid Service. If, after being so intimated, You access paid parts of Services, cost for such paid Services shall become due and payable by You to Us and We shall have a right to recover the cost for provision of such paid Services to You, from You.

2.6	Subject to applicable laws, We may stop provision of Services (or any part of Services), permanently or temporarily, to You or to Users generally or may modify or change the nature of Services and/ or these Terms at its sole discretion, without any prior notice to You. Your Use of Services following any such modification shall constitute Your deemed acceptance of this Agreement (or as it may be modified).
`}
                </Text>
                <Text style={TAndCStyle.textStyle1}>3. ELIGIBILITY AND MEMBERSHIP </Text>
                <Text style={TAndCStyle.textStyle2}>
                    {`3.1	You agree and understand that most of the products and services offered on the Platform are for Registered Users only and provision of Registrable Services to the Registered Users shall be subject to such User fulfilling the minimum eligibility and membership requirements, background check of such User by Us, Minimum Initial Balance requirement and compliance with such other financial, ethical and personal profile requirements as required from time to time.

3.2	You agree and acknowledge that while most of Our Services are offered to Users who are of the legal age, some Services and Products would be subject to age and eligibility restrictions as per various applicable laws and regulations specific to different states/ jurisdictions in India or globally.

3.3 	You agree and acknowledge that We reserve the right to choose members and the right to refuse services, cancel memberships, terminate accounts and terminate the rights of Users to access the Platform in its sole discretion. We reserve the rights to amend the Terms, eligibility criteria and membership rights available to Users in future after giving appropriate notice and intimation.

3.4	We guarantee that provision of membership and/ or access to Registrable Services shall be without any discrimination of any kind based on race, colour, sex, language, religion, political or other opinion, national or social origin, birth or other status such as disability, marital status, sexual orientation and gender identity.
`}
                </Text>
                <Text style={TAndCStyle.textStyle1}>4. USE OF SERVICES </Text>
                <Text style={TAndCStyle.textStyle2}>
                    {`4.1	In order to use Services, You will require accessing the Platform through internet in such form and manner as provided by Us. We may update the Platform from time to time in order to ensure a better experience for the Users and consequently may temporarily cut or restrict Your access to the Platform or the Services.

4.2	You agree to use the Platform and Services only for such purposes as is permitted by: 

(a)	this Agreement; and 

(b)	if You are a natural Person, any law, regulation or generally accepted practices or guidelines applicable in the country of which You are a citizen, or in which You are a resident, or from where You access the Services; or

(c)	if You are a juristic Person, any law, regulation or generally accepted industry practices and guidelines applicable in the country where You are registered, where You maintain Your principal office or from where You access the Services.

4.3	You will solely be responsible for maintaining the privacy and confidentiality of Your access details (user ID, password etc.) with respect to Your Registered Account. Any access to or use of Your Registered Account shall be construed as access or use of such Registered Account by You.

4.4	You agree not to impersonate another Person or impersonate, guide or host on behalf of, or falsely state or otherwise misrepresent Your affiliation with any Person, including, but not limited to other Users, Us and/ or Our officials, employees, agents, partners, affiliates, dealers and/ or franchisees.
 
4.5     You agree that Your right to attend events or concerts and the ticket(s) obtained from the Platform that are addressed to You are non-transferable and that no refund would be processed in case of Your absence or delay in reaching the venue of the event.

4.6	Unless agreed to the contrary in writing, Services provided by Us are for non-commercial, non-transferable and personal use of the Users only. Users are not allowed to copy, reproduce, alter, modify, create derivative works of, or publicly display any Services or any part thereof as their services.
`}
                </Text>
                <Text style={TAndCStyle.textStyle1}>5. RESTRICTIONS ON USE OF SERVICES </Text>
                <Text style={TAndCStyle.textStyle2}>
                    {`5.1	You agree that You will not use the Services or any Content for any purpose that is illegal, unlawful or prohibited by this Agreement. You will not attempt to engage or engage in any activity that may:

(a)	reverse engineer, decompile or otherwise extract the source code(s) related to the Platforms or Services or any part thereof, unless it is expressly permitted by Us in writing or is required by applicable law;

(b)	use any robot, spider, retrieval application, or other device to retrieve or index any portion of Platform, Services or Content;

(c)	collect information about other Users in any illegal or unlawful manner for any illegal or unlawful purposes;

(d)	register on the Platform to access Registrable Services or create any Registered Account by automated means or under false or fraudulent pretences for using the Services;

(e)	transmit any viruses, worms, defects, trojan horses, or any items of a destructive nature through the Platform or Services;

(f)	use Services in any manner that can damage, disable, overburden, or impair, or undertake any action which is harmful or potentially harmful to, any of the servers, networks, computer systems or resources connected to any of the servers connected, directly or indirectly to the Services, or interfere with any other third party's access to and/or enjoyment of Services;

(g)	carry out any denial of service (DoS, DDoS) or any other harmful attacks on the Platform or; disrupt or place unreasonable burdens or excessive loads on, or interfere with or attempt to make, or attempt any unauthorized access to the Services or any part of Services or any User; or

(h)	forge headers or otherwise manipulate identifiers in order to disguise the origin of any part of the Platform or any Content transmitted through the Platform.

5.2	You will not circumvent or disable any digital rights management, usage rules, or other security features of the Platforms; remove, alter, or obscure any proprietary notices (including copyright notices) on any portion of the Platforms; and not use Services in any manner that threatens or is likely to threaten the integrity, performance or availability of Services to You or to Users generally.`}
                </Text>
                <Text style={TAndCStyle.textStyle1}>6. INTELLECTUAL PROPERTY RIGHTS AND DATA OWNERSHIP  </Text>
                <Text style={TAndCStyle.textStyle2}>
                    {`6.1	Use of Services shall, at all times, be governed by and subject to the applicable laws regarding copyright, trademark, patent, and trade secret ownership and use of intellectual property and You agree to abide by such laws. You shall solely be responsible for any violation of any law or for any infringement of any intellectual property rights caused pursuant to Your use of Services.

6.2	When You upload, submit, store or send any Content on the Platform, You give Us a non-exclusive, perpetual, irrevocable, royalty-free, sub-licensable, worldwide right and license to use, copy, transmit, host, store, reproduce, modify, create derivative works of, communicate, publish, publicly perform, publicly display, print, edit, translate, reformat and distribute any Content, in whole or in part for the purpose of providing, operating, promoting, and/ or improving the Platform and/ or Services and for business of Us (“Content License”).

6.3	Subject to applicable law, ownership of all intangible and/ or intellectual property developed, creating or existing (including any data generated as a result of Services) pursuant to Your use of the Services, shall ab initio rest with Us. Nothing in these Terms shall be construed as granting of any implied licenses by Us and all rights not expressly granted to You are reserved solely by Us.

6.4	You acknowledge that certain underlying technology or software used by Us in connection with Services and certain Content displayed on Platform may contain rights of other Users or a third party and for use of any such third party’s intellectual property, You may need to get permission directly from the owner of such intellectual property. 

6.5	All third parties owning any intellectual property have a right to take appropriate actions against any User for any violation, infringement or passing off by such User. We respect the intellectual property rights of all Persons and do not hold any responsibility for any violations of any intellectual property rights by You or other Users. 
6.6 	The images used in the app and all the collaterals of Indulge are for illustration purposes only. The rights of those images remain with the respective owner and we do not claim ownership of the visuals. 
`}
                </Text>
                <Text style={TAndCStyle.textStyle1}>7. PRIVACY</Text>
                <Text style={TAndCStyle.textStyle2}>
                    {`7.1	Our Privacy Policy explains how We treat Your data and protect Your privacy when You use the Services. By using the Services, You agree to Our use of Your data according to the Privacy Policy.

7.2	You are responsible for maintaining the confidentiality of passwords associated with any device or online accounts that You use to access the Services or any part thereof. You are solely responsible for all activities that occur with use of Your Registered Account or device. If You become aware of any unauthorized use of Your Registered Account or device, then You may immediately notify Us and the relevant authorities.
`}
                </Text>
                <Text style={TAndCStyle.textStyle1}>8. TERM AND TERMINATION </Text>
                <Text style={TAndCStyle.textStyle2}>
                    {`8.1	You are bound by the Agreement from the time You commence using the Services till earlier of (a) when You cease access or use to Services in any manner, including deleting Your Registered Account; or (b) Us terminating this Agreement with respect to You by permanently barring Your access to Services.

8.2	We reserve the right to terminate Your access to Services or any part of Services, at any time if:

(a)	You knowingly or unknowingly cause, direct or indirect, breach, as ascertained by Us, of any part of the Agreement;

(b)	You do not make the requisite payments with respect to Services not provided free of cost by Us;

(c)	a third party with which Us offers Services, has terminated its relationship with Us or ceased to offer the related services to Us or to You;

(d)	provision of Services or any part of Services is no longer commercially viable or feasible for Us;

(e)	Us believes that You are a repeat infringer of the terms of this Agreement or You are in violation of applicable law; or

(f)	Us is required to terminate this Agreement by applicable law, government order or order of a court with requisite jurisdiction.

8.3	Upon termination of this Agreement, all the legal rights, obligations and liabilities that You and Us have benefited from, been subject to (or which have accrued over time whilst the Agreement was in force) or which are expressed to continue indefinitely, shall be unaffected by this cessation, and shall continue to apply to such rights, obligations and liabilities indefinitely.`}
                </Text>
                <Text style={TAndCStyle.textStyle1}>9. LIMITATION OF LIABILITY</Text>
                <Text style={TAndCStyle.textStyle2}>
                    {`9.1	Use of Services by You is entirely at Your own risk and We shall not be liable for any direct, indirect, incidental, consequential, special, exemplary, punitive, monetary or any other damages, fees, fines, penalties or liabilities whatsoever arising out of or relating to any User’s use of Services. We shall not be held liable for any conduct or negligence of the third parties, including concierge or brand managers or their employees, agents and/or service providers.

9.2	Provision of the Platform does not constitute an institution of agency between Us and any of Our Users. Our relationship with each and every individual User shall be on a principal to principal basis only. You are solely responsible for any breach of Your obligations under this Agreement, applicable law and/ or the consequences of any such breach.

9.3 	We shall not be liable for any acts or omissions of the Vendors providing their products or services through the Platform. We shall not be responsible for the accuracy or authenticity of the products sold, services provided or privileges offered by the Vendor through the Platform. Any guarantee, warranty and/ or insurance with respect to products and services offered by the Vendors shall be subject to the guarantee, warranty and/ or insurance provided by the respective Vendors. We shall not be liable for any loss and/ or damages to any Person resulting from any suits, scams, bankruptcy proceedings or court orders in respect of or against the respective Vendors.

9.4 	We will not be responsible for any Content, products, services, privileges, offers available on third party media platforms by Our Users or by Us and We shall not be liable for the authenticity and availability of such content. We do not control actions of other Users and do not guarantee the accuracy, integrity or quality of any Content posted by them on the Platform.

9.5	We will not be liable for any acts or omissions of any third party, or for any unauthorized interception of the Platform or Services or any breach of this Agreement attributable in full or in part to the acts or omissions of third parties, or damages associated with features that We do not furnish, or damages that result from the operation systems, equipment, facilities or services provided by third parties to You.

9.6	The Platform may include/ display links to other online platforms which are outside Our control and may contain materials that are objectionable, unlawful or inaccurate. We do not endorse or support such third party links or the products and/ or services they provide, hence, We shall not be responsible or liable for the Content, accuracy or authenticity of such third party links.

9.7    The User agrees and acknowledges that We reserve the rights to refuse any and all offers, admissions, bids or claims made with respect to any auction conducted on the Platform and We shall not be held responsible for the authenticity, accuracy and condition of the auction products.

9.8	You agree and acknowledge that the products and/ or services offered by the Vendors through Our Platform are subject to availability of such products and services with the Vendor and may require a prior booking/ appointment by the User. For example, if a User has access to 50% (fifty percent) discount on stay at a specific hotel, as a privilege, then We will not be responsible if that specific hotel is sold out on a specific date and no rooms are available for the User to avail the said privilege on the said date.`}
                </Text>
                <Text style={TAndCStyle.textStyle1}>10. REPRESENTATIONS, WARRANTIES AND COVENANTS  </Text>
                <Text style={TAndCStyle.textStyle2}>
                    {`10.1	You represent and warrant that: (a) You are lawfully existing under applicable laws and have full power and authority to enter into, execute and deliver this Agreement; (b) You have all necessary and valid authorizations required for performance of Your obligations under this Agreement; (c) this Agreement constitutes a legal, valid and binding obligation on You, enforceable against You; (d) You have accepted this Agreement relying on Your own business judgment and You have not been induced by any Person; and (e) execution, delivery and performance of this Agreement by You shall not (i) violate any provision of the territorial and/ or jurisdictional laws applicable to You; (ii) conflict with or result in material breach or violation of any terms, or constitute default under any other agreement by which You are bound; (iii) violate any order, judgment or decree against, or binding upon You; or (iv) violate any law or regulation of India or any other country in which You maintains Your principal office (in case You are a corporate Person) or of which You are a citizen and a resident (in case You are a natural Person).

10.2	Us disclaims all warranties in relation to access to or provision of Platform or Services, whether express or implied, including but not limited to:

(a)	Services being constantly available or available at all;

(b)	Services being successfully executed in all cases; 

(c)	Services being always functional without any disruption, delay or error;

(d)	User’s ability to use the Services, directly or indirectly;

(e)	Users’ satisfaction with the Services;
	
(f)	the accuracy of the data provided in the course of Service; 

(g)	the security and privacy of each User’s data;

(h)	that all bugs or errors in relation to Services will be fixed or corrected;

(i)	that Platform will be compatible with all devices, all networks and all browsers; 

(j)	that use of Services is fit for a particular purpose or use, except as provided herein; or

(k)	that Services and Contents is accessible in every location.

10.3	Users shall defend, indemnify and hold Us, and Our officers, directors, employees, representatives, consultants and agents harmless from and against any third party claims, actions, demands, liabilities, judgments, and settlements, including without limitation, any loss or damage suffered by Us (including loss of reputation and/ or goodwill) and including reasonable legal fee that may result from or alleged to result from (a) such User’s unauthorized, illegal and/ or unlawful access to or use of the Services; (b) such User’s breach of any rules, regulations and/ or orders under any applicable law; and (c) such User’s breach of any obligation under this Agreement.

10.4	You expressly represent and warrant that You will not use Services if You do not understand, agree to become a party to and abide by all the terms specified of this Agreement. Any violation of this Agreement by You may result in legal liability upon You and nothing in this Agreement shall be deemed to confer any rights to any third party or any other Person, not expressly granted such rights herein.
`}
                </Text>
                <Text style={TAndCStyle.textStyle1}>11.	GOVERNING LAW AND JURISDICTION</Text>
                <Text style={TAndCStyle.textStyle2}>{`11.1	The Services may be provided through, and the Platforms may be controlled and operated from and through, any country and may be subject to the laws of that country. When You accesses the Services from any location, then, You are responsible for compliance with the local laws applicable to You.

11.2	This Agreement shall be governed by and shall be construed in accordance with the laws of India. All disputes relating to this Agreement shall be settled in the courts located at Goa, India.

11.3	You agree that any cause of action arising out of Your use of Services shall be commenced within 30 (thirty) days after (a) when such cause of action accrues; or (b) when You become aware of the facts giving rise to the cause of action, whichever is later, else, such cause of action shall be permanently barred.`}</Text>
                <Text style={TAndCStyle.textStyle1}>12. MISCELLANEOUS  </Text>
                <Text style={TAndCStyle.textStyle2}>
                    {`12.1	Confidentiality: You may be given and have access to confidential and proprietary information of the other users pursuant to Services provided under this Agreement. You will not use any such confidential information for Your own corporate purposes or any other purpose (except as contemplated under this Agreement) without a prior written consent of the Person owning such information and shall use their best efforts to keep confidential and not to disclose to any Person any such confidential and proprietary information, except as mutually agreed or required by applicable law.

12.2	Display Association: We shall have a right to display and publicize Our association with You, other Users and the Services We have provided to Our Users, in Our collateral and branding materials.

12.3	Severability: If any provision of this Agreement is determined to be unenforceable then such provision shall, to that extent, be deemed deleted from this Agreement and the legality, validity and enforceability of the remaining provisions of this Agreement shall not be in any way affected. Any act of either Us or the User, done prior to the provisions being held unenforceable shall be deemed to be valid and binding on the other.

12.4	Waiver: Waiver by Us of any one default of any one User will not waive subsequent defaults of the same or different kind, by the same or different User, and no failure or delay of Us to exercise or enforce any of its rights hereunder shall act as a waiver of those rights.

12.5	Assignment: While the Users shall not assign or transfer any of their rights or liabilities under this Agreement to any other Person, We may freely assign Our rights and benefits (in full or in part) under this Agreement to any Person. You acknowledge that We have a right (but not the obligation) to deliver the Services either ourselves, or, through Our affiliates or any third parties.

12.6	Notices: We may post notices within the Platform or send You notices on the registered e-mail address or the telephone numbers shared with Us. You will deemed to have received such notices, if sent via e-mail, within 24 (twenty four) hours of Us sending the notice. Your use of Services after expiry of 3 (three) days from the day notice was sent, shall constitute receipt and acceptance of the notices sent to You.

12.7	Non-compete and Non-solicit: You will not, directly or indirectly, (i) solicit or attempt to solicit, induce or recruit, engage or in any other way encourage Our employees, consultants or Users to terminate their respective engagements with Us and/ or engage with You and/ or any third party; or (ii) engage in any activity which is same or similar to the Platform or the Services.
`}
                </Text>
                <Text style={TAndCStyle.textStyle1}>13. DISCLAIMERS </Text>
                <Text style={TAndCStyle.textStyle2}>
                    {`13.1	The information, software, products, and services forming parts of the Services have been contributed by various Users and may include inaccuracies or typographical errors. Any advice received or inferred via the Services should not be relied upon by the Users for any personal, legal or financial decisions and Users should consult an appropriate professional for tailored advice, specific to their situation.

13.2	Us shall not be responsible for viruses, worms, trojan horses, and other harmful or destructive Content of third parties. The Platform may contain Content that is offensive, indecent, or otherwise objectionable. The Platform may also contain Content that infringes the intellectual property and other proprietary rights, of third parties, or the downloading, copying or use of which is subject to certain additional terms and conditions, stated or unstated. Us disclaims any responsibility for any harm resulting from the use of the Platform, or from any downloading of Content posted on the Platform.

13.3	EXCEPT AS EXPRESSLY PROVIDED IN THIS AGREEMENT AND TO THE EXTENT PERMITTED BY APPLICABLE LAW, THE SERVICES ARE PROVIDED “AS IS” AND US DOES NOT MAKE WARRANTIES OF ANY KIND, EXPRESS, IMPLIED, OR STATUTORY, INCLUDING THOSE OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT OR ANY REPRESENTATIONS REGARDING AVAILABILITY, RELIABILITY, OR ACCURACY OF PLATFORM, SERVICES AND/ OR GOODS AND/ OR SERVICES PROMOTED AND/ OR OFFERED THROUGH THE PLATFORM OR SERVICES.`}
                </Text>
                <Text style={TAndCStyle.textStyle1}>14. DEFINITIONS AND INTERPRETATION</Text>
                <Text style={TAndCStyle.textStyle2}>
                    {`14.1	All the capitalized terms contained in the Agreement that have not been defined elsewhere, shall mean as follows:

“Content’’  shall mean and include any audio, video, visual, graphic, text content or combination thereof, including messages, information, articles, description of Products, images, videos, GIFs, reviews, ratings, comments, queries or any other like material, created and/ or added on the Platform, by a User.

“Person” shall mean any natural person, limited or unlimited liability company, corporation, partnership (whether limited or unlimited), proprietorship, Hindu undivided family, trust, union, association, government or any agency or political subdivision thereof or any other entity that may be treated as a person under applicable law.

“Platform” shall mean the Website and the other platform(s) , like Whatsapp,(whether android or IOS) downloadable from third party service providers, including any updates thereof, as We may provide from time to time.

“Registered User” shall mean such User who or which has successfully created a Registered Account on the Platform.

“Services” means the provision of the Platform, including provision of access to the Platforms, maintenance of Platforms and/ or provision of Registerable Services, as updated from time to time.

“User”, “You” or “Your” shall mean any Person who or which accesses or uses the Platform or Services or Content thereof, as provided from time to time.

“Website” shall mean www.indulgeconcierge.com , as provided by Us and as updated from time to time. 

14.2 Any capitalized terms not defined herein this Agreement shall have such meaning as set forth in the Privacy Policy.

14.3	Any reference to the singular includes a reference to the plural and vice versa; any reference to one gender includes a reference to the other gender(s), unless explicitly stated otherwise.

14.4	Headings and captions are used for convenience only and not for interpretation of the Agreement.

14.5	Any reference to a natural Person shall, include his/ her heirs, executors and permitted assignees and any reference to a juristic Person shall, include its affiliates, successors and permitted assignees, unless repugnant to the context.`}
                </Text>
                {/* <Text style={TAndCStyle.textStyle1}>15. LIMITATION OF LIABILITY</Text>
                <Text style={TAndCStyle.textStyle2}>
                    {`15.1 Users shall access the Platform voluntarily and Your Use of Services is entirely at Your own risk. Financial  and non-financial transactions performed by You on the Platform are always processed by You or under  Your exclusive authorization. We, to the fullest extent permitted by law, shall not, in any event, be liable for any direct, indirect, incidental, consequential, special, exemplary, punitive, monetary or any other  damages (including but not limited to any accident, injury, death, loss of property), fees, fines, penalties or  liabilities whatsoever arising out of

(i) errors, mistakes, or inaccuracies of the content available on the  Platform,
(ii) personal injury or property damage, of any nature whatsoever, resulting from Your access to  and/or use of the Platform,
(iii) any unauthorized access to or use of our secure servers and/or any and all  personal information and/or financial information stored therein,
(iv) any interruption or cessation of  transmission to or from the Platform,
(v) any bugs, viruses, trojan horses, malware or the like, which may  be transmitted to or through Our Platform by any third party,
(vi) use of any Service or any products sold  by way of the Service and/or
(vii) any errors or omissions in any content for any loss or damage of any kind  incurred as a result of Your reliance on or use of any Content emailed, transmitted, or otherwise made  available via the Platform, whether based on warranty, contract, tort, or any other legal theory, and whether  or not We are advised of the possibility of such damages. We shall have no liability under these Terms. 
15.2 User further acknowledges and accepts that the Services offered by Us on the Platform are provided through  third party service providers, including but not limited concierge or brand managers or their employees,  agents and/or service providers, who possess the necessary expertise, skill and resources to provide the  Services to You (“Vendors”). Hence, Indulge Global shall not be held liable for any conduct or negligence  of the Vendors, in the provision of the Services, in any manner whatsoever.  

15.3 Provision of the Platform does not constitute an institution of agency between Us and any of Our Users.  Our relationship with each and every individual User shall be on a principal to principal basis only. You  are solely responsible for any breach of Your obligations under this Agreement, applicable law and/ or the  consequences of any such breach.  

15.4 We shall not be liable for any acts or omissions of the Vendors providing their products or services through  the Platform. We shall not be responsible for the accuracy or authenticity of the products sold, services  provided or privileges offered by the Vendor through the Platform. Any guarantee, warranty and/ or  insurance with respect to products and services offered by the Vendors shall be subject to the guarantee,  warranty and/ or insurance provided by the respective Vendors. We shall not be liable for any loss and/ or  damages to any Person resulting from any suits, scams, bankruptcy proceedings or court orders in respect  of or against the respective Vendors.  

15.5 We will not be responsible for any Content, products, services, privileges, offers available on third party  media platforms by Our Users or by Us and We shall not be liable for the authenticity and availability of  such Content. You agree and acknowledge that the products and/ or services offered by the Vendors  through Our Platform are subject to availability of such products and services with the Vendor and may  require a prior booking/ appointment by the User. For example, if a User has access to 50% (fifty percent)  discount on stay at a specific hotel, as a privilege, then We will not be responsible if that specific hotel is  sold out on a specific date and no rooms are available for the User to avail the said privilege on the said  date.  

15.6 We will not be liable for any acts or omissions of any third party, or for any unauthorized interception of  the Platform or Services or any breach of this Agreement attributable in full or in part to the acts or  omissions of third parties, or damages associated with features that We do not furnish, or damages that  result from the operation systems, equipment, facilities or services provided by third parties to You.  

15.7 The User agrees and acknowledges that We reserve the rights to refuse any and all offers, admissions, bids  or claims made with respect to any auction conducted on the Platform and We shall not be held responsible  for the authenticity, accuracy and condition of the auction products.  

15.8 You agree to defend, indemnify and hold harmless Indulge Global, its officers, directors, employees and  agents, from and against any and all claims, damages, obligations, losses, liabilities, costs or debt, and  expenses (including but not limited to attorney’s fees) arising from:

(i) Your use of and access of the  Platform;
(ii) Your violation of any term of these Terms or Our Policies;
(iii) Your violation of any third  party right, including without limitation, any copyright, property, or privacy right; or
(iv) any claim that  Your use of the Platform has caused damage to a third party.  
15.9 In the event of Your breach of these Terms, You agree that We will be irreparably harmed and may not  have an adequate remedy in money or damages. We, therefore, shall be entitled in such injunction against such a breach from any court of competent jurisdiction. Our right to obtain such relief  shall not limit its right to obtain other remedies.  `}
                </Text>
                <Text style={TAndCStyle.textStyle1}>16. WARRANTIES  </Text>
                <Text style={TAndCStyle.textStyle2}>
                    {`16.1 The Services and the products on the Platform are provided on an “as is” and “as available” basis for Your  use, without any representations, warranties or conditions of any kind, either expressly or implied,  including all implied warranties or conditions of merchantability, merchantable quality, fitness for a  particular purpose, durability and We assume no liability for the accuracy or completeness or use or non 

obsolescence of any information on the Platform. The information, software, products, and services  forming parts of the Services have been contributed by various Vendors and may include inaccuracies or  typographical errors. Any advice received or inferred via the Services should not be relied upon by a User  for any personal, legal or financial decisions and a User should consult an appropriate professional for  tailored advice, specific to their situation.  

16.2 Indulge Global shall not be liable to update or ensure continuity of information or content contained on the  Platform. We would not be responsible for any errors, which might appear in such information, which is  compiled from third party sources, Vendors or for any unavailability of such information or content on the  Platform. We makes no warranties that the

(i) Service will be uninterrupted, timely, secure or error free;
(ii) the quality of products, services, information will meet Your expectation.  
16.3 We reserve the right and discretion to make any changes/corrections or withdraw/add Contents at any time  without notice. Neither Indulge Global nor any third parties or Vendors, provide any warranty or guarantee  as to the accuracy, timeliness, performance, completeness or suitability of the information and materials  found or offered on the Platform for any particular purpose. You acknowledge that such information and  materials may contain inaccuracies or errors and we expressly exclude liability for any such inaccuracies  or errors to the fullest extent permitted by law.  

16.4 In the preparation of the Platform and Content therein, every effort has been made to offer the most current,  correct, and clearly expressed information possible. Nevertheless, inadvertent errors may occur. Any  feedback from a User is most welcome to make the Platform and contents thereof error free and user  friendly.  

16.5 We make no warranties or representations whatsoever regarding the quality and competence of any Vendor  and would not be responsible for any deviant behaviour of any such Vendor. Any feedback from User  relating to the same is most welcome and Indulge Global reserves the right and discretion to take any action  in this regard.  

16.6 Indulge Global shall not be responsible for any delay or failure of our performance of any of services or  obligations caused by events beyond reasonable control, including but not limited to events such as act of  war, hostility, or sabotage; natural disaster; electrical, internet, or telecommunication outage; or  government restrictions or regulations.`}
                </Text>
                <Text style={TAndCStyle.textStyle1}>17. GOVERNING LAW AND JURISDICTION</Text>
                <Text style={TAndCStyle.textStyle2}>
                    {`17.1 You acknowledge and accept that the Services provided through the Platforms may be controlled and  operated from and through, any country and may be subject to the laws of that country. When You accesses  the Services from any location, then, You are responsible for compliance with the local laws applicable to  You.  

17.2 These Terms shall be governed by and shall be construed in accordance with the laws of India, without  regard to the conflict of law principles. All disputes relating to this Agreement shall be settled in the courts  located at Hyderabad, India, and You hereby accede to the jurisdiction of such courts.

17.3 You agree that any cause of action arising out of Your access to the Platform shall be commenced within  30 (thirty) days after

(a) when such cause of action accrues; or
(b) when You become aware of the facts  giving rise to the cause of action, whichever is later, else, such cause of action shall be permanently barred.`}
                </Text>
                <Text style={TAndCStyle.textStyle1}>18. MISCELLANEOUS </Text>
                <Text style={TAndCStyle.textStyle2}>
                    {`18.1 Confidentiality: You may be given and have access to confidential and proprietary information of the other  users pursuant to Services provided under this Agreement. You will not use any such confidential  information for Your own corporate purposes or any other purpose (except as contemplated under this  Agreement) without a prior written consent of the Person owning such information and shall use their best  efforts to keep confidential and not to disclose to any Person any such confidential and proprietary  information, except as mutually agreed or required by applicable law.  

18.2 Display Association: We shall have a right to display and publicize Our association with You, other Users  and the Services We have provided to Our Users, in Our collateral and branding materials.  

18.3 Severability: If any provision of this Agreement is determined to be unenforceable then such provision  shall, to that extent, be deemed deleted from this Agreement and the legality, validity and enforceability of  the remaining provisions of this Agreement shall not be in any way affected. Any act of either Us or the  User, done prior to the provisions being held unenforceable shall be deemed to be valid and binding on the  other. 

18.4 Waiver: Waiver by Us of any one default of any one User will not waive subsequent defaults of the same  or different kind, by the same or different User, and no failure or delay of Us to exercise or enforce any of  its rights hereunder shall act as a waiver of those rights.  

18.5 Assignment: While the Users shall not assign or transfer any of their rights or liabilities under this  Agreement to any other Person, We may freely assign Our rights and benefits (in full or in part) under this  Agreement to any Person. You acknowledge that We have a right (but not the obligation) to deliver the  Services either ourselves, or, through Our affiliates or any third parties.  

18.6 Complaint: In the event, User have any questions, comments, complaints and requests regarding these  Terms or Our Policies, You may address the same to the designated grievance officer in respect of the  Platform. Any complaints or concerns with regards to any content on the Platform or any breach of the  Terms or Our Policies can be directed to the designated officer in writing and the details are as follows:  

a) Any details or query in relation to collaborations or careers may be raised/intimated to Us, through an  email addressed to our grievance officer at info@indulge.global
b) Any complaint, concern or query with respect to orders and/or products forming part thereof may be  raised through an email at Karan@indulge.global  
18.7 Notices: We may post notices within the Platform or send You notices on the registered e-mail address or  the telephone numbers shared with Us. You will deemed to have received such notices, if sent via e-mail,  within 24 (twenty four) hours of Us sending the notice. Your use of Services after expiry of 3 (three) days  from the day notice was sent, shall constitute receipt and acceptance of the notices sent to You.  

18.8 Non-compete and Non-solicit: You will not, directly or indirectly,

(i) solicit or attempt to solicit, induce or  recruit, engage or in any other way encourage Our employees, consultants, Vendors or Users to terminate  their respective engagements with Us and/ or engage with You and/ or any third party; or
(ii) engage in any  activity which is same or similar to the Platform or the Services. 
 

Indulge Global provides these Terms so that You are aware of the terms that apply to Your use and access  of the Platform. You acknowledge that, We have given You a reasonable opportunity to review these Terms  and that You have read, understood and unconditionally agreed to them

Last Updated on: 04-11-2022.`}
                </Text> */}
            </ScrollView>
        </SafeAreaView>
    )
}
export default TermAndConditionsScreen;