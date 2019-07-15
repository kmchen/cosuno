# Manual Installation
 ```sh
$ git clone https://github.com/kmchen/cosuno.git
$ cd cosuno
$ npm install // Application automatically opens at http://localhost:9000
$ npm start
```

# Docker
 ```sh
$ git clone https://github.com/kmchen/cosuno.git
$ cd cosuno
$ docker build -t <your_name>/cosuno-app .
$ docker run -p 9000:9000 -d <your_name>/cosuno-app
$ Visit http://127.0.0.1:9000
```

# Test
 ```sh
$ npm test
```
