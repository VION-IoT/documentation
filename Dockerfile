FROM cgr.dev/chainguard/nginx:latest
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY docs/.vitepress/dist /usr/share/nginx/html
EXPOSE 8080
