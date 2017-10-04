(() => {
    const theImages = document.querySelectorAll('.image-holder'),
    theHeader = document.querySelector('.heading'),
    theSubhead = document.querySelector('.main-copy h2'),
    theSeasonText = document.querySelector('.main-copy p');
    let appliedClass;

    function changeElements() {
        let subImages = document.querySelector('.subImagesContainer');
        let objectIndex = dynamicContent[this.id];

        // Delete any lingering thumbnails
        document.querySelectorAll('.thumb').forEach((el) => el.remove());
        objectIndex.images.forEach((el, index) => {
            let newSubImg = document.createElement('img');

            // Add CSS class
            newSubImg.classList.add('thumb');
            // Add an images sources
            newSubImg.src = "images/" + objectIndex.images[index];

            //add an index number to the thumbnail for array reference
            newSubImg.dataset.index = index;

            newSubImg.addEventListener('click',function(){ popLightbox(index, objectIndex); }, false);
            // Append it to the container
            subImages.appendChild(newSubImg);
        });

        theSubhead.classList.remove(appliedClass);
        theHeader.classList.remove(appliedClass);

        theSubhead.classList.add(this.id);
        theHeader.classList.add(this.id);

        theSubhead.firstChild.nodeValue = objectIndex.headline;
        theSeasonText.firstChild.nodeValue = objectIndex.text;

        appliedClass = this.id;
    }

    theImages.forEach((el, index) => {
        // Loop through the photos and do some stuff
        el.addEventListener('click', changeElements, false);
    });


    function popLightbox(currentIndex, currentObject){
      //debugger
      window.scrollTo(0, 0);
      document.body.style.overflow = "hidden";

      let lightbox = document.querySelector('.lightbox');
      lightbox.style.display = 'block';

      let lightboxImg = lightbox.querySelector('img');
      let lightboxClose = lightbox.querySelector('.close-lightbox');
      let lightboxDesc = lightbox.querySelector('p');

      lightboxImg.src = "images/" + currentObject.images[currentIndex];
      lightboxDesc.innerHTML = currentObject.imageDescription[currentIndex];

      lightboxClose.addEventListener('click', closeLightbox, false);
    }
    function closeLightbox(){
      //debugger;
      let lightbox = document.querySelector('.lightbox');
      lightbox.style.display = 'none';
    }
    // Init app
    changeElements.call(document.querySelector('#spring')); // Call with param
})();
