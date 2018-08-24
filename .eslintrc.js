module.exports = {
    extends: [
        'eslint-config-alloy',
    ],
    globals: {
        // 这里填入你的项目需要的全局变量
        // 这里值为 false 表示这个全局变量不允许被重新赋值，比如：
        //
        jQuery: false,
        $: false
    },
    rules: {
        "/src/assets/libs": "off",
        "no-new": "off", // 允许直接new一个对象而不赋值
        "no-debugger": "off", // 允许使用debugger
        "no-undef": "off",// 允许使用未定义的变量，因为项目中有许多全局变量，如Utils，Helper
        // @fixable 一个缩进必须用两个空格替代
        'indent': [
            'error',
            4,
            {
                SwitchCase: 1,
                flatTernaryExpressions: true
            }
        ]
    }
};


// 自动修复命令
// eslint --fix src/**/*.ts
