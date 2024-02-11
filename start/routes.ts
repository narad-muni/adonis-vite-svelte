/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router';
import path from 'path';
// import loadAssets from '#utils/load_assets';
import env from '#start/env';

const IS_DEV = env.get('NODE_ENV') === 'development';


if (IS_DEV) {
    router.get('/src/*', async ({ request, response }) => {
        const file = path.resolve(`./frontend/${request.url()}`);
        response.attachment(file, path.basename(file), 'inline');
    });
}

router.get('*', async ({ view }) => {    
    return view.render('index', {
        IS_DEV: IS_DEV
    });
});