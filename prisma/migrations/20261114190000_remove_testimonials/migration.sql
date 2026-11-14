-- Suppression des témoignages (section retirée de la page d'accueil et de l'admin)

-- DropTable
DROP TABLE `testimonials`;

-- Retire l'ancienne section « témoignages » du texte enregistré de la page d'accueil
UPDATE `content_blocks` SET `data` = JSON_REMOVE(`data`, '$.testimonials') WHERE `key` = 'home' AND JSON_CONTAINS_PATH(`data`, 'one', '$.testimonials');
