const express=require ('express');

const router=express.Router();

router.get('/',(req,res,next)=>{

    res.status(200).json({
        message:'Show list of tasks user finished'

    });
});


router.post('/',(req,res,next)=>{

    res.status(201).json({
        message:'user creates sub task'

    });
});

router.get('/:userId',(req,res,next)=>{

    res.status(200).json({
        message:'User details',
        userId:req.params.userId

    });
});

router.delete('/:userId',(req,res,next)=>{

    res.status(200).json({
        message:'User kicked out',
        userId:req.params.userId

    });
});



module.exports=router;