# multipleselect

左右选择的多选框
```html
 <script>
 $().ready(function(){

 $('.ovomultiselect').ovoMultipleSelect({'fromDataUrl':FaceConf.apiurl + '/ipc/findipc'});
 $('.ovomultiselect').ovoMultipleSelect({fromData: [{name: '1111', value: '1111'}, {name: '222', value: '222'}, {name: '333',value: '333'}, {name: '444', value: '444'}, {name: '555', value: '555'}, {name: '666', value: '666'}]});

 });
 </script>
 ```