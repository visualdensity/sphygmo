/**
 * @jsx React.DOM
 */
var React        = require('react');
var LoginPanel   = require('./components/LoginPanel.react.js');
var RecordsInbox = require('./components/RecordsTable.react.js');

 Parse.initialize('CkdfhIeT92hRseDrVVCYXvbrV7OksKhJ7Cr9lhm9', 'EEBRKfn3LqXfmXw74Kd9oGnuTwD9z4tDo1iTzML2');

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
