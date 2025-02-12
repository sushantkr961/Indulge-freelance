// linkingConfig.js
export const linking = {
    prefixes: ['ind://', 'https://indulgeconcierge.com', 'http://indulgeconcierge.com'],
    config: {
        screens: {
            path: 'MyDrawer',
            MyDrawer: {
                screens: {
                    path: 'Stack',
                    Stack: {
                        screens: {
                            path: 'MyBottomTabs',
                            MyBottomTabs: {
                                screens: {
                                    Feed: 'Feed/:id',
                                    Calendar: 'Calendar/:id',
                                    Shop: 'Shop/:id',
                                    Explore: 'Explore/:id'
                                },
                            },
                        },
                    },
                },
            },
        },
    },
}
