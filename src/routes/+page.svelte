<script>
    import '../app.css';
    import Nav from '../components/Nav.svelte';
    import Footer from '../components/Footer.svelte';
    import Section from '../components/Section.svelte';
    import TechStack from '../components/TechStack.svelte';
    import { fly, fade } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';
    
    let isHovered = false;

    const projects = [
        {
            title: 'Personal Portfolio',
            description: 'A modern portfolio website built with SvelteKit and Bootstrap, featuring dark mode and responsive design.',
            tags: ['SvelteKit', 'Bootstrap', 'TypeScript'],
            githubUrl: 'https://github.com/ctrlthomas/personal-portfolio',
            isLatest: true
        }
        // Add more projects here
    ];

    const contactLinks = [
        {
            href: "mailto:thomas@thomasbarden.com",
            icon: "bi-envelope-fill",
            label: "Email",
            description: "Get in touch via email"
        },
        {
            href: "https://github.com/ctrlthomas",
            icon: "bi-github",
            label: "GitHub",
            description: "Check out my code",
            isExternal: true
        }
    ];
</script>

<div class="page-wrapper">
    <div class="gradient-blob" in:fade={{ duration: 1000 }}></div>
    <Nav />
    <main class="container py-5">
        <Section title="Thomas Barden" subtitle="Frontend Developer" className="hero-section">
            <div class="hero-content" in:fly={{ y: 20, duration: 600, delay: 200 }}>
                <p class="lead text-center mb-4">
                    Hi! I'm a frontend-focused software engineering student passionate about creating beautiful, 
                    responsive, and user-friendly web applications. I enjoy turning complex problems into simple, 
                    beautiful, and intuitive solutions.
                </p>
                <div class="mb-4">
                    <TechStack />
                </div>
                <div class="hero-buttons">
                    <a href="#projects" 
                       class="btn btn-primary btn-lg project-btn"
                       on:mouseenter={() => isHovered = true}
                       on:mouseleave={() => isHovered = false}>
                        View Projects
                        <div class="btn-icon" class:active={isHovered}>
                            <i class="bi bi-arrow-right"></i>
                        </div>
                    </a>
                    <a href="https://github.com/ctrlthomas" class="btn btn-outline-dark btn-lg ms-3">
                        <i class="bi bi-github me-2"></i>GitHub
                    </a>
                </div>
            </div>
        </Section>

        <Section title="Projects">
            <div class="projects-grid">
                {#each projects as project, i}
                    <div class="project-card"
                         in:fly={{ y: 20, duration: 400, delay: 150 * i }}>
                        <div class="project-header">
                            <h3>{project.title}</h3>
                            {#if project.isLatest}
                                <span class="badge bg-primary">Latest</span>
                            {/if}
                        </div>
                        <p class="text-muted project-description">{project.description}</p>
                        <div class="project-tags">
                            {#each project.tags as tag}
                                <span class="project-tag">{tag}</span>
                            {/each}
                        </div>
                        <div class="project-links">
                            {#if project.githubUrl}
                                <a href={project.githubUrl} class="project-link" target="_blank" rel="noopener noreferrer">
                                    <i class="bi bi-github"></i>
                                    <span>View Source</span>
                                </a>
                            {/if}
                        </div>
                    </div>
                {/each}
            </div>
        </Section>

        <Section title="Contact">
            <div class="contact-grid">
                {#each contactLinks as link}
                    <a href={link.href} 
                       class="contact-item"
                       target={link.isExternal ? "_blank" : undefined}
                       rel={link.isExternal ? "noopener noreferrer" : undefined}>
                        <div class="contact-icon">
                            <i class="bi {link.icon}"></i>
                        </div>
                        <div class="contact-info">
                            <h4>{link.label}</h4>
                            <p>{link.description}</p>
                        </div>
                        <i class="bi bi-arrow-right contact-arrow"></i>
                    </a>
                {/each}
            </div>
        </Section>
    </main>
    <Footer />
</div>

<style>
    .page-wrapper {
        position: relative;
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }

    .gradient-blob {
        position: fixed;
        top: -10%;  /* Moved up slightly */
        right: -5%;  /* Moved more towards center */
        width: 1000px;  /* Increased size */
        height: 1000px;  /* Increased size */
        border-radius: 50%;
        background: radial-gradient(circle at center, 
            rgba(0, 102, 204, 0.25),  /* Increased opacity */
            rgba(0, 102, 102, 0.15),  /* Increased opacity */
            rgba(255, 255, 255, 0)
        );
        filter: blur(100px);  /* Increased blur */
        z-index: -1;
    }

    .hero-content {
        max-width: 600px;
        margin: 0 auto;
        position: relative;
    }

    .hero-buttons {
        display: flex;
        justify-content: center;
        gap: 1rem;
        margin-top: 2rem;
    }

    @media (max-width: 576px) {
        .hero-buttons {
            flex-direction: column;
        }
        
        .hero-buttons .btn {
            width: 100%;
            margin: 0.5rem 0 !important;
        }
    }

    .projects-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1.5rem;
        margin-top: 1rem;
    }

    .project-card {
        padding: 1.5rem;
        background: var(--bg-secondary);
        border-radius: 1rem;
        transition: all 0.3s ease;
        border: 1px solid var(--border-color);
    }

    .project-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }

    .project-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
    }

    .project-description {
        margin-bottom: 1rem;
        line-height: 1.6;
    }

    .project-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-bottom: 1rem;
    }

    .project-tag {
        background: var(--bg-primary);
        color: var(--text-secondary);
        padding: 0.25rem 0.75rem;
        border-radius: 1rem;
        font-size: 0.85rem;
        border: 1px solid var(--border-color);
    }

    .project-links {
        display: flex;
        gap: 1rem;
    }

    .project-link {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        color: var(--text-secondary);
        text-decoration: none;
        transition: color 0.2s ease;
    }

    .project-link:hover {
        color: var(--accent-color);
    }

    .contact-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1rem;
    }

    .contact-item {
        display: grid;
        grid-template-columns: auto 1fr auto;
        align-items: center;
        gap: 1rem;
        padding: 1.5rem;
        background: var(--bg-secondary);
        border-radius: 1rem;
        color: var(--text-primary);
        text-decoration: none;
        transition: all 0.3s ease;
        border: 1px solid var(--border-color);
    }

    .contact-item:hover {
        transform: translateY(-2px);
        background: var(--accent-color);
        color: white;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    .contact-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 48px;
        height: 48px;
        background: var(--bg-primary);
        border-radius: 12px;
        font-size: 1.5rem;
        transition: all 0.3s ease;
    }

    .contact-info h4 {
        font-size: 1.1rem;
        margin: 0;
    }

    .contact-info p {
        margin: 0;
        font-size: 0.9rem;
        opacity: 0.8;
    }

    .contact-arrow {
        opacity: 0;
        transform: translateX(-10px);
        transition: all 0.3s ease;
    }

    .contact-item:hover .contact-arrow {
        opacity: 1;
        transform: translateX(0);
    }

    .contact-item:hover .contact-icon {
        background: rgba(255, 255, 255, 0.2);
    }

    .badge {
        transition: all 0.2s ease;
    }

    .badge:hover {
        transform: translateY(-2px);
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .project-btn {
        display: inline-flex;
        align-items: center;
        gap: 0.75rem;
    }

    .btn-icon {
        transition: transform 0.3s ease;
    }

    .btn-icon.active {
        transform: translateX(4px);
    }

    @media (max-width: 576px) {
        .project-btn {
            justify-content: center;
        }
    }

    .hero-buttons a {
        transition: transform 0.2s var(--animation-easing),
                    background-color 0.2s var(--animation-easing);
    }
</style>