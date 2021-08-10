<h1 align="center">Zeropoint Bot</h1>

<h3 align="center">A moderation bot for the Alliance Reunited Discord server.</h3>
<br>

<p align="center">
    <img src="https://img.shields.io/github/v/release/DamienVesper/ZeropointBot?style=for-the-badge&color=f82055&include_prereleases">
    <img src="https://img.shields.io/github/last-commit/DamienVesper/ZeropointBot?style=for-the-badge&color=f82055">
    <img src="https://img.shields.io/github/languages/code-size/DamienVesper/ZeropointBot?style=for-the-badge&color=f82055">
</p>


**Local Bot Development Setup**
<br>
Testing the application using a database on your own machine will require a localhost database setup:

1. Create a `.env` in the root directory of the repository.
2. Inside of the `.env` file, include the following:
```
DISCORD_BOT_TOKEN="<token>"
MONGO_URI="<uri>"
```
Replace `<uri>` and `<discord bot token>` with your MongoDB URI and Discord bot token.

**Running The Bot**
```
npm i
npm run dev
```

Note: You will need MongoDB and Node.js installed (with npm v7) to be able to build and run the bot.
 