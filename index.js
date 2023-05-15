const form = document.querySelector("form");
const galleryList = document.querySelector(".search-gallery");
const modal = document.querySelector(".modal");

let currentImageIndex = 0;
let images = [];

// galeriyi renderlar
const renderGallery = (data) => {
  galleryList.innerHTML = "";
  images = data.results.map((item) => item.urls.full);

  data.results.forEach((item) => {
    const html = `
    <div class="galery-item">
        <img src="${item.urls.small}" srcset="${item.urls.full}">
    </div>
  `;

    galleryList.innerHTML += html;
  });

  const gallery = document.querySelectorAll(".search-gallery img");
  gallery.forEach((img, index) => {
    img.addEventListener("click", () => {
      currentImageIndex = index;
      showModal();
    });
  });
};

const showModal = () => {
  console.log("show");
  modal.classList.add("show");
  const bigImage = images[currentImageIndex];

  const modalShowHtml = `
        <span class="modal__close--button">&times;</span>
        <button class="modal__previous--button"><i class="fa-sharp fa-solid fa-arrow-left"></i></button>
        <img class="modal__img" src="${bigImage}" alt="">
        <button class="modal__next--button"><i class="fa-solid fa-arrow-right"></i></button>
    `;

  modal.innerHTML += modalShowHtml;

  // next arrowuna tıklayınca modal da ileri gitmesini sağlar
  const nextButton = document.querySelector(".modal__previous--button");
  nextButton.addEventListener("click", nextImage);

  // next arrowuna tıklayınca modal da geri gitmesini sağlar
  const prevButton = document.querySelector(".modal__next--button");
  prevButton.addEventListener("click", prevImage);

  const img = document.querySelector(".modal__img");

  const closeModalBtn = document.querySelector(".modal__close--button");
  closeModalBtn.addEventListener("click", () => {
    console.log("close");
    modal.classList.remove("show");
    modal.innerHTML ="";
    closeModalBtn.remove();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      console.log("esc");
      modal.classList.remove("show");
      modal.innerHTML ="";
      closeModalBtn.remove();
    }
  });
};

//boş yere tıklayınca modali kapatır
const closeModal = () => {
  const modal = document.querySelector(".modal");
  modal.classList.remove("show");
  modal.innerHTML = "";
};



//Resmi ileri almasını sağlayan fonksiyon
const nextImage = () => {
  currentImageIndex++;
  if (currentImageIndex >= images.length) {
    currentImageIndex = 0;
  }
  const image = document.createElement("img");
  image.src = images[currentImageIndex];
  modal.replaceChild(image, modal.querySelector("img")); //Şimdi oluşturuğumuz resim ile yer değiştir
};

//Resmi geri almasını sağlayan fonksiyon
const prevImage = () => {
  currentImageIndex--;
  if (currentImageIndex < 0) {
    currentImageIndex = images.length - 1;
  }
  const image = document.createElement("img");
  image.src = images[currentImageIndex];
  modal.replaceChild(image, modal.querySelector("img")); //Şimdi oluşturuğumuz resim ile yer değiştir
};

//sorgu atar ve başarılı ise galery render eder
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const search = document.querySelector("#search-input").value;

  fetch(
    `https://api.unsplash.com/search/photos?query=${search}&client_id=Je0UqxQNYCz-x9R1uVow91Z2O0kCGkyus6cbwacZ3Kk`
  )
    .then((res) => res.json())
    .then((data) => {
      if (data.results.length > 0) {
        renderGallery(data);
      }
    });
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

//Sağ ve sol yön tuşlarına baSınca da resim değişmesini sağlar
document.addEventListener("keydown", (e) => {
  if (modal.classList.contains("show")) {
    if (e.key === "ArrowRight") {
      nextImage();
    } else if (e.key === "ArrowLeft") {
      prevImage();
    }
  }
});

const gallery = document.querySelectorAll(".search-gallery img");
let currentIndex = 0;

// ileri geri yapıcınca resmi update eder
const updateModal = (index) => {
  modal.innerHTML = "";
  const bigImage = gallery[index].srcset;
  const modalHtml = `
        <span class="modal__close--button">&times;</span>
        <button class="modal__previous--button"><i class="fa-sharp fa-solid fa-arrow-left"></i></button>
        <img src="${bigImage}" alt="">
        <button class="modal__next--button"><i class="fa-solid fa-arrow-right"></i></button>
    `;

  modal.innerHTML += modalHtml;
};

// // next arrowuna tıklayınca modal da ileri gitmesini sağlar
// const nextButton = document.querySelector(".modal__next--button");
// nextButton.addEventListener("click", nextImage);

// // next arrowuna tıklayınca modal da geri gitmesini sağlar
// const prevButton = document.querySelector(".modal__previous--button");
// prevButton.addEventListener("click", prevImage);

// galery i dinler üzerine tıklayınca resmi getirir
gallery.forEach((img, index) => {
  img.addEventListener("click", () => {
    currentIndex = index;
    updateModal(currentIndex);
    modal.classList.add("show");
  });
});



