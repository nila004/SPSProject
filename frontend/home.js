document.addEventListener('DOMContentLoaded', function () {
  const events = [
    {
      title: "Tech Symposium 2025",
      description: "Showcase of student tech innovations across Keralaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaa aaaaaaaaa .",
      image: "images/image1.jpg"
    },
    {
      title: "AI Bootcamp",
      description: "Hands-on ML, Deep Learning and Generative AI workshop aaaa aaa aaaaaaaa aaaaaaaaaaaa aaaaaaaaaaaaa aaaaaaaaaaaaaaa aaaaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaa aaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaa.",
      image: "images/image2.jpg"
    },
    {
      title: "RescueLink Demo Day",
      description: "Live trial of our event management dashboard system.",
      image: "images/image3.jpg"
    }
  ];

  const eventList = document.getElementById("eventList");

  events.forEach(event => {
    const card = document.createElement("div");
    card.className = "event-card";

    // Limit preview to 150 characters
    const shortDescription = event.description.slice(0, 150);
    const needsToggle = event.description.length > 150;

    card.innerHTML = `
      <img src="${event.image}" alt="${event.title}" class="event-image">
      <div class="event-details">
        <div class="event-title">${event.title}</div>
        <div class="event-description">
          <span class="desc-text">${shortDescription}${needsToggle ? '...' : ''}</span>
          ${needsToggle ? `<button class="show-more">Show More</button>` : ''}
        </div>
      </div>
    `;

    const imageElement = card.querySelector('.event-image');
    imageElement.addEventListener('click', () => {
      window.location.href = "login.html";  // Change to your actual login page filename
    });

    eventList.appendChild(card);

    if (needsToggle) {
      const descText = card.querySelector('.desc-text');
      const toggleBtn = card.querySelector('.show-more');
      let expanded = false;

      toggleBtn.addEventListener('click', () => {
        expanded = !expanded;
        descText.textContent = expanded ? event.description : shortDescription + '...';
        toggleBtn.textContent = expanded ? 'Show Less' : 'Show More';
      });
    }
  });
});
