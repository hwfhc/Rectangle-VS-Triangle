const PI = 3.14159;

//计算正余弦
function cos(angle){
  var value;
  value = 1-angle*angle/2+angle*angle*angle*angle/24;
  return value;
}

function sin(angle){
  var value;
  value = angle-angle*angle*angle/6+angle*angle*angle*angle*angle/120;
  return value;
}

function max(N1,N2){
  if(N1 >= N2){
    return N1;
  }
  else{
    return N2;
  }
}

function min(N1,N2){
  if(N1 <= N2){
    return N1;
  }
  else{
    return N2;
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
  constructor(){
    /*
     *效果说明:
     *center：图形的中心
     *nodes：图形的各个节点
     *layer：图形对应的图层,指定图层后才有值
     *
     *参数数目不固定
     *参数1，参数2:Shape的中心坐标
     *参数3，参数4：第一个节点的X,Y偏移
     *~~~~~~~~
     */

      //i指示nodes[]第几项，i0指示arguments[]第几项
      var i,i0;

      this.center = new Node(arguments[0],arguments[1],this);
      this.nodes = [];
      this.layer;
      this.linshi = false;//！！！！

      for(i=0,i0=2;i0<arguments.length;i0+=2){
         this.nodes[i] = new Node(arguments[i0],arguments[i0+1],this);
         i++;
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

  IsColision(shape){
    /*
     *效果说明:
     *判断本图形与另一图形是否碰撞
     *若碰撞则返回true,否则返回false
     */

     function IsTwoLineIntersection(node11,node12,node21,node22)
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

       var k1 = ( y12 - y11 ) / ( x12 - x11 );
       var k2 = ( y22 - y21 ) / ( x22 - x21 );
       if(k1 == k2)//判断两条线段是否平行
       {
         return false;
       }

       var b1 = y12 - k1 * x12;
       var b2 = y22 - k2 * x22;

       //求出交点x坐标
       var x = (b2 - b1 ) / ( k1 - k2 );

       //判断交点是否在四边形内(只需要判断x在node11和node12的x坐标，node21和22的x坐标之间)
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

         if( IsTwoLineIntersection(node11,node12,node21,node22) )
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

        //绘画中心，早晚删掉
        ctx.moveTo(shape.center.GetX()-2,shape.center.GetY());
        ctx.lineTo(shape.center.GetX()+2,shape.center.GetY()+0);

        ctx.moveTo(shape.center.GetX()+shape.nodes[i].GetX(),shape.center.GetY()+shape.nodes[i].GetY());
        for(i=1;i<shape.nodes.length;i++)
        {
          ctx.lineTo(shape.center.GetX()+shape.nodes[i].GetX(),shape.center.GetY()+shape.nodes[i].GetY());
        }
        ctx.closePath();
        ctx.lineWidth = 3;
        if(shape.linshi)//！！！！
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
