FROM node:20.10.0

WORKDIR /frontend/web

RUN apt update -y && \
    apt upgrade -y && \
    # Necessary packages for npm to work
    apt install -y build-essential

# Install pnpm
RUN npm install -g pnpm
RUN pnpm config set auto-install-peers true 