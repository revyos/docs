# Restart Test

## Summary
Perform a restart test on the entire machine using a script.

## Test Item Description
Check if there are any issues such as freezing when the test machine is restarted.

## Test Plan
Conduct restart tests 500 times.

## Operating Steps

Create a restart script named cycletest.service_ in /lib/system/system:

```
[Unit]
Description=Reboots unit after 30s

[Service]
StandardOutput=syslog+console
ExecStart=/bin/sh -c "\
test -f /cycle-count || echo 0 > /cycle-count;\
echo 'starting cycletest';\
sleep 30;\
expr `cat /cycle-count` + 1 > /cycle-count;\
systemctl reboot;\
"

[Install]
WantedBy=multi-user.target
```

Then install and start the test with the following commands:

```
systemctl daemon-reload
systemctl enable cycletest.service (enable the service to start on reboot)
systemctl start cycletest.service (start the service, should reboot in 30s)
```
