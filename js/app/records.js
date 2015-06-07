var RecordsInbox = React.createClass({
    loadRecords: function() {
        parseRecords = Parse.Object.extend("Record");
        query = new Parse.Query(parseRecords);
        query.equalTo('User', me);
        query.descending('createdAt');
        query.limit(6);

        query.find({
            success: function(records) {
                var recs = [];
                var count = records.length;
                for(var i=0; i < count; i++) {
                    r = records[i];
                    var createdDate = r.createdAt.getDay() + '/' + r.createdAt.getMonth() + '/' + r.createdAt.getYear() + ' ' + r.createdAt.getHours() + ':' + r.createdAt.getMinutes();

                    recs.push( {
                        created  : createdDate,
                        sistolic : r.get("systolic"),
                        diastolic: r.get("diastolic"),
                        heartrate: r.get("heartrate"),
                    });
                }
                this.setState({ bpData: recs });

            }.bind(this),

            error: function(error) {
                console.log("Error: " + error.code + " " + error.message);
            }.bind(this)
        });
    },

    handleEntrySubmit: function(entry) {

        var Record = Parse.Object.extend('Record');
        var rec = new Record();

        rec.set('systolic' , parseInt(entry.systolic)  );
        rec.set('diastolic', parseInt(entry.diastolic) );
        rec.set('heartrate', parseInt(entry.heartrate) );
        rec.set('User'     , me );

        rec.setACL(new Parse.ACL(me));

        rec.save(
            null,
            {
            success: function(record) {
                console.log('Record saved: ' + record.id);
                React.render(
                    <AlertBox message="Record saved! Entries will update shortly" />,
                    document.getElementById('alert-box')
                );
                //this.loadRecords();
            },
            error: function(record, error) {
                console.log('Failed to create new object, with error: ');
                console.log(error);
            }
        });

        return;
    },

    getInitialState: function() {
        return { bpData: []};
    },

    componentDidMount: function() {
        this.loadRecords();
        setInterval(this.loadRecords, 5000);
    },

    render: function() {
        return(
            <section>
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">New Record</h3>
                    </div>
                    <div className="panel-body">
                        <EntryBox onEntrySubmit={this.handleEntrySubmit} />
                    </div>
                </div>

                <div className="panel panel-success">
                    <div className="panel-heading">
                        <h3 className="panel-title">Last 6 Records</h3>
                    </div>
                    <RecordsList data={this.state.bpData} />
                </div>
            </section>
        )
    }
});


var RecordLine = React.createClass({
    render: function() {
        return(
            <tr>
                <td>{ this.props.data.created }</td>
                <td>{ this.props.data.sistolic }/{ this.props.data.diastolic }</td>
                <td>{ this.props.data.heartrate }</td>
            </tr>
        )
    }
});

var RecordsList = React.createClass({
    render: function() {
        var recordItems = this.props.data.map(function(rec) {
            return (
                <RecordLine data={ rec }></RecordLine>
            )
        });

        return(
            <table className="table table-bordered">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>BP</th>
                    <th>HR</th>
                </tr>
            </thead>
            <tbody>
                { recordItems }
            </tbody>
            </table>
        )
    }
});

