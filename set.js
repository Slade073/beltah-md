const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID ||"eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia0ZObjhLMkJKZ3lZT0FUOU1qNGh3YmEzQ3NFOHh3TW16MkIvcjF3U0tFND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicFVGNXQ4a3lpbCtkbkQ4VUVuWVpnVGJ3VTJjTzYzc2ErbFF3NDNYaUlHST0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIyT1MyQnpONlZuNjJhbkU0ZUFRbG5aSEdhbGFsNzg0VFhFU3JlODk5eFZjPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJQUG5mYjc4MWF0WEtOd21kb1NxREduSXJtTlhsUzBwV3Q4V09CaTVLUzBrPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImlOaEptcTB6UG82K3h4WllxUUtZbFM1blpSZXQ1ZUIrYUozS3RMRUZPRlk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InpRckhBUnkwSmY0ZVFKZnc1UENhUE1aQzdUaHFlY1JHMUpUY1QzY0hhQkk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT0pFV25Yd2pFM1JTRmppbS9uNUtHN2JpdVV3MHQ2NXozMmFPUW0xTDFYND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlVjYURManBGaGdZRnc2YXMvVlBROUtIelI1OFNGNlQyL3lvSzRJOENERT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InBrRlRoaTlhY0FPdlVsQTBXblg2NDhIN3J6TG1WbWZMeUVjaW5DNHJOMENRNytQQkowNXhnQ2VqV0RqRVNkZStQamtsZmo5TmFNV3R6MCtzamFsVUNnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjYsImFkdlNlY3JldEtleSI6IkRkaWtBMDE2Umw0OG15T0RzcURkV2FhQjhYVGJCcVFTYTlFRVBIS1hyZTg9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjM0ODEyNjU5OTAyNkBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI0RTA0NDRCNENGRENCRkNDNTNFODg5NjJGRDZERkY1OCJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzIwMDQ4NTU1fV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJQTjFkd0J0RFNaT2hCSmNNTXA2YlhnIiwicGhvbmVJZCI6ImNkZjU4NGNiLTNkMGUtNGVjNi1hYWZjLWJjY2UyMzNkZTM1ZiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJXVTUzNEhobWEyK21KaEVqc3Z2Tm9XN3BEeTg9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidWR6NUMwWWdNUmowOVRHNWVKVzVRVjRGRWZrPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlI3NEwzQUNSIiwibWUiOnsiaWQiOiIyMzQ4MTI2NTk5MDI2OjRAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiV0lDS0VETUFOTlkifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0xudnFja0ZFSnUzbDdRR0dBSWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6ImRHSmJ4dkxwUVVLZk1oL2hwRWh0Wk9HU250VDRWY2FOMFlHY1p6MHp1blE9IiwiYWNjb3VudFNpZ25hdHVyZSI6Imwva0tucjgwUFlwZ25JekhRVTZodjExbU5aVEJzOGs2S0RncnVXNGMrbk5pMUQxZ2NDUVBmdG1LbzB5NDFVQk9TUDVKWkJxN1B6cFVpWjRTWnMreEJRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJpTHd5OW03bXVOa29zWWpkdGlJeUMzUnRDSHEwNUlGdFdGQXpKeDg4d0dwQ09xRG1FdGdyamVtWGhIQ01CQjNEWmtoZ0FqQldyRXh1czVnYmNWVkFDZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNDgxMjY1OTkwMjY6NEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJYUmlXOGJ5NlVGQ256SWY0YVJJYldUaGtwN1UrRlhHamRHQm5HYzlNN3AwIn19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIwMDQ4NTUyLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQURZeSJ9",
    PREFIXE: process.env.PREFIX || "+",
    OWNER_NAME: process.env.OWNER_NAME || "Wicked Manny",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "Wicked Manny",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'Wicked Manny',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/dcce2ddee6cc7597c859a.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
