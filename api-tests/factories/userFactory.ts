import { randomUUID } from "crypto";

export function generateUniqueEmail(): string {
    return `user_${randomUUID()}@example.com`
}