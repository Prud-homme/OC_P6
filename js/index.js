// API Request
async function retrieveContent(url) {
    let response = await fetch(url);
    return response.json();
}


async function updatePromote() {
    let promoteContent = document.querySelectorAll('.promote')[0];
    let promoteDiv = promoteContent.getElementsByTagName('div')[0];
    let promoteTitle = promoteDiv.getElementsByTagName('h2')[0];
    let promoteDesc = promoteDiv.getElementsByTagName('p')[0];
    let promoteImg = promoteContent.getElementsByTagName('img')[1];

    let contents = await retrieveContent("http://localhost:8000/api/v1/titles/?imdb_score=9.6");
    contents = await retrieveContent(contents.results[0].url);
    
    promoteTitle.innerText = contents.title;
    promoteDesc.innerText = contents.description;
    promoteImg.alt = contents.title;
    promoteImg.src = contents.image_url;
    promoteContent.style.opacity = 1;
}
updatePromote()

async function updateContentCategory(carousel, url) {
    let contents = await retrieveContent(url);
    let moviesList = [];
    for (let i=0 ; i < 7 ; i++) {
        imgCover = carousel.getElementsByClassName("product")[i];
        imgCover.alt = contents.results[i].title;
        imgCover.src = contents.results[i].image_url;
        carousel.style.opacity = 1;
    }
}

async function updateContent() {
    let urls = [
        "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&page_size=10&page=1",
        "http://localhost:8000/api/v1/titles/?genre=action&page_size=10&page=1",
        "http://localhost:8000/api/v1/titles/?genre=history&page_size=10&page=1",
        "http://localhost:8000/api/v1/titles/?genre=thriller&page_size=10&page=1"
    ];
    let carousels = document.querySelectorAll('.js-product-carousel');
    for (let i=0 ; i < 4 ; i++) {
        updateContentCategory(carousels[i], urls[i]);

    }
}
updateContent()

async function updateModal(url) {
    let modalContent = document.querySelector(".modal-content");
    
    let modalImage = modalContent.getElementsByTagName('img')[0];
    //let modalDiv = modalContent.getElementsByTagName('div')[0];
    let modalTitle = modalContent.getElementsByTagName('h1')[0];
    let modalDesc = modalContent.getElementsByTagName('p')[0];
    if (url !== null) {
        url = url.replaceAll(" ", '%20');
        url = url.replaceAll("'", '%27');
        let content = await retrieveContent(url);
        let movie = content.results[0];
        //window.open(url, '_blank');
        modalTitle.innerText = `${movie.title}`;
        modalDesc.innerText = `${movie.description}`;
        modalImage.src = `${movie.image_url}`;
        modalImage.alt = `${movie.title}`;
    } else {
        modalTitle.innerText = "";
        modalDesc.innerText = "";
        modalImage.src = "";
        modalImage.alt = "";
    }
}

// Modal
const modal = document.querySelector(".modal");
const triggers = document.querySelectorAll(".trigger");
const closeButton = document.querySelector(".close-button");

function toggleModal() {
    
    let urlSearch = null

    if (this.tagName == "IMG"){
        urlSearch = `http://localhost:8000/api/v1/titles/?title=${this.alt}`;
    } else if (this.tagName == "BUTTON") {
        let parent = this.parentNode.parentNode;
        let imgContent = parent.getElementsByTagName('img')[1];
        urlSearch = `http://localhost:8000/api/v1/titles/?title=${imgContent.alt}`;
    }
    updateModal(urlSearch)
    modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
    }
}

[].forEach.call(triggers, function(trigger) {
    trigger.addEventListener("click", toggleModal);
});
closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);


//Carousel
(function() {
  let carousels = document.querySelectorAll('.js-product-carousel');
  
  [].forEach.call(carousels, function(carousel) {
    carouselize(carousel);
  });
  
})();

function carouselize(carousel) {
  let productList = carousel.querySelector('.js-product-list');
  let productListWidth = 0;
  let productListSteps = 0;
  let products = carousel.querySelectorAll('.product');
  let productAmount = 0;
  let productAmountVisible = 4;
  let carouselPrev = carousel.querySelector('.js-carousel-prev');
  let carouselNext = carousel.querySelector('.js-carousel-next');

  //Count all the products
  [].forEach.call(products, function(product) {
    productAmount++;
    productListWidth += 250;
    productList.style.width = productListWidth+"px";
  });

  carouselNext.onclick = function() {
    if(productListSteps < productAmount-productAmountVisible) {
      productListSteps++;
      moveProductList();
    }
  }
  carouselPrev.onclick = function() {
    if(productListSteps > 0) {
      productListSteps--;
      moveProductList();
    }
  }
  
  // Move the carousels product-list
  function moveProductList() {
    productList.style.transform = "translateX(-"+105*productListSteps+"px)";
  }
}