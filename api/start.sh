#!/bin/bash

# Générer les fichiers Prisma
npx prisma generate

# Attendre l'initialisation de Prisma
until npx prisma db pull &> /dev/null; do
  echo "Waiting for Prisma to initialize..."
  sleep 1
done

# Vérifier que Prisma fonctionne correctement
npx prisma query 'SELECT 1' &> /dev/null
if [ $? -ne 0 ]; then
  echo "Prisma initialization failed"
  exit 1
fi

# Démarrer l'application
npm run start:dev