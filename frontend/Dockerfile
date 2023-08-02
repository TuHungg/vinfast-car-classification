FROM node:18-alpine AS deps 
# RUN apk add --no-cache libc6-compat

ENV APP_ENV=development
WORKDIR /app

COPY ["package.json", "package-lock.json","./"]

RUN npm install
COPY . .

RUN npm run build

EXPOSE 3000

ENV PORT 3000

CMD ["npm","start"]