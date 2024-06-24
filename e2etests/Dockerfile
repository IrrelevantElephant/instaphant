FROM mcr.microsoft.com/playwright:v1.44.1-jammy

RUN wget -qO- https://get.pnpm.io/install.sh | ENV="$HOME/.bashrc" SHELL="$(which bash)" bash -
ENV PNPM_HOME=/root/.local/share/pnpm
# RUN alias pnpm=/root/.local/share/pnpm/pnpm

WORKDIR /app

COPY . .

RUN /root/.local/share/pnpm/pnpm install --frozen-lockfile	

ENTRYPOINT ["/app/entrypoint.sh"]