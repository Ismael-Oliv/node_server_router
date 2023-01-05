import http from "http";

export class Route {
  routes = {};
}

export class Node_Router extends Route {
  // routes = {};
  request = "";
  response = "";

  route(method, path, func) {
    this.routes[path] = {
      method,
      func,
    };
  }

  #addToRoutes(method, path, func) {
    this.routes[path] = {
      method,
      func,
    };
  }

  get(path, func) {
    this.#addToRoutes("get", path, () => func(this.request, this.response));
  }

  post(path, func) {
    this.#addToRoutes("post", path, () => func(this.request, this.response));
  }

  patch(path, func) {
    this.#addToRoutes("patch", path, () => func(this.request, this.response));
  }

  start(hostname, port, func) {
    const server = http.createServer((request, response) => {
      response.setHeader("Content-Type", "application/json");

      this.request = request;
      this.response.response;

      const result = this.routes[request.url];

      if (result && result.method === request.method.toLowerCase()) {
        const res = result.func();
        response.end(JSON.stringify(res));
      } else {
        response.statusCode = 404;
        response.end(
          JSON.stringify({
            error: "There's no route with that path and method",
          })
        );
      }
    });

    server.listen(port, hostname, func());
  }
}
