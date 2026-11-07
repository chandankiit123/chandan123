
// ======================================
// K EXPLORE - EVENT MANAGEMENT WEBSITE
// ======================================


// ======================================
// EVENT DATA
// ======================================

const events = [
    {
        id: 1,
        name: "Neon Music Festival",
        category: "Music",
        date: "20 December 2026",
        venue: "Bhubaneswar, Odisha",
        image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800",
        description: "Experience an unforgettable night filled with music, lights and amazing performances."
    },
    {
        id: 2,
        name: "Tech Summit 2026",
        category: "Technology",
        date: "25 December 2026",
        venue: "Bengaluru, India",
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
        description: "Explore the latest technology trends, innovation and future possibilities."
    },
    {
        id: 3,
        name: "Creative Design Workshop",
        category: "Workshop",
        date: "28 December 2026",
        venue: "New Delhi, India",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800",
        description: "Learn creative thinking, design skills and modern digital techniques."
    },
    {
        id: 4,
        name: "Champions Sports Meet",
        category: "Sports",
        date: "5 January 2027",
        venue: "Mumbai, India",
        image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800",
        description: "Celebrate sportsmanship, competition and incredible athletic performances."
    },
    {
        id: 5,
        name: "Startup Innovation Expo",
        category: "Technology",
        date: "12 January 2027",
        venue: "Hyderabad, India",
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800",
        description: "Meet innovators, discover startups and explore exciting business ideas."
    },
    {
        id: 6,
        name: "Art & Culture Festival",
        category: "Workshop",
        date: "18 January 2027",
        venue: "Kolkata, India",
        image: "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=800",
        description: "Discover beautiful art, cultural performances and creative experiences."
    }
];


// ======================================
// DISPLAY EVENTS
// ======================================

const eventGrid = document.getElementById("eventGrid");

function displayEvents(eventList) {

    eventGrid.innerHTML = "";

    if (eventList.length === 0) {

        eventGrid.innerHTML =
            '<p class="no-events">No events found. Try another search.</p>';

        return;
    }

    eventList.forEach(event => {

        const card = document.createElement("div");

        card.className = "event-card";

        card.innerHTML = `
            <img src="${event.image}" alt="${event.name}">

            <div class="event-content">

                <p class="event-category">
                    ${event.category}
                </p>

                <h3>${event.name}</h3>

                <p class="event-date">
                    📅 ${event.date}
                </p>

                <p class="event-venue">
                    📍 ${event.venue}
                </p>

                <p class="event-description">
                    ${event.description}
                </p>

                <button
                    class="details-button"
                    onclick="viewEvent(${event.id})">

                    View Details →

                </button>

            </div>
        `;

        eventGrid.appendChild(card);

    });

}


// ======================================
// SEARCH EVENTS
// ======================================

const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", function () {

    const searchValue = this.value.toLowerCase();

    const filteredEvents = events.filter(event =>

        event.name.toLowerCase().includes(searchValue) ||

        event.category.toLowerCase().includes(searchValue) ||

        event.venue.toLowerCase().includes(searchValue)

    );

    displayEvents(filteredEvents);

});


// ======================================
// CATEGORY FILTERS
// ======================================

const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach(button => {

    button.addEventListener("click", function () {

        filterButtons.forEach(btn => {

            btn.classList.remove("active");

        });

        this.classList.add("active");

        const selectedCategory = this.dataset.category;

        searchInput.value = "";

        if (selectedCategory === "All") {

            displayEvents(events);

        } else {

            const filteredEvents = events.filter(event =>

                event.category === selectedCategory

            );

            displayEvents(filteredEvents);

        }

    });

});


// ======================================
// EVENT DETAILS
// ======================================

function viewEvent(eventId) {

    const selectedEvent = events.find(event =>

        event.id === eventId

    );

    if (!selectedEvent) return;

    document.getElementById("modalEventName").textContent =
        selectedEvent.name;

    document.getElementById("modalCategory").textContent =
        "Category: " + selectedEvent.category;

    document.getElementById("modalDate").textContent =
        "Date: " + selectedEvent.date;

    document.getElementById("modalVenue").textContent =
        "Venue: " + selectedEvent.venue;

    document.getElementById("modalDescription").textContent =
        selectedEvent.description;

    document.getElementById("registrationForm").reset();

    document.getElementById("selectedEvent").value =
        selectedEvent.name;

    document.getElementById("confirmationMessage").textContent = "";

    document.getElementById("eventModal").classList.add("active");

}


// ======================================
// CLOSE EVENT MODAL
// ======================================

const eventModal = document.getElementById("eventModal");

const closeModal = document.getElementById("closeModal");


closeModal.addEventListener("click", function () {

    eventModal.classList.remove("active");

});


eventModal.addEventListener("click", function (event) {

    if (event.target === eventModal) {

        eventModal.classList.remove("active");

    }

});


// ======================================
// EVENT REGISTRATION FORM
// ======================================

const registrationForm =
    document.getElementById("registrationForm");


registrationForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const name =
        document.getElementById("participantName").value.trim();

    const email =
        document.getElementById("participantEmail").value.trim();

    const phone =
        document.getElementById("participantPhone").value.trim();

    const selectedEvent =
        document.getElementById("selectedEvent").value;

    const confirmationMessage =
        document.getElementById("confirmationMessage");


    // VALIDATE NAME

    if (name.length < 2) {

        alert("Please enter your full name.");

        return;

    }


    // VALIDATE EMAIL

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {

        alert("Please enter a valid email.");

        return;

    }


    // VALIDATE PHONE NUMBER

    if (!/^[0-9]{10}$/.test(phone)) {

        alert("Please enter a valid 10-digit phone number.");

        return;

    }


    // VALIDATE EVENT

    if (!selectedEvent) {

        alert("Please select an event.");

        return;

    }


    // CREATE REGISTRATION

    const registration = {

        name: name,

        email: email,

        phone: phone,

        event: selectedEvent,

        registeredAt: new Date().toLocaleString()

    };


    // GET EXISTING REGISTRATIONS

    const registrations = JSON.parse(

        localStorage.getItem("kExploreRegistrations") || "[]"

    );


    // SAVE NEW REGISTRATION

    registrations.push(registration);


    localStorage.setItem(

        "kExploreRegistrations",

        JSON.stringify(registrations)

    );


    // SHOW SUCCESS MESSAGE

    confirmationMessage.textContent =

        "Registration successful! Thank you, " + name + ".";


    // RESET FORM

    registrationForm.reset();

});


// ======================================
// DISPLAY ALL EVENTS WHEN PAGE LOADS
// ======================================

displayEvents(events);
