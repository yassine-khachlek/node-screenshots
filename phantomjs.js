 
var webPage = require('webpage'); 
var page = webPage.create(); 
page.viewportSize = { width: 1024, height: 768 }; 
page.viewportSize = { width: 384, height: 640 }; 
//page.clipRect = { top: 0, left: 0, width: 1024, height: 768 }; 
page.onLoadFinished = function() { 
    console.log('page.onLoadFinished'); 
}; 
page.open('https://m.facebook.com/?_rdr', function(status) { 
  if (status !== 'success') { 
    console.log('Unable to load the address!'); 
    phantom.exit(); 
  }else{ 
	page.evaluate(function() { 
	  if(!document.body.style.backgroundColor){ 
	  	document.body.style.backgroundColor = '#fff'; 
	  } 
	}); 
    window.setTimeout(function () { 
	  page.render('https___m_facebook_com___rdr.png'); 
	  phantom.exit(); 
    }, 10000); 
  }; 
}); 
