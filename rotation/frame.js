(function(){
    
    function start()
    {
     
        console.log( document.querySelector );
        
        Object.prototype.addEventListener = function(evt,func)
        {
            console.log('addEventListener ')
            for( var i = 0; i<this.length; i++)
            {
                console.log('sss ',i)
                this[i].addEventListener(evt,func,false);
            }
        }
        
        Object.prototype.getElementsByClassName = function()
        {
            console.log('ClassName');
            return this;
        }
        
        
        
        Object.prototype.getElementsByTagName = function(str)
        {
            
            if(this.list)
            {
                var arr = this.list;
                var tarr = [];
                for( var i = 0; i<arr.length; i++)
                {
                   tarr[i] = arr[i].getElementsByTagName(str);
                }
                this.list = tarr;
            }else{
                this.list = document.getElementsByTagName(str)
            }
            //console.log( this.list )
            
            //this.list = 
            
            //console.log('tagname ', this,document.getElementsByTagName(str) );
//            if(this === document.getElementsByTagName(str))
//            {
//                console.log('xx')
//            }
//            
            return this;
            //return document.getElementsByTagName(str);
        }
//        Object.prototype.index = function()
//        {
//            var arr = this.parentElement.children;
//            
//            for( var i = 0; i<arr.length; i++)
//            {
//                if( arr[i] === this)
//                {
//                    return i;
//                }
//            }
//        }
//        Object.prototype.stop = function()
//        {
//            this.n = 0;
//            clearInterval(this.setInter);
//            clearTimeout(this.timeout);
//            
//            return this;
//        };
        Object.prototype.animate = function(opt)
        {
            console.log('ss')
            /*
            this.callFunc = function()
            {
                console.log('111')
            }
            this.inter = setInterval(this.callFunc,24);
            this.timeout = function()
            {
                console.log('time out')
                clearInterval(this.inter);
            }
            this.out = setTimeout( this.timeout ,opt.during );
            */
            var setInter = this.setInter = setInterval(function(){
                console.log('sss')
            },24);
            
            this.timeout = setTimeout(function(){
                clearInterval(setInter)
            },opt.during)
            
            
            return this;
        }
        
        
//        var aa = document.getElementsByClassName('test1').getElementsByTagName('a');
//        aa.addEventListener('click',test);
//        function test( evt ){
//            console.log( evt.target.index() );
//        }
//        
//        document.getElementsByClassName('list').getElementsByTagName('li').getElementsByTagName('a').addEventListener('click',function(evt){
//            console.log( evt.target.parentElement );
//        });
//        
//        var ani = document.getElementsByClassName('aniTest');
//        ani.getElementsByClassName('btn').addEventListener('click',function(){
//            //console.log('clcik')
//            //ani.getElementsByClassName('ani').animate();
//             //commonJs.animate();
//            ani.getElementsByClassName('ani').stop().animate({during:1000});
//        });
        
//console.log( document.getElementsByClassName('list')[0].getElementsByTagName('li'));
        
        //console.log( document.getElementsByClassName('list')[0].getElementsByTagName('li') )
        
//        var aa = document.getElementsByClassName('list')[0].getElementsByTagName('li');
//        for( var i =0; i<aa.length; i++)
//        {
//            //console.log(aa[i]);
//            aa[i].getElementsByTagName('a')[0].addEventListener('click',function(evt){
//               console.log('ss ',evt.target) 
//            });
//        }
        
        
        //console.log(document.getElementsByClassName('list').getElementsByTagName('li').getElementsByTagName('a'));
        
        document.getElementsByClassName('list').getElementsByTagName('li').getElementsByTagName('a').addEventListener('click',function(evt){
           console.log('sssdfsdfs ',evt.target) 
        });
        
        
        //console.log( document.getElementsByClassName )
        
        
        
        
        
        
    }
    
    
    window.addEventListener('load',function()
    {
        start();
    });
})();