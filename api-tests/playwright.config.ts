import { defineConfig } from '@playwright/test'

export default defineConfig({
    testDir: './suites',

    reporter: [
        ['html', {
            outputFolder: 'playwright-report',
            open: 'never'
        }]
    ],

    use:{
        baseURL: 'http://localhost:4000/'
    }
});