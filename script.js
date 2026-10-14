"use strict";
        // Hamburger Menu Toggle
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('navMenu');

        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = hamburger.querySelector('i');
            if(navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });

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

            const whatsappMessage = `*Service Inquiry: ${encodeURIComponent(currentModalService)}*%0A%0A*Name:* ${encodeURIComponent(name)}%0A*Phone:* ${encodeURIComponent(phone)}%0A*Notes:* ${encodeURIComponent(notes || 'N/A')}`;

            closeModal();
            window.open(`https://wa.me/2348022692116?text=${whatsappMessage}`, '_blank');
        }

        /* form validation */