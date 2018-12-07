FROM node:10.14.1

WORKDIR /usr/src/smart-brain-api

COPY ./ ./

RUN npm i

CMD ["/bin/bash"]
