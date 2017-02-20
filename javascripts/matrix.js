function Matrix(VALUE){
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

  Matrix.prototype.Add = function(M){
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

  Matrix.prototype.Multiple = function(M){
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

  Matrix.prototype.GetNumber = function(row,column){
    if(row <= this.row && column <= this.column && row > 0 && column >0){
      return this.value[row-1][column-1];
    }
    else{
      console.log("获取矩阵数值失败");
    }
  }

  Matrix.prototype.ReFreshRC = function(){
   /*
    *效果说明：
    *重新计算矩阵的宽和列
    */
    this.row = this.value.length;
    this.column = this.value[0].length;
  }
