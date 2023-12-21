
ARG NODE_VERSION=20.6.1

FROM node:${NODE_VERSION}-alpine as base
WORKDIR /usr/src/app
EXPOSE 3000

ARG BUILD_ENV=${ENV:-dev}
FROM base as prod
# ENV NODE_ENV production
COPY . .
# RUN echo "---"
# RUN echo ${BUILD_ENV}
# RUN echo "---"
COPY .env.${BUILD_ENV} .env
RUN npm install
USER node

CMD npm start