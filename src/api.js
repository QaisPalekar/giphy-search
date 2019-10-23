import queryString from 'query-string';
const api_key = 'INSERT-API_KEY';
const apiCall = async (path, param) => {
    const queryParam = {
        api_key,
        limit: 12,
        ...param
    };
    const res = await fetch(`http://api.giphy.com/v1/gifs${path}?${queryString.stringify(queryParam)}`);
    return res.json();
}
export {
    apiCall,
}
