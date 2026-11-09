// Remplit la base avec les contenus actuels du site.
//   npm run db:seed
// Sans danger à relancer : seuls les contenus absents sont ajoutés, rien n'est écrasé.
// Crée aussi le premier compte administrateur (ADMIN_EMAIL / ADMIN_PASSWORD du fichier .env)
// s'il n'existe encore aucun compte.

import { PrismaClient, type Prisma } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { blockDefaults } from '../src/content/blocks'
import { faqData, postsData, pricingPlansData, projectsData, servicesData, teamData, testimonialsData, trainingsData } from '../src/content/collections-data'

try {
  process.loadEnvFile('.env')
} catch {
  // Pas de fichier .env : les variables d'environnement du système sont utilisées.
}

const prisma = new PrismaClient()

const withPosition = <T extends object>(items: T[]) => items.map((item, index) => ({ ...item, position: index + 1 }))

async function seedTable(label: string, count: () => Promise<number>, insert: () => Promise<unknown>, items = 1) {
  if (!items) {
    console.log(`  · ${label} : vide, à remplir depuis l’admin`)
    return
  }
  if ((await count()) > 0) {
    console.log(`  · ${label} : déjà rempli, inchangé`)
    return
  }
  await insert()
  console.log(`  ✓ ${label} : contenus ajoutés`)
}

async function main() {
  console.log('Textes des pages')
  for (const [key, data] of Object.entries(blockDefaults)) {
    const exists = await prisma.contentBlock.findUnique({ where: { key }, select: { key: true } })
    if (exists) continue
    await prisma.contentBlock.create({ data: { key, data: data as unknown as Prisma.InputJsonValue } })
    console.log(`  ✓ ${key}`)
  }

  console.log('Listes')
  await seedTable('Services', () => prisma.service.count(), () => prisma.service.createMany({ data: withPosition(servicesData) }))
  await seedTable('Réalisations', () => prisma.project.count(), () => prisma.project.createMany({ data: withPosition(projectsData) }), projectsData.length)
  await seedTable(
    'Articles',
    () => prisma.post.count(),
    () => prisma.post.createMany({ data: withPosition(postsData.map((p) => ({ ...p, publishedAt: p.publishedAt ? new Date(`${p.publishedAt}T12:00:00Z`) : null }))) }),
    postsData.length,
  )
  await seedTable('Formations', () => prisma.training.count(), () => prisma.training.createMany({ data: withPosition(trainingsData) }))
  await seedTable('Formules de prix', () => prisma.pricingPlan.count(), () => prisma.pricingPlan.createMany({ data: withPosition(pricingPlansData) }))
  await seedTable('FAQ', () => prisma.faqItem.count(), () => prisma.faqItem.createMany({ data: withPosition(faqData) }))
  await seedTable('Témoignages', () => prisma.testimonial.count(), () => prisma.testimonial.createMany({ data: withPosition(testimonialsData) }))
  await seedTable('Équipe', () => prisma.teamMember.count(), () => prisma.teamMember.createMany({ data: withPosition(teamData) }))

  console.log('Compte administrateur')
  if ((await prisma.adminUser.count()) > 0) {
    console.log('  · un compte existe déjà, inchangé')
    return
  }
  const email = (process.env.ADMIN_EMAIL ?? '').trim().toLowerCase()
  const password = process.env.ADMIN_PASSWORD ?? ''
  const name = (process.env.ADMIN_NAME ?? 'Administrateur').trim() || 'Administrateur'
  if (!email || password.length < 10 || password === 'choisissez-un-mot-de-passe-solide') {
    console.log('  ! Aucun compte créé : renseignez ADMIN_EMAIL et ADMIN_PASSWORD (10 caractères minimum) dans .env,')
    console.log('    puis relancez `npm run db:seed`, ou utilisez `npm run admin:create`.')
    return
  }
  await prisma.adminUser.create({ data: { email, name, passwordHash: await bcrypt.hash(password, 12) } })
  console.log(`  ✓ compte créé pour ${email}`)
  console.log('    Pensez à retirer ADMIN_PASSWORD du fichier .env une fois connecté.')
}

main()
  .catch((error) => {
    console.error(error)
    process.exitCode = 1
  })
  .finally(() => prisma.$disconnect())
