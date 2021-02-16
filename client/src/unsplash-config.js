import { createApi } from 'unsplash-js';


export const unsplash = createApi({
    accessKey: process.env.REACT_APP_UNSPLASH_API_KEY,
    headers: { 'X-Custom-Header': 'foo' },
});