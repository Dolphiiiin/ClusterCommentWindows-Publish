const child_process = require('child_process');
let child = child_process.spawn("C:\\Development\\work\\Calcite2.exe", []);
let match;
let scrape = [];
child.stdout.setEncoding('utf8');
child.stdout.on('data', function(data) {
    data = data.replace(/\s+/g, "");
    data = Buffer.from(data, 'hex').toString('utf-8');
    // console.log(data);
    match = String(data.match(/"username":"(.*?)"/g));
    match = match.replace("\"username\":\"","");
    match = match.replace("\"","");
    scrape.push(match);

    match = String(data.match(/"displayName":"(.*?)"/g));
    match = match.replace("\"displayName\":\"","");
    match = match.replace("\"","");
    scrape.push(match);

    match = String(data.match(/"photoUrl":"(.*?)"/g));
    match = match.replace("\"photoUrl\":\"","");
    match = match.replace("\"","");
    scrape.push(match);

    match = String(data.match(/"body":"(.*?)"/g));
    match = match.replace("\"body\":\"","");
    match = match.replace("\"","")
    scrape.push(match);

    match = String(data.match(/"createdAt":"(.*?)"/g));
    match = match.replace("\"createdAt\":\"","");
    match = match.replace("\"","");
    scrape.push(new Date(match));
    console.log(scrape)
});
