const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('userId');
const matchId = urlParams.get('matchId');
const score = urlParams.get('score');

if (!userId || !matchId || !score) window.location.href = '/';
else getFriend();

async function getFriend() {
    const getFriend = await $.ajax({
        url: '/api/friends/' + matchId,
        method: 'GET'
    }).catch(err => console.log('Unable to find that friend!', err));

    if (getFriend) displayFriendInfo(getFriend);
}

function displayFriendInfo(friend) {
    $('#friend-info').append(
        `<h1>${friend.name}</h1>
        <div class="results-flex">
            <img src="http://via.placeholder.com/200x200">
            <div class="results-details">
                <p>Your match score:</p>
                <h2>${score}</h2>
                <a class="button" href="mailto:someone@yoursite.com?subject=We Matched on Friend Match!">Get in Touch!</a>
            </div>
        </div>`
    )
}