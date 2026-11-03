"use strict";
        // Hamburger Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('aside');
const closeMenuBtn = document.getElementById("close-menu");
const fullName = document.getElementById("fullName");
const message = document.getElementById("message");
const telephone = document.getElementById("phoneNum");
const modalPhone = document.getElementById("modalPhone");
const modalNotes = document.getElementById("modalNotes");
const modalName = document.getElementById("modalName");

/* open and close nav menu */
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

//close menu on click of closeMenuBtn icon
closeMenuBtn.addEventListener("click", () => {
    navMenu.classList.remove("active");
})
        // Close menu on nav item click
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                if (hamburger.querySelector('i')) {
                    hamburger.querySelector('i').className = 'fa-solid fa-bars';
                }
            });
        });

        // Active Link Switching on Scroll
        window.addEventListener('scroll', () => {
            let current = '';
            const sections = document.querySelectorAll('section');
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (pageYOffset >= (sectionTop - 150)) {
                    current = section.getAttribute('id');
                }
            });

            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').includes(current)) {
                    link.classList.add('active');
                }
            });
        });

        // Service Filter by Category
        function filterCategory(category, btnElement) {
            document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            btnElement.classList.add('active');

            const cards = document.querySelectorAll('.service-card');
            cards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        }

        // Service Search Filtering
        function filterServices() {
            const query = document.getElementById('serviceSearch').value.toLowerCase();
            const cards = document.querySelectorAll('.service-card');

            cards.forEach(card => {
                const title = card.getAttribute('data-title');
                if (title.includes(query)) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        }

        // Modal Functionality
        let currentModalService = "General Service";

        function openModal(serviceName) {
            currentModalService = serviceName;
            document.getElementById('modalServiceTitle').innerText = serviceName;
            document.getElementById('consultationModal').classList.add('active');
        }

        function closeModal() {
            document.getElementById('consultationModal').classList.remove('active');
        }

        // Close modal when clicking backdrop
        window.addEventListener('click', (e) => {
            const modal = document.getElementById('consultationModal');
            if (e.target === modal) {
                closeModal();
            }
        });

        // WhatsApp Form Handler (Contact Section)
        function handleFormSubmit(e) {
            e.preventDefault();
            const name = document.getElementById('fullName').value.trim();
            const phone = document.getElementById('phoneNum').value.trim();
            const service = document.getElementById('serviceSelect').value.trim();
            const msg = document.getElementById('message').value.trim();
            const validName = validateName(fullName);
            const validPhone = validateTelephone(telephone);
            const validMessage = validateMessage(message);

            if (!validName || !validPhone || !validMessage) { return; }

            const whatsappMessage = `*New Consultation Request*%0A%0A*Name:* ${encodeURIComponent(name)}%0A*Phone:* ${encodeURIComponent(phone)}%0A*Service:* ${encodeURIComponent(service)}%0A*Details:* ${encodeURIComponent(msg || 'N/A')}`;
            
            window.open(
							`https://wa.me/2348022692116?text=${whatsappMessage}`,
							"_blank",
						);
        }

        // Modal Form Submit Handler
        function handleModalSubmit(e) {
            e.preventDefault();
            const name = document.getElementById('modalName').value.trim();
            const phone = document.getElementById('modalPhone').value.trim();
            const notes = document.getElementById('modalNotes').value.trim();
            const validName = validateName(modalName);
						const validPhone = validateTelephone(modalPhone);
						const validMessage = validateMessage(modalNotes);

						if (!validName || !validPhone || !validMessage) {
							return;
            };

            const whatsappMessage = `*Service Inquiry: ${encodeURIComponent(currentModalService)}*%0A%0A*Name:* ${encodeURIComponent(name)}%0A*Phone:* ${encodeURIComponent(phone)}%0A*Notes:* ${encodeURIComponent(notes || 'N/A')}`;

            closeModal();
            window.open(`https://wa.me/2348022692116?text=${whatsappMessage}`, '_blank');
        }

/* form validation */
        
//helper function

function addClass(input) {
    input.classList.add("form-error-message");
}
function removeClass(input) {
    input.classList.remove("form-error-message");
}
function showError(input, message) {
    const errorElement = input.nextElementSibling;
    errorElement.textContent = message;
}
function clearError(input) {
    const errorElement = input.nextElementSibling;
    errorElement.textContent = "";
}

//validate each input
function validateName(input) {
    const nameReg = /^[A-Za-z][A-Za-z\s'-]{1,}$/;
    const nameValue = input.value.trim();

    if (!nameReg.test(nameValue)) {
        addClass(input);
        showError(
					input,
					"Please enter a valid name using letters, spaces, hyphens, or apostrophes.",
        );
        return false;
    }

    removeClass(input);
    clearError(input);
    return true;
}
function validateTelephone(input) {
    const telephoneReg = /^\+?[0-9]{10,15}$/;
    const telValue = input.value.trim();

    if (!telephoneReg.test(telValue)) {
        addClass(input);
        showError(input, "Please enter a valid phone number");
        return false;
    }

    removeClass(input);
    clearError(input);
    return true;
}
function validateMessage(input) {
    const textArea = input.value.trim();
    if (textArea < 5) {
        
        addClass(input);
        showError(input, "Message must be more than 5 characters");
        return false;
    }
    removeClass(input);
    clearError(input);
    return true;
}

fullName.addEventListener("blur", (e) => { validateName(e.target) });
telephone.addEventListener("blur", (e) => { validateTelephone(e.target) });
message.addEventListener("blur", (e) => { validateMessage(e.target); });
modalName.addEventListener("blur", (e)=>{validateName(e.target)})
modalNotes.addEventListener("blur", (e)=>{validateMessage(e.target)})
modalPhone.addEventListener("blur", (e)=>{validateTelephone(e.target)})