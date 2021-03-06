var assert = require("assert-plus"),
	libsyslog = require("../lib/syslog");

describe("syslog", function() {
	describe("decodeMessage()", function() {
		it("<30>Jun 28 11:23:07 ip-10-0-0-65 dhclient[1027]: DHCPACK from 10.0.0.1 (xid=0x4ac728df)", function(done) {
			libsyslog.decodeMessage("<30>Jun 28 11:23:07 ip-10-0-0-65 dhclient[1027]: DHCPACK from 10.0.0.1 (xid=0x4ac728df)", function(err, syslog) {
				if(err) {
					throw err;
				} else {
					assert.equal(syslog.facilityCode, 3);
					assert.equal(syslog.severityCode, 6);
					assert.equal(syslog.date, "Jun 28 11:23:07");
					assert.equal(syslog.host, "ip-10-0-0-65");
					assert.equal(syslog.app, "dhclient");
					assert.equal(syslog.pid, 1027);
					assert.equal(syslog.msg, "DHCPACK from 10.0.0.1 (xid=0x4ac728df)");
					done();
				}
			});
		});
		it("<13>Jun 28 13:25:14 ip-10-0-0-65 ec2-user: hello", function(done) {
			libsyslog.decodeMessage("<13>Jun 28 13:25:14 ip-10-0-0-65 ec2-user: hello", function(err, syslog) {
				if(err) {
					throw err;
				} else {
					assert.equal(syslog.facilityCode, 1);
					assert.equal(syslog.severityCode, 5);
					assert.equal(syslog.date, "Jun 28 13:25:14");
					assert.equal(syslog.host, "ip-10-0-0-65");
					assert.equal(syslog.app, "ec2-user");
					assert.equal(syslog.pid, undefined);
					assert.equal(syslog.msg, "hello");
					done();
				}
			});
		});
	});
});
