"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterData = void 0;
const filterData = ({ query }) => {
    let searchParams = {};
    if (query.search) {
        const searchQ = query.search;
        const newQData = {};
        if (searchQ) {
            Object.keys(searchQ).map(item => {
                newQData[item] = {
                    // @ts-ignore
                    $regex: searchQ[item],
                    $options: "i"
                };
            });
        }
        searchParams = { ...searchParams, ...newQData };
    }
    if (query.exact) {
        const exactQ = query.exact;
        // @ts-ignore
        searchParams = { ...searchParams, ...exactQ };
    }
    if (query.conditional) {
        const conditionalQ = query.conditional;
        // @ts-ignore
        searchParams = { ...searchParams, ...conditionalQ };
    }
    return searchParams;
};
exports.filterData = filterData;
