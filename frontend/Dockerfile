FROM node AS build
WORKDIR /project
COPY . .
RUN npm i
RUN npm run build


FROM steebchen/nginx-spa:stable
WORKDIR /app
COPY --from=build /project/dist/. .

EXPOSE 80

CMD ["nginx"]