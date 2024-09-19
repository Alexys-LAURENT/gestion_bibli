import { PrismaClient } from '@prisma/client'
import books from './books'
import bcrypt from 'bcrypt';

const prisma = new PrismaClient()

type InitBookData = {
  title: string
  year_publication: number
  first_sentence: string | null
  image_url: string | null
  author: string
  subjects: string[]
}

async function main() {
  // delete all books, authors and subjects
  await prisma.books.deleteMany({})
  await prisma.authors.deleteMany({})
  await prisma.subjects.deleteMany({})
  console.log('All data deleted')

  // upsert 2 users 
  const password = bcrypt.hashSync('secret123', 10)
  await prisma.users.upsert({
    where: { mail: 'admin@gest.fr' },
    update: { },
    create: {
      firstname: 'admin',
      lastname: 'admin',
      mail: 'admin@gest.fr',
      password: password,
      birth_date: new Date('1990-01-01'),
      address: '12 rue de la gare',
      zip: '75001',
      city: 'Paris',
      country: 'France',
      is_admin: true,
    },
  })
  console.log('Admin created')
  await prisma.users.upsert({
    where: { mail: 'user@gest.fr' },
    update: {},
    create: {
      firstname: 'user',
      lastname: 'user',
      mail: 'user@gest.fr',
      password: password,
      birth_date: new Date('1990-01-01'),
      address: '12 rue de la gare',
      zip: '75001',
      city: 'Paris',
      country: 'France',
      is_admin: false,
    },
  })
  console.log('User created')


  // Fonction pour traiter un batch de livres
const processBatch = async (batch: InitBookData[]) => {
  const batchPromises = batch.map(async (book) => {
    try {
      

    // Upsert the author
    const author = await prisma.authors.upsert({
      where: { name_author: book.author },
      update: {
        name_author: book.author,
      },
      create: {
        name_author: book.author,
      },
    })

    // Upsert the subjects and collect their ids
    const subjectPromises = book.subjects.map(async (subjectLabel) => {
      const subject = await prisma.subjects.upsert({
        where: { label: subjectLabel },
        update: {
          label: subjectLabel,
        },
        create: {
          label: subjectLabel,
        },
      })
      return subject.id_subject
    })

    // Attendre que tous les subjects soient insérés
    const subjectIds = await Promise.all(subjectPromises)

    // Create the book and associate it with the author and subjects
    const createdBook = await prisma.books.create({
      data: {
        title: book.title,
        year_publication: book.year_publication,
        first_sentence: book.first_sentence,
        image_url: book.image_url,
        id_author: author.id_author, // Associate with the author
        books_subjects: {
          create: subjectIds.map((id_subject) => ({
            id_subject: id_subject,
          })),
        },
      },
    })
    
    const index = books.indexOf(book) + 1
    console.log(`Created book: ${createdBook.title} - ${index}/${books.length}`)
  } catch (error) {
      console.error(error);
  }
  })

  // Exécuter toutes les promesses de création de livres en parallèle
  await Promise.all(batchPromises)
}


  // Traiter les livres par lots de 50
  const batchSize = 50
  for (let i = 0; i < books.length; i += batchSize) {
    const batch = books.slice(i, i + batchSize) // Créer un batch de 50 livres
    console.log(`Processing batch ${Math.ceil(i / batchSize) + 1}`)
    await processBatch(batch) // Traiter le batch
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
