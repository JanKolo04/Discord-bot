# Discord-bot
I creating Doscord bot for my friends, actually I don't know whot this bot will be doing but is coll

## Work plan
### Mems
```node
// ------------------------------------------------------
// Input for enter a meme category `fun` or `programing`.
// ------------------------------------------------------

// Install fetch library for have permission to fetch data from JSON file which API will be returning.

const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

fetch('url to API').then(async res => {...});

// whole code which fetch meme from redit or giphy
// ---- https://github.com/Kajgit/v14_tutorial/blob/main/Commands/General/meme.js ---

 
```

## To do
- [ ] Create meme function which will be fetching data from redit or giphy
