/*------------退货管理-----------*/
jQuery(function($){
    //添加到退货
    $(document).on('click','.btnCan',function(){
        var $tiaoma = $(this).parent().prevAll().find('.input2').val();
        $.post(common.baseUrl + '/rec_search',{tiaoma:$tiaoma},function(response){
            response = JSON.parse(response);
            var seda = response.data;
            if(response.status){
                $.post(common.baseUrl + '/can_create',{
                    name:seda[0].name,
                    tiaoma:seda[0].tiaoma,
                    id:seda[0].id,
                    img:seda[0].img,
                    dizhi:seda[0].dizhi,
                    number:seda[0].receiptNumber,
                    time:''
                },function(response){
                    response=JSON.parse(response);
                    if(response.status){
                        alert('退货成功');
                    } else {
                        alert('退货失败');
                    }
                })
            } else {
                alert(response.message);
            }
        })     
    })

    $('.cancel').on('click',function(){
        cancel();
    })
    
    function cancel(){
        $.post(common.baseUrl + '/can_search',{},function(response){
            response = JSON.parse(response);
            var listsql = response.data;
            var th = $.map(listsql,function(item){
                return `<tr class="table_tr">
                    <td><input type="checkbox" name="check" class="cancelCheck"></td>
                    <td><input type="text" class="input1" value="${item.name}"/></td>
                    <td><input type="text" class="input2" value="${item.tiaoma}"/></td>
                    <td><input type="text" class="input3" value="${item.id}"/></td>
                    <td><input type="text" class="input4" value="${item.img}"/></td>
                    <td><input type="text" class="input5" value="${item.dizhi}"/></td>
                    <td><input type="text" class="input6" value="${item.number}"/></td>
                    <td><input type="text" class="input7" /></td>
                    <td><input type="button" value="删除" class="cancelDel"/></td>
                    <td><input type="button" value="编辑" class="cancelEdit"/></td>
                </tr>`
            }).join('');
            $('.table_th6 tbody').html('');
            $('.table_th6 tbody').html(th);
            
            if(!response.status){
                alert(response.message);
            }
        })
    }

    // 新增按钮xxxxxxxxxxxxxxxxxxxxxxxxxxx
    $('#btnAdd6').on('click', function(){
        $('.added_id6').css({display : "block"})
    })
    $('#colse6').on('click', function(){
        $('.added_id6').css({display:"none"})
    })
    
    // 增加
    $('#app6').on('click', function(){
        $.post(common.baseUrl + '/can_create',{
            name:$('#input_ss6 .input1').val(),
            tiaoma:$('#input_ss6 .input2').val(),
            id:$('#input_ss6 .input3').val(),
            img:$('#input_ss6 .input4').val(),
            dizhi:$('#input_ss6 .input5').val(),
            number:$('#input_ss6 .input6').val(),
            time:$('#input_ss6 .input7').val()
        },function(response){
            response = JSON.parse(response);
            if(response.status){
                alert('添加成功');
                $('.added_id6').css({display:"none"})
                $('.added_id6 td input').val('');
                cancel();
            } else {
                alert(response.message);
            }
        })
    })

    //搜索
    $('#shou6').click(function(){
        $('.added6>a').hide();
        $.post(common.baseUrl + '/can_search',{name:$('#shousuo6').val()},function(response){
            response = JSON.parse(response);
            var listsql = response.data;
            var th = $.map(listsql,function(item){
                return `<tr class="table_tr">
                    <td><input type="checkbox" name="check" class="cancelCheck"></td>
                    <td><input type="text" class="input1" value="${item.name}"/></td>
                    <td><input type="text" class="input2" value="${item.tiaoma}"/></td>
                    <td><input type="text" class="input3" value="${item.id}"/></td>
                    <td><input type="text" class="input4" value="${item.img}"/></td>
                    <td><input type="text" class="input5" value="${item.dizhi}"/></td>
                    <td><input type="text" class="input6" value="${item.number}"/></td>
                    <td><input type="text" class="input7" /></td>
                    <td><input type="button" value="删除" class="cancelDel"/></td>
                    <td><input type="button" value="编辑" class="cancelEdit"/></td>
                </tr>`
            }).join('');
            $('.table_th6 tbody').html('');
            $('.table_th6 tbody').html(th);

            if(response.status){
                alert('搜索成功');
            } else {
                alert(response.message);
            }
        })       
    })

    //删除
    $(document).on('click',function(e){
        if($(e.target).attr('class') == 'cancelDel'){
            var $bianhao_id = $(e.target).parent().prevAll().find('.input3').val();
            $.post(common.baseUrl+'/can_delete',{id:$bianhao_id},function(response){
                response=JSON.parse(response);        
                if(response.status){
                    alert('删除成功');
                    cancel();
                } else {
                    alert(response.message);
                }
            })
        }
    })

    //编辑：1.选择复选框  2.编辑信息  3.点击“编辑”
    setTimeout(function(){
        var va11,va12,va13,va14,va15,va16,va17;
        $('.cancelCheck').each(function(i){
            $(this).click(function(){
                 var check = $(this).parent().parent().children();
                 if(check[0].firstChild.checked){
                    va11 = check[1].firstChild.value;
                    va12 = check[2].firstChild.value;
                    va13 = check[3].firstChild.value;
                    va14 = check[4].firstChild.value;
                    va15 = check[5].firstChild.value;
                    va16 = check[6].firstChild.value;
                    va17 = check[7].firstChild.value;
                }
            })
        })
        $('.cancelEdit').each(function(i){
            $(this).click(function(){
                var a = $(this).parent().parent().children();
                var va1 = a[1].firstChild.value;
                var va2 = a[2].firstChild.value;
                var va3 = a[3].firstChild.value;
                var va4 = a[4].firstChild.value;
                var va5 = a[5].firstChild.value;
                var va6 = a[6].firstChild.value;
                var va7 = a[7].firstChild.value;;
                $.post(common.baseUrl + '/can_update',{
                    goods:JSON.stringify({
                        name:va1,
                        tiaoma:va2,
                        id:va3,
                        img:va4,
                        dizhi:va5,
                        number:va6,
                        time:va7
                    }),lists:JSON.stringify({
                        name:va11,
                        tiaoma:va12,
                        id:va13,
                        img:va14,
                        dizhi:va15,
                        number:va16,
                        time:va17
                    })},function(response){
                        response=JSON.parse(response);
                        if(response.status){
                            $('.table_th6').find(':checkbox').prop('checked',false);
                            alert('编辑成功');
                        } else {
                            alert(response.message);
                        }
                })
            })
        })
    },3000)
})