import { defineConfig } from '@playwright/test'

export default defineConfig({
    testDir: './cases',
    use:{
        baseURL: 'http://localhost:4000/'
    }
});