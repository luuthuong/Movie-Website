const apiConfig={
    baseURL:'https://api.themoviedb.org/3/',
    apiKey:'712ef004650cb1729e8c5d7017dceef3',
    page:page=> page?`&page=${page}`:'',
    collection:collec=>collec?`/${collec}/`:'',
    originalImage:(pathImg)=>`https://image.tmdb.org/t/p/original/${pathImg}`,
    w500Image:(pathImg)=>`https://image.tmdb.org/t/p/w500/${pathImg}`,
    embedVideo:(keyVideo)=>`https://www.youtube.com/embed/${keyVideo}`
}
export default apiConfig;