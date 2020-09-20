const User = require(`../src/models/user.model`);
const yts = require(`yt-search`);

module.exports = {
    cleanse: str => {
        return str
            .replace(`\`\`\``, `\\\`\\\`\\\``)
            .replace(`\``, `\\\``)
            .replace(`||`, `\\|\\|`)
            .replace(`_`, `\\_`)
            .replace(`***`, `\\*\\*\\*`)
            .replace(`**`, `\\*\\*`)
            .replace(`*`, `\\*`);
    },
    getClosestMatch: (a, b) => {
        const distCalc = Array(b.length + 1).fill(null).map(() => Array(a.length + 1).fill(null));

        for(let i = 0; i <= a.length; i++) distCalc[0][i] = i;
        for(let j = 0; j <= b.length; j++) distCalc[j][i] = j;

        for(let k = 1; k <= b.length; k++) {
            for(let l = 1; l <= a.length; l++) {
                const indicator = (a[l - 1] === b[k - 1]) ? 0: 1;
                distCalc[k][l] = Math.min(
                    distCalc[k][l - 1] + 1,
                    distCalc[k - 1][l] + 1,
                    distCalc[k - 1][l - 1] + indicator
                );
            }
        }
        return distCalc[b.length][a.length];
    },
    rng: (min, max) => {
        return Math.floor(Math.random() * (max + 1 - min) + min); 
    }, 
    searchYoutube: async(args) => yts(args),
    getLeaderboard: async() => {
        let lbUsers = await User.find({ banned: false });
        let lb = [];
    
        for(let i in lbUsers) {
            lb.push({
                xp: lbUsers[i].xp,
                id: lbUsers[i].discordID,
                level: lbUsers[i].level,
                messages: lbUsers[i].stats.messageCount
            });
        }
        lb.sort((a, b) => (a.xp <= b.xp) ? 1: -1);
        return lb;
    },
    standardize: int => {
        let a = 0;
        let mAT = ``;
        int.toString().split(``).reverse().forEach(n => {
            a++;
            mAT += ((a - 1) % 3) == 0 ? `,${n}`: n;
        });

        return mAT.slice(1).split(``).reverse().join(``);
    },
    calculateExp: level => {
        return Math.floor(((100 * Math.E * level)) + 250);
    }
}