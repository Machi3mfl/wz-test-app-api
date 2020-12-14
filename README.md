## hapi.js REST API

A sample structure for building a REST API on top of `hapi.js` framework that consumes a `Json File` like a database.

```shell
$ git clone git@github.com:agendor/sample-hapi-rest-api.git
$ cd sample-hapi-rest-api
```

```shell
$ npm install
```

To start de api server in development mode

```shell
$ npm run dev
```


That's it! You should be able to play around your API GETting, POSTing, PUTing AND DELETEing Tasks. The end-points are as described in the `/routes/*.js` file:

* **GET** http://localhost:4000/alerts
* **GET** http://localhost:4000/agents
* **GET** http://localhost:4000/agents/{agent_id}
* **GET** http://localhost:4000/rules
* **GET** http://localhost:4000/rules/{rules_id}


