<footer class="footer mt-auto py-5">
    <div class="container">
        <div class="row g-4">
            <div class="col-lg-4">
                <div class="footer-brand mb-3">
                    <img src="/favicon.png" alt="Logo" class="footer-logo">
                    <span class="ms-2 fw-bold">Thomas Barden</span>
                </div>
                <p class="text-muted">Software engineering student passionate about creating and learning new technologies.</p>
            </div>
            
            <div class="col-lg-4">
                <h5 class="footer-heading mb-3">Quick Links</h5>
                <ul class="footer-links">
                    <li><a href="/">Home</a></li>
                    <li><a href="/projects">Projects</a></li>
                    <li><a href="/contact">Contact</a></li>
                    <li><a href="https://github.com/ctrlthomas/personal-portfolio">Source Code</a></li>
                </ul>
            </div>
            
            <div class="col-lg-4">
                <h5 class="footer-heading mb-3">Connect</h5>
                <div class="social-links mb-3">
                    <a href="https://github.com/ctrlthomas" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile">
                        <i class="bi bi-github"></i>
                    </a>
                    <a href="mailto:thomas@thomasbarden.com" aria-label="Email">
                        <i class="bi bi-envelope"></i>
                    </a>
                </div>
                <p class="text-muted small mb-0">© {new Date().getFullYear()} Thomas Barden<br>Built with SvelteKit & Bootstrap</p>
            </div>
        </div>
    </div>
</footer>

<style>
    .footer {
        background: var(--bg-secondary);
        border-top: 1px solid var(--border-color);
    }

    .footer-brand {
        display: flex;
        align-items: center;
    }

    .footer-logo {
        width: 32px;
        height: 32px;
        border-radius: 6px;
    }

    .footer-heading {
        font-size: 1.1rem;
        font-weight: 600;
        color: var(--text-primary);
    }

    .footer-links {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .footer-links li {
        margin-bottom: 0.5rem;
    }

    .footer-links a {
        color: var(--text-secondary);
        text-decoration: none;
        transition: color 0.2s ease;
    }

    .footer-links a:hover {
        color: var(--bs-primary);
    }

    .social-links {
        display: flex;
        gap: 1rem;
    }

    .social-links a {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 36px;
        height: 36px;
        border-radius: 8px;
        background: var(--bg-primary);
        color: var(--text-secondary);
        font-size: 1.2rem;
        transition: all 0.2s ease;
        box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    }

    .social-links a:hover {
        color: var(--accent-color);
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    }

    @media (max-width: 991px) {
        .footer-brand, .footer-heading {
            text-align: center;
        }

        .footer-brand {
            justify-content: center;
        }

        .social-links {
            justify-content: center;
        }

        .footer-links {
            text-align: center;
        }

        p {
            text-align: center;
        }
    }
</style>
