# CouponRecorder
这是[coupon项目](https://github.com/dpy1123/coupon)的一部分。  
是一个chrome插件，用来记录用户在浏览smzdm时的动作。  
目前记录"浏览详情"和"前往购买连接"2个动作。  

# 使用
直接把dist文件夹中的crx文件拖拽到chrome中即可安装。  
安装好后，在右上角应该会有C字样的图标，单击"on"即可开启。  

# 配置
当然使用之前需要配置一下userId，用来区分用户。  
在图标上右键->选项，即可指定用来识别你的userId。由于没有指定唯一性，请自觉使用区分度高的id，另外请注意dpy1123已被使用！  
如果在浏览目标网页时，发现没有设置过userId，会prompt让你输入的。  