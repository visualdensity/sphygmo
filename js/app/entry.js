var EntryBox = React.createClass({
    handleSubmit: function(e) {
        e.preventDefault();

        var syst  = React.findDOMNode(this.refs.syst ).value.trim();
        var diast = React.findDOMNode(this.refs.diast).value.trim();
        var heart = React.findDOMNode(this.refs.heart).value.trim();

        this.props.onEntrySubmit({systolic: syst, diastolic: diast, heartrate: heart} );

        React.findDOMNode(this.refs.syst ).value = '';
        React.findDOMNode(this.refs.diast).value = '';
        React.findDOMNode(this.refs.heart).value = '';

        return;
    },

    render: function() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="systolic">Systolic</label>
                    <input type="text" className="form-control" id="systolic" ref="syst" />
                </div>

                <div className="form-group">
                    <label htmlFor="diastolic">Diastolic</label>
                    <input type="text" className="form-control" id="diastolic" ref="diast" />
                </div>

                <div className="form-group">
                    <label htmlFor="heartrate">Heart Rate</label>
                    <input type="text" className="form-control" id="heartrate" ref="heart" />
                </div>

                <input type="submit" value="Save" className="btn btn-primary" />
            </form>
       );
    }
});

var AlertBox = React.createClass({
    render: function() {
        return (
            <div id="notify-panel" className="row">
                <div className="col-md-12">
                    <div className="alert alert-success alert-dismissable" role="alert">
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        { this.props.message }
                    </div>
                </div>
            </div>
        )
    }
});

var LoginPanel = React.createClass({
    handleLogin: function(e) {
        e.preventDefault();

        $('#login-btn').val('Logging you in...');
        $('#login-btn').attr('disabled', 'disabled');

        var username = React.findDOMNode(this.refs.username).value.trim();
        var password = React.findDOMNode(this.refs.password).value.trim();

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
