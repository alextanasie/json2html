import express from 'express';
import React, { createElement } from 'react';
import { renderToString } from 'react-dom/server';

import { Index } from './fe/Index';

// note: combining import and require is not recommended, but having some issue with the ES6 fetch module
const fetch = require('node-fetch');


import 'dotenv/config';

const app = express();
const port = 3000;

app.get('/app', async (req, res) => {
    if (!req.query.hash) {
        return res.status(400).send('Bad Request: Missing q parameter');
    }

    // TODO sanitize and make sure JSON_REPO exists in the env before starting the app. Don't allow app start if env variable does not exist
    const jsonUrl = process.env.JSON_REPO?.replace('{hash}', req.query.hash as string);

    if (!jsonUrl) {
        // TODO use a logging library
        console.error('Cannot fetch json!', req);
        return res.status(500).send('Internal Server Error');
    }
    const jsonDefinition = await fetch(jsonUrl);
    const jsonDefinitionText = await jsonDefinition.text();

    const indexComponent: React.ComponentType<{ jsonDefinition: string }> = Index;
    const appString = renderToString(createElement(indexComponent, { jsonDefinition: jsonDefinitionText }));

    return res.send(appString);
});

// app.get('/banner', async (req, res) => {
//     fs.readFile(path.join(__dirname, 'example.json'), 'utf8', (err, data) => {
//         if (err) {
//             console.error(err);
//             res.status(500).send('An error occurred while reading the file.');
//         } else {
//             const resultHtmlFilePath = createHTML(data);
//             res.sendFile(resultHtmlFilePath);
//         }
//     });
// });

app.listen(port, () => {
    console.log(`jsonToHtml is running at http://localhost:${port}`);
});