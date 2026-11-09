-- CreateTable
CREATE TABLE `admin_users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(120) NOT NULL,
    `passwordHash` VARCHAR(100) NOT NULL,
    `lastLoginAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `admin_users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `content_blocks` (
    `key` VARCHAR(64) NOT NULL,
    `data` JSON NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`key`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `services` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `key` VARCHAR(64) NOT NULL,
    `short` VARCHAR(80) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `text` TEXT NOT NULL,
    `tags` JSON NOT NULL,
    `icon` VARCHAR(32) NOT NULL,
    `href` VARCHAR(191) NOT NULL,
    `features` JSON NOT NULL,
    `pageEyebrow` VARCHAR(120) NOT NULL,
    `pageTitle` VARCHAR(255) NOT NULL,
    `pageText` TEXT NOT NULL,
    `idealFor` VARCHAR(255) NOT NULL,
    `ctaLabel` VARCHAR(80) NOT NULL,
    `secondaryLabel` VARCHAR(80) NOT NULL,
    `tone` VARCHAR(16) NOT NULL,
    `visual` VARCHAR(16) NOT NULL,
    `published` BOOLEAN NOT NULL DEFAULT true,
    `position` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `services_key_key`(`key`),
    INDEX `services_position_idx`(`position`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `projects` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `slug` VARCHAR(120) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `filter` VARCHAR(16) NOT NULL,
    `category` VARCHAR(80) NOT NULL,
    `sector` VARCHAR(120) NOT NULL,
    `text` TEXT NOT NULL,
    `image` VARCHAR(512) NOT NULL,
    `kicker` VARCHAR(191) NOT NULL,
    `summary` TEXT NOT NULL,
    `challenge` TEXT NOT NULL,
    `approach` TEXT NOT NULL,
    `features` JSON NOT NULL,
    `stages` JSON NOT NULL,
    `gallery` JSON NOT NULL,
    `published` BOOLEAN NOT NULL DEFAULT true,
    `position` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `projects_slug_key`(`slug`),
    INDEX `projects_position_idx`(`position`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `posts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `slug` VARCHAR(120) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `category` VARCHAR(80) NOT NULL,
    `excerpt` TEXT NOT NULL,
    `image` VARCHAR(512) NOT NULL,
    `body` MEDIUMTEXT NOT NULL,
    `readTime` VARCHAR(40) NOT NULL,
    `publishedAt` DATETIME(3) NULL,
    `featured` BOOLEAN NOT NULL DEFAULT false,
    `published` BOOLEAN NOT NULL DEFAULT true,
    `position` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `posts_slug_key`(`slug`),
    INDEX `posts_position_idx`(`position`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `trainings` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `slug` VARCHAR(120) NOT NULL,
    `domain` VARCHAR(80) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `text` TEXT NOT NULL,
    `audience` VARCHAR(255) NOT NULL,
    `modules` JSON NOT NULL,
    `formats` JSON NOT NULL,
    `icon` VARCHAR(32) NOT NULL,
    `tone` VARCHAR(16) NOT NULL,
    `duration` VARCHAR(120) NOT NULL,
    `price` VARCHAR(120) NOT NULL,
    `published` BOOLEAN NOT NULL DEFAULT true,
    `position` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `trainings_slug_key`(`slug`),
    INDEX `trainings_position_idx`(`position`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pricing_plans` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `group` VARCHAR(32) NOT NULL,
    `name` VARCHAR(120) NOT NULL,
    `pitch` VARCHAR(255) NOT NULL,
    `price` VARCHAR(40) NULL,
    `unit` VARCHAR(40) NOT NULL,
    `recommended` BOOLEAN NOT NULL DEFAULT false,
    `cta` VARCHAR(80) NOT NULL,
    `features` JSON NOT NULL,
    `published` BOOLEAN NOT NULL DEFAULT true,
    `position` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `pricing_plans_group_position_idx`(`group`, `position`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `faq_items` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `group` VARCHAR(32) NOT NULL,
    `category` VARCHAR(80) NOT NULL,
    `question` VARCHAR(512) NOT NULL,
    `answer` TEXT NOT NULL,
    `published` BOOLEAN NOT NULL DEFAULT true,
    `position` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `faq_items_group_position_idx`(`group`, `position`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `testimonials` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `quote` TEXT NOT NULL,
    `name` VARCHAR(120) NOT NULL,
    `role` VARCHAR(191) NOT NULL,
    `avatar` VARCHAR(512) NOT NULL,
    `rating` INTEGER NOT NULL DEFAULT 5,
    `published` BOOLEAN NOT NULL DEFAULT true,
    `position` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `testimonials_position_idx`(`position`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `team_members` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(120) NOT NULL,
    `role` VARCHAR(191) NOT NULL,
    `image` VARCHAR(512) NOT NULL,
    `published` BOOLEAN NOT NULL DEFAULT true,
    `position` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `team_members_position_idx`(`position`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `quote_requests` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(160) NOT NULL,
    `organisation` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(40) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `message` TEXT NOT NULL,
    `services` JSON NOT NULL,
    `budget` VARCHAR(80) NOT NULL,
    `contactPreference` VARCHAR(40) NOT NULL,
    `status` VARCHAR(16) NOT NULL DEFAULT 'nouveau',
    `notes` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `quote_requests_status_createdAt_idx`(`status`, `createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `training_enrollments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `trainingSlug` VARCHAR(120) NOT NULL,
    `trainingTitle` VARCHAR(191) NOT NULL,
    `format` VARCHAR(40) NOT NULL,
    `name` VARCHAR(160) NOT NULL,
    `phone` VARCHAR(40) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `organisation` VARCHAR(191) NOT NULL,
    `participants` INTEGER NOT NULL DEFAULT 1,
    `message` TEXT NOT NULL,
    `status` VARCHAR(16) NOT NULL DEFAULT 'nouveau',
    `notes` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `training_enrollments_status_createdAt_idx`(`status`, `createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `newsletter_subscribers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `source` VARCHAR(40) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `newsletter_subscribers_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
