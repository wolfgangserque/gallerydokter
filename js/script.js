document.addEventListener("DOMContentLoaded", function() {
    const search = document.querySelector(".search-box input"),
          portfolioContainer = document.querySelector(".portfolio-container"),
          images = document.querySelectorAll(".image-box");
  
    const portfolioItems = Array.from(images).map(image => ({
      element: image,
      name: image.dataset.name
    }));
  
    const options = {
      keys: ['name'],
      threshold: 0.3 // Sesuaikan nilai ini untuk lebih atau kurang pencarian fuzzy
    };
  
    const fuse = new Fuse(portfolioItems, options);
  
    search.addEventListener("keyup", () => {
      const searchValue = search.value;
  
      if (searchValue === "") {
        portfolioItems.forEach(item => {
          item.element.style.display = "block";
          portfolioContainer.appendChild(item.element); // Pastikan elemen ditambahkan kembali ke container
        });
        return;
      }
  
      const results = fuse.search(searchValue);
  
      // Sembunyikan semua item terlebih dahulu
      portfolioItems.forEach(item => {
        item.element.style.display = "none";
      });
  
      // Tampilkan dan urutkan item sesuai hasil pencarian
      results.forEach(result => {
        result.item.element.style.display = "block";
        portfolioContainer.appendChild(result.item.element); // Pindahkan elemen yang cocok ke paling atas
      });
    });
  });
  