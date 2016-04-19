# multipleselect

左右选择的多选框
```html

<div class="ovomultiselect select1"></div>
<div class="ovomultiselect select2"></div>
<script type="text/javascript" src="../node_modules/jquery/dist/jquery.min.js"></script>
<script type="text/javascript" src="../dist/multipleselect-min.js"></script>

<script>
    jQuery(document).ready(function () {
        $('.ovomultiselect.select1').ovoMultipleSelect({
            fromData: [{name: '1111', value: '1111'}, {name: '222', value: '222'}, {
                name: '333', value: '333'
            }, {name: '444', value: '444'}, {name: '555', value: '555'}, {name: '666', value: '666'}],
            toData: [{name: 'aaa', value: 'aaa'}, {name: 'bbb', value: 'bbb'}]
        });

        $('.ovomultiselect.select2').ovoMultipleSelect({
            fromDataUrl: '../test/fromdata.json',
            toDataUrl: '../test/todata.json',
        });
    });

</script>


 ```
 