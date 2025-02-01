<script>
    export let title;
    export let subtitle = '';
    export let className = '';
</script>

<section class="section {className}">
    <div class="section-header text-center mb-4">
        <h2 class="display-6 fw-bold mb-2" style="color: var(--text-primary)">{title}</h2>
        {#if subtitle}
            <p class="text-muted h5 fw-normal">{subtitle}</p>
        {/if}
    </div>
    
    <div class="section-content">
        <slot></slot>
    </div>
</section>

<style>
    .section {
        max-width: 800px;
        margin: 0 auto 4rem;
        padding: 0 1rem;
    }

    .section:last-child {
        margin-bottom: 0;
    }
</style>
