function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
function definedValue(value) {
    if (value === null) {
        return "Non disponible"
    } else {
        return value
    }
}
function minutesToHours(minutes) {
    if (minutes === null) {
        return "Non disponible"
    }
    let quotient = Math.floor(minutes/60)
    let reste = minutes % 60
    if (quotient > 0 && reste === 0) {
        return `${quotient}h`
    } else if (quotient > 0) {
        return `${quotient}h${reste}min`
    } else {
        return `${reste}min`
    }
    
}

// API Request
async function retrieveContent(url) {
    let response = await fetch(url);
    return response.json();
}


async function updatefeatured() {
    let featuredContent = document.querySelectorAll('.featured')[0];
    let featuredDiv = featuredContent.getElementsByTagName('div')[0];
    let featuredTitle = featuredDiv.getElementsByTagName('h2')[0];
    let featuredDesc = featuredDiv.getElementsByTagName('p')[0];
    let featuredImg = featuredContent.getElementsByTagName('img')[1];

    let contents = await retrieveContent("http://localhost:8000/api/v1/titles/?imdb_score=9.6");
    contents = await retrieveContent(contents.results[getRandomInt(contents.results.length)].url);
    
    featuredTitle.innerHTML = contents.title;
    featuredDesc.innerHTML = contents.description;
    featuredImg.alt = contents.title;
    featuredImg.src = contents.image_url;
    featuredContent.style.opacity = 1;
}
updatefeatured()

// async function createfeatured() {
//     let contents = await retrieveContent("http://localhost:8000/api/v1/titles/?imdb_score=9.6");
//     contents = await retrieveContent(contents.results[0].url);

//     let sectionContent = document.createElement("section");
//     sectionContent.classList.add('featured');
//     let imgSection = document.createElement("img");
//     imgSection.src = `${contents.image_url}`;
//     imgSection.alt = `${contents.title}`;
//     let divSection = document.createElement("div");

//     let h2Div = document.createElement("h2");
//     h2Div.innerHTML = `${contents.title}`;
//     let buttonDiv = document.createElement("button");
//     buttonDiv.classList.add('featured-button');
//     buttonDiv.classList.add('trigger');
//     buttonDiv.type = "button";
//     buttonDiv.innerHTML = '<img src="./images/play_circle.svg"/> Lecture';
//     let pDiv = document.createElement("p");
//     pDiv.innerHTML = `${contents.description}`;


//     divSection.appendChild(h2Div);
//     divSection.appendChild(buttonDiv);
//     divSection.appendChild(pDiv);

//     sectionContent.appendChild(divSection);
//     sectionContent.appendChild(imgSection);

//     sectionContent.style.opacity = 1;

//     let mainContent = document.getElementsByTagName('main')[0];
//     mainContent.appendChild(sectionContent);
// }
// createfeatured();


// async function createCategory() {
//     let url = "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&page_size=10&page=1";
//     let contents = await retrieveContent(url);
    

//     let sectionContent = document.createElement("section");
//     sectionContent.classList.add('carousel');
//     sectionContent.classList.add('js-product-carousel');
//     sectionContent.style.opacity = 1;

//     let h2Section = document.createElement("h2");
//     h2Section.innerHTML = "Titre";

//     let imgSectionPrev = document.createElement("img");
//     imgSectionPrev.classList.add("js-carousel-prev");
//     imgSectionPrev.src = "./images/arrow_back.svg";
//     imgSectionPrev.alt = "Gauche";

//     let imgSectionNext = document.createElement("img");
//     imgSectionNext.classList.add("js-carousel-next");
//     imgSectionNext.src = "./images/arrow_forward.svg";
//     imgSectionNext.alt = "Droite";

//     let divSection = document.createElement("div");
//     divSection.classList.add("carousel__view");

//     let divDiv = document.createElement("div");
//     divDiv.classList.add("product-list");
//     divDiv.classList.add("js-product-list");


//     for (let i=0 ; i < 7 ; i++) {
        
//         let imgDivDiv = document.createElement("img");
//         imgDivDiv.classList.add("product");
//         imgDivDiv.classList.add("trigger");
//         imgDivDiv.src = "#";//contents.results[i].image_url;
//         imgDivDiv.alt = contents.results[i].title;
//         divDiv.appendChild(imgDivDiv);
//     }


//     //let imgDivDiv = document.createElement("img");
//     //imgDivDiv.classList.add("product");
//     //imgDivDiv.classList.add("trigger");
//     //imgDivDiv.src = "./images/play_circle";
//     //imgDivDiv.alt = "Test";
//     //divDiv.appendChild(imgDivDiv);


//     divSection.appendChild(divDiv);

//     sectionContent.appendChild(h2Section);
//     sectionContent.appendChild(imgSectionPrev);
//     sectionContent.appendChild(divSection);
//     sectionContent.appendChild(imgSectionNext); 

//     let mainContent = document.getElementsByTagName('main')[0];
//     mainContent.appendChild(sectionContent);
// }

// createCategory();

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
    let modalTitle = modalContent.getElementsByTagName('h2')[0];
    let modalDesc = modalContent.getElementsByTagName('p')[0];
    if (url !== null) {
        url = url.replaceAll(" ", '%20');
        url = url.replaceAll("'", '%27');
        let search = await retrieveContent(url);
        let movie = await retrieveContent(search.results[0].url);
        //window.open(url, '_blank');
        modalTitle.innerHTML = `${movie.title}`;
        modalDesc.innerHTML = `
            <p class="bold small">
            ${movie.description}<br>
            </p>
            <p class="small">
            Date de sortie: ${movie.date_published}<br>
            Durée: ${minutesToHours(movie.duration)}<br>
            Genre(s): ${movie.genres}<br>
            Pays d'origine: ${movie.countries}<br>
            Réalisateur: ${movie.directors}<br>
            Acteurs: ${movie.actors}
            </p>
            <p class="small italic">
            Rated: ${definedValue(movie.rated)}<br>
            Score Imdb: ${definedValue(movie.imdb_score)}<br>
            Résultat au Box Office: ${definedValue(movie.worldwide_gross_income)}
            </p>`;
        modalImage.src = `${movie.image_url}`;
        modalImage.alt = `${movie.title}`;
    } else {
        modalTitle.innerHTML = "";
        modalDesc.innerHTML = "";
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