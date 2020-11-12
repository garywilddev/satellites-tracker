FROM node:12.14.0-stretch-slim
# Create the app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
# Copy the source files to app directory
COPY . /usr/src/app

RUN npx yarn

EXPOSE 49000

CMD ["npm", "run", "start"]
