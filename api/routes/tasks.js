const express=require ('express');

const router=express.Router();


router.get('/',(req,res,next)=>{

    res.status(200).json({

        message:'Handling get requests to /tasks'

    });
});


router.post('/',(req,res,next)=>{

    res.status(200).json({

        message:'Handling post requests to /tasks'

    });
});

router.get('/:taskOk',(req,rez,next)=>{

    const done=req.params.taskOk;
    if(done==='free'){
        res.status(200).json({

            message:'Start working!!!!!!',done:done
            
        });
    }else
    res.status(200).json({
        message:'Keep going'


    });

});

router.patch('/:taskOk',(req,rez,next)=>{

    res.status(200).json({
        message:'Updated task'
    })

});

router.delete('/:taskOk',(req,rez,next)=>{

    res.status(200).json({
        message:'delete task'
    })

});
module.exports=router;