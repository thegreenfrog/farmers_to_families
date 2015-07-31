Template.produceItem.helpers({
    date: function() {
        //get the date mm/dd/yyyy
        var today = this.joined;
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();
        var hour = today.getHours();
        var min = today.getMinutes();
        if(dd<10) {
            dd='0'+dd
        }
        if(mm<10) {
            mm='0'+mm
        }
        var halfday = 'AM';
        if(hour === 24) {
            hour -=12;
        } else if(hour > 12) {
            hour -= 12
            halfday = 'PM';
        }
        if(min<10) {
            min = '0'+min;
        }
        today = mm+'/'+dd+'/'+yyyy + '  ' +hour+':'+min+' '+halfday;
        return today;
    }
});