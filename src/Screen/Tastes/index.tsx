import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import styles from './style';
import { useNavigation } from '@react-navigation/native';
import {
    TouchableOpacity,
    View,
    Pressable,
    Image,
    FlatList,
    Text,
    ScrollView,
    LayoutAnimation, Alert
} from 'react-native';
import { useSelector } from 'react-redux';
import { setInitialTagArray } from '../../StoreRedux/TagsSlice';
import { toggleSelection } from '../../StoreRedux/FilterSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import FilterList from '../../Components/FilterList';
import ChooseAnswerQuestion from '../../Components/Questions/chooseAnswerQuestion';
import TypeAnswerQuestion from '../../Components/Questions/typeAnswerQuestion';
import QuestionWithImage from '../../Components/Questions/questionWithImage';
import SelectQuestion from '../../Components/Questions/selectQuestion';
import backArrow from '../../../assets/intro/BackArrow3.png';
import DownArrow from '../../../assets/intro/DownArrow.png';

//images
import image1 from '../../../assets/questions/tastes/img1.png';
import image2 from '../../../assets/questions/tastes/img2.png';
import image3 from '../../../assets/questions/tastes/img3.png';
import image4 from '../../../assets/questions/tastes/img4.png';
import image5 from '../../../assets/questions/tastes/img5.png';
import image6 from '../../../assets/questions/tastes/img6.png';
import image7 from '../../../assets/questions/tastes/img7.png';
import image8 from '../../../assets/questions/tastes/img8.png';
import image9 from '../../../assets/questions/tastes/img9.png';
import image10 from '../../../assets/questions/tastes/img10.png';
import image11 from '../../../assets/questions/tastes/img11.png';
import image12 from '../../../assets/questions/tastes/img12.png';
import image13 from '../../../assets/questions/tastes/img13.png';
import image14 from '../../../assets/questions/tastes/img14.png';
import SmallFilterList from '../../Components/SmallFilterLIst';
//catagories
import ArtPng from '../../../assets/Categories/ArtPng.png';
import AuctionPng from '../../../assets/Categories/AuctionPng.png';
import AutomobilesPng from '../../../assets/Categories/AutomobilesPng.png';
import BagsPng from '../../../assets/Categories/BagsPng.png';
import BeautyPng from '../../../assets/Categories/BeautyPng.png';
import CollectiblesPng from '../../../assets/Categories/CollectiblesPng.png';
import HomesPng from '../../../assets/Categories/HomesPng.png';
import JetsPng from '../../../assets/Categories/JetsPng.png';
import JewelleryPng from '../../../assets/Categories/JewelleryPng.png';
import LeisurePng from '../../../assets/Categories/LeisurePng.png';
import MenFashionPng from '../../../assets/Categories/MenFashionPng.png';
import NewsPng from '../../../assets/Categories/NewsPng.png';
import PerfumesPng from '../../../assets/Categories/PerfumesPng.png';
import PetsPng from '../../../assets/Categories/PetsPng.png';
import StationeryPng from '../../../assets/Categories/StationeryPng.png';
import TravelsPng from '../../../assets/Categories/TravelsPng.png';
import WatchesPng from '../../../assets/Categories/WatchesPng.png';
import WomenFashionPng from '../../../assets/Categories/WomenFashionPng.png';
import YachtsPng from '../../../assets/Categories/YachtsPng.png';
import GourmetPng from '../../../assets/Categories/GourmetPng.png';
import FeaturesPng from '../../../assets/Categories/FeaturesPng.png';
import GlobalEventsPng from '../../../assets/Categories/GlobalEventsPng.png';

import { MotiView } from 'moti';
import sunrise from '../../../assets/questions/tastes/sunrise.png';
import sunset from '../../../assets/questions/tastes/sunset.png';
import { useAppDispatch } from '../../StoreRedux/hooks/Hooks';
import apiService from '../../Service/Api';
const TastesScreen = () => {
    const navigation = useNavigation();
    const [questionArray, setQuestionArray] = useState([
        {
            index: 1,
            question: ' You are a',
            questions: [
                { value: 'Sunrise Person', img: sunrise, state: false },
                { value: 'Sunset Person', img: sunset, state: false }
            ],
            answer: ""
        },
        {
            index: 2,
            question: ' You Prefer',
            img: image2,
            questions: [
                { value: 'Window Seat', state: false },
                { value: 'Aisle Seat', state: false },
                { value: 'Middle Seat', state: false },
            ],
            answer: ""
        },
        {
            index: 3,
            question: ' You like your stays in',
            img: image3,
            questions: [
                { value: 'Modern Hotels', state: false },
                { value: 'Heritage Hotels', state: false },
                { value: 'Boutique Hotels', state: false },
            ],
            answer: ""
        },
        {
            index: 4,
            question: ' You are a..*',
            img: image4,
            questions: [
                { value: 'Vegetarian', state: false },
                { value: 'Non-Vegetarian', state: false },
            ],
            answer: ""
        },
        {
            index: 5,
            question: ' Your Marital Status',
            img: image5,
            questions: [
                { value: 'Single', state: false },
                { value: 'Dating', state: false },
                { value: 'Married', state: false },
                { value: 'Choose not to say', state: false },
            ],
            answer: ""
        },
        {
            index: 6,
            question: ' What is your favourite sport',
            img: image6,
            answer: ""
        },
        {
            index: 7,
            question: ' The BEST brand according to you is ...?',
            img: image7,
            answer: ""
        },
        {
            index: 8,
            question: ' The country you want to escape to?',
            img: image8,
            answer: ""
        },
        {
            index: 9,
            question: ' The car you love...?',
            img: image9,
            answer: ""
        },
        {
            index: 10,
            question: ' Your favorite watch?',
            img: image10,
            answer: ""
        },
        {
            index: 11,
            question: ' The cusine that makes your mouth water',
            questions: [
                { value: 'French', state: false },
                { value: 'Chinese', state: false },
                { value: 'Japanese', state: false },
                { value: 'Indian', state: false },
                { value: 'Italian', state: false },
                { value: 'Greek', state: false },
                { value: 'Spanish', state: false },
                { value: 'Mediterranean', state: false },
                { value: 'Lebanese', state: false },
                { value: 'Moroccan', state: false },
                { value: 'Thai', state: false },
                { value: 'Turkish', state: false },
                { value: 'English', state: false },
                { value: 'Others', state: false }
            ],
            answer: ""
        },
        {
            index: 12,
            question: ' Your favorite dish is?',
            img: image12,
            answer: ""
        },
        {
            index: 13,
            question: ' Your go-to drink?',
            img: image13,
            answer: ""
        },
        {
            index: 14,
            question: ' A restaurant you cannot stop recommending',
            img: image14,
            answer: ""
        },
    ])

    const [dataArr, setDataArr] = useState([
        {
            id: 1,
            category: 'Featured',
            source: FeaturesPng,
            selected: false,
        },
        // {
        //     id: 1,
        //     category: 'Auctions',
        //     source: AuctionPng,
        //     selected: false,
        // },
        {
            id: 2,
            category: 'Art',
            source: ArtPng,
            selected: false,
        },
        {
            id: 3,
            category: 'Gourmet',
            source: GourmetPng,
            selected: false,
        },
        // {
        //     id: 3,
        //     category: 'Perfumes',
        //     source: PerfumesPng,
        //     selected: false,
        // },
        {
            id: 4,
            category: 'Watches',
            source: WatchesPng,
            selected: false,
        },
        // {
        //     id: 4,
        //     category: 'Beauty',
        //     source: BeautyPng,
        //     selected: false,
        // },
        // {
        //     id: 5,
        //     category: 'Watches',
        //     source: WatchesPng,
        //     selected: false,
        // },
        {
            id: 5,
            category: 'Bags',
            source: BagsPng,
            selected: false,
        },
        {
            id: 6,
            category: 'Collectibles',
            source: CollectiblesPng,
            selected: false,
        },
        {
            id: 7,
            category: 'Global Events',
            source: GlobalEventsPng,
            selected: false,
        },
        {
            id: 8,
            category: 'Auto Jet Sail',
            source: JetsPng,
            selected: false,
        },
        // {
        //     id: 9,
        //     category: 'Travel',
        //     source: TravelsPng,
        //     selected: false,
        // },
        {
            id: 10,
            category: 'Fashion',
            source: MenFashionPng,
            selected: false,
        },
        {
            id: 11,
            category: 'Homes',
            source: HomesPng,
            selected: false
        },
        {
            id: 12,
            category: 'Beauty and Fragrance',
            source: BeautyPng,
            selected: false
        },
        {
            id: 13,
            category: 'Stationery',
            source: StationeryPng,
            selected: false
        },
        // {
        //     id: 9,
        //     category: 'Jets',
        //     source: JetsPng,
        //     selected: false,
        // },
        // {
        //     id: 10,
        //     category: 'Yachts',
        //     source: YachtsPng,
        //     selected: false,
        // },
        // {
        //     id: 11,
        //     category: 'Travel',
        //     source: TravelsPng,
        //     selected: false,
        // },
        // {
        //     id: 12,
        //     category: 'Men Fashion',
        //     source: MenFashionPng,
        //     selected: false,
        // },
        // {
        //     id: 13,
        //     category: 'Women Fashion',
        //     source: WomenFashionPng,
        //     selected: false,
        // },
        // {
        //     id: 14,
        //     category: 'Homes',
        //     source: HomesPng,
        //     selected: false,
        // },
        // {
        //     id: 15,
        //     category: 'Stationery',
        //     source: StationeryPng,
        //     selected: false,
        // },
        // {
        //     id: 16,
        //     category: 'Pets',
        //     source: PetsPng,
        //     selected: false,
        // },
        // {
        //     id: 17,
        //     category: 'Jewellery',
        //     source: JewelleryPng,
        //     selected: false,
        // },
        // {
        //     id: 18,
        //     category: 'Leisure',
        //     source: LeisurePng,
        //     selected: false,
        // },
        // {
        //     id: 18,
        //     category: 'News',
        //     source: NewsPng,
        //     selected: false,
        // },
        // {
        //     id: 19,
        //     category: 'Gourmet',
        //     source: GourmetPng,
        //     selected: false,
        // },
        // {
        //     id: 20,
        //     category: 'Features',
        //     source: FeaturesPng,
        //     selected: false,
        // },
        // {
        //     id: 21,
        //     category: 'Global Events',
        //     source: GlobalEventsPng,
        //     selected: false,
        // },

    ]);
    const dispatch = useAppDispatch();
    const [focusedElement, setFocusedElement] = useState('Category');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [showCategory, setShowCategory] = useState(true);
    const [storedPhoneNumber, setStoredPhoneNumber] = useState('');

    //new states
    const [tasteQuestion, setTasteQuestion] = useState(false);
    const [moreCategory, setMoreCategory] = useState(false);

    useEffect(() => {
        const getPhoneNumber = async () => {
            try {
                const storedNumber = await AsyncStorage.getItem('phoneNumber');
                if (storedNumber !== null) {
                    setStoredPhoneNumber(storedNumber);
                }
            } catch (error) {
                console.error('Error retrieving phone number:', error);
            }
        };

        getPhoneNumber();
        dispatch(setInitialTagArray());
    }, []);

    const updateAnswerByIndex = (index: any, newAnswer: any) => {
        setQuestionArray(prevDataArray =>
            prevDataArray.map(item =>
                item.index === index ? {
                    ...item, answer: newAnswer,
                } : item,
            ),
        )
    }
    const saveData = async () => {
        const finalAnsListArray = questionArray
            .filter(item => item.answer !== '')
            .map(item => ({
                index: item.index,
                answer: item.answer,
                question: item.question,
            }));
        try {
            const response = await apiService.post('/add-taste', {
                mobile_no: storedPhoneNumber,
                answersArray: finalAnsListArray,
            },
            );
            console.log("response========", finalAnsListArray, response)
            // getTasteData(storedPhoneNumber);
            onBackPress()
            // Alert.alert(
            //     'Data saved successfully!',
            //     '',
            //     [
            //         {
            //             text: 'OK',
            //             onPress: () => { onBackPress() }
            //         }
            //     ],
            //     { cancelable: false }
            // );
        } catch (error) {
            console.error('Error while saving data:', error);
            Alert.alert('Something went wrong!');
        }
    };
    const getTasteData = async (phoneNumber: any) => {
        try {
            const response = await apiService.get(
                `/get-taste?mobile_no=${phoneNumber}`,
            );
            // console.log("responseresponseresponse===get-taste=====", response)
            if (response.status === 200) {
                const userData = response.data.user.answers;
                if (userData.length > 0) {
                    const newArr = questionArray?.map(item => {
                        const foundUser = userData.find((data: any) => data?.index === item.index);
                        if (foundUser) {
                            return { ...item, answer: foundUser.answer };
                        } else {
                            return item;
                        }
                    });
                    setQuestionArray(newArr);
                }
            } else {
                console.error('Failed to fetch user data');
            }
        } catch (error) {
            console.error('Error while fetching data:', error);
        }
    };

    useEffect(() => {
        if (storedPhoneNumber) {
            getTasteData(storedPhoneNumber);
        }
    }, [storedPhoneNumber]);
    const { selectedFilterData: filterData } = useSelector((state: any) => state.filter);
    const catagoryLimit = moreCategory ? filterData.length : 4;
    const LimitedFilteredList = dataArr
        .filter(item => filterData.includes(item.category))
        .splice(0, catagoryLimit);
    const onBackPress = () => {
        navigation.goBack();
        // return true;
    };

    const selectCategoryItem = (category: any) => {
        dispatch(toggleSelection(category));
        const updatedData = dataArr.map(item =>
            item.category === category ? { ...item, selected: !item.selected } : item,
        );
        setDataArr(updatedData);
    };

    //animations
    const contentRef = useRef(null);

    const toggleMoreCategory = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut); // Add animation for smooth transition
        setMoreCategory(!moreCategory);
    };

    useLayoutEffect(() => {
        if (contentRef.current) {
            contentRef.current.measure((x: any, y: any, width: any, height: any) => {
                setMoreCategory(height > 190);
            });
        }
    }, []);
    return (
        <View style={styles.container}>
            <View style={styles.categoriesContainer}>
                {tasteQuestion && (
                    <Pressable onPress={() => setTasteQuestion(false)}>
                        <Image
                            style={{ alignSelf: 'flex-start' }}
                            source={backArrow}
                            alt="img"
                        />
                    </Pressable>
                )}

                {!tasteQuestion && (
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity onPress={onBackPress}>
                            <Image
                                style={{ alignSelf: 'flex-start', marginEnd: 10 }}
                                source={backArrow}
                                alt="img"
                            />
                        </TouchableOpacity>

                        <Pressable
                            onPress={() => {
                                setFocusedElement('Category');
                                setShowCategory(true);
                            }}
                            onFocus={() => setFocusedElement('Category')}
                            onBlur={() => setFocusedElement('')}>
                            <Text
                                style={[
                                    styles.categoryText,
                                    focusedElement === 'Category' && styles.focusedText,
                                ]}>
                                Gathering preferences to optimize service.
                            </Text>
                        </Pressable>
                    </View>
                )}
            </View>

            <ScrollView nestedScrollEnabled>
                {/* {focusedElement === 'Category' && showCategory && !tasteQuestion && ( */}
                <FlatList
                    data={dataArr}
                    renderItem={({ item }) => (
                        <FilterList
                            setSelectedCategory={setSelectedCategory}
                            selectedCategory={selectedCategory}
                            item={item}
                            selectCategoryItem={selectCategoryItem}
                        />
                    )}
                    keyExtractor={item => item.id.toString()}
                    numColumns={3}
                    contentContainerStyle={styles.flatListContainerStryle}
                />
                {/* )} */}

                {/* {focusedElement === 'Category' && showCategory && tasteQuestion && ( */}
                <MotiView
                    animate={{
                        height: moreCategory ? 'auto' : 190,
                    }}
                    transition={{
                        type: 'timing',
                        duration: 300,
                    }}>
                    <View
                        ref={contentRef}
                        style={{ marginBottom: 20, alignItems: 'center' }}>
                        <Text style={styles.smallCatagoryText}>Catogory</Text>
                        <FlatList
                            data={LimitedFilteredList}
                            renderItem={({ item }) => (
                                <SmallFilterList
                                    selectedCategory={selectedCategory}
                                    item={item}
                                />
                            )}
                            keyExtractor={item => item.id.toString()}
                            numColumns={4}
                            contentContainerStyle={styles.flatListContainerStryle}
                        />
                        <MotiView
                            animate={{
                                rotate: moreCategory ? '180deg' : '0deg',
                            }}
                            transition={{
                                type: 'timing',
                                duration: 300,
                            }}>
                            <Pressable
                                style={{ padding: 10 }}
                                onPress={() => {
                                    toggleMoreCategory();
                                }}>
                                <Image source={DownArrow} alt="img" />
                            </Pressable>
                        </MotiView>
                    </View>
                </MotiView>
                {/* )} */}

                {/* {tasteQuestion && ( */}
                <View style={styles.QuestionsContainer}>
                    <Text style={styles.newTasteText}>Fill Your Tastes</Text>
                    <View style={styles.allQuestionsContainer}>
                        <QuestionWithImage img={image1} questionData1={questionArray.slice(0, 1)} updateAnswerByIndex={updateAnswerByIndex} />
                        {questionArray.slice(1, 5).map((val, i) => (
                            <ChooseAnswerQuestion key={i} QuestionData={val} updateAnswerByIndex={updateAnswerByIndex} />
                        ))}
                        {questionArray.slice(5, 10).map((val, i) => (
                            <TypeAnswerQuestion key={i} QuestionData={val} updateAnswerByIndex={updateAnswerByIndex} />
                        ))}
                        <SelectQuestion img={image11} questionDataList4={questionArray.slice(10, 11)} updateAnswerByIndex={updateAnswerByIndex} />
                        {questionArray.slice(11).map((val, i) => (
                            <TypeAnswerQuestion key={i} QuestionData={val} updateAnswerByIndex={updateAnswerByIndex} />
                        ))}
                    </View>
                </View>
                {/* )} */}
            </ScrollView>

            {/* {
                filterData?.length > 0 &&
                (focusedElement === 'Category') && !tasteQuestion &&
                (
                    <Pressable
                        onPress={() => {
                            // goToWatchReel()
                            setTasteQuestion(true);
                        }}
                        style={styles.saveButtonForFilterContainer}>
                        <Text style={styles.saveButtonForFilterText}>Save</Text>
                    </Pressable>
                )
            } */}

            <Pressable
                onPress={() => {
                    setTasteQuestion(false);
                    saveData()
                }}
                style={styles.saveButtonForFilterContainer}>
                <Text style={styles.saveButtonForFilterText}>Save</Text>
            </Pressable>
        </View >
    );
};

export default TastesScreen;
