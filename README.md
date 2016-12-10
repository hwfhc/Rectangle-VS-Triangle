# Rectangle-VS-Triangle
方块大战三角形  

##Content
整个绘画框  
####属性:
+ timer:  
循环遍历计时器  
+ Layer[]:  
各个图层

####方法:
+ AddLayer():  
增加一个图层   
+ DeleteLayer():  
删除一个图层  


##Layer
某一层图像  

####属性:
+ IsChanged:  
布尔变量，判断本次计时器周期是否需要重绘  
+ Shape[]:  
指向本图层包含的图形  
+ canvas:  
对应本图层的canvas  

####方法:
+ draw:  
读取所有shape并绘制
+ clear:   
清空本图层  
+ AddShape(a1):
为图层添加一个shape，其后是shape初始化参数  
+ DeleteShape():  
将Shape数组某项设为最后一项，并将最后一项设为undefined，并将Shape.length减一(将最后一项的图形移到要删除的项上)

##Shape
图形  

####属性:
+ center:  
二维矩阵，代表图形的中心  
+ node[]:  
二维矩阵，代表一个向量，与中心左边想加得节点坐标
+ layer:  
指向该Shape对应的图层  
+ fill_style:  
说明shape内部填充方式  
+ stroke_style:  
说明shape线条样式  

####方法:
+ Transformation:  
将各个node或center乘矩阵，变换图形，并将本layer的IsChanged变量设置为true  

##Node
节点  

####属性:
+ value:  
二维矩阵，代表一个向量，与中心左边想加得节点坐标
+ shape:  
指向该Node从属的Shape对象

####方法:
+ Transformation:  
将value右乘一个矩阵，变换图形，并将本layer的IsChanged变量设置为true  
