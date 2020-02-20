rem @echo off

:begin

cmd /c npm run enrollApimot3 -- --suite=claimsAPI
echo ----NEXT-----

cmd /c npm run enrollApimot3 -- --suite=claimsAPI
echo ----NEXT-----

cmd /c npm run enrollApimot3 -- --suite=claimsAPI
echo back to the beginning

goto begin