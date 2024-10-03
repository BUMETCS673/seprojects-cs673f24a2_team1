# Use the official Nginx image
FROM nginx:alpine

# Copy the HTML file to the Nginx default directory
COPY src/starter/* /usr/share/nginx/html/

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
