class MyGallery extends HTMLElement {
    constructor() {
        super();

        const imageList = this.hasAttribute('imageList') ?
            this.getAttribute('imageList').split(';') :
            [];

        this.totalImages = imageList.length;
        this.imagesLoaded = 0;

        this.galleryContainer = document.createElement('div');
        this.galleryContainer.className = 'gallery-container';

        for (const resource of imageList) {
            const imageContainer = document.createElement('div');
            imageContainer.className = 'image-container';

            const img = document.createElement('img');
            img.src = resource;
            img.onerror = this.onerror.bind(this);
            img.onload = this.onload.bind(this);
            img.onclick = fullscreen;

            imageContainer.append(img);
            this.galleryContainer.append(imageContainer);
        }

        this.preloader = document.createElement('img');
        this.preloader.className = 'preloader';
        this.preloader.src = this.getAttribute('preloader');
        this.append(this.preloader);
    }

    onerror() {
        if (this.error) {
            return;
        }

        this.error = true;

        setTimeout(() => {
            const placeholder = document.createElement('img');
            placeholder.className = 'placeholder';
            placeholder.src = 'https://via.placeholder.com/600x400?text=Gallery+Here';
            placeholder.onload = (() => {
                this.preloader.remove();
                this.append(placeholder);
            });
        }, 1500);
    }

    onload() {
        if (++this.imagesLoaded == this.totalImages) {
            setTimeout(() => {
                this.preloader.remove();
                this.append(this.galleryContainer);
            }, 1500);
        }
    }
}

customElements.define('my-gallery', MyGallery);

function fullscreen({ target: el }) {
    if (el.animation) {
        el.animation.cancel();
        el.animation = null;
        el.style['z-index'] = 0;
        return;
    }

    const { width, height, top, left } = el.getBoundingClientRect();
    const keyframes = [
        { top: `${window.scrollY + top}px`, left: `${left}px`, width: `${width}px`, height: `${height}px` },
        { top: `${window.scrollY}px`, left: 0, width: '100%', height: '100%' }
    ];

    el.style['z-index'] = 1;
    el.animation = el.animate(keyframes, { fill: 'forwards', duration: 200, easing: 'ease' });
}
