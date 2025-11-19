// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Enhanced Neural Network Pattern Generation
    const patternContainer = document.getElementById('neural-network-pattern');
    if (patternContainer) {
        const width = patternContainer.offsetWidth;
        const height = patternContainer.offsetHeight;
        
        // Create circuit lines (more visible)
        for (let i = 0; i < 30; i++) {
            const line = document.createElement('div');
            line.className = 'circuit-line';
            if (Math.random() > 0.5) {
                // Horizontal line
                line.style.width = (150 + Math.random() * 250) + 'px';
                line.style.height = '2px';
                line.style.top = (Math.random() * height) + 'px';
                line.style.left = (Math.random() * (width - 300)) + 'px';
            } else {
                // Vertical line
                line.style.width = '2px';
                line.style.height = (150 + Math.random() * 250) + 'px';
                line.style.left = (Math.random() * width) + 'px';
                line.style.top = (Math.random() * (height - 300)) + 'px';
            }
            patternContainer.appendChild(line);
        }
        
        // Create neurons
        const neurons = [];
        for (let i = 0; i < 35; i++) {
            const neuron = document.createElement('div');
            neuron.className = 'neuron';
            const x = Math.random() * width;
            const y = Math.random() * height;
            neuron.style.left = x + 'px';
            neuron.style.top = y + 'px';
            patternContainer.appendChild(neuron);
            neurons.push({ element: neuron, x, y });
            // Animate neurons
            animateNeuron(neuron);
        }
        
        // Create synapses (connections) - more visible
        for (let i = 0; i < neurons.length; i++) {
            for (let j = i + 1; j < neurons.length; j++) {
                const dx = neurons[i].x - neurons[j].x;
                const dy = neurons[i].y - neurons[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 180 && Math.random() > 0.6) {
                    const synapse = document.createElement('div');
                    synapse.className = 'synapse';
                    const length = distance;
                    const angle = Math.atan2(dy, dx) * 180 / Math.PI;
                    synapse.style.width = length + 'px';
                    synapse.style.height = '3px';
                    synapse.style.left = neurons[j].x + 'px';
                    synapse.style.top = neurons[j].y + 'px';
                    synapse.style.transform = `rotate(${angle}deg)`;
                    synapse.style.opacity = 0.5 * (1 - distance / 180);
                    patternContainer.appendChild(synapse);
                    // Animate synapses
                    animateSynapse(synapse);
                }
            }
        }
        
        // Create data flows
        for (let i = 0; i < 25; i++) {
            const dataFlow = document.createElement('div');
            dataFlow.className = 'data-flow';
            dataFlow.style.left = (Math.random() * width) + 'px';
            dataFlow.style.top = (Math.random() * height) + 'px';
            patternContainer.appendChild(dataFlow);
            // Animate data flows
            animateDataFlow(dataFlow, width, height);
        }
        
        // Create data characters (letters and numbers)
        const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        for (let i = 0; i < 40; i++) {
            const charElement = document.createElement('div');
            charElement.className = 'data-character';
            charElement.textContent = characters.charAt(Math.floor(Math.random() * characters.length));
            charElement.style.left = (Math.random() * width) + 'px';
            charElement.style.top = (Math.random() * height) + 'px';
            charElement.style.fontSize = (10 + Math.random() * 10) + 'px';
            patternContainer.appendChild(charElement);
            // Animate characters
            animateCharacter(charElement, width, height);
        }
    }
    
    function animateNeuron(element) {
        let scale = 1;
        let direction = 1;
        function pulse() {
            scale += direction * 0.008;
            if (scale > 1.4 || scale < 0.6) direction *= -1;
            element.style.transform = `scale(${scale})`;
            requestAnimationFrame(pulse);
        }
        pulse();
    }
    
    function animateSynapse(element) {
        let opacity = parseFloat(element.style.opacity);
        let direction = 1;
        function flicker() {
            opacity += direction * 0.015;
            if (opacity > 0.8 || opacity < 0.2) direction *= -1;
            element.style.opacity = opacity;
            requestAnimationFrame(flicker);
        }
        flicker();
    }
    
    function animateDataFlow(element, width, height) {
        let x = parseFloat(element.style.left);
        let y = parseFloat(element.style.top);
        let dx = (Math.random() - 0.5) * 2.5;
        let dy = (Math.random() - 0.5) * 2.5;
        function move() {
            x += dx;
            y += dy;
            if (x <= 0 || x >= width) dx = -dx;
            if (y <= 0 || y >= height) dy = -dy;
            element.style.left = x + 'px';
            element.style.top = y + 'px';
            requestAnimationFrame(move);
        }
        move();
    }
    
    function animateCharacter(element, width, height) {
        let x = parseFloat(element.style.left);
        let y = parseFloat(element.style.top);
        let dx = (Math.random() - 0.5) * 1.2;
        let dy = (Math.random() - 0.5) * 1.2;
        function move() {
            x += dx;
            y += dy;
            if (x <= 0 || x >= width) dx = -dx;
            if (y <= 0 || y >= height) dy = -dy;
            element.style.left = x + 'px';
            element.style.top = y + 'px';
            requestAnimationFrame(move);
        }
        move();
    }
    
    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Navigation active state management
    const sections = document.querySelectorAll('section');
    
    function setActiveLink() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', setActiveLink);
    
    // Animate skill bars when they come into view
    const skillBars = document.querySelectorAll('.skill-progress');
    const vizBars = document.querySelectorAll('.viz-bar');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.getAttribute('data-width') + '%';
                entry.target.style.width = width;
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => {
        observer.observe(bar);
    });
    
    vizBars.forEach(bar => {
        observer.observe(bar);
    });
    
    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // In a real application, you would send this data to a server
            // For now, we'll just show a success message
            alert(`Thank you, ${name}! Your message has been sent. I'll get back to you soon.`);
            
            // Reset form
            this.reset();
        });
    }
    
    // Initialize on page load
    setActiveLink();
});