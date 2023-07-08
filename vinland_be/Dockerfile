FROM node:16-alpine3.17
WORKDIR /app
COPY package.json .
RUN npm install
# RUN npm rebuild bcrypt --build-from-source
RUN npm install bcrypt
COPY . .
CMD ["npm", "start"]