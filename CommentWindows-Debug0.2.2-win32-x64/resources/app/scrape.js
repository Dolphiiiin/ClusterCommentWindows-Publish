const { exec } = require('child_process')

exec('\"C:\\Program Files\\Wireshark\\tshark.exe\" -i Wi-Fi -Y \"mqtt.topic contains comment\" -x');