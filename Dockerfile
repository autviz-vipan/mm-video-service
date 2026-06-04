# 1. Use the official Node 22 LTS Debian-based slim image
FROM node:22-bookworm-slim

# 2. Install Chromium dependencies and essential system fonts
# - These libraries are required by Chromium to run in a headless environment.
# - fontconfig and fonts are installed to ensure text/emojis render correctly without garbling.
RUN apt-get update && apt-get install -y --no-install-recommends \
    libnss3 \
    libdbus-1-3 \
    libatk1.0-0 \
    libgbm-dev \
    libasound2 \
    libxrandr2 \
    libxkbcommon-dev \
    libxfixes3 \
    libxcomposite1 \
    libxdamage1 \
    libatk-bridge2.0-0 \
    libpango-1.0-0 \
    libcairo2 \
    libcups2 \
    fontconfig \
    fonts-liberation \
    fonts-noto-color-emoji \
    && rm -rf /var/lib/apt/lists/* \
    && fc-cache -fv

# 3. Set the working directory
WORKDIR /app

# 4. Copy package dependency lists first to leverage Docker layer caching
COPY package.json package-lock.json* ./

# 5. Clean install dependencies
RUN npm ci

# 6. Copy the rest of the application source code
COPY . .

# 7. Change ownership of the app folder to the built-in non-root 'node' user
# This ensures that the node user has permission to pre-compile webpack bundles and write temp output files.
RUN chown -R node:node /app

# 8. Switch to the non-privileged 'node' user
USER node

# 9. Download and cache the correct Chromium browser binary compatible with the installed Remotion version
# This caches the browser inside `/home/node/.cache/remotion`
RUN npx remotion browser ensure

# 10. Expose the port the Express microservice listens on
EXPOSE 3000

# 11. Set production node environment
ENV NODE_ENV=production

# 12. Command to run the microservice
CMD ["npm", "start"]
