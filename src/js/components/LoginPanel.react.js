/**
 * @providersModule LoginPanel
 * @jsx React.DOM
 */
var React = require('react');
var RecordsInbox = require('./RecordsTable.react.js');

var LoginPanel = React.createClass({
    handleLogin: function(e) {
        e.preventDefault();

        $('#login-btn').val('Logging you in...');
        $('#login-btn').attr('disabled', 'disabled');

        /**
         * If using React > 0.13, use this:
         * --
         * var username = React.findDOMNode(this.refs.username).value.trim();
         * var password = React.findDOMNode(this.refs.password).value.trim();
         */
        var username = this.refs.username.getDOMNode().value.trim();
        var password = this.refs.password.getDOMNode().value.trim();

        Parse.User.logIn(username, password, {
            success: function(user) {
                $('#login-panel').empty();

                React.render(
                    <RecordsInbox />,
                    document.getElementById('records')
                );
            },
            error: function(user, error) {
                console.log(error);
            }
        });
    },

    render: function() {
        return (
            <section>
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title"><span className="glyphicon glyphicon-home"></span> Login</h3>
                    </div>
                    <div className="panel-body">
                        <form onSubmit={this.handleLogin}>
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <input type="text" className="form-control" id="username" ref="username" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" className="form-control" id="password" ref="password" />
                            </div>

                            <input type="submit" value="Log Me In" id="login-btn" className="btn btn-primary" />
                        </form>
                    </div>
                </div>
            </section>
        )
    }
});

module.exports = LoginPanel;
