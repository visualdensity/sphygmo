
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


//React.render(
//    <EntryBox />,
//    document.getElementById('entry')
//);
