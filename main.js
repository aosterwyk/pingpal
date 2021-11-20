var ping = require('ping');
var sleep = require('./utils/sleep').sleep;
var pingMe = '10.0.0.1';
var timeBetweenPings = 1;


(async () => {
    let pingCounts = 0;
    // console.log(res);
    do {
        let res = await ping.promise.probe(pingMe, {timeout: 10});        
        console.log(`pinging ${pingMe} (count: ${pingCounts})`);
        if(res.alive) {
            console.log(`${res.time}ms`);
        }
        else {
            console.log(`${res.alive}`);
        }
        pingCounts++;
        // update value in UI 
        // log to file 
        await sleep(timeBetweenPings);
    }while(pingCounts < 100);
})();
