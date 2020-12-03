declare const VERSION: string;
declare const DATA: {
    environment: 'development' | 'production',
    buildId: string
};

const _VERSION = VERSION;
const _DATA = DATA;

export {_VERSION as VERSION};
export {_DATA as DATA};
