
var options = {
  key: "rzp_test_dYmG5TPWWgPUoD",
  amount: 2300,
  currency: "INR",
  name: "Acme Corp",
  description: "Test Transaction",
  image: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1603283894702&di=f4085771fe38226e281cebef84686cc1&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F18%2F03%2F06%2F7418334f26d0c860c5757cc058c2b360.jpg",
  order_id: "order_FrVQvFfSB1wWuW",
  callback_url: "http://app.nicejobapp.com/app/index.php?i=4&c=entry&do=apis&m=sz_yi&p=index&op=aaa",
  prefill: {
    name: "Gaurav Kumar",
    email: "gaurav.kumar@example.com",
    contact: "9999999999"
  },
  notes: {
    address: "Razorpay Corporate Office"
  },
  theme: {
    color: "#3C72C4"
  }
};




function clickPay () {
  var rzp1 = new Razorpay(options);
  rzp1.on('payment.failed', function (response) {
    alert(response.error.code);
    alert(response.error.description);
    alert(response.error.source);
    alert(response.error.step);
    alert(response.error.reason);
    alert(response.error.metadata);
  });
  rzp1.open();
  // e.preventDefault();
}
export {
  clickPay, options
}