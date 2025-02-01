<script>
    import { onMount } from 'svelte';

    const techStack = [
        { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
        { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
        { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
        { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
        { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
        { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' }
    ];

    let scrolling = false;
    onMount(() => {
        setTimeout(() => {
            scrolling = true;
        }, 100);
    });
</script>

<div class="tech-scroll">
    <div class="scroll-wrapper">
        <div class="scroll-content" class:scrolling style="--scroll-speed: {20 + techStack.length * 2}s">
            {#each [...techStack, ...techStack] as tech}
                <div class="tech-item">
                    <img src={tech.icon} alt={tech.name} loading="lazy" />
                </div>
            {/each}
        </div>
    </div>
</div>

<style>
    .tech-scroll {
        width: 100%;
        overflow: hidden;
        position: relative;
        padding: 1rem 0;
        mask-image: linear-gradient(
            90deg,
            transparent,
            #000 15%,
            #000 85%,
            transparent
        );
        -webkit-mask-image: linear-gradient(
            90deg,
            transparent,
            #000 15%,
            #000 85%,
            transparent
        );
    }

    .scroll-wrapper {
        display: flex;
        width: fit-content;
    }

    .scroll-content {
        display: flex;
        gap: 4rem;
        padding: 0 4rem;
        transform: translateX(0);
        opacity: 0.4;
        transition: opacity 0.3s ease;
    }

    .scroll-content.scrolling {
        animation: scroll var(--scroll-speed) linear infinite;
        opacity: 1;
    }

    .tech-item {
        display: flex;
        align-items: center;
        opacity: 0.8;
        transition: opacity 0.3s ease;
    }

    .tech-item img {
        width: 44px;
        height: 44px;
    }

    @keyframes scroll {
        from { transform: translateX(0); }
        to { transform: translateX(-50%); }
    }

    @media (prefers-reduced-motion: reduce) {
        .scroll-content {
            animation: none;
            transform: translateX(0);
        }
    }
</style>
