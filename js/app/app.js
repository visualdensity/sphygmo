Parse.initialize('SwYjBCwiMnbmFBc6v55sFPiLq5zo5Z5hUnLqI5ok', '64Rfy4R4XsKxa2xpWphWAKz3tK70NBxaqUlv0XYi');

if( Parse.User.current() == null ) {
    console.log('user does not exist');

    React.render(
        <LoginPanel />,
        document.getElementById('login-panel')
    );

} else {
    console.log('user exists');
    console.log(Parse.User.current());

    React.render(
        <RecordsInbox />,
        document.getElementById('records')
    );
}

$(function() {

    $('#logout-btn').click(function() {
        Parse.User.logOut().then(function(results) {
            console.log('Logged out');
            location.reload();
        }, function(err) {
            console.log('Errord');
            console.log(err);
        });
    });//logout button

});
