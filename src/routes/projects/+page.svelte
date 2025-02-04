<script lang="ts">
    import Nav from '../../components/Nav.svelte';
    import Footer from '../../components/Footer.svelte';
    import { fade, fly } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';
    import { onMount } from 'svelte';
    import { theme } from '$lib/stores/theme';

    let isDark: boolean;
    let mounted = false;

    theme.subscribe(value => {
        isDark = value === 'dark';
    });

    onMount(() => {
        mounted = true;
    });

    const projects = [
        {
            title: 'Personal Portfolio',
            description: 'A modern portfolio website built with SvelteKit and Bootstrap, featuring dark mode and responsive design.',
            longDescription: 'My personal portfolio showcasing my frontend development work. Features include dark mode theming, responsive design, accessibility features, and modern animations. Built with SvelteKit for optimal performance and Bootstrap for rapid UI development.',
            tags: ['SvelteKit', 'Bootstrap', 'TypeScript', 'Responsive Design'],
            githubUrl: 'https://github.com/ctrlthomas/personal-portfolio',
            liveUrl: 'https://thomasbarden.com',
            image: '/projects/portfolio-light.png',
            featured: true,
            year: 2024
        }
    ];
</script>

<div class="page-wrapper" class:mounted>
    <div class="gradient-sphere" class:dark={mounted && isDark} in:fade={{ duration: 1000 }}></div>
    <Nav />
    
    <main class="main-content">
        <div class="container py-5">
            <header class="text-center mb-5" in:fly={{ y: 20, duration: 400 }}>
                <h1 class="display-4 fw-bold mb-3">Projects</h1>
                <p class="lead text-muted max-w-lg mx-auto">
                    A showcase of my development work, focusing on modern web applications and user experiences.
                </p>
            </header>

            <div class="projects-grid">
                {#each projects as project}
                    <article 
                        class="project-card" 
                        in:fly={{ y: 20, duration: 400 }}
                    >
                        <div class="project-image-container">
                            {#if project.image}
                                <img 
                                    src={project.image} 
                                    alt={`Screenshot of ${project.title}`}
                                    class="project-image"
                                    loading="lazy"
                                />
                            {/if}
                            <div class="project-overlay">
                                <div class="project-actions">
                                    {#if project.liveUrl}
                                        <a href={project.liveUrl} 
                                           class="btn btn-primary btn-sm"
                                           target="_blank"
                                           rel="noopener noreferrer">
                                            <i class="bi bi-arrow-up-right-square me-2"></i>
                                            Live Demo
                                        </a>
                                    {/if}
                                    {#if project.githubUrl}
                                        <a href={project.githubUrl}
                                           class="btn btn-dark btn-sm"
                                           target="_blank"
                                           rel="noopener noreferrer">
                                            <i class="bi bi-github me-2"></i>
                                            Source
                                        </a>
                                    {/if}
                                </div>
                            </div>
                        </div>
                        
                        <div class="project-content">
                            <div class="project-header">
                                <h2>{project.title}</h2>
                                {#if project.featured}
                                    <span class="badge bg-primary">Featured</span>
                                {/if}
                            </div>
                            
                            <p class="project-description text-muted">
                                {project.longDescription || project.description}
                            </p>

                            <div class="project-meta">
                                <div class="project-tags">
                                    {#each project.tags as tag}
                                        <span class="project-tag">{tag}</span>
                                    {/each}
                                </div>
                            </div>
                        </div>
                    </article>
                {/each}
            </div>
        </div>
    </main>
    
    <Footer />
</div>

<style>
    /* Keep essential wrapper and layout styles */
    .page-wrapper {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    .page-wrapper.mounted {
        opacity: 1;
    }

    .main-content {
        flex: 1;
        padding-top: 2rem;
    }

    /* Keep gradient styles */
    .gradient-sphere {
        position: fixed;
        top: -20%;
        right: -10%;
        width: 800px;
        height: 800px;
        border-radius: 50%;
        background: radial-gradient(circle at center,
            rgba(51, 153, 255, 0.15),
            rgba(51, 153, 255, 0.05),
            transparent 70%
        );
        filter: blur(60px);
        z-index: -1;
        opacity: 0.15;
    }

    .gradient-sphere.dark {
        opacity: 0.1;
    }

    .max-w-lg {
        max-width: 32rem;
    }

    /* Project card and grid styles */
    .projects-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 3rem;
        margin-top: 2rem;
    }

    .project-card {
        background: var(--bg-secondary);
        border: 1px solid var(--border-color);
        border-radius: 1.5rem;
        overflow: hidden;
        transition: transform 0.3s var(--ease-bounce);
    }

    .project-image-container {
        position: relative;
        aspect-ratio: 16/9;
        overflow: hidden;
        background: var(--bg-primary);
    }

    .project-image {
        width: 100%;
        height: 100%;
        object-fit: contain;
        padding: 1rem;
        transition: transform 0.5s ease;
    }

    .project-overlay {
        position: absolute;
        inset: 0;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    .project-card:hover .project-overlay {
        opacity: 1;
    }

    .project-card:hover .project-image {
        transform: scale(1.02);
    }

    .project-actions {
        display: flex;
        gap: 1rem;
        transform: translateY(20px);
        opacity: 0;
        transition: all 0.3s ease;
    }

    .project-card:hover .project-actions {
        transform: translateY(0);
        opacity: 1;
    }

    .project-content {
        padding: 2rem;
    }

    .project-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
    }

    .project-header h2 {
        font-size: 1.5rem;
        margin: 0;
        background: linear-gradient(135deg, var(--accent-color), #006666);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    .project-description {
        margin-bottom: 1.5rem;
        line-height: 1.6;
    }

    .project-meta {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
    }

    .project-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
    }

    .project-tag {
        background: var(--bg-primary);
        color: var(--text-secondary);
        padding: 0.25rem 0.75rem;
        border-radius: 1rem;
        font-size: 0.85rem;
        border: 1px solid var(--border-color);
    }

    /* Media queries */
    @media (min-width: 992px) {
        .project-card {
            display: grid;
            grid-template-columns: 1.2fr 1fr;
        }

        .project-content {
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
    }

    @media (max-width: 767px) {
        .project-actions {
            flex-direction: column;
            width: 100%;
            padding: 0 1rem;
        }

        .project-actions .btn {
            width: 100%;
        }
    }
</style>
