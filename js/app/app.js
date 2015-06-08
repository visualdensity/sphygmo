Parse.initialize('YOUR_PARSE_APP_KEY', 'YOUR_PARSE_JAVASCRIPT_KEY');

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
