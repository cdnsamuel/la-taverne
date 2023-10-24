# Dockerfile frontend
# build environment
FROM node:20 as builder

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH

ARG VITE_BACKEND_URL=${VITE_BACKEND_URL}
ENV VITE_BACKEND_URL=${VITE_BACKEND_URL}

COPY ./frontend /usr/src/app

RUN npm install -g npm@10.2.0
RUN npm install
RUN npm run build

# production environment
FROM nginx:1.25.2

COPY --from=builder /usr/src/app/dist /usr/share/nginx/html
COPY ./frontend/default.conf /etc/nginx/conf.d/
EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]