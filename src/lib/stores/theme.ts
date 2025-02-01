import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const storedTheme = browser ? window.localStorage.getItem('theme') : null;
const defaultTheme = (storedTheme === 'dark' || storedTheme === 'light') ? storedTheme : 'light';
export const theme = writable<'light' | 'dark'>(defaultTheme);

// Optimize theme changes
if (browser) {
    const style = document.documentElement.style;
    theme.subscribe((value) => {
        requestAnimationFrame(() => {
            window.localStorage.setItem('theme', value);
            document.documentElement.setAttribute('data-theme', value);
        });
    });
}
