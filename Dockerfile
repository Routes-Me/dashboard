# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
# FROM tiangolo/node-frontend:10 as build-stage
FROM tiangolo/node-frontend:10 as build-stage
WORKDIR /app
COPY package*.json /app/
RUN npm install --production
RUN npm install env-cmd

COPY ./ /app/

# RUN REACT_APP_ENV=staging HTTPS=true npm run build:staging
# -- --mode staging

RUN HTTPS=true npm run build
# RUN REACT_APP_ENV=staging
# RUN npm run build -- --mode staging
# ARG REACT_APP_ENV=staging
# RUN npm run build
# RUN npm run st 
#//env-cmd -f .env.staging npm run build

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx
COPY --from=build-stage /app/build/ /usr/share/nginx/html
# Copy the default nginx.conf provided by tiangolo/node-frontend
COPY --from=build-stage /nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80 443
