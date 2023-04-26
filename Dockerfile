FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy source code
COPY . .

#Expose port and start application
EXPOSE 5000

CMD ["yarn", "start"]