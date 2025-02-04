<script lang="ts">
    import { page } from '$app/stores';
    import ThemeToggle from './ThemeToggle.svelte';
    import { theme } from '$lib/stores/theme';
    
    let isMenuOpen = false;
    let mounted = false;
    
    const navItems = [
        { href: '/', label: 'Home' },
        { href: '/projects', label: 'Projects' },
        { href: '/contact', label: 'Contact' }
    ];
    
    const socialLinks = [
        { 
            href: 'https://github.com/ctrlthomas',
            icon: 'bi-github',
            label: 'GitHub Profile'
        },
        {
            href: 'https://github.com/ctrlthomas/project-portfolio',
            icon: 'bi-code-slash',
            label: 'View Source'
        }
    ];

    function toggleMenu(): void {
        isMenuOpen = !isMenuOpen;
        document.body.classList.toggle('menu-open', isMenuOpen);
    }

    import { onMount } from 'svelte';
    let handleEscape: (e: KeyboardEvent) => void;

    $: if (isMenuOpen) {
        handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') toggleMenu();
        };
        window.addEventListener('keydown', handleEscape);
    } else if (handleEscape) {
        window.removeEventListener('keydown', handleEscape);
    }

    onMount(() => {
        mounted = true;
        return () => {
            if (handleEscape) {
                window.removeEventListener('keydown', handleEscape);
            }
            document.body.classList.remove('menu-open');
        };
    });
</script>

<nav class="navbar navbar-expand-lg fixed-top" class:mounted={mounted}>
    <div class="container">
        <!-- Logo -->
        <a class="navbar-brand" href="/" aria-label="Home">
            <div class="logo-wrapper">
                <img src="/favicon.png" alt="Thomas Barden Logo" class="logo">
                <span class="logo-text d-none d-sm-inline">Thomas</span>
            </div>
        </a>

        <!-- Mobile Toggle -->
        <button class="hamburger-btn" 
                class:active={isMenuOpen} 
                on:click={toggleMenu}
                aria-label="Toggle navigation">
            <span class="hamburger-line"></span>
            <span class="hamburger-line"></span>
            <span class="hamburger-line"></span>
        </button>

        <!-- Navigation Items -->
        <div class="collapse navbar-collapse" class:show={isMenuOpen} id="navbarNav">
            <ul class="navbar-nav ms-auto align-items-center">
                <!-- Nav Links -->
                {#each navItems as { href, label }}
                    <li class="nav-item">
                        <a class="nav-link" {href}>{label}</a>
                    </li>
                {/each}

                <!-- Theme Toggle -->
                <li class="nav-item ms-2">
                    <ThemeToggle />
                </li>

                <!-- Social Links -->
                <li class="nav-item ms-lg-3">
                    <div class="social-links">
                        {#each socialLinks as { href, icon, label }}
                            <a {href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                                <i class="bi {icon}"></i>
                            </a>
                        {/each}
                    </div>
                </li>
            </ul>
        </div>
    </div>
</nav>

<style>
    /* Base Navbar */
    .navbar {
        background: var(--bg-primary);
        backdrop-filter: blur(10px);
        padding: 0.75rem 0;
        border-bottom: 1px solid var(--border-color);
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    .navbar.mounted {
        opacity: 1;
    }

    /* Logo Styles */
    .logo-wrapper {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .logo {
        width: 32px;
        height: 32px;
        border-radius: 8px;
        transition: transform 0.2s ease;
    }

    .logo:hover {
        transform: scale(1.05);
    }

    .logo-text {
        font-weight: 600;
        color: var(--text-primary);
        font-size: 1.1rem;
    }

    /* Navigation Links */
    .nav-link {
        color: var(--text-secondary);
        font-weight: 500;
        padding: 0.5rem 1rem;
        position: relative;
    }

    .nav-link:hover {
        color: var(--accent-color);
    }

    .nav-link::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        width: 0;
        height: 2px;
        background: var(--accent-color);
        transition: all 0.2s ease;
        transform: translateX(-50%);
    }

    .nav-link:hover::after {
        width: 100%;
    }

    /* Social Links */
    .social-links {
        display: flex;
        gap: 1rem;
        padding: 0.5rem 0;
    }

    .social-links a {
        color: var(--text-secondary);
        font-size: 1.2rem;
        transition: color 0.2s ease;
    }

    .social-links a:hover {
        color: var(--accent-color);
    }

    /* Mobile Menu Button */
    .hamburger-btn {
        border: none;
        background: none;
        width: 40px;
        height: 40px;
        padding: 8px;
        display: none;
        position: relative;
    }

    .hamburger-line {
        display: block;
        width: 24px;
        height: 2px;
        background: var(--text-primary);
        margin: 5px 0;
        transition: 0.3s ease;
        transform-origin: center;
    }

    /* Mobile Styles */
    @media (max-width: 991px) {
        .hamburger-btn {
            display: block;
        }

        .hamburger-btn.active .hamburger-line:nth-child(1) {
            transform: translateY(7px) rotate(45deg);
        }

        .hamburger-btn.active .hamburger-line:nth-child(2) {
            opacity: 0;
            transform: scaleX(0);
        }

        .hamburger-btn.active .hamburger-line:nth-child(3) {
            transform: translateY(-7px) rotate(-45deg);
        }

        .navbar-collapse {
            background: var(--bg-primary);
            backdrop-filter: blur(10px);
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            padding: 1rem;
            border-radius: 0 0 1rem 1rem;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            transform-origin: top;
            transform: scaleY(0);
            opacity: 0;
            transition: all 0.3s ease;
        }

        .navbar-collapse.show {
            transform: scaleY(1);
            opacity: 1;
        }

        .social-links {
            justify-content: center;
            margin-top: 1rem;
            padding-top: 1rem;
            border-top: 1px solid var(--border-color);
        }
    }

    /* Mobile Menu Improvements */
    @media (max-width: 991px) {
        .navbar-collapse {
            position: fixed;
            top: 76px;  /* Height of navbar */
            left: 0;
            right: 0;
            bottom: 0;
            background: var(--bg-primary);
            backdrop-filter: blur(10px);
            padding: 2rem;
            transform: translateX(100%);
            opacity: 1;
            transition: transform 0.3s var(--ease-out);
            display: flex;
            flex-direction: column;
            justify-content: center;
        }

        .navbar-collapse.show {
            transform: translateX(0);
        }

        .navbar-nav {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
            text-align: center;
        }

        .nav-item {
            transform: translateX(50px);
            opacity: 0;
            transition: all 0.3s var(--ease-out);
        }

        .navbar-collapse.show .nav-item {
            transform: translateX(0);
            opacity: 1;
        }

        .navbar-collapse.show .nav-item:nth-child(1) { transition-delay: 0.1s; }
        .navbar-collapse.show .nav-item:nth-child(2) { transition-delay: 0.2s; }
        .navbar-collapse.show .nav-item:nth-child(3) { transition-delay: 0.3s; }
        .navbar-collapse.show .nav-item:nth-child(4) { transition-delay: 0.4s; }
        .navbar-collapse.show .nav-item:nth-child(5) { transition-delay: 0.5s; }

        .nav-link {
            font-size: 1.25rem;
            padding: 0.75rem 1.5rem;
        }

        .social-links {
            margin-top: 2rem;
            padding-top: 2rem;
            border-top: 1px solid var(--border-color);
        }

        .hamburger-btn {
            width: 48px;
            height: 48px;
            padding: 12px;
            z-index: 100;
        }

        .hamburger-line {
            height: 2px;
            margin: 6px 0;
            transition: 0.3s var(--ease-bounce);
        }
    }
</style>
