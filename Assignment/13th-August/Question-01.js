import os from 'os';

// Convert bytes to GB
const bytesToGB = (1024 ** 3);

const platform = os.platform();
const architecture = os.arch();
const totalRAM = (os.totalmem() / bytesToGB).toFixed(2);
const freeRAM = (os.freemem() / bytesToGB).toFixed(2);

// os.uptime() gives seconds. Divide by 3600 to get hours.
const uptimeHours = (os.uptime() / 3600).toFixed(2);

console.log("--- System Information ---");
console.log(`1. Platform: ${platform}`);
console.log(`2. CPU Architecture: ${architecture}`);
console.log(`3. Total RAM: ${totalRAM} GB`);
console.log(`4. Free RAM: ${freeRAM} GB`);
console.log(`5. System Uptime: ${uptimeHours} hours`);