const filterData = ({
  query
}: {
  query: {
    search?: any,
    exact?: any,
    conditional?: any
  }
}) => {
  let searchParams = {};

  if (query.search) {
    const searchQ = query.search;
    const newQData: { [key: string]: object } = {};
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
export { filterData };
