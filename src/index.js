import './css/styles.css';
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';
import { createCardGallery } from './js/createCardGallery';
import { fetchPhoto } from './js/fetchPhoto';

const form = document.querySelector('#search-form');
const gallerryPhoto = document.querySelector('.gallery'); 
const per_page = 40;
const turnBtn = document.querySelector('.turn-btn');
let page = 1;
let query = '';

const galleryOptions = {
    close: true,
    closeText: 'X',
    overlayOpacity: 0.9,
    captionDelay: 250,
    showCounter: true
}

const gallery = new SimpleLightbox('.gallery a', galleryOptions);

scroll();
differntTurnBtn();

form.addEventListener('submit', searchImages);

function searchImages(event) { 
    event.preventDefault();
    resetForm();
    clearGallery();
    gallery.refresh();
    query = event.currentTarget.searchQuery.value.trim();

    if (query === '') {
        clearGallery();
        resetForm();
        return
    };

    fetchPhoto(query, page, per_page)
        .then(res => {
            if (res.data.hits.length === 0) {
                notifyFailure();
                resetForm();
                return
            };

            gallerryPhoto.insertAdjacentHTML('beforeend', createCardGallery(res.data.hits));
            notifySuccess(res.data.totalHits);
            gallery.refresh();
        })
        .catch(console.log);
};

window.addEventListener('scroll', scroll)
turnBtn.addEventListener('click', differntTurnBtn)

const options = {
    rootMargin: '200px',
    threshold: 1.0,
};

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            
            page += 1;

            fetchPhoto(query, page, per_page)
                .then(res => {
                    const allSumPages = Math.ceil(res.data.totalHits / per_page)
                    if (page > allSumPages) {
                        notifyWarning();
                    }

                    gallerryPhoto.insertAdjacentHTML('beforeend', createCardGallery(res.data.hits));
                    gallery.refresh();
                })
                .catch(console.log);
        }
    });

}, options);

observer.observe(document.querySelector('.scroll-guard'));

function resetForm() { 
    page = 1;
    query = '';
}

function clearGallery() { 
    gallerryPhoto.innerHTML = '';
}

function notifySuccess(value) { 
    return Notiflix.Notify.success(`Hooray! We found ${value} images.`)
};

function notifyFailure() { 
    return Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.')
}

function notifyWarning() { 
    return Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.")
}

function scroll() { 
    const scrolling = window.pageYOffset
    const coord = document.documentElement.clientHeight

    if (scrolling > coord) { 
        turnBtn.classList.add('turn-btn--visible')
    }
    if (scrolling < coord) { 
        turnBtn.classList.remove('turn-btn--visible')
    }
}

function differntTurnBtn() { 
        if (window.pageYOffset > 0) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
    }

