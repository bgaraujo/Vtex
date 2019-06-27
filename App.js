function myApp() {

    const _this = myApp;
    const credentials = {
        AppToken:"",
        AppKey:"",
        Company:""
    };
    const subscriptionReportData = {
        email:"",
        startDate:"",
        endDate:""
    }

    
	_this.init = () => {
        _this.getHeaderToken();        
    };

    _this.getHeaderToken = () => {
        var all =  window.location.search.substr( 1 , window.location.search.length);
        var arrGet = all.split('&')
        for( var i in arrGet ){
            var $_GET = arrGet[i].split('=');
            if( $_GET[0] === "key")
                $("[data-credential=key]").val( $_GET[1] );
            if( $_GET[0] === "token")
                $("[data-credential=token]").val( $_GET[1] );
            if( $_GET[0] === "company")
                $("[data-credential=company]").val( $_GET[1] );

        }
    }
    
    _this.getReport = () => {
        var settings = {
            "url": "http://"+credentials.Company+".vtexcommercestable.com.br/api/rns/report/subscriptionsByDate?requesterEmail="+subscriptionReportData.email+"&beginDate="+_this.decodeDateEn(subscriptionReportData.startDate)+"&endDate="+_this.decodeDateEn(subscriptionReportData.endDate)+"",
            "method": "POST",
            "type": "POST",
            "headers": {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "X-VTEX-API-AppToken": credentials.AppToken,
                "X-VTEX-API-AppKey": credentials.AppKey,
                "Connection": "keep-alive",
                "cache-control": "no-cache"
            }
          }
          
          $.ajax(settings).done(function (response) {
            console.log(response);
          });
    }

    _this.getFormData = () => {
        
        $("[data-report]").each( function() {
            if( $(this).val() !== "" )
                subscriptionReportData[$(this).data("report")] = $(this).val();
        });

        for( var i in subscriptionReportData )
            if(subscriptionReportData[i] === "" )
                return false; 
        
        credentials.AppKey = $("[data-credential=key]").val();
        credentials.AppToken = $("[data-credential=token]").val();
        credentials.Company = $("[data-credential=company]").val();

        _this.getReport();

    }

    _this.decodeDateEn = (date) => {
        var day  = date.split("/")[0];
        var month  = date.split("/")[1];
        var year  = date.split("/")[2];
      
        return year + '' + ("0"+month).slice(-2) + '' + ("0"+day).slice(-2);
    }

    $("[data-report=submit]").on("click",() => {
        _this.getFormData();
    });

	_this.init();
}

$(document).ready(function(){
    myApp();
    $('.date').datepicker({
        language: "pt-br",
        autoclose: true,
        todayHighlight: true,
        format: 'dd/mm/yyyy' 
    });
});