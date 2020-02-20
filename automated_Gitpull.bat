@echo off
REM =============================================================================
REM   History.  This file is a copy of what I had in d:\cx-test-sources and 
REM   was using to run all my scheuled exection there.
REM   8/17/18 This file is associated with the Bastion net SAC machine
REM   	It is specifically for the Regression experience. This runs on a schedule
REM		and updates that repo every 2 hours
REM   
for /f "tokens=2-8 delims=/:. " %%A in ("%date%:%time%: =0%%") do set "TIMESTAMP=%%C%%A%%B-%%D%%E"
set LOGFILE=run_%TIMESTAMP%.log

echo %TIMESTAMP% Repo update dd-cx-testApi  >> D:\dd-cx-testApi\automated_GitPull.txt

d:
cd \dd-cx-testApi

Rem What about with proper PAT  vs user name and ....
call git pull "https://ca34081:54464df1baeeb0707e942c1aa79e2da6f9c54a19@rc-lx842.ut.dentegra.lab/DEVPROJECTS/dd-cx-testApi.git" dev >> D:\dd-cx-testApi\automated_GitPull.txt
REM call git pull >> D:\dd-cx-testApi\XXautomated_GitPull.txt

call echo %TIMESTAMP% exiting automted Git PUll >> D:\dd-cx-testApi\automated_GitPull.txt

exit



