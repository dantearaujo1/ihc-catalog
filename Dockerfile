FROM node:alpine

WORKDIR /usr/app

RUN mkdir -p frontend
RUN mkdir -p backend

COPY frontend/package*.json ./frontend/
COPY backend/package*.json ./backend/
COPY package*.json ./

RUN npm install --prefix ./backend
RUN npm install --prefix ./frontend
RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm", "run", "dev"]

