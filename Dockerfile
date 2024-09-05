# Step 1: Use an official Node.js runtime as the base image
FROM node:18-alpine

# Step 2: Set the working directory inside the Docker container
WORKDIR /usr/src/app

# Step 3: Install dependencies
COPY package*.json ./
COPY yarn.lock ./
RUN yarn

# Step 4: Copy the rest of your application code
COPY . .

# Step 5: Build the TypeScript code
RUN yarn build

# Step 6: Expose the port the app runs on
EXPOSE 3000

# Step 7: Run the application
CMD ["node", "dist/index.js"]
