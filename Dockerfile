FROM node:alpine

WORKDIR /usr/app

RUN mkdir -p frontend
RUN mkdir -p backend

COPY frontend/package*.json ./frontend/
COPY backend/package*.json ./backend/
COPY package*.json ./

RUN npm install --prefix ./backend
RUN npm install --prefix ./frontend
RUN npm pkg set scripts.postinstall="echo no-postinstall"
RUN npm install
RUN echo "DB_USER=dbViewer" >> backend/.env
RUN echo "DB_PASSWORD=ZXmbV4ZtSDXGNmAv" >> backend/.env
RUN echo "JWT_SECRET=TheSecretKey" >> backend/.env

COPY . .

EXPOSE 5173

CMD ["npm", "run", "devdock"]

