-- Présentation et e-mail des membres de l'équipe (fenêtre de détails de la page À propos).
-- Les lignes existantes reçoivent une présentation et un e-mail vides.
ALTER TABLE `team_members` ADD COLUMN `bio` TEXT NOT NULL,
    ADD COLUMN `email` VARCHAR(191) NOT NULL DEFAULT '';
