export { fetchPhoto }
import axios from "axios";

async function fetchPhoto(query, page, per_page) {
    if (query === '') { 
        resetForm();
        return
    };
    const BASE_URL = 'https://pixabay.com/api/';
    const IPI_KEY = '28547826-2a3958dff886d94a7e7d0694c';
    return await axios.get(`${BASE_URL}?key=${IPI_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${per_page}`)

}
