# Local configuration

Copy `.env.example` to `.env`, set the database URL, generate a local authentication secret and choose a local `SEED_PASSWORD`. Run the seed through `npx prisma db seed`, which supplies the local environment. The seed is for a disposable development database and clears book data; never run it against a live database. No seed password is committed or printed.
