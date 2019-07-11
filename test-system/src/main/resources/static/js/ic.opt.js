var strls = "";
var errorno = "";

//控制字定义,控制字指定,控制字的含义请查看本公司网站提供的动态库说明

//javascript无法自定义常量, 你可以使用变量代替

var BLOCK0_EN = 0x01;//读第一块的(16个字节)
var BLOCK1_EN = 0x02;//读第二块的(16个字节)
var BLOCK2_EN = 0x04;//读第四块的(16个字节)
var NEEDSERIAL = 0x08;//仅读指定序列号的卡
var EXTERNKEY = 0x10;//用明码认证密码,产品开发完成后，建议把密码放到设备的只写区，然后用该区的密码后台认证，这样谁都不知道密码是多少，需要这方面支持请联系
var NEEDHALT = 0x20;//读/写完卡后立即休眠该卡，相当于这张卡不在感应区。要相重新操作该卡必要拿开卡再放上去

var myctrlword = 0;
var myareano = 0;
var authmode = 0;


var mypiccserial = "";

var mypicckey = ""; 
var piccdata0_2 = ""; 

var mypicckey_old = "";//旧密码
var mypicckey_new = "";//新密码


function readcard(){
	var cardNO = "";
	//指定控制字
	myctrlword=BLOCK0_EN + BLOCK1_EN + BLOCK2_EN + EXTERNKEY;
	//指定区号
	myareano = 8; //指定为第8区
	//批定密码模式
	authmode = 1; //大于0表示用A密码认证，推荐用A密码认证
	
	//指定序列号，未知卡序列号时可指定为8个0
	mypiccserial="00000000";

	//指定密码，以下密码为厂家出厂密码
	mypicckey = "6169796F636E";
	
	strls=IcCardReader.piccreadex(myctrlword, mypiccserial,myareano,authmode,mypicckey);
	errorno = strls.substr(0,4);

	
	switch(errorno)
	{
		case "ER08":
			alert("寻不到卡");
			break;	
		case "ER09":
			alert("寻不到卡");
			break;	
		case "ER10":
			alert("寻不到卡");
			break;	

		case "ER11":
			/*
			CardIDShower.value = "密码认证错误\r\n";
			CardIDShower.value = CardIDShower.value + strls + "\r\n";
			CardIDShower.value = CardIDShower.value + "其中错误号为：" + errorno + "\r\n";
			CardIDShower.value = CardIDShower.value + "卡十六进制序列号为：" + strls.substr(5,8) + "\r\n";*/
			alert("密码认证错误");
			break;	
		case "ER12":
			/*CardIDShower.value = "密码认证错误" + "\r\n";
			CardIDShower.value = CardIDShower.value + strls + "\r\n";
			CardIDShower.value = CardIDShower.value + "其中错误号为：" + errorno + "\r\n";
			CardIDShower.value = CardIDShower.value + "卡十六进制序列号为：" + strls.substr(5,8) + "\r\n";*/
			alert("密码认证错误");
			break;
		case "ER13":
			/*CardIDShower.value = "读卡错误" + "\r\n";
			CardIDShower.value = CardIDShower.value + strls + "\r\n";
			CardIDShower.value = CardIDShower.value + "其中错误号为：" + errorno + "\r\n";
			CardIDShower.value = CardIDShower.value + "卡十六进制序列号为：" + strls.substr(5,8) + "\r\n";*/
			alert("读卡错误");
			break;	
			
		case "ER14":
			/*CardIDShower.value = "写卡错误" + "\r\n";
			CardIDShower.value = CardIDShower.value + strls + "\r\n";
			CardIDShower.value = CardIDShower.value + "其中错误号为：" + errorno + "\r\n";
			CardIDShower.value = CardIDShower.value + "卡十六进制序列号为：" + strls.substr(5,8) + "\r\n";*/
			alert("写卡错误");	
			break;
			
		case "ER21":
			alert("没找到动态库");	
			break;
		case "ER22":
			alert("动态库或驱动程序异常");
			break;	
		case "ER23":
			alert("读卡器未插上或动态库或驱动程序异常");
			break;	
		case "ER24":
			alert("操作超时，一般是动态库没有反应");
			break;	
		case "ER25":
			alert("发送字数不够");	
			break;
		case "ER26":
			alert("发送的CRC错");
			break;	
		case "ER27":
			alert("接收的字数不够");
			break;	
		case "ER28":
			alert("接收的CRC错");
			break;
		case "ER29":
			alert("函数输入参数格式错误,请仔细查看"	);
			break;
		default :
			//读卡成功,其中ER00表示完全成功,ER01表示完全没读到卡数据，ER02表示仅读该卡的第一块成功,，ER02表示仅读该卡的第一二块成功，这是刷卡太快原因
			/*CardIDShower.value = "读卡成功" + "\r\n";
			CardIDShower.value = CardIDShower.value + strls + "\r\n";
			CardIDShower.value = CardIDShower.value + "其中错误号为：" + errorno + "\r\n";
			CardIDShower.value = CardIDShower.value + "卡十六进制序列号为：" + strls.substr(5,8) + "\r\n";
			CardIDShower.value = CardIDShower.value + "该区第一块十六进制数据为：" + strls.substr(14,32) + "\r\n";
			CardIDShower.value = CardIDShower.value + "该区第二块十六进制数据为：" + strls.substr(46,32) + "\r\n";
			CardIDShower.value = CardIDShower.value + "该区第三块十六进制数据为：" + strls.substr(78,32) + "\r\n";*/
			cardNO = strls.substr(14,32);
			break;
	}
   return cardNO;
}

function writecard()
{

	//指定控制字
	myctrlword=BLOCK0_EN + BLOCK1_EN + BLOCK2_EN + EXTERNKEY;
	//指定区号
	myareano = 8; //指定为第8区
	//批定密码模式
	authmode = 1; //大于0表示用A密码认证，推荐用A密码认证
	
	//指定序列号，未知卡序列号时可指定为8个0
	mypiccserial="00000000";

	//指定密码，以下密码为厂家出厂密码
	mypicckey = "ffffffffffff";


	
	//指定写卡内容，长度为48个字节，其中每个字节以两个字符表示为十六进制数
	piccdata0_2 = "000102030405060708090A0B0C0D0E0F101112131415161718191A1B1C1D1E1F202122232425262728292A2B2C2D2E2F";
	strls=IcCardReader.piccwriteex(myctrlword, mypiccserial,myareano,authmode,mypicckey,piccdata0_2);
	errorno = strls.substr(0,4);
	switch(errorno)
	{
		case "ER08":
			alert("寻不到卡");
			break;
		case "ER09":
			alert("寻不到卡");
			break;
		case "ER10":
			alert("寻不到卡");
			break;
		case "ER11":
			CardIDShower.value = "密码认证错误" + "\r\n";
			CardIDShower.value = CardIDShower.value + strls + "\r\n";
			CardIDShower.value = CardIDShower.value + "其中错误号为：" + errorno + "\r\n";
			CardIDShower.value = CardIDShower.value + "卡十六进制序列号为：" + strls.substr(5,8) + "\r\n";
			alert("密码认证错误");
			break;
		case "ER12":
			CardIDShower.value = "密码认证错误" + "\r\n";
			CardIDShower.value = CardIDShower.value + strls + "\r\n";
			CardIDShower.value = CardIDShower.value + "其中错误号为：" + errorno + "\r\n";
			CardIDShower.value = CardIDShower.value + "卡十六进制序列号为：" + strls.substr(5,8) + "\r\n";
			alert("密码认证错误");
			break;
		case "ER13":
			CardIDShower.value = "读卡错误" + "\r\n";
			CardIDShower.value = CardIDShower.value + strls + "\r\n";
			CardIDShower.value = CardIDShower.value + "其中错误号为：" + errorno + "\r\n";
			CardIDShower.value = CardIDShower.value + "卡十六进制序列号为：" + strls.substr(5,8) + "\r\n";
			alert("读卡错误");	
			break;
			
		case "ER14":
			CardIDShower.value = "写卡错误" + "\r\n";
			CardIDShower.value = CardIDShower.value + strls + "\r\n";
			CardIDShower.value = CardIDShower.value + "其中错误号为：" + errorno + "\r\n";
			CardIDShower.value = CardIDShower.value + "卡十六进制序列号为：" + strls.substr(5,8) + "\r\n";
			alert("写卡错误");
			break;	
			
		case "ER21":
			alert("没找到动态库");	
			break;
			
		case "ER22":
			alert("动态库或驱动程序异常");	
			break;
		
		case "ER23":
			alert("读卡器未插上或动态库或驱动程序异常");
			break;	
		case "ER24":
			alert("操作超时，一般是动态库没有反应");
			break;	
		case "ER25":
			alert("发送字数不够");	
			break;
		case "ER26":
			alert("发送的CRC错");	
			break;
		case "ER27":
			alert("接收的字数不够");
			break;	
		case "ER28":
			alert("接收的CRC错");
			break;
		case "ER29":
			alert("函数输入参数格式错误,请仔细查看");
			break;
		default ://写卡成功,其中ER00表示完全成功,ER01表示完全没写到卡数据，ER02表示仅写该卡的第一块成功,，ER02表示仅写该卡的第一二块成功，这是刷卡太快原因
			CardIDShower.value = "写卡成功" + "\r\n";
			CardIDShower.value = CardIDShower.value + strls + "\r\n";
			CardIDShower.value = CardIDShower.value + "其中错误号为：" + errorno + "\r\n";
			CardIDShower.value = CardIDShower.value + "卡十六进制序列号为：" + strls.substr(5,8) + "\r\n";
			break;
		
	
	}
}

function changecardkey()
{
	//指定控制字
	myctrlword= EXTERNKEY;
	//指定区号
	myareano = 8; //指定为第8区
	//批定密码模式
	authmode = 1; //大于0表示用A密码认证，推荐用A密码认证
	
	//指定序列号，未知卡序列号时可指定为8个0
	mypiccserial="00000000";
	
	//旧密码
	mypicckey_old = "ffffffffffff";

	//新密码
	mypicckey_new = "ffffffffffff";
	
	strls=IcCardReader.piccchangesinglekey(myctrlword, mypiccserial,myareano,authmode,mypicckey_old,mypicckey_new);
	errorno = strls.substr(0,4);

	if(errorno == "ER00")
	{
		CardIDShower.value = CardIDShower.value + "修改密码成功，卡序列为:" + strls.substr(strls.length - 8,8) + "\r\n";
	} 
	else if(errorno == "ER08")
	{
		alert("寻不到卡");
	} 
	else
	{
		CardIDShower.value = CardIDShower.value + "修改密码：错误:" + errorno  + "\r\n";
	}
	
}


function getdevicenumber()
{

	strls=IcCardReader.pcdgetdevicenumber();
	errorno = strls.substr(0,4);
	if(errorno == "ER00")
        {

		CardIDShower.value = CardIDShower.value + "设备硬件号为:" + strls.substr(strls.length - 8,8) + "\r\n";
	
	}

}
function beep()
{
	
	IcCardReader.pcdbeep(150);//100表示响100毫秒
	 
}


function clears1()
{
	//alert("abc");		
	CardIDShower.value = "";
}

/*window.onerror=function()
{  
alert("不好意思，出错了!");
return true;//屏蔽系统事件
};*/