module.exports = {
    poweredByHeader: false,
    publicRuntimeConfig: {
        apiUrl: process.env.API_URL,
        apiTimeout: process.env.API_TIMEOUT,
        debugLog: process.env.DEBUG_LOG,
    },
    async redirects() {
        return [
            {
                source: "/logout/idp",
                destination: "/deeplink",
                permanent: true,
            },
        ];
    },
    // async headers() {
    //     return [
    //         {
    //             // matching all API routes
    //             source: "/api/:path*",
    //             headers: [
    //                 { key: "Access-Control-Allow-Credentials", value: "true" },
    //                 { key: "Access-Control-Allow-Origin", value: "*" },
    //                 { key: "Access-Control-Allow-Methods", value: "DELETE, POST, GET, OPTIONS" },
    //                 { key: "Access-Control-Allow-Headers", value: "*" },
    //             ],
    //         },
    //     ];
    // },
};
