@echo off
REM =============================================================================
REM 8/9/18 Assumption made in following block.[ 9/19/18 update: the entire file 
REM The Jenkins Slave AWS03 machine has 
REM drive R:  mapped to the share named CX_Rpt_Root == D:\RootCXReports from the 
REM BASTION SAC server. AnchorFile.txt is a file on SAC drive shared, accessed through 
REM R: on jenkins slave. IF it is not visible the report is stored locally
REM 9/19/18 the yes version of my parameter analysis has been successful and the most uncomplicated
REM  10/8/18 copied from testPD  to Test

for /f "tokens=2-8 delims=/:. " %%A in ("%date%:%time%: =0%%") do set "TIMESTAMP=%%C%%A%%B-%%D%%E"
set LOGFILE=run_%TIMESTAMP%.log

echo Starting report rename and movement.
echo Arg_1 is %1
echo Arg_2 is %2
echo We continue ...........

REM      ::::::::::::: Testing calls ::::::::::::::::::::::::::::::::::::::::::::::::::
 	if [%1] == [regression] ( 
	     echo First Conditional check Arg[1]==: %1% 
rem		 echo jumping to one_Jump
rem		 goto one_jump )
rem	  ) else ( 
rem	     echo arg1 does not match expectation.  It should be regression : %1% 
	)
	
	if [%1] == [moveTagFile] ( 
	     echo Second Check of the First Arg 
	     echo the second argument is the file to be moved %2 
		 echo going to TAG_MOVE
		 goto tagMove )

:one_jump	
	
REM  :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
REM  Explicitly delete any drive mappings prior to setting the map below
echo %TIMESTAMP% Setting up drive mappings:  Delete any existing drives first

REM  ::::::::::::: Insurance call :::::::::::::::::::::::::::::::::::::::::::::::::::
if not exist R:\  (
    echo "setting up R: with call to net use R: \\SACAPPSEID01\CX_Rpt_Root"
    net use R: \\SACAPPSEID01\CX_Rpt_Root
)



REM  What about creating a daily log %TIMESTAMP%_rptRename_LOG.txt  or a per execution log file
REM  that gets added to a zip file on every execution
echo %TIMESTAMP% starting a Market Place rename_Dashboard_Rpt.bat adding %TIMESTAMP% to the file name >> rptRename_LOG.txt 2>&1


echo %TIMESTAMP% rename  dashboardNGTA.html  to  dashboardNGTA_%TIMESTAMP%.html
call rename dashboardNGTA.html dashboardNGTA_%TIMESTAMP%.html


if exist R:\AnchorFile.txt (
	REM echo if Exist AnchorFile 
	goto AnchorFile
)

if not exist R:\AnchorFile.txt (
    REM echo if Not Exist AnchorFile
	goto NoAnchorfile
)

:AnchorFile
if [%1] == [regression] (
	goto YAnchorYRegression
)

if [%1] == [] (
	goto YAnchorNRegression
)

:NoAnchorfile
if [%1] == [regression] (
	goto NAnchorYRegression
)

if [%1] == [] (
	goto NAnchorNRegression
)

REM  :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
REM  I need to test in a controlled envrionment if r_Dest actually works.
REM  I had probmems in marketplace Jenkins   
:YAnchorYRegression
REM Her is where I am  MP --  R:\MarketPlace\Regression

REM ------------------------------------------------------------------------
REM 11/28/18 commenting this out cuz im only calling this as ClaimsOnly testing
REM for /f "tokens=2-8 delims=/:. " %%A in ("%date%:%time%: =0%%") do set "CurrentDateTime=%%C%%A%%B-%%D%%E"
REM echo %CurrentDateTime% >> R:\MP_RegressionFileMove.txt 2>&1
REM call copy dashboardNGTA_%TIMESTAMP%.html R:\MarketPlace\regression\P_O_C__VinayConfig >> R:\MP_RegressionFileMove.txt 2>&1

REM if exist R:\MarketPlace\regression\P_O_C__VinayConfig\dashboardNGTA_%TIMESTAMP%.html (

	REM echo dashboardNGTA_%TIMESTAMP%.html copied to R:\MarketPlace\regression\P_O_C__VinayConfig >> R:\MP_RegressionFileMove.txt 2>&1
	REM echo zipping all HTML to archive file >> R:\MP_RegressionFileMove.txt 2>&1
	REM "D:\Program Files (x86)\7-Zip\7za" a HTML_Report_Archive.zip *.html >> R:\MP_RegressionFileMove.txt 2>&1
	REM echo "now deleting all remaining HTML files clearing the project directory" >> R:\MP_RegressionFileMove.txt 2>&1
	REM del *.html >> R:\MP_RegressionFileMove.txt 2>&1
	REM ) else (
	REM echo "Failure to copy dashboardNGTA_%TIMESTAMP%.html to R:\MarketPlace\regression\P_O_C__VinayConfig" >> R:\MP_RegressionFileMove.txt 2>&1
REM )

REM REM  Generate the reporting repository index update
REM R: 
REM call R:\GenIndex.bat
REM R: 
REM call R:\GenFullIndex.bat

REM goto end
REM ------------------------------------------------------------------------
REM 11/28/18 commenting this out cuz im only calling this as ClaimsOnly testing

REM :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
REM This is the Jenkins_Acceptance  r_Dest=R:\MarketPlace\JenkinsBuild_Acceptance
REM Order of what's going on
REM Set the current time var so that log file shows when file is moved vs when file name was created CurrentDateTime vs TIMESTAMP
REM I tried to use a var to shorted the text/code in the script.  maybe I need to use just %r_Dest  instead of %r_Dest%
REM copy to Report central and capture stdErr with stdOut in the MP_JenkinsBuildFileMove log file
REM check to see if it made it to the Report Central location
REM Regenerate the index files for web browsing.  Full index allows me to see the text file in the root
:YAnchorNRegression
	REM  1/11/19 taking the for look %CurrentDateTime% envar out of the code
    REM for /f "tokens=2-8 delims=/:. " %%A in ("%date%:%time%: =0%%") do set "CurrentDateTime=%%C%%A%%B-%%D%%E"
	REM  Putting %TIMESTAMP% back in place of %CurrentDateTime%
	 
     set r_Dest=R:\RESTApi\Regress__ClaimsOnly
	 
     echo YAnchorNRegression Start
     call copy dashboardNGTA_%TIMESTAMP%.html R:\RESTApi\Regress__ClaimsOnly >> R:\API_JenkinsBuildFileMove.txt 2>&1
     echo copy of dashboardNGTA_%TIMESTAMP%.html finished.  Checking destination
	 
     if exist R:\RESTApi\Regress__ClaimsOnly\dashboardNGTA_%TIMESTAMP%.html (
	    echo %TIMESTAMP% dashboardNGTA_%TIMESTAMP%.html copied to R:\RESTApi\Regress__ClaimsOnly >> R:\API_JenkinsBuildFileMove.txt 2>&1
	  ) else (
	  echo %TIMESTAMP% Failure to copy dashboardNGTA_%TIMESTAMP%.html to R:\RESTApi\Regress__ClaimsOnly >> R:\API_JenkinsBuildFileMove.txt 2>&1
     )

REM  Generate the reporting repository index update
REM cmd /c  R:\GenIndex.bat
REM cmd /c  R:\GenFullIndex.bat
REM cmd /c  R:\GenAltx.bat
REM  These have all been replaced with a jenkins cron job XX_CronForBatchFiles job

goto end


REM  FIX All THE INCORRECTLY PRODUCT LABLES     PD VS MP IN THIS FILE
REM ------------------------------------------------------------------------
REM 11/28/18 commenting this out cuz im only calling this as ClaimsOnly testing
:NAnchorYRegression

REM ------------------------------------------------------------------------
REM 11/28/18 commenting this out cuz im only calling this as ClaimsOnly testing
REM 1/10/19 I put this code is in the wrong place !   Copied into proper loc :NAnchorNRegression
    echo NAnchorNRegression Start: Special Case : Could not get to drive R.  >> C:\TestReportLoc\RESTApi_ClaimsFileMove.txt 2>&1
	
    echo %TIMESTAMP% >> C:\TestReportLoc\RESTApi_ClaimsFileMove.txt 2>&1
    call copy dashboardNGTA_%TIMESTAMP%.html  C:\TestReportLoc\RESTApi\Regress__ClaimsOnly  >> C:\TestReportLoc\RESTApi_ClaimsFileMove.txt 2>&1
	 
	if exist C:\TestReportLoc\RESTApi\Regress__ClaimsOnly\dashboardNGTA_%TIMESTAMP%.html (
	 echo dashboardNGTA_%TIMESTAMP%.html copied to C:\TestReportLoc\RESTApi\Regress__ClaimsOnly >> C:\TestReportLoc\RESTApi_ClaimsFileMove.txt 2>&1
	) else (
	 echo Failure to copy dashboardNGTA_%TIMESTAMP%.html to C:\TestReportLoc\ProviderDirectory\Regression >> C:\TestReportLoc\RESTApi_ClaimsFileMove.txt 2>&1
	)
 goto end
REM ------------------------------------------------------------------------
REM 11/28/18 commenting this out cuz im only calling this as ClaimsOnly testing

:NAnchorNRegression
REM 1/10/19  Code Below identical to code above, but this is the proper location.

    echo NAnchorNRegression Start: Special Case : Could not get to drive R.  >> C:\TestReportLoc\RESTApi_ClaimsFileMove.txt 2>&1
	
    echo %TIMESTAMP% >> C:\TestReportLoc\RESTApi_ClaimsFileMove.txt 2>&1
    call copy dashboardNGTA_%TIMESTAMP%.html  C:\TestReportLoc\RESTApi\Regress__ClaimsOnly  >> C:\TestReportLoc\RESTApi_ClaimsFileMove.txt 2>&1
	 
	if exist C:\TestReportLoc\RESTApi\Regress__ClaimsOnly\dashboardNGTA_%TIMESTAMP%.html (
	 echo dashboardNGTA_%TIMESTAMP%.html copied to C:\TestReportLoc\RESTApi\Regress__ClaimsOnly >> C:\TestReportLoc\RESTApi_ClaimsFileMove.txt 2>&1
	) else (
	 echo Failure to copy dashboardNGTA_%TIMESTAMP%.html to C:\TestReportLoc\ProviderDirectory\Regression >> C:\TestReportLoc\RESTApi_ClaimsFileMove.txt 2>&1
	)
 goto end


REM ------------------------------------------------------------------------
REM 11/28/18 commenting this out cuz im only calling this as ClaimsOnly testing

REM echo %TIMESTAMP% >> C:\TestReportLoc\PD_JenkinsBuildFileMove.txt 2>&1
REM call copy dashboardNGTA_%TIMESTAMP%.html C:\TestReportLoc\ProviderDirectory\JenkinsBuild >> C:\TestReportLoc\PD_JenkinsBuildFileMove.txt 2>&1
REM if exist C:\TestReportLoc\ProviderDirectory\JenkinsBuild\dashboardNGTA_%TIMESTAMP%.html (
	REM echo "dashboardNGTA_%TIMESTAMP%.html copied to C:\TestReportLoc\ProviderDirectory\JenkinsBuild" >> C:\TestReportLoc\PD_JenkinsBuildFileMove.txt 2>&1
REM ) else (
	REM echo "Failure to copy dashboardNGTA_%TIMESTAMP%.html to CC:\TestReportLoc\ProviderDirectory\JenkinsBuild" >> C:\TestReportLoc\PD_JenkinsBuildFileMove.txt 2>&1
REM )
REM goto end


:tagMove
     echo AT TAG MOVE
     call copy %2  R:\RESTApi\pf-claims-service  >> R:\Tagged_Reports_FileMove.txt 2>&1

:end
     echo at End 
     echo Im Out
	 echo ......
	 echo ....
	 echo ..
	 echo .

REM ------------------------------------------------------------------------
REM 11/28/18 commenting this out cuz im only calling this as ClaimsOnly testing

REM ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
REM  Moving Historical comments to the bottom of the file where it won't continually
REM  push code down.
REM 7/26/18 This is a copy of the jenking_mp_AutomationRun.bat
REM Purpose:  To rename dashboardNGTA.html to dashboardNGTA<%TIMESTAMP%>.html 
REM 8/9/18 And now to move it off to the SAC machine where I can publish with nginx
REM 8/17/18 ToDo:  Need to check for $1 argument == "regression"
REM		With this implementation I can put the test report from regression test in 
REM		a directory for regression tests.
REM  9/14/18 Refactoring for Provider Directory
REM  Still treating this as a multi use batch file one with arg regresison without from Jenkins

REM 11/2/18  net use /delete /y R:       Got a system Error 85 that relates to setting ..
REM 11/2/18  Taking this out net use R: \\SACAPPSEID01\CX_Rpt_Root .. drive mapping that already exist.  