<script lang="ts">
    import { inject as injectAnalytics } from '@vercel/analytics';
    import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
    import '../app.css';
    
    injectAnalytics();
    injectSpeedInsights();
</script>

<slot />
