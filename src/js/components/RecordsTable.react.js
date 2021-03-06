/**
 * @providesModule RecordsInbox
 * @jsx React.DOM
 */
var React = require('react');
var EntryBox = require('./EntryForm.react.js');
var AlertBox = require('./AlertBox.react.js');

var RecordsInbox = React.createClass({
    loadRecords: function() {
        var dayOfWeek = Array();

        dayOfWeek[0] = 'Sun';
        dayOfWeek[1] = 'Mon';
        dayOfWeek[2] = 'Tue';
        dayOfWeek[3] = 'Wed';
        dayOfWeek[4] = 'Thu';
        dayOfWeek[5] = 'Fri';
        dayOfWeek[6] = 'Sat';

        parseRecords = Parse.Object.extend("Record");
        query = new Parse.Query(parseRecords);
        query.equalTo('User', Parse.User.current());
        query.descending('createdAt');
        query.limit(6);

        query.find({
            success: function(records) {
                var recs = [];
                var count = records.length;
                for(var i=0; i < count; i++) {
                    r = records[i];

                    var createdDate = dayOfWeek[r.createdAt.getDay()] + ', ' + r.createdAt.toLocaleDateString();
                    var createdTime = r.createdAt.toLocaleTimeString();

                    recs.push( {
                        createdDate : createdDate,
                        createdTime : createdTime,
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
        rec.set('User'     , Parse.User.current());

        rec.setACL(new Parse.ACL(Parse.User.current()));

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
                        <h3 className="panel-title"><span className="glyphicon glyphicon-pencil"></span> New Record: {Parse.User.current().get('username')}</h3>
                    </div>
                    <div className="panel-body">
                        <EntryBox onEntrySubmit={this.handleEntrySubmit} />
                    </div>
                </div>

                <div className="panel panel-success">
                    <div className="panel-heading">
                        <h3 className="panel-title"><span className="glyphicon glyphicon-scale"></span> Last 6 Records</h3>
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
                <td><span className="bp-readout">{ this.props.data.sistolic }/{ this.props.data.diastolic }</span></td>
                <td><span className="bp-readout">{ this.props.data.heartrate }</span></td>
                <td>{ this.props.data.createdDate }</td>
                <td>{ this.props.data.createdTime }</td>
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
            <table id="bp-records" className="table table-bordered table-responsive">
            <thead>
                <tr>
                    <th>BP</th>
                    <th>HR</th>
                    <th>Date</th>
                    <th>Time</th>
                </tr>
            </thead>
            <tbody>
                { recordItems }
            </tbody>
            </table>
        )
    }
});

module.exports = RecordsInbox;
