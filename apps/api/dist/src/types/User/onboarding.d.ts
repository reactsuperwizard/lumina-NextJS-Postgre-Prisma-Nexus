import type { Prisma } from '.prisma/client';
export interface Onboarding extends Prisma.UserUpdateInput {
    onboarding?: {
        welcomeEmailSent?: string;
        firstLogin?: string;
    };
}
