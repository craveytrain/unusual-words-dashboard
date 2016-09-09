# Unusual words

## Status

Currently, this app fetches the titles of all the articles available in the API, parses them into words, truncates that list at 100 and then displays them in a list. Currently, there is no logic on what make a word, much less what makes a work unusual.

Next step is to get site running in heroku in a more production-like way which means:

-   ci for building static assets
-   ci for transpiling babel-node code to just node code
-   configs for heroku to launch web server

## To run locally

```bash
# install dependencies
npm install

# start local dev servers
npm run dev
```
