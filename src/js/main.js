var LoginPanel = require('./components/LoginPanel.react.js');
var React = require('react');

var dayOfWeek = Array();

dayOfWeek[0] = 'Sun';
dayOfWeek[1] = 'Mon';
dayOfWeek[2] = 'Tue';
dayOfWeek[3] = 'Wed';
dayOfWeek[4] = 'Thu';
dayOfWeek[5] = 'Fri';
dayOfWeek[6] = 'Sat';

Parse.initialize('OtTy8RwvIyfGsNQ00ucApRWMc2Wl3Uh4pUT98ODq', 'oKs3n3P0P1pLTbQukkdsTQBhgW3U038YAzcZlfyT');

React.render(
    <LoginPanel />,
    document.getElementById('login-panel')
);
