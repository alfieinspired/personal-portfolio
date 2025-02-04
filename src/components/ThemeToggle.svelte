<script lang="ts">
    import { theme } from '$lib/stores/theme';
    
    let currentTheme: string;
    
    theme.subscribe(value => {
        currentTheme = value;
    });
    
    function toggleTheme() {
        theme.toggle();
    }
</script>

<button class="theme-toggle" on:click={toggleTheme} aria-label="Toggle theme">
    {#if currentTheme === 'dark'}
        <i class="bi bi-sun-fill"></i>
    {:else}
        <i class="bi bi-moon-fill"></i>
    {/if}
</button>

<style>
    .theme-toggle {
        background: none;
        border: none;
        color: var(--text-secondary);
        font-size: 1.2rem;
        padding: 0.5rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        border-radius: 8px;
        transition: all 0.2s ease;
    }

    .theme-toggle:hover {
        color: var(--accent-color);
        background: var(--bg-secondary);
    }

    .theme-toggle:active i {
        transform: rotate(360deg);
    }

    .theme-toggle i {
        transition: transform 0.5s ease;
    }
</style>
