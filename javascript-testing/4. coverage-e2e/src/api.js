const http = require('http');

const DEFAULT_USER = {
    username: "nath",
    password: "123"
};

const routes = {
    '/contact:get': (request, response) => {
        response.write('contact us page');

        return response.end();
    },
    '/login:post': async (request, response) => {
        for await( const data of request) {
            const user = JSON.parse(data);

            if (
                user.username !== DEFAULT_USER.username ||
                user.password !== DEFAULT_USER.password
            ) {
                response.writeHead(401);
                
                response.write('login has failed');

                return response.end();
            }

            response.write('login has succeed');

            return response.end();
        };
    },
    default: (request, response) => {
        response.write('hello world');
        
        return response.end();
    }
}

const handler = function (request, response) {
    const { url, method } = request;

    const routeKey = `${url}:${method}`.toLocaleLowerCase();

    const chosen = routes[routeKey] || routes.default;

    response.writeHead(200, {
        'Content-Type': 'text/html'
    });

    return chosen(request, response);
};

const app = http.createServer(handler)
    .listen(3000, () => console.log('app is running at', 3000));

module.exports = app;