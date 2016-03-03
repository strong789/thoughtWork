/*用于存放商品基本信息
 * name：商品名称
 * price:商品单价
 * activity：1.商品活动，0-无活动，1-买二赠一活动，2-95折的优惠活动；
 * 			 2.数字越大优先级越高，即如果设置了1和2两种活动，则取2，1不生效。
*/
var itemMessage = {
				  'ITEM000001': {'name':'可乐','price':'3','activity':'1'},
				   'ITEM000002':{'name':'苹果','price':'5.5','activity':'2'},
				   'ITEM000003':{'name':'羽毛球','price':'1','activity':'1'},
				   'ITEM000004':{'name':'香肠','price':'4','activity':'0'},
				   'ITEM000005':{'name':'鸡蛋','price':'1','activity':'0'},
				   'ITEM000006':{'name':'牛肉','price':'8','activity':'0'},
				};
//var inputDate = ['ITEM000001-3','ITEM000003-5','ITEM000005-2'];//接收输入的数据

//商品结算函数
function itemAccount(data){
	popup();//打开弹出层
	var inputD = getItemMessage(data);
	var u = inputD.length;
	var domInsertTop = '',
		domInsertMiddle='',
		domInsertBottom = '';//存放添加节点
	var insertTop = document.getElementById('accountTop'),
		insertMiddle = document.getElementById('accountMiddle'),
		insertBottom = document.getElementById('accountBottom');
	var single = 0;//小计
	var originalCost = 0;//不打折的总价
	var discountCost = 0;//打折后的总价
	for(var i = 0;i<u;i++){
		var item = inputD[i];
		originalCost +=item.itemAmount*item.price;//无优惠
		if(item.activity == 0){
			single = item.itemAmount*item.price;
			domInsertTop += "<span>名称:"+item.name+",数量："+item.itemAmount+",单价："+item.price+"(元），小计："+single+"(元)</span><br/ >";
		}if(item.activity == 1){
			domInsertMiddle += domInsertMiddle == ''?'<hr/><h2>买二赠一商品</h2>' : '';
			single = (parseInt(item.itemAmount/3)*2+(item.itemAmount%3))*item.price;//买二赠一活动
			domInsertTop += "<span>名称:"+item.name+",数量："+item.itemAmount+",单价："+item.price+"(元），小计："+single+"(元)</span><br/ >";
			domInsertMiddle +="<span>名称:"+item.name+"，数量："+parseInt(item.itemAmount/3)+"</span><br/>";
//			console.log(item.itemAmount/3);
		}if(item.activity == 2){
			single = item.itemAmount*item.price*0.95;//95折
			domInsertTop += "<span>名称:"+item.name+",数量："+item.itemAmount+",单价："+item.price+"(元），小计："+single+"(元),节省："+(0.05*item.itemAmount*item.price)+"</span><br/ >";
		}
		discountCost += single;
	}
	domInsertBottom +="<hr/><span>总计："+discountCost+"</span><br/>";
	if(originalCost > discountCost){
		domInsertBottom +="<span>节省："+(originalCost-discountCost).toFixed(2)+"</span><br/>";
	}
	insertTop.innerHTML=domInsertTop;
	insertMiddle.innerHTML=domInsertMiddle;
	insertBottom.innerHTML = domInsertBottom;
}
//根据传入数据获取商品信息
function getItemMessage(data){
	var length = data.length;
	var itemMsg = [];// 存放商品具体信息
	for(var i=0;i<length;i++){
		var code = data[i].substr(0,10);//获取商品条形码
		var itemAmount = data[i].substr(11,1) == '' ? 1:data[i].substr(11,1);//获取商品数量
		itemMsg[i]=itemMessage[code];
		itemMsg[i].itemAmount = itemAmount;
	}
	return itemMsg;
}



//弹出层逻辑
function popup(){
	var layer = document.getElementById('layer');
	layer.style.visibility = "visible";
  	layer.style.width = window.innerWidth +"px";
  	layer.style.height = window.innerHeight+"px";
}

function disappear(event){
	 var e = event || window.event;
	 /*e.target是指事件的发出者者，currentTarget始终是事件的监听者，一般currentTarget是target*/
	 if(e.target === e.currentTarget){
	 		document.getElementById('layer').style.visibility = "hidden";
	 }
}
function close(){
	alert("dsadas");
	document.getElementById('layer').style.visibility = "hidden";
}
