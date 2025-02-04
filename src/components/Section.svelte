<script lang="ts">
    export let title: string;
    export let subtitle: string | undefined = undefined;
    export let className: string | undefined = undefined;
    export let id: string | undefined = undefined;
</script>

<section {id} class="section {className || ''}" aria-labelledby={id || title.toLowerCase()}>
    <div class="text-center mb-5">
        <h2 id={id || title.toLowerCase()} class="display-6 fw-bold mb-3">{title}</h2>
        {#if subtitle}
            <p class="lead text-muted">{subtitle}</p>
        {/if}
    </div>
    <slot />
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
