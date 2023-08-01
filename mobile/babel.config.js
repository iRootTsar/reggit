module.exports = {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
        [
            'module-resolver',
            {
                root: ['.'],
                alias: {},
            },
        ],
        ['nativewind/babel'],
        [
            'module:react-native-dotenv',
            {
                moduleName: 'react-native-dotenv',
            },
        ],
    ],
};
