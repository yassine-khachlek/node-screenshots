var path = require('path');
var fs = require('fs');
var exec = require('child_process').exec, child;

// var phantomjsExec = 'phantomjs --ignore-ssl-errors=true --ssl-protocol=any --debug=true';
var phantomjsExec = 'phantomjs --ignore-ssl-errors=true --ssl-protocol=any';
var phantomjsFileName = 'phantomjs.js';

var phantomjsFileContent = " \r\n\
var webPage = require('webpage'); \r\n\
var page = webPage.create(); \r\n\
page.viewportSize = { width: 1024, height: 768 }; \r\n\
page.viewportSize = { width: 384, height: 640 }; \r\n\
//page.clipRect = { top: 0, left: 0, width: 1024, height: 768 }; \r\n\
page.onLoadFinished = function() { \r\n\
    console.log('page.onLoadFinished'); \r\n\
}; \r\n\
page.open('screenCaptureUrl', function(status) { \r\n\
  if (status !== 'success') { \r\n\
    console.log('Unable to load the address!'); \r\n\
    phantom.exit(); \r\n\
  }else{ \r\n\
	page.evaluate(function() { \r\n\
	  if(!document.body.style.backgroundColor){ \r\n\
	  	document.body.style.backgroundColor = '#fff'; \r\n\
	  } \r\n\
	}); \r\n\
    window.setTimeout(function () { \r\n\
	  page.render('screenCaptureFileName.png'); \r\n\
	  phantom.exit(); \r\n\
    }, 10000); \r\n\
  }; \r\n\
}); \r\n\
";

/*
var phantomjsFileContent = " \r\n\
var webPage = require('webpage'); \r\n\
var page = webPage.create(); \r\n\
page.viewportSize = { width: 1024, height: 768 }; \r\n\
page.viewportSize = { width: 384, height: 640 }; \r\n\
//page.clipRect = { top: 0, left: 0, width: 1024, height: 768 }; \r\n\
page.onLoadFinished = function() { \r\n\
    console.log('page.onLoadFinished'); \r\n\
	page.render('screenCaptureFileName.png'); \r\n\
	phantom.exit(); \r\n\
}; \r\n\
page.open('screenCaptureUrl', function(status) { \r\n\
}); \r\n\
";
*/

var screenCaptureUrl = "https://www.facebook.com/ubuntulinux?fref=ts";
var screenCaptureUrl = "http://tanitjobs.com";
var screenCaptureUrl = "https://m.facebook.com/?_rdr";

var screenCaptureFileName = screenCaptureUrl.replace(/[^a-z0-9]/gi, '_').toLowerCase();

phantomjsFileContent = phantomjsFileContent.replace('screenCaptureUrl', screenCaptureUrl);
phantomjsFileContent = phantomjsFileContent.replace('screenCaptureFileName', screenCaptureFileName);

fs.writeFile(phantomjsFileName, phantomjsFileContent, function(err){
  if (err) throw err;

  console.log(phantomjsFileName + ' is written correctly.');

  child = exec(phantomjsExec + ' ' + phantomjsFileName,
    function (error, stdout, stderr) {
      if (stdout) {
        console.log('stdout: ' + stdout);
      }
      if (stderr) {
        console.log('stderr: ' + stderr);
      }      
      if (error !== null) {
        console.log('exec error: ' + error);
      }else{
        console.log('No runtime error.');
      }
  });

});