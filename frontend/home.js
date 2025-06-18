document.addEventListener('DOMContentLoaded', function () {
  const events = [
    {
      title: "SIGNAL 4.0",
      description: "Signal is a flagship event of IEEE SPS kerala chapter conducted every year.this year 2025 we are planning to conduct the evnt offline for 3 days on the month of sptember or october",
      image: "images/image4.jpg",
      link: "/login"
    },
    {
      title: "Rescue link",
      description: "ICFOSS, technical project",
      image: "images/image5.jpg",
      link: "/login"
    },
    {
      title: "Hack4Good",
      description: "Hackathon.",
      image: "images/image6.jpg",
      link: "/login"
    }
  ];

  const eventList = document.getElementById("eventList");

  events.forEach(event => {
    const card = document.createElement("div");
    card.className = "event-card";

    const shortDescription = event.description.slice(0, 100);
    const needsToggle = event.description.length > 100;

    card.innerHTML = `
      <img src="${event.image}" alt="${event.title}" class="event-image" style="cursor: pointer;">
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
