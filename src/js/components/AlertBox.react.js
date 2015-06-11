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
