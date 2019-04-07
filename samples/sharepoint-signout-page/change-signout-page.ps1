# initializes variable
$webAppUrl = "https://webappurl"
$relativePathToCustomSignoutPage = "/_layouts/15/AccessDeniedSignout.aspx"
# updates sharepoint
Set-SPCustomLayoutsPage -Identity AccessDenied -RelativePath $relativePathToCustomSignoutPage -WebApplication $webAppUrl
# resets iis
iisreset /noforce