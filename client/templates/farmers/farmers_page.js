Template.farmersPage.helpers({
    date: function() {
        //get the date mm/dd/yyyy
        var today = this.farmer.joined;
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();
        if(dd<10) {
            dd='0'+dd
        }
        if(mm<10) {
            mm='0'+mm
        }
        today = mm+'/'+dd+'/'+yyyy;
        return today;
    }
});
