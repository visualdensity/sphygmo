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
                <div className="col-md-6">
                    <div className="alert alert-success alert-dismissable" role="alert">
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        { this.props.message }
                    </div>
                </div>
            </div>
        )

        var delay = 3000;
        setTimeout(function(){
            $('#notify-panel').alert('close');
        }, delay);
    }
});
