var LoginPanel = require('./components/LoginPanel.react.js');
var RecordsInbox = require('./components/RecordsTable.react.js');
var React = require('react');

Parse.initialize('OtTy8RwvIyfGsNQ00ucApRWMc2Wl3Uh4pUT98ODq', 'oKs3n3P0P1pLTbQukkdsTQBhgW3U038YAzcZlfyT');

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
