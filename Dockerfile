# Dockerfile
# 使用node做为镜像
FROM node
# 设置容器的工作目录为该目录
WORKDIR /post
# 向外提供3000端口
EXPOSE 6000
# 容器创建完成后执行的命令
CMD yarn build
