FROM node:10.15

ENV HOME=/home/app

RUN useradd -mU --shell /bin/false app 

COPY package.json package-lock.json $HOME/movie-rental/

WORKDIR $HOME/movie-rental/

RUN npm i -g --silent --progress=false pm2 node-gyp && npm i --silent --progress=false 

COPY . $HOME/movie-rental/

RUN chown -R app:app $HOME/*

USER app

CMD ["pm2-runtime", "process.yml", "--only", "movie-rental"]