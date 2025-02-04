<script lang="ts">
    import { page } from '$app/stores';
    import Nav from '../components/Nav.svelte';
    import Footer from '../components/Footer.svelte';
    import { fade, fly } from 'svelte/transition';
</script>

<div class="page-wrapper">
    <div class="gradient-sphere" in:fade={{ duration: 1000 }}></div>
    <Nav />
    
    <main class="main-content">
        <div class="container py-5 text-center">
            <div class="error-content" in:fly={{ y: 20, duration: 400 }}>
                <div class="error-code">{$page.status}</div>
                <h1 class="error-title mb-4">{$page.error?.message || 'Page not found'}</h1>
                <p class="lead text-muted mb-4">
                    {#if $page.status === 404}
                        The page you're looking for doesn't exist or has been moved.
                    {:else}
                        An unexpected error occurred while loading this page.
                    {/if}
                </p>
                <div class="error-actions">
                    <a href="/" class="btn btn-primary">
                        <i class="bi bi-house-door me-2"></i>
                        Back to Home
                    </a>
                    <a href="/contact" class="btn btn-outline">
                        <i class="bi bi-envelope me-2"></i>
                        Contact Support
                    </a>
                </div>
            </div>
        </div>
    </main>
    
    <Footer />
</div>

<style>
    .page-wrapper {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
    }

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

    .main-content {
        flex: 1;
        display: flex;
        align-items: center;
    }

    .error-content {
        max-width: 600px;
        margin: 0 auto;
        padding: 2rem;
    }

    .error-code {
        font-size: 6rem;
        font-weight: 700;
        line-height: 1;
        margin-bottom: 1rem;
        background: linear-gradient(135deg, var(--accent-color), #006666);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    .error-title {
        font-size: 2rem;
        margin-bottom: 1rem;
    }

    .error-actions {
        display: flex;
        gap: 1rem;
        justify-content: center;
    }

    .btn {
        display: inline-flex;
        align-items: center;
        padding: 0.75rem 1.5rem;
        border-radius: 0.75rem;
        transition: all 0.3s var(--ease-bounce);
    }

    .btn-outline {
        color: var(--text-primary);
        border: 1px solid var(--border-color);
        background: transparent;
    }

    .btn:hover {
        transform: translateY(-2px);
    }

    .btn-primary:hover {
        box-shadow: 0 4px 12px rgba(0, 102, 204, 0.25);
    }

    .btn-outline:hover {
        background: var(--bg-secondary);
    }

    @media (max-width: 576px) {
        .error-actions {
            flex-direction: column;
        }

        .error-code {
            font-size: 4rem;
        }

        .error-title {
            font-size: 1.5rem;
        }
    }
</style>
