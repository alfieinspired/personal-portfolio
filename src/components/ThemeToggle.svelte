<script lang="ts">
    import { theme } from '$lib/stores/theme';
    import { scale } from 'svelte/transition';
    import { bounceOut } from 'svelte/easing';
    
    function toggleTheme() {
        theme.update(t => t === 'light' ? 'dark' : 'light');
    }
</script>

<button class="theme-toggle" on:click={toggleTheme} aria-label="Toggle theme">
    <div class="icon-wrapper">
        {#if $theme === 'light'}
            <i class="bi bi-moon-stars" in:scale={{ duration: 150, easing: bounceOut }}></i>
        {:else}
            <i class="bi bi-sun" in:scale={{ duration: 150, easing: bounceOut }}></i>
        {/if}
    </div>
</button>

<style>
    .theme-toggle {
        background: none;
        border: none;
        color: var(--text-secondary);
        font-size: 1.2rem;
        padding: 0.5rem;
        cursor: pointer;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        border-radius: 8px;
        transition: background-color var(--transition-fast) var(--ease-out);
    }

    .theme-toggle:hover {
        color: var(--accent-color);
        background: var(--bg-secondary);
    }

    .icon-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform 0.5s ease;
    }

    .icon-wrapper i {
        transform-origin: center;
    }

    .theme-toggle:active .icon-wrapper {
        transform: rotate(360deg);
    }
</style>
