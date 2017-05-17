var vm = new Vue({
    el: '#HPBooks',
	
    data: {
        seeHP: true,
        seeGoT: false,
        seeDF: false,
        seeConfirm: false,
        total: 0,
        totalDiscount: 0,
        numOfDiscounts: 0,
        books: [0,0,0,0,0,0,0]
	
	},

    methods: {
         showHP: function(){
            this.seeConfirm= false;
            this.seeGoT= false;
            this.seeDF= false;
            this.seeHP= true;
        },
         showGoT: function(){
            this.seeConfirm= false;
            this.seeHP= false;
            this.seeDF= false;
            this.seeGoT= true;
        },
         showDF: function(){
            this.seeConfirm= false;
            this.seeGoT= false;
            this.seeHP= false;
            this.seeDF= true;
        },
        
        submitOrder: function() {
            this.total = 0;
            this.totalDiscount = 0;
            this.numOfDiscounts = 0;
	    this.calculateTotal();
	    this.calculateDiscount();
	    this.print();

        },
        
        calculateTotal: function() {
            var sum = 0;

	    for (i=0; i<7; i++) {
                sum += this.books[i];
	}
	    this.total = sum*100;
        },
        calculateDiscount: function() {
            var sum = 0;
	    var count = 0;
            var x = true;
            var booksOrdered = this.books;

            while(x) {
	        sum = 0;
	        count = 0;
	        for (i=0; i<7; i++) {
		    if (booksOrdered[i] >0) {
		        sum ++;
		        booksOrdered[i]--;
	    	    }
	    	    else {
		        count ++;
	    	    }
	        }
	        if (count == 7) {
	    	    x=false;
	        }
	        else if (sum > 1) { 
	    	    this.totalDiscount += (sum*(sum-1)*10);
		    this.numOfDiscounts++;
	        }
            }

        },
        print: function() {
	    document.getElementById('confirmation').innerHTML =
	        "<h3>Thank You For Your Order</h3>" + 
	        "Your Total without Discounts is: " + this.total + " Baht<br>" +
	        "You recieved " + this.numOfDiscounts + " discount(s) for a total of -" +
	        this.totalDiscount + " Baht<br>" + "Your final total is: " +
	        (this.total-this.totalDiscount) + " Baht<br>";
                this.seeConfirm= true;
        }
    }
});