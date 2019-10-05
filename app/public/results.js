const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('userId');
const matchId = urlParams.get('matchId');

if (!userId || !matchId) window.location.href = '/';
else {
    getFriend();
}

async function getFriend() {
    const getFriend = await $.ajax({
        url: '/api/friends/' + matchId,
        method: 'GET'
    }).catch(err => console.log('Unable to find friend!', err));

    if (getFriend) {
        console.log(getFriend);
    }
}