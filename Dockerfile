# Step 1: Use Node.js v18 to build the app
FROM node:18 AS build

# Set the working directory to /app (or any other directory you prefer)
WORKDIR /opt/bihua/dalian

# Copy package.json and package-lock.json into the container
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Build the React app, which will output to the dist folder
RUN npm run build

# Step 2: Set up the production server with 'serve'
FROM node:18 AS production

# Install 'serve' globally to serve the static files
RUN npm install -g serve

# Set the working directory inside the production container to /opt/bihua/dalian
WORKDIR /opt/bihua/dalian

# Copy the dist directory from the build stage into the container
COPY --from=build /opt/bihua/dalian/dist /opt/bihua/dalian/dist

# Expose port 5000 for the app
EXPOSE 5000

# Command to run the app using 'serve' from the dist directory
CMD ["serve", "-s", "dist", "-l", "5000"]
