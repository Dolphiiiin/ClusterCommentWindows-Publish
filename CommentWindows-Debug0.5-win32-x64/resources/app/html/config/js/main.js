
const child_process = require('child_process');

let ul = document.createElement('ul');
ul.id = "comment-column";




document.body.appendChild(ul);
let fragment = document.createDocumentFragment();
let child1 = document.createElement('li'),
    child2 = document.createElement('div'),
    child3 = document.createElement('img'),
    child4 = document.createElement('p'),
    child5 = document.createElement('a'),
    child6 = document.createElement('p'),
    child7 = document.createElement('p')
;



console.log("start process")
let child = child_process.spawn("Calcite2.exe", []);

let match,
    scrape = [],
    i = 0,
    ii,
    regex,
    talkText,
    json,
    jsonParse,
    _json,
    lastElement = null,
    emoticonBodyVal,
    emoticonRange,
    bouyomiUser,
    blackList,
    whiteList
;

let bouyomiChanClient = new BouyomiChanClient();
child.stdout.setEncoding('utf8');
child.stdout.on('data', function(data) {
    data = data.replace(/\s+/g, "");
    console.log("HEX:\n"+data)
    if(data.length > 4 && document.getElementById("visualSettingComment").checked == true) {
        data = Buffer.from(data, 'hex').toString('utf-8');

        json = data.match(/\{[\s\S]*?\}[\s\S]*?\}/g);

        for (ii=0; ii<json.length; ii++){
            console.log(json)
            jsonParse = String("");
            jsonParse = JSON.parse(json[ii]);
            scrape = [
                jsonParse.commentedBy.username,
                jsonParse.commentedBy.displayName,
                jsonParse.commentedBy.photoUrl,
                jsonParse.body,
                jsonParse.createdAt
            ]
            console.log("JSON:\n" + json[ii])
            console.log("\u001b[32musername: \u001b[34m" + jsonParse.commentedBy.username + "\n\u001b[32mdisplayName: \u001b[34m" + jsonParse.commentedBy.displayName + "\n\u001b[32mphotoUrl: \u001b[34m" + jsonParse.commentedBy.photoUrl + "\n\u001b[32mbody: \u001b[34m" + jsonParse.body + "\n\u001b[32mcreatedAt: \u001b[34m" + jsonParse.createdAt);


            child1 = document.createElement('li'),
                child2 = document.createElement('div'),
                child3 = document.createElement('img'),
                child4 = document.createElement('p'),
                child5 = document.createElement('a'),
                child6 = document.createElement('p'),
                child7 = document.createElement('p')
            ;


            child1.id = "li" + String(i);
            bouyomiUser = document.getElementById("bouyomiUser").value.split(",").includes(scrape[0]);
            blackList = document.getElementById("visualSettingBlack").value.split(",").includes(scrape[0]);
            whiteList = document.getElementById("visualSettingWhite").value.split(",").includes(scrape[0]);
            if (bouyomiUser == true){
                child1.className = "control box commentColumn hero is-primary";
            }else {
                child1.className = "control box commentColumn";
            }


            child2.className = "user";
            child2.id = "div" + String(i);

            child3.className = "userValue user-icon";
            child3.src = scrape[2];

            child4.className = "userValue userID tag is-primary";
            child4.innerText = scrape[1];

            child5.className = "userValue userID tag is-primary is-light";
            child5.target = "_blank";
            child5.href = "https://cluster.mu/u/" + scrape[0];
            child5.innerText = scrape[0];

            child6.className = "userValue userID tag is-light";
            child6.innerText = scrape[4];

            child7.className = "title is-6";
            child7.innerHTML = scrape[3].replaceAll("\\n","<br>");

            if(blackList == true){
                child1.className = "control box commentColumn hero is-warning";
                child3.src = "../icon/black.png";
                child4.className = "userValue userID tag is-warning";
                child4.innerText = "       ";
                child5.className = "userValue userID tag is-primary is-warning";
                child5.innerText = "       ";
                child7.className = "title is-6";
                child7.innerHTML = "ブラックリストに含まれたユーザー";
            }

            if(document.getElementById("visualSettingComment")) {
                if(whiteList == true || document.getElementById("visualSettingWhite").value == "") {
                    element = document.getElementById("comment-column");
                    element.prepend(child1);
                    element = document.getElementById("li" + String(i));
                    element.appendChild(child2);
                    element.appendChild(child7);
                    element = document.getElementById("div" + String(i));
                    element.appendChild(child3);
                    element.appendChild(child4);
                    element.appendChild(child5);
                    element.appendChild(child6);
                    lastElement = "li" + String(i);
                    if(blackList == false){
                        if (bouyomiUser == true || document.getElementById("bouyomiUser").value == "") {
                            if (document.getElementById("bouyomiSetting").checked == true && scrape[3].substr(0, 2) != "//") {
                                if (document.getElementById("bouyomiPrefix").value == "") {
                                    talkText = scrape[3].replaceAll("<br>", "");
                                    bouyomiChanClient.talk(talkText);
                                } else if (scrape[3].substr(0, document.getElementById("bouyomiPrefix").value.length) == document.getElementById("bouyomiPrefix").value) {
                                    talkText = scrape[3].replaceAll("<br>", "");
                                    talkText = scrape[3].slice(bouyomiPrefix.length);
                                    bouyomiChanClient.talk(talkText);
                                }
                            }
                        }
                    }
                }

            }

            element = document.getElementById("comment-column");
            i++;
            scrape = [];
        }
    }else if (data.length <= 2 && document.getElementById("visualSettingEmoticon").checked == true){
        if (lastElement == null || lastElement.substr(0,2) == "li") {
            element = document.getElementById("comment-column");
            child1 = document.createElement('li');
            child1.className = "control box commentColumn emoticonColumn";
            child1.id = "emoticon" + String(i);
            element.prepend(child1);
            child2 = document.createElement('div');
            switch (data) {
                case "02":
                    child2.id = "emoticon-02" + String(i) + " emoticonBody";
                    child3 = document.createElement('p')
                    child3.innerText = "👍";
                    break;
                case "03":
                    child2.id = "emoticon-03" + String(i) + " emoticonBody";
                    child3 = document.createElement('p')
                    child3.innerText = "👏";
                    break;
                case "04":
                    child2.id = "emoticon-04" + String(i) + " emoticonBody";
                    child3 = document.createElement('img')
                    child3.src = "../icon/heart.png"
                    break;
                case "01":
                    child2.id = "emoticon-01" + String(i) + " emoticonBody";
                    child3 = document.createElement('p')
                    child3.innerText = "😄";
                    break;
                case "05":
                    child2.id = "emoticon-05" + String(i) + " emoticonBody";
                    child3 = document.createElement('p')
                    child3.innerText = "❗";
                    break;
                case "10":
                    child2.id = "emoticon-10" + String(i) + " emoticonBody";
                    child3 = document.createElement('p')
                    child3.innerText = "🎉";
                    break;
                case "07":
                    child2.id = "emoticon-07" + String(i) + " emoticonBody";
                    child3 = document.createElement('img')
                    child3.src = "../icon/pink.svg"
                    break;
                case "":
                    child2.id = "emoticon-0a" + String(i) + " emoticonBody";
                    child3 = document.createElement('img')
                    child3.src = "../icon/orange.svg"
                    break;
                case "09":
                    child2.id = "emoticon-09" + String(i) + " emoticonBody";
                    child3 = document.createElement('img')
                    child3.src = "../icon/yellow.svg"
                    break;
                case "0b":
                    child2.id = "emoticon-0b" + String(i) + " emoticonBody";
                    child3 = document.createElement('img')
                    child3.src = "../icon/green.svg"
                    break;
                case "08":
                    child2.id = "emoticon-08" + String(i) + " emoticonBody";
                    child3 = document.createElement('img')
                    child3.src = "../icon/blue.svg"
                    break;
                case "06":
                    child2.id = "emoticon-06" + String(i) + " emoticonBody";
                    child3 = document.createElement('img')
                    child3.src = "../icon/rby.svg"
                    break;
            }
            child3.className = "emoticon";
            element = document.getElementById("emoticon" + String(i));
            element.appendChild(child3);

            lastElement = "emoticon" + String(i);
        }else if(lastElement.substr(0,8) == "emoticon"){
            element = document.getElementById("comment-column");
            child2 = document.createElement('div');
            switch (data) {
                case "02":
                    child2.id = "emoticon-02" + String(i) + " emoticonBody";
                    emoticonBodyVal = "02";
                    child3 = document.createElement('p')
                    child3.innerText = "👍";
                    break;
                case "03":
                    child2.id = "emoticon-03" + String(i) + " emoticonBody";
                    emoticonBodyVal = "03";
                    child3 = document.createElement('p')
                    child3.innerText = "👏";
                    break;
                case "04":
                    child2.id = "emoticon-04" + String(i) + " emoticonBody";
                    emoticonBodyVal = "04";
                    child3 = document.createElement('img')
                    child3.src = "../icon/heart.png"
                    break;
                case "01":
                    child2.id = "emoticon-01" + String(i) + " emoticonBody";
                    emoticonBodyVal = "01";
                    child3 = document.createElement('p')
                    child3.innerText = "😄";
                    break;
                case "05":
                    child2.id = "emoticon-06" + String(i) + " emoticonBody";
                    emoticonBodyVal = "05";
                    child3 = document.createElement('p')
                    child3.innerText = "❗";
                    break;
                case "10":
                    child2.id = "emoticon-06" + String(i) + " emoticonBody";
                    emoticonBodyVal = "10";
                    child3 = document.createElement('p')
                    child3.innerText = "🎉";
                    break;
                case "07":
                    child2.id = "emoticon-06" + String(i) + " emoticonBody";
                    emoticonBodyVal = "07";
                    child3 = document.createElement('img')
                    child3.src = "../icon/pink.svg"
                    break;
                case "":
                    child2.id = "emoticon-06" + String(i) + " emoticonBody";
                    emoticonBodyVal = "0a";
                    child3 = document.createElement('img')
                    child3.src = "../icon/orange.svg"
                    break;
                case "09":
                    child2.id = "emoticon-06" + String(i) + " emoticonBody";
                    emoticonBodyVal = "09";
                    child3 = document.createElement('img')
                    child3.src = "../icon/yellow.svg"
                    break;
                case "0b":
                    child2.id = "emoticon-06" + String(i) + " emoticonBody";
                    emoticonBodyVal = "0b";
                    child3 = document.createElement('img')
                    child3.src = "../icon/green.svg"
                    break;
                case "08":
                    child2.id = "emoticon-06" + String(i) + " emoticonBody";
                    emoticonBodyVal = "08";
                    child3 = document.createElement('img')
                    child3.src = "../icon/blue.svg"
                    break;
                case "06":
                    child2.id = "emoticon-06" + String(i) + " emoticonBody";
                    emoticonBodyVal = "06";
                    child3 = document.createElement('img')
                    child3.src = "../icon/rby.svg"
                    break;
            }
            child3.className = "emoticon";
            element = document.getElementById(lastElement);
            element.appendChild(child3);
            lastElement = "emoticon" + String(i);


        }

    }
});
function kill(){
    try {
        child.kill();
    }catch (e) {}
    location.reload();
}