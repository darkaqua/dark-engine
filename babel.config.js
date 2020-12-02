module.exports = {
    presets: [
        [
            '@babel/env',
            {
                targets: {
                    node: 'current'
                }
            }
        ],
        '@babel/typescript'
    ],
    plugins: [
        ["@babel/plugin-transform-typescript", { "allowNamespaces": true }]
    ]
};
