import apiConfig from './apiConfig';
export const category={
    movie:'movie',
    tv:'tv',
    trending:'trending',
    person:'person'
}
export const timeWindow={
    day:'day',
    week:'week'
}
export const movieType={
    popular:'popular',
    nowplaying:'now_playing',
    upcomming:'upcomming',
    topRate:'top_rated',
}
export const tvType={
    popular:'popular',
    topRate:'top_rated',
    ontheAir:'on_the_air',
    airingToday:'airing_today'
}

const dataAPI=async (cate,type,page,colec)=>{
    let url =`${apiConfig.baseURL}${apiConfig.collection(colec)}${cate}/${type}?api_key=${apiConfig.apiKey}${apiConfig.page(page)}`;
    return  fetch( url)
            .then(response => response.json())
            .then(obj => {
                return obj;
            });
}

const mvdbApi = {
    movie: {
        getPopular: (catetype,page)=> dataAPI(catetype,movieType.popular,page),
        getTopRated: ()=> dataAPI(category.movie,movieType.topRate),
        getVideos: (catetype,id) => {
            let url = `${apiConfig.baseURL}${catetype}/${id}/videos?api_key=${apiConfig.apiKey}`;
            return fetch(url)
                .then(response => response.json())
                .then(obj => {
                    return obj;
                });
        }
        },
    tv:{
        getAiringToday: (catetype,page)=> dataAPI(catetype,tvType.topRate,page),
    },
    trending:{
        getTrending:(catetype)=> dataAPI(catetype,timeWindow.day,null,category.trending)
    },
    toprate:{
        getTopRated:(catetype)=>dataAPI(catetype,movieType.topRate)
    }
    ,
    search: (cate, query, page) => {
        let url = `${apiConfig.baseURL}search/${cate}?api_key=${apiConfig.apiKey}&query=${query}${apiConfig.page(page)}`;
        return fetch(url)
            .then(response => response.json())
            .then(obj => {
                return obj;
            });
    },
    getDetail:(url)=>{
        return fetch(url)
            .then(response => response.json())
            .then(obj => {
                return obj;
            });
    }
    }


export default mvdbApi;