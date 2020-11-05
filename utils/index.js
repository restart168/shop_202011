export function wxshowmodal(){
    return new Promise((resolve,reject)=>{
        wx.showModal({
            title: '提示',
            content: '是否删除该商品',
           
            success: (result) => {
               if(result.confirm){
                   resolve(result)
               }else if(resolve.cancel){
                   return
               }
            },
           
           
        });
          
    })
}
export function wxshowToast(params){
    return new Promise((resolve,reject)=>{
        wx.showToast({
           ...params,
            mask: true,
            success: (result) => {
                resolve(result)
            },
           
        });
          
    })
}
export function wxlogin(params){
    return new Promise((resolve,reject)=>{
        wx.login({
            timeout:10000,
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {reject(err)},
           
        });
          
          
    })
}
export function requestPayment(pay){
    return new Promise((resolve,reject)=>{
       wx.requestPayment({
           ...pay,
           success: (result) => {
               resolve(result)
           },
           fail: (err) => {reject(err)},
          
       }); 
         
        });
          
          
    
}