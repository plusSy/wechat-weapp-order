var data;
data = {
	shipment : {
		// type : [
		// 	{ 
		// 		text : '多点配送',
		// 		type : 1,
		// 		selected : true
		// 	},{
		// 		text : '其他配送',
		// 		type : 2,
		// 		selected : false
		// 	}
		// ],
		time : [{
			text : '立即配送',
			timeType : 1,
			selected : true
		},{
			text : '一小时之内',
			timeType : 2,
			selected : false
		},{
			text : '一小时之后',
			timeType : 3,
			selected : false
		},{
			text : '两小时之内',
			timeType : 4,
			selected : false
    }, {
      text: '两小时以后',
      timeType: 5,
      selected: false
    }]
	},
  //订餐方式
  array: [
    {name:'预约订餐' },
    {name:'外卖配送'}],
//支付方式
	payment : [
		{
			iconClass : 'onlinepayment',
			text : '在线支付',
			selected : true
		}
    // ,{
		// 	iconClass : 'offlinepayment',
		// 	text : '货到付款',
		// 	selected : true
		// }
	],
	remarks : {
		text : ''
	},

	orderInfo : {
		list : [{
			name : '商品金额',
			price : '¥30.00'
		},{
			name : '促销优惠',
			price : '¥0.00'
		},{
			name : '基础运费',
			price : '¥5.00'
		}],
		all : '¥35.00'
	},

	products : [
		{
			name : '脐橙',
			num : 2,
			price : '¥2.10'
		},{
			name : '脐橙',
			num : 1,
			price : '¥2.10'
		}
	],
	totalPrice : '30.10'
};
module.exports = data;