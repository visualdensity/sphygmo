Parse.initialize('SwYjBCwiMnbmFBc6v55sFPiLq5zo5Z5hUnLqI5ok', '64Rfy4R4XsKxa2xpWphWAKz3tK70NBxaqUlv0XYi');

if( Parse.User.current() == null ) {
    console.log('user does not exist');
    Parse.User.logIn("wickd", "abcd1234", {
        success: function(user) {
            me=Parse.User.current();
            React.render(
                <RecordsInbox pollTime="2000" />,
                document.getElementById('records')
            );
        },
        error: function(user, error) {
            console.log(error);
        }
    });
} else {
    console.log('user exists');
    console.log(Parse.User.current());

    React.render(
        <RecordsInbox pollTime="2000" />,
        document.getElementById('records')
    );
}

