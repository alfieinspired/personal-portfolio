<script lang="ts">
    import Section from '../../components/Section.svelte';
    import Nav from '../../components/Nav.svelte';
    import Footer from '../../components/Footer.svelte';
    import { fade, fly } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';
    import { onMount } from 'svelte';
    import { theme } from '$lib/stores/theme';
    import { PUBLIC_GETFORM_ENDPOINT } from '$env/static/public';

    let formData = {
        name: '',
        email: '',
        subject: '',
        message: ''
    };

    let isSubmitting = false;
    let showSuccess = false;
    let showError = false;
    let isDark: boolean;
    let mounted = false;

    theme.subscribe(value => {
        isDark = value === 'dark';
    });

    onMount(() => {
        mounted = true;
    });

    const handleSubmit = async (e: SubmitEvent): Promise<void> => {
        e.preventDefault();
        isSubmitting = true;
        showError = false;
        
        try {
            const response = await fetch(PUBLIC_GETFORM_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) throw new Error('Form submission failed');
            
            showSuccess = true;
            formData = { name: '', email: '', subject: '', message: '' };
            
        } catch (error) {
            console.error('Form submission error:', error);
            showError = true;
        } finally {
            isSubmitting = false;
        }
    };

    const resetForm = () => {
        showSuccess = false;
        formData = { name: '', email: '', subject: '', message: '' };
    };
</script>

<div class="page-wrapper" class:mounted={mounted}>
    <div class="gradient-sphere" class:dark={mounted && isDark} in:fade={{ duration: 1000 }}></div>
    <div class="gradient-sphere secondary" class:dark={mounted && isDark} in:fade={{ duration: 1000, delay: 200 }}></div>
    
    <Nav />
    <main class="main-content" aria-label="Contact page">
        <div class="container py-5">
            <div class="row justify-content-center mb-5">
                <div class="col-lg-8 text-center">
                    <span class="badge rounded-pill bg-primary-subtle text-primary mb-3">Available for Projects</span>
                    <h1 class="display-5 fw-bold gradient-heading mb-3">Get in Touch</h1>
                    <p class="lead text-muted">I specialize in building modern web applications with a focus on user experience and performance.</p>
                </div>
            </div>

            <div class="row justify-content-center">
                <div class="col-lg-8">
                    <div class="info-cards mb-5">
                        <div class="row g-4">
                            <div class="col-md-6">
                                <div class="info-card">
                                    <div class="info-card-icon">
                                        <i class="bi bi-code-square"></i>
                                    </div>
                                    <h3>Development Services</h3>
                                    <ul class="info-list">
                                        <li>Web Applications</li>
                                        <li>Frontend Development</li>
                                        <li>Responsive Design</li>
                                        <li>Performance Optimization</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="info-card">
                                    <div class="info-card-icon">
                                        <i class="bi bi-clock-history"></i>
                                    </div>
                                    <h3>Project Timeline</h3>
                                    <ul class="info-list">
                                        <li>Quick Response (24h)</li>
                                        <li>Regular Updates</li>
                                        <li>Flexible Schedule</li>
                                        <li>Remote Collaboration</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="contact-card">
                        {#if showSuccess}
                            <div class="success-screen" in:fly={{ y: 20, duration: 400 }}>
                                <div class="success-icon">
                                    <i class="bi bi-check-circle-fill"></i>
                                </div>
                                <h2>Message Sent!</h2>
                                <p class="text-muted">Thank you for reaching out. I'll get back to you within 24 hours.</p>
                                <div class="success-details">
                                    <div class="success-detail-item">
                                        <i class="bi bi-envelope-check"></i>
                                        <span>Confirmation sent to: <strong>{formData.email}</strong></span>
                                    </div>
                                    <div class="success-detail-item">
                                        <i class="bi bi-clock"></i>
                                        <span>Expected response time: <strong>24 hours</strong></span>
                                    </div>
                                </div>
                                <button class="btn btn-primary mt-4" on:click={resetForm}>
                                    Send Another Message
                                    <i class="bi bi-plus-circle ms-2"></i>
                                </button>
                            </div>
                        {:else}
                            <div class="contact-card-header">
                                <h2>Send a Message</h2>
                                <p class="text-muted">Fill out the form below and I'll get back to you within 24 hours.</p>
                            </div>
                            <form on:submit={handleSubmit} aria-label="Contact form">
                                <div class="row g-3">
                                    <div class="col-md-6">
                                        <label for="name" class="visually-hidden">Your name</label>
                                        <input 
                                            id="name"
                                            type="text" 
                                            class="form-control"
                                            bind:value={formData.name}
                                            required
                                            placeholder="Your name"
                                            disabled={isSubmitting}
                                            aria-label="Your name"
                                        />
                                    </div>
                                    <div class="col-md-6">
                                        <label for="email" class="visually-hidden">Your email</label>
                                        <input 
                                            id="email"
                                            type="email" 
                                            class="form-control"
                                            bind:value={formData.email}
                                            required
                                            placeholder="Your email"
                                            disabled={isSubmitting}
                                            aria-label="Your email"
                                        />
                                    </div>
                                    <div class="col-12">
                                        <label for="subject" class="visually-hidden">Project type</label>
                                        <select 
                                            id="subject"
                                            class="form-select"
                                            bind:value={formData.subject}
                                            required
                                            disabled={isSubmitting}
                                            aria-label="Select project type">
                                            <option value="">Select project type</option>
                                            <option value="Web Application">Web Application</option>
                                            <option value="Frontend Development">Frontend Development</option>
                                            <option value="Consulting">Consulting</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                    <div class="col-12">
                                        <label for="message" class="visually-hidden">Project details</label>
                                        <textarea 
                                            id="message"
                                            class="form-control"
                                            bind:value={formData.message}
                                            required
                                            placeholder="Project details..."
                                            rows="3"
                                            disabled={isSubmitting}
                                            aria-label="Project details"
                                        ></textarea>
                                    </div>
                                </div>

                                {#if showSuccess || showError}
                                    <div class="alert mt-3" 
                                         class:alert-success={showSuccess} 
                                         class:alert-danger={showError}
                                         role="alert"
                                         aria-live="polite">
                                        <i class="bi {showSuccess ? 'bi-check-circle' : 'bi-exclamation-circle'} me-2"></i>
                                        {showSuccess ? 'Message sent successfully!' : 'Failed to send message. Please try again.'}
                                    </div>
                                {/if}

                                <div class="d-flex align-items-center justify-content-between mt-4">
                                    <div class="contact-info">
                                        <a href="mailto:thomas@thomasbarden.com" class="contact-link">
                                            <i class="bi bi-envelope me-2"></i>
                                            thomas@thomasbarden.com
                                        </a>
                                    </div>
                                    <button 
                                        type="submit" 
                                        class="btn btn-primary" 
                                        disabled={isSubmitting}>
                                        {#if isSubmitting}
                                            <div class="spinner-border spinner-border-sm me-2"></div>
                                            Sending...
                                        {:else}
                                            Send Message
                                            <i class="bi bi-arrow-right ms-2"></i>
                                        {/if}
                                    </button>
                                </div>
                            </form>
                        {/if}
                    </div>
                </div>
            </div>
        </div>
    </main>
    <Footer />
</div>

<style>
    .page-wrapper {
        position: relative;
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
        padding-top: 76px;
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
        transition: opacity 0.3s ease;
    }

    .gradient-sphere.dark {
        opacity: 0.1;
    }

    .gradient-sphere.secondary {
        top: 40%;
        left: -15%;
        width: 600px;
        height: 600px;
        background: radial-gradient(circle at center,
            rgba(102, 51, 255, 0.1),
            rgba(102, 51, 255, 0.03),
            transparent 70%
        );
    }

    .info-card {
        background: var(--bg-secondary);
        border: 1px solid var(--border-color);
        border-radius: 1rem;
        padding: 1.5rem;
        height: 100%;
    }

    .info-card-icon {
        width: 48px;
        height: 48px;
        background: var(--accent-color-transparent);
        color: var(--accent-color);
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        margin-bottom: 1rem;
    }

    .info-list {
        list-style: none;
        padding: 0;
        margin: 0;
        color: var(--text-secondary);
    }

    .info-list li {
        padding: 0.5rem 0;
        border-bottom: 1px solid var(--border-color);
        font-size: 0.95rem;
    }

    .info-list li:last-child {
        border-bottom: none;
    }

    .contact-card {
        background: var(--bg-secondary);
        border: 1px solid var(--border-color);
        border-radius: 1rem;
        padding: 2rem;
    }

    .contact-card-header {
        text-align: center;
        margin-bottom: 2rem;
    }

    .contact-link {
        color: var(--text-secondary);
        text-decoration: none;
        font-size: 0.95rem;
        transition: color 0.2s ease;
    }

    .contact-link:hover {
        color: var(--accent-color);
    }

    /* Global styles for form elements */
    :global(.form-control),
    :global(.form-select) {
        padding: 0.75rem 1rem;
        border-radius: 0.75rem;
        border: 1px solid var(--border-color);
        background: var(--bg-primary);
        color: var(--text-primary);
        font-size: 0.95rem;
    }

    :global(.form-control:focus),
    :global(.form-select:focus) {
        border-color: var(--accent-color);
        box-shadow: 0 0 0 3px var(--accent-color-transparent);
    }

    :global(.btn-primary) {
        padding: 0.875rem;
        border-radius: 0.75rem;
        background: var(--accent-color);
        border: none;
        transition: all 0.3s var(--ease-bounce);
    }

    :global(.btn-primary:hover:not(:disabled)) {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(51, 153, 255, 0.25);
    }

    @media (max-width: 768px) {
        .contact-card {
            padding: 1.5rem;
        }
    }

    .success-screen {
        text-align: center;
        padding: 2rem;
    }

    .success-icon {
        width: 80px;
        height: 80px;
        background: var(--accent-color-transparent);
        color: var (--accent-color);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2.5rem;
        margin: 0 auto 1.5rem;
        animation: scaleIn 0.5s var(--ease-bounce) forwards;
    }

    .success-details {
        margin-top: 2rem;
        padding: 1.5rem;
        background: var(--bg-primary);
        border-radius: 1rem;
        border: 1px solid var(--border-color);
    }

    .success-detail-item {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.75rem;
        color: var(--text-secondary);
    }

    .success-detail-item:not(:last-child) {
        border-bottom: 1px solid var(--border-color);
    }

    .success-detail-item i {
        color: var(--accent-color);
        font-size: 1.25rem;
    }

    @keyframes scaleIn {
        from {
            transform: scale(0.8);
            opacity: 0;
        }
        to {
            transform: scale(1);
            opacity: 1;
        }
    }
</style>
