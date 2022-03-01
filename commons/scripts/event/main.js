window.deviceIsAndroid = (window.navigator.userAgent.toLowerCase().search('android') > -1);
if (window.deviceIsAndroid) {
	targetDPI = 160;
	if (window.navigator.userAgent.match(/gt-p10\d0|sgh-i987|sph-p100|sgh-t849|sch-i800|shw-m180s|sc-01c/i)) targetDPI = 'device-dpi';
	document.write('<meta name="viewport" content="target-densityDpi='+targetDPI+',width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=no" />');
} else if (window.navigator.userAgent.match(/iphone|ipad|ipod/i)) {
	document.write('<meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />');
} else {
	document.write('<meta name="viewport" content="initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=no" />');
}

// Slide Fade Effect
$.fn.slideFadeToggle  = function(speed, easing, callback) {
        return this.animate({opacity: 'toggle', height: 'toggle'}, speed, easing, callback);
};


$(document).bind('pageinit',function(){
        //menu
        resetMenu();

        


	//photoswipe
        if($("#ambientazioni").length>0){
       		$("ul.gallery a").photoSwipe({autoStartSlideshow:true,captionAndToolbarAutoHideDelay:0});
        }
        
        
        //form validation
        if($("#frmContatti").length>0){
	        jQuery.extend(jQuery.validator.messages, {
		    required: "Campo obbligatorio",
		    email: "Indirizzo email non corretto"
		});
	    
		$("#frmContatti").validate({
			focusInvalid:false
		});				
	}


	   
});

var cswipe;
$(document).bind('pageshow',function(){
        //swipe
       if($("#collection-swipe").length>0){
        	cswipe = new Swipe(document.getElementById('collection-swipe'),{
			auto: 3000
		});
	}

       if($("#collection-swipe-home").length>0){
        	cswipeHome = new Swipe(document.getElementById('collection-swipe-home'),{
			auto: 3000
		});
	}
	
	
	if($("#pdf-viewer").length>0){
		setPdfHeight();
	}

});

function setPdfHeight(){
	$('#pdf-viewer').height(getIframeH());	
}

$('#c-next').live('tap',function(event){
	cswipe.next();
});

$('#c-prev').live('tap',function(event){
	cswipe.prev();
});


$('.bt-menu').live('tap',function(event){
	//toggle menu
	$(".menu").slideFadeToggle();
	$(this).find(".menu-icon").toggleClass("on");
});


$('.menu a').live('click',function(event){
 resetMenu();

});

function resetMenu(){
	//reset ad deafault menu styles
        $(".menu").css("display","none");
	$(".menu-icon").removeClass("on"); 

}

$('div[data-role=content]').live('tap',function(event){
       resetMenu();
});

$(window).on('scroll', function() {
if($(window).scrollTop() != 0)
{    
    if( $(window).height() + $(window).scrollTop() >= $(document).height() ) {
   // console.log("xxx");
    }
}
});


//Infinite scroll
//var curPage = -1;
$('#next-home-prod,#next-prod,#next-home-ref,#next-ref,#next-news').live('tap',function(event){
	event.preventDefault();

        curPage = $(this).data("curpage");
        curPage ++;
	
	$(this).data().curpage = curPage;

	loadMore($(this).attr("href")+curPage,$(".list-container ul"));
});

function loadMore(url,list){
	$.mobile.loading('show');

	var url = url;
	var params = {
		"func": "ajaxInlineView",
	        "ajaxView": "1"
	};
	$.ajax({
		url: url,
		type: 'post',
		data: params,
	 	success: function(data) {
                  
		       var totPageLoaded = $(data).find('#totpage').val();
	 	       if($('#totpage').val() != totPageLoaded){
	 	       		$('#totpage').val(totPageLoaded);
	 	       }

	 	       var itemsToAdd = $(data).find('ul li');
                       list.append(itemsToAdd).trigger('create');
		}
	}).done(function() { 
		$.mobile.loading('hide');
		
		if(curPage == $('#totpage').val()){
			$('.loader-list').hide();
		}
	});
}

$('#selProduct,#selAmbiente,#selColore').live('change',function(event){
        $.mobile.changePage($(this).val());
});

function getIframeH(){
    var content = $("#content:visible");
    var viewport_height = $(window).height();

    var content_height = viewport_height;
    
    /* Trim margin/border/padding height */
    content_height -= (content.outerHeight() - content.height());

	if(content_height>455){
		//return content_height-108;
	}else{
		//return content_height-50;

	}
    return content_height + 10;
}


  $(window).bind("orientationchange", function (event) {
	if($("#pdf-viewer").length>0){
		setPdfHeight();
	}
            

    });


$.urlParam = function(name){
    var results = new RegExp('[\\?&amp;]' + name + '=([^&amp;#]*)').exec(window.location.href);
    return results[1] || 0;
}

/********** GOOGLE ANALISTYCS *******************/
$(document).bind('pageshow', function() {
    sendGA();

});

function sendGA() {
    try {
        _gaq.push(['_setAccount', 'UA-12732418-8']);

        hash = location.hash;

        if (hash) {
            _gaq.push(['_trackPageview', hash.substr(1)]);
        } else {
            _gaq.push(['_trackPageview']);
        }
    } catch(err) {

    }

}