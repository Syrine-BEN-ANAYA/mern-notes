# Image Node officielle
FROM node:20

# Définir le dossier de travail
WORKDIR /app

# Copier package.json et installer les dépendances
COPY package*.json ./
RUN npm install

# Copier tout le projet
COPY . .

# Exposer le port backend
EXPOSE 5002

# Lancer le serveur
CMD ["npm", "start"]
