// Crée un compte administrateur, ou change le mot de passe d'un compte existant
// (utile en cas de mot de passe oublié) :
//
//   npm run admin:create -- --email vous@fibetech.cd --name "Votre nom"
//
// Le mot de passe est demandé ensuite (10 caractères minimum).

import { createInterface } from 'node:readline/promises'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

try {
  process.loadEnvFile('.env')
} catch {
  // Pas de fichier .env : les variables d'environnement du système sont utilisées.
}

function arg(name: string) {
  const index = process.argv.indexOf(`--${name}`)
  return index > -1 ? (process.argv[index + 1] ?? '') : ''
}

async function main() {
  const rl = createInterface({ input: process.stdin, output: process.stdout })
  const email = (arg('email') || (await rl.question('E-mail : '))).trim().toLowerCase()
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('Adresse e-mail invalide.')

  const prisma = new PrismaClient()
  try {
    const existing = await prisma.adminUser.findUnique({ where: { email } })
    const name = (arg('name') || (existing ? existing.name : await rl.question('Nom : '))).trim() || 'Administrateur'
    const password = arg('password') || (await rl.question('Mot de passe (10 caractères minimum) : '))
    rl.close()
    if (password.length < 10) throw new Error('Le mot de passe doit contenir au moins 10 caractères.')

    const passwordHash = await bcrypt.hash(password, 12)
    if (existing) {
      await prisma.adminUser.update({ where: { id: existing.id }, data: { name, passwordHash } })
      console.log(`✓ Mot de passe de ${email} modifié.`)
    } else {
      await prisma.adminUser.create({ data: { email, name, passwordHash } })
      console.log(`✓ Compte créé pour ${email}. Connexion : /admin/login`)
    }
  } finally {
    await prisma.$disconnect()
  }
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error)
  process.exitCode = 1
})
