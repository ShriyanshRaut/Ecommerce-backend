const asyncHandler = (fn) =>{
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next)
    }
}
console.log("ASYNC HANDLER WRAPPED");

export default  asyncHandler 