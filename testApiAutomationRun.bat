@echo off
REM =============================================================================
REM   History.  This file is a copy of what I had in d:\cx-test-sources and 
REM   was using to run all my scheuled exection there.

for /f "tokens=2-8 delims=/:. " %%A in ("%date%:%time%: =0%%") do set "TIMESTAMP=%%C%%A%%B-%%D%%E"
set LOGFILE=run_%TIMESTAMP%.log

REM 7/17/18 Changing redirection output taking drive and directory away
REM echo %TIMESTAMP% starting an API Test Run >> D:\dd-cx-testApi\echo_out.txt
echo %TIMESTAMP% starting an API Test Run >> ApiTestRun_out.txt



REM The next two lines should have no effect but I'd like to be explicit about where I am
REM d:
REM cd \dd-cx-testApi
REM 7/17/18 the above two lines are absolutely the wrong thing to do w.r.t 
REM Jenkins controlled test Initiated job.  Realistically this repo and batch file
REM could be cloned into who knows what directory name ( in the future )
REM So, we just have to assume everything is alright and ready to go.
REM ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::


REM let's try something new
call npm run enrollClaimApidit -- --suite=devAuto2

echo %TIMESTAMP%" calling taskkill /F /IM chromedriver_2.38.exe & 40" >> ApiTestRun_out.txt
call taskkill /F /IM chromedriver_2.38.exe
call taskkill /F /IM chromedriver_2.40.exe



