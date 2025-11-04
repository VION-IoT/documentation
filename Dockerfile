FROM nginxinc/nginx-unprivileged:stable-alpine-perl AS final
COPY docs/.vitepress/dist /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
