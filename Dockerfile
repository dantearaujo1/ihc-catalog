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
RUN echo "DB_USER=dbViewer\nDB_PASSWORD=ZXmbV4ZtSDXGNmAv\nJWT_SECRET=TheSecretKey" > backend/.env

COPY . .

EXPOSE 8080

CMD ["npm", "run", "dev", "--", "--host"]

