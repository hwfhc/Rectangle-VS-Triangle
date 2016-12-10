//**************************数学常量**********************************************
const PI = 3.1415926;
const sin1 = sin(PI/180);
const cos1 = cos(PI/180);
const sin2 = sin(PI/90);
const cos2 = cos(PI/90);

function cos(angle){
 /*
  *效果说明：
  *计算角度的余弦值，角度越大精度越差
  *
  *计算方法:
  *cos函数的麦克劳林展开
  */
  var value;
  value = 1-power(angle,2)/2+power(angle,4)/24;
  return value;
}

function sin(angle){
  /*
   *效果说明：
   *计算角度的余弦值，角度越大精度越差
   *
   *计算方法:
   *cos函数的麦克劳林展开
   */
  var value;
  value = angle-power(angle,3)/6+power(angle,5)/120;
  return value;
}

function max(N1,N2){
  /*
   *效果说明：
   *求N1，N2最小值
   */
  if(N1 >= N2){
    return N1;
  }
  else{
    return N2;
  }
}

function min(N1,N2){
 /*
  *效果说明：
  *求N1，N2最小值
  */
  if(N1 <= N2){
    return N1;
  }
  else{
    return N2;
  }
}

function power(number,N){
 /*
  *效果说明:
  *求number的N次方
  */
  if(N == 2)
  {
    return number * number;
  }

  if(N % 2 == 0){
    return power(power(number,N / 2 ),2);

  }
  else{
    return number * power(number,N-1);
  }

}

//**************************矩阵**********************************************
class Matrix{
  constructor(VALUE){
    /*
     *效果说明:
     *创建一个矩阵
     */
     if(VALUE.length != 0){
       this.value = VALUE;
       this.row = VALUE.length;
       this.column = VALUE[0].length;
     }
     else{
       console.log("矩阵不能无元素");
     }
  }

  Add(M){
    /*
     *效果说明:
     *矩阵相加，在本矩阵基础上加上M矩阵,获得一个新的矩阵
     *
     */

    //新的矩阵
    var OutPut = new Matrix([0]);//写一个0为了获取OutPut.value[0]的长度
    //这两个变量用于循环遍历矩阵
    var row;
    var column;

    if(this.row == M.row && this.column == M.column)//同型矩阵判断
    {
      for(row = 0;row < this.row; row++)
      {
        //初始化每一行的数组，否则无法使用数组脚标(js没有二维数组)
        OutPut.value[row] = [];

        for(column = 0;column < this.column; column++)
        {
          OutPut.value[row][column] = this.value[row][column] + M.value[row][column];
        }
      }
    }
    else
    {
      console.log('矩阵相加异常');
    }

    return OutPut;
  }

  Multiple(M){
    /*
     *效果说明:
     *矩阵相乘，在本矩阵基础上右乘M矩阵，获得新的矩阵
     *
     */

    //新的矩阵
    var OutPut = new Matrix([0]);//写一个0为了获取OutPut.value[0]的长度

    //这两个变量用于循环遍历矩阵
    var row;
    var column;

    //临时储存的变量
    var sum = 0;
    var i;

    if(this.column == M.row)//列数等于行数
    {
      for(row = 0;row < this.row;row++)
      {
        //初始化每一行的数组，否则无法使用数组脚标(js没有二维数组)
        OutPut.value[row] = [];

        for(column = 0;column < this.column; column++)
        {
          sum = 0;

          for(i = 0;i < this.column;i++)
          {
            sum += this.value[row][i] * M.value[i][column];
          }

          OutPut.value[row][column] = sum;
        }
      }
    }
    else
    {
      console.log('矩阵相乘异常');
    }
    //设置矩阵行，列
    OutPut.ReFreshRC();
    return OutPut;
  }

  GetNumber(row,column){
    if(row <= this.row && column <= this.column && row > 0 && column >0){
      return this.value[row-1][column-1];
    }
    else{
      console.log("获取矩阵数值失败");
    }
  }

  ReFreshRC(){
   /*
    *效果说明：
    *重新计算矩阵的宽和列
    */
    this.row = this.value.length;
    this.column = this.value[0].length;
  }
}

//**************************图形**********************************************

class Shape{
  constructor(center,nodes){
    /*
     *参数说明：
     *center：图形的中心(数组，第一项为X坐标，第二项为Y坐标)
     *nodes：图形的各个节点(数组，第一、二项为第一个节点坐标，以此类推)
     *
     *属性说明：
     *center：图形的中心
     *nodes[]：图形的各个节点
     *layer：图形对应的图层,指定图层后才有值
     *IsFilled：在图层绘画时指示该图形是否填充
     *
     */

      //i指示this.nodes[]第几项，i0指示nodes[]第几项
      var i,i0;

      this.center = new Node(center[0],center[1],this);
      this.nodes = [];
      this.layer;
      this.IsFilled = false;

      for(i=0,i0=0;i0<nodes.length;i++,i0+=2){
         this.nodes[i] = new Node(nodes[i0],nodes[i0+1],this);
      }
  }

  Transformation(M,pattern){
   /*
    *效果说明:
    *M为一个矩阵
    *pattern为一个整数，指示对图形进行变换的模式
    *0：仅center会右乘value
    *1：nodes[]中所有node会右乘value
    */
    var i;

    switch(pattern) {
        case 0:
            this.center.Transformation(M);
          //!!!  this.layer.IsChanged = true;
            break;
        case 1:
            for(i=0;i<this.nodes.length;i++)
            {
              this.nodes[i].Transformation(M);
            //!!!  this.layer.IsChanged = true;
            }
            break;
        default:
            console.log("Shape.Transformation -> pattern传递无定义数值");
       }
    }

  IsCrashed(shape){
    /*
     *效果说明:
     *判断本图形与另一图形是否碰撞
     *若碰撞则返回true,否则返回false
     */

     function IsTwoLineIntersected(node11,node12,node21,node22)
     {
       /*
        *效果说明:
        *l1：node11和node12对应线段
        *l2：node21和node22对应线段
        *若l1与l2相交则返回true,否则返回false
        *
        *计算方法:
        *求出l1，l2所在直线的交点
        *然后判断该交点是否在4个顶点形成的四边形内
        */
       var x;

       var center1_X = node11.shape.center.GetX();
       var center1_Y = node11.shape.center.GetY();
       var center2_X = node22.shape.center.GetX();
       var center2_Y = node22.shape.center.GetY();

       var x11 = node11.GetX() + center1_X;
       var y11 = node11.GetY() + center1_Y;
       var x12 = node12.GetX() + center1_X;
       var y12 = node12.GetY() + center1_Y;
       var x21 = node21.GetX() + center2_X;
       var y21 = node21.GetY() + center2_Y;
       var x22 = node22.GetX() + center2_X;
       var y22 = node22.GetY() + center2_Y;

       //特殊判断斜率不存在的情况
       if(x12 == x11 || x22 == x21)
       {
         //情况1
         if(x12 == x11 && x22 == x21){
           if(x12 == x22){
             if( ( y21 <= max(y11,y12) && y21 >= min(y11,y12) ) || ( y22 <= max(y11,y12) && y22 >= min(y11,y12) ) ){
               return true;
             }
           }
           else{
             return false;
           }
         }
         //情况2
         if(x12 == x11){
            x = x12;
         }
         //情况3
         if(x22 == x21){
           x = x22;
         }

         if( x <= max(x11,x12) && x >= min(x11,x12) && x <= max(x21,x22) && x >= min(x21,x22) ){
           return true;
         }
       }

       //斜率不为0
       var k1 = ( y12 - y11 ) / ( x12 - x11 );
       var k2 = ( y22 - y21 ) / ( x22 - x21 );
       if(k1 == k2)//判断两条线段是否平行
       {
         return false;
       }

       var b1 = y12 - k1 * x12;
       var b2 = y22 - k2 * x22;

       //求出交点x坐标
       x = (b2 - b1 ) / ( k1 - k2 );

       //判断交点是否在四边形内
      // console.log(max(x11,x12),min(x11,x12),max(x21,x22),min(x21,x22));
       if( x <= max(x11,x12) && x >= min(x11,x12) && x <= max(x21,x22) && x >= min(x21,x22) ){
         return true;
       }

       return false;
     }

     //初始化部分
     var i1,i2;
     var node11,node12,node21,node22;

     var length1 = this.nodes.length;
     var length2 = shape.nodes.length;

     for(i1=0;i1<length1 - 1;i1++)
     {
       for(i2=0;i2<length2;i2++)
       {
         node11 = this.nodes[i1];
         node12 = this.nodes[i1+1];
         node21 = shape.nodes[i2];
         node22 = shape.nodes[i2+1];

         //如果nodes[i+1]项不存在(即已遍历到最后一个节点)
         //设置node为nodes[0](即将最后一个节点与第一个节点相连)
         if(node12 == undefined)
         {
           node12 = this.nodes[0]
         }

         if(node22 == undefined)
         {
           node22 = shape.nodes[0]
         }

         if( IsTwoLineIntersected(node11,node12,node21,node22) )
         {
           return true;
         }
       }
     }

     return false;
    }
}

class Node{
  constructor(X,Y,shape){
     /*
      *效果说明:
      *创建一个节点
      *value:一个矩阵代表节点向量
      *X,Y:偏移Shape中心的坐标
      *shape:指示节点从属的shape对象
      */

      //写成向量转置似乎可以加快运算，反正这里我能少创建几个数组对象
      this.value = new Matrix([
        [X,Y,1]
      ]);
      this.shape = shape;
  }

  GetX(){
   /*
    *效果说明:
    *获取节点的X坐标
    */
    return this.value.GetNumber(1,1);
  }

  GetY(){
    /*
     *效果说明:
     *获取节点的Y坐标
     */
    return this.value.GetNumber(1,2);
  }

  Transformation(M){
   /*
    *效果说明:
    *M为一个矩阵，node的value将右乘M
    */

    this.value = this.value.Multiple(M);
  //!!!  this.layer.IsChanged = true;
   }
}

//**************************图层**********************************************

class Layer{
  constructor(CANVAS){
   /*
    *效果说明:
    *创建一个图层
    *canvas是对应的canvas元素
    *包含一些图形
    */
    this.canvas = CANVAS;
    this.shapes = [];
    this.IsChanged = false;
  }

  DeleteShape(N){
    /*
     *效果说明:
     *删除第N个图形，从0开始计数
     */
     var length = this.shapes.length;
     this.shapes[N] = this.shapes[length-1];
     this.shapes[length-1] = undefined;
     this.shapes.length--;
  }

  AddShape(shape){
    /*
     *效果说明:
     *将事先创建的shape添加到本图层
     */
     var length = this.shapes.length;
     this.shapes[length] = shape;
     shape.layer = this;
  }

  Draw(){
     /*
      *效果说明：
      *依次绘画图层中所有shape
      */

      //临时存储变量
      var N;        //指示shapes[]中shape序号
      var i=0;      //绘制单个shape时所使用的变量
      var shape;    //临时存储一个shape

      //初始化，获取canvas
      var canvas = this.canvas;
      var ctx = canvas.getContext('2d');


      for(N=0;N < this.shapes.length;N++)
      {
        shape = this.shapes[N];

        //绘图部分
        ctx.beginPath();

        ctx.moveTo(shape.center.GetX()+shape.nodes[i].GetX(),shape.center.GetY()+shape.nodes[i].GetY());
        for(i=1;i<shape.nodes.length;i++)
        {
          ctx.lineTo(shape.center.GetX()+shape.nodes[i].GetX(),shape.center.GetY()+shape.nodes[i].GetY());
        }
        ctx.closePath();
        ctx.lineWidth = 3;
        if(shape.IsFilled)
        {
          ctx.fill();
        }
        ctx.stroke();

        i=0;
      }
  }

  Clear(){
   /*
    *效果说明：
    *立即清除本图层，如果使用计时器调用layer.Clear会导致无法获取this关键字
    */
    var canvas = this.canvas;
    var ctx = canvas.getContext('2d');

    ctx.clearRect(0,0,canvas.width,canvas.height);
  }
}

//**************************逻辑控制**********************************************

var layer;

//主图形
function Mainshape_Init(){
  //循环变换图形
  function auto(){
    shape.Transformation(M,1);
  }

  //创建shape，及对应的变换矩阵
  var shape = new Shape(
    [400,400],
    [-14,-14,
    14,-14,
    20,14,
    -20,14]);
  var M = new Matrix([
      [cos1,-sin1,0],
      [sin1, cos1,0],
      [0, 0,1]
    ]);//每秒绕中心逆时针旋转1°

  //将shape添加到layer
  layer.AddShape(shape);

  //启动计时器
  setInterval(auto,50);
}

function MouseMove(e){
   var player = layer.shapes[0];
   //获取canvas绝对位置
   var X = content.getBoundingClientRect().left+document.body.scrollLeft;
   var Y = content.getBoundingClientRect().top+document.body.scrollTop;

   //获取鼠标在canvas中的坐标
   var e = window.event;
   var scrollX = document.body.scrollLeft;
   var scrollY = document.body.scrollTop;
   var x = e.clientX + scrollX - X;
   var y = e.clientY + scrollY - Y;

   var translate = new Matrix([
      [1,0,0],
      [0,1,0],
      [x - layer.shapes[0].center.GetX(),y - player.center.GetY(),1]
    ]);

    player.Transformation(translate,0);
}

//图形1
function shape1_Init(){
  //循环变换图形
  var count = 0;//判断变换次数
  function auto(){
    shape.Transformation(M,0);

    if(count > 190){
      clearInterval(timer);
    }
    count++;
  }

  //创建图形及对应变换
  var shape = new Shape(
    [200,200],
    [-100,0,
      0,100,
     0,0]);
  //每秒向右上方移动
  var M = new Matrix([
    [1,0,0],
    [0,1,0],
    [1,-1,1]
  ]);

  //将shape添加到layer
  layer.AddShape(shape);

  //启动计时器
  var timer = setInterval(auto,50);
}
//图形2
function shape2_Init(){
  //循环变换图形
  function auto(){
    shape.Transformation(M,1);
  }

  //创建图形及对应变换
  var shape = new Shape(
    [400,400],
    [0,50,
    -100,50,
    -100,-50,
    -10,-10,
     40,-120,
      80,-10,
      60,50]);
  //每秒原地自转2°
  var M = new Matrix([
    [cos2,sin2,0],
    [-sin2,cos2,0],
    [0,0,1]
  ]);

  //将shape添加到layer
  layer.AddShape(shape);

  //启动计时器
  setInterval(auto,50);
}
//图形3
function shape3_Init(){
  //循环变换图形
  function auto(){
    shape.Transformation(M,1);
  }

  //创建图形及对应变换
  var shape = new Shape(
    [400,400],
    [0,-50,
    -40,30,
    -20,50,
      0,20,
     20,50,
     40,30]);
  //位移同时再绕中心旋转
  var M = new Matrix([
    [cos1,sin1,0],
    [-sin1,cos1,0],
    [-1,1,1]
  ]);

  //将shape添加到layer
  layer.AddShape(shape);

  //启动计时器
  setInterval(auto,50);
}
//图形4
function shape4_Init(){
  //循环变换图形
  var count = 0;
  function auto(){
    shape.Transformation(M,1);

    if(count > 50)
    {
      clearInterval(timer);
    }
    count++;
  }

  //创建图形及对应变换
  var shape = new Shape(
    [650,200],
    [ 0,-150,
    -20,-20,
    -60,-20,
    -60,20,
    60,-20]);
  var M = new Matrix([
    [1,0,0],
    [-sin2,cos2,0],
    [  -2,0,1]
  ]);//每秒向右上方移动

  //将shape添加到layer
  layer.AddShape(shape);

  //启动计时器
  var timer = setInterval(auto,50);
}

//初始化
function init(){
  //循环绘图
  function auto(){
    //碰撞检测
    layer.shapes[0].IsFilled = false;
    for(let i=1;i<layer.shapes.length;i++){
      if( layer.shapes[0].IsCrashed(layer.shapes[i]) ){
        layer.shapes[0].IsFilled = true;
      }
    }

    layer.Clear();
    layer.Draw();
  }

  //创建layer
  layer = new Layer(document.getElementById('content'));

  //初始化各个图形
  Mainshape_Init();
  shape1_Init();
  shape2_Init();
  shape3_Init();
  shape4_Init();

  //启动计时器
  setInterval(auto,50);
}

init();
