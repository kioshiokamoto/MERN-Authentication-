export const getPrivateData = (req,res,next)=>{
    res.status(200).json({
        success:true,
        data:"Tienes acceso a informacion privada en esta ruta"
    })
}