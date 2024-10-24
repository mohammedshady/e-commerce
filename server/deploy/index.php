<?php

require_once __DIR__ . '../vendor/autoload.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$requestUri = $_SERVER['REQUEST_URI'];

// Handle root path explicitly
if ($requestUri === '/' || $requestUri === '') {
    include __DIR__ . '/index.html';
    exit();
}

// Check if it's an API request (e.g., /graphql)
if (preg_match('/^\/graphql/', $requestUri)) {
    // Dispatch to the API route
    $dispatcher = FastRoute\simpleDispatcher(function (FastRoute\RouteCollector $r) {
        $r->post('/graphql', [App\Controller\GraphQL::class, 'handle']);
    });

    $routeInfo = $dispatcher->dispatch(
        $_SERVER['REQUEST_METHOD'],
        $requestUri
    );

    switch ($routeInfo[0]) {
        case FastRoute\Dispatcher::NOT_FOUND:
            echo '404 Not Found';
            break;
        case FastRoute\Dispatcher::METHOD_NOT_ALLOWED:
            $allowedMethods = $routeInfo[1];
            echo '405 Method Not Allowed';
            break;
        case FastRoute\Dispatcher::FOUND:
            $handler = $routeInfo[1];
            $vars = $routeInfo[2];
            echo $handler($vars);
            break;
    }

    exit();
}

// Serve React app for frontend routes
if (file_exists(__DIR__ . $requestUri)) {
    // If the requested file (static asset) exists, serve it
    return false;
} else {
    // Serve index.html for all other routes (React will handle routing)
    include __DIR__ . '/index.html';
    exit();
}
