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
    threshold: 0.3 // Adjust this value for more or less fuzzy matching
  };

  const fuse = new Fuse(portfolioItems, options);

  search.addEventListener("keyup", () => {
    const searchValue = search.value;

    if (searchValue === "") {
      portfolioItems.forEach(item => {
        item.element.style.display = "block";
      });
      return;
    }

    const results = fuse.search(searchValue);

    // Hide all items first
    portfolioItems.forEach(item => {
      item.element.style.display = "none";
    });

    // Display and sort items according to search results
    results.forEach(result => {
      result.item.element.style.display = "block";
      portfolioContainer.insertBefore(result.item.element, portfolioContainer.firstChild); // Move matching element to the top
    });
  });
});
