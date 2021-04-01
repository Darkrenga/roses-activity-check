const OWNER = document.getElementById('OWNER');
const CHIEF = document.getElementById('CHIEF');
const STRATEGIST = document.getElementById('STRATEGIST');
const CAPTAIN = document.getElementById('CAPTAIN');
const RECRUITER = document.getElementById('RECRUITER');
const RECRUIT = document.getElementById('RECRUIT');


let myData = fetchData('https://api.wynncraft.com/public_api.php?action=guildStats&command=Roses');


function fetchData(apiUrl) {
    console.log("Starting To Fetch");

    fetch(apiUrl)
    .then((res) => {  return res.json();  })
    .then((data) => {  createView(data.members);  })
    .catch(  );
}


function createView (members) {
    for (const member of members) {
        let memberInfo = `<div id="${member.name}" class="playerName">
        <span>${member.name} Was Last Online: </span><span id="${member.uuid}">Couldn't find date</span>
        </div>`
        if (member.rank === "OWNER") {
            OWNER.innerHTML += memberInfo;
        } else if (member.rank === "CHIEF") {
            CHIEF.innerHTML += memberInfo;
        } else if (member.rank === "STRATEGIST") {
            STRATEGIST.innerHTML += memberInfo;
        } else if (member.rank === "CAPTAIN") {
            CAPTAIN.innerHTML += memberInfo;
        } else if (member.rank === "RECRUITER") {
            RECRUITER.innerHTML += memberInfo;
        } else if (member.rank === "RECRUIT") {
            RECRUIT.innerHTML += memberInfo;
        }
        fetchLastJoined(member.name);
    }
}


function fetchLastJoined (playerName) {
    fetch(`https://api.wynncraft.com/v2/player/${playerName}/stats`)
    .then((res) => {  return res.json();  })
    .then((data) => { addToView(data); })
    .catch(  );
}

function addToView(data) {
    // console.log(playerName + ' Was Last Online On : ' + data.data[0].meta.lastJoin);
    let lastOnline = data.data[0].meta.lastJoin;
    let uuid = data.data[0].uuid;
    let lastOnlineOut = document.getElementById(uuid);

    let lastOnlineYear = lastOnline.slice(0, 4);
    let lastOnlineMonth = lastOnline.slice(5, 7);
    let lastOnlineDay = lastOnline.slice(8, 10);
    let lastOnlineFinal = lastOnlineDay + '-' + lastOnlineMonth+ '-' + lastOnlineYear;

    lastOnlineOut.innerHTML = lastOnlineFinal;
}