# auto-print
[Windows] Watches a folder or network drive location, prints documents found with foxitreader call. 

# Install/Setup instructions
Ensure you have NodeJS, NPM and foxit reader installed.

Download the .zip and extract or clone to a location on your computer

Open cmd and run 'npm install' within the folder

# Start
To start the application simply run like so;

`node index.js <folder to watch> "<foxit reader.exe location>" "<printer name>"`

Standard example:

`node index.js "C:\files\autoprint" "C:\Program Files (x86)\Foxit Software\Foxit Reader\FoxitReader.exe" "HP Officejet Pro"`

Network folder/Network printer example:

`node index.js \\PC-ON-NETWORK\files\autoprint "C:\Program Files (x86)\Foxit Software\Foxit Reader\FoxitReader.exe" "PN-TH-DISP03\Printer Name"`
