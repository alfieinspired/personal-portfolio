import { writable } from 'svelte/store';
import { browser } from '$app/environment';

function createThemeStore() {
    const { subscribe, set } = writable(browser ? localStorage.getItem('theme') || 'light' : 'light');

    return {
        subscribe,
        set: (value: string) => {
            if (browser) {
                localStorage.setItem('theme', value);
                document.documentElement.setAttribute('data-theme', value);
            }
            set(value);
        },
        toggle: () => {
            if (browser) {
                const current = localStorage.getItem('theme') || 'light';
                const next = current === 'light' ? 'dark' : 'light';
                localStorage.setItem('theme', next);
                document.documentElement.setAttribute('data-theme', next);
                set(next);
            }
        }
    };
}

export const theme = createThemeStore();
