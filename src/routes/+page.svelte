<script>
    // Remove or update the app.css import
    // import '../app.css';
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

    const experiences = [
        {
            role: "Frontend Development Student",
            company: "Meta & Coursera",
            period: "2025 - Present",
            description: "Studying advanced frontend development through Meta's professional certification program, focusing on modern web technologies and best practices.",
            skills: ["React", "JavaScript", "UI/UX", "Web APIs"]
        },
        {
            role: "Freelance Developer",
            company: "Self-employed",
            period: "2023 - Present",
            description: "Building custom web solutions for clients using modern web technologies.",
            skills: ["SvelteKit", "Bootstrap", "REST APIs", "Git"]
        }
    ];
</script>

<div class="page-wrapper">
    <div class="gradient-blob" in:fade={{ duration: 1000 }}></div>
    <Nav />
    <main class="main-content container py-5" aria-label="Portfolio content">
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
                       class="btn btn-lg project-btn"
                       on:mouseenter={() => isHovered = true}
                       on:mouseleave={() => isHovered = false}>
                        <span>View Projects</span>
                        <i class="bi bi-arrow-right ms-2" class:active={isHovered}></i>
                    </a>
                    <a href="https://github.com/ctrlthomas" class="btn btn-outline btn-lg">
                        <i class="bi bi-github me-2"></i>
                        <span>GitHub</span>
                    </a>
                </div>
            </div>
        </Section>

        <Section title="Projects" id="projects">
            <div class="projects-grid" role="list" aria-label="Project list">
                {#each projects as project, i}
                    <div class="project-card"
                         role="listitem"
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
                                <a href={project.githubUrl} 
                                   class="project-link" 
                                   target="_blank" 
                                   rel="noopener noreferrer"
                                   aria-label="View source code for {project.title} on GitHub">
                                    <i class="bi bi-github" aria-hidden="true"></i>
                                    <span>View Source</span>
                                </a>
                            {/if}
                        </div>
                    </div>
                {/each}
            </div>
        </Section>

        <Section title="Experience">
            <div class="experience-grid" role="list" aria-label="Work experience">
                {#each experiences as exp}
                    <div class="experience-card" role="listitem"
                         in:fly={{ y: 20, duration: 400 }}>
                        <div class="experience-header">
                            <h3>{exp.role}</h3>
                            <span class="experience-period">{exp.period}</span>
                        </div>
                        <div class="experience-company">{exp.company}</div>
                        <p class="text-muted">{exp.description}</p>
                        <div class="experience-skills">
                            {#each exp.skills as skill}
                                <span class="experience-skill">{skill}</span>
                            {/each}
                        </div>
                    </div>
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

    .hero-buttons .btn {
        padding: 0.75rem 1.5rem;
        font-size: 1rem;
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        transition: all 0.3s var(--ease-bounce);
    }

    .hero-buttons .project-btn {
        background: var(--accent-color);
        color: white;
        border: none;
    }

    .hero-buttons .project-btn:hover {
        background: var(--accent-color);
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 102, 204, 0.25);
    }

    .hero-buttons .btn-outline {
        color: var(--text-primary);
        border: 1px solid var(--border-color);
        background: transparent;
    }

    .hero-buttons .btn-outline:hover {
        background: var(--bg-secondary);
        transform: translateY(-2px);
    }

    .hero-buttons i {
        transition: transform 0.3s ease;
    }

    .hero-buttons i.active {
        transform: translateX(4px);
    }

    @media (max-width: 576px) {
        .hero-buttons {
            flex-direction: column;
        }
        
        .hero-buttons .btn {
            width: 100%;
            justify-content: center;
            margin: 0.5rem 0;
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

    .experience-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1.5rem;
        margin-top: 1rem;
        list-style: none;
        padding: 0;
    }

    .experience-card {
        background: var(--bg-secondary);
        border: 1px solid var(--border-color);
        border-radius: 1rem;
        padding: 1.5rem;
        transition: transform 0.3s var(--ease-bounce);
        height: 100%; /* Ensure equal height */
    }

    .experience-card:hover {
        transform: translateY(-2px);
    }

    .experience-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.5rem;
    }

    .experience-header h3 {
        font-size: 1.25rem;
        margin: 0;
    }

    .experience-period {
        font-size: 0.9rem;
        color: var(--text-secondary);
    }

    .experience-company {
        color: var(--accent-color);
        font-weight: 500;
        margin-bottom: 1rem;
    }

    .experience-skills {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-top: 1rem;
    }

    .experience-skill {
        background: var(--bg-primary);
        color: var(--text-secondary);
        padding: 0.25rem 0.75rem;
        border-radius: 1rem;
        font-size: 0.85rem;
        border: 1px solid var(--border-color);
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

    .hero-buttons a {
        transition: transform 0.2s var(--animation-easing),
                   background-color 0.2s var(--animation-easing);
    }

    /* Ensure proper spacing below navbar */
    .main-content {
        padding-top: 5rem; /* Increase padding to prevent overlap */
    }

    /* Add space between sections */
    :global(.section) {
        margin-top: 2rem;
        margin-bottom: 4rem;
    }

    :global(.section:first-child) {
        margin-top: 3rem; /* Extra space for first section */
    }
</style>