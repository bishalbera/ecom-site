export default   () => {
    return {
        port: parseInt(process.env.PORT || '3000'),
       
        jwt_secret: process.env.JWT_SECRET, 
    };
}