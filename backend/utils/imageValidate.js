

const imageValidate = (images)=> {
    let imagesTable = [] // declare an empty array
    if (Array.isArray(images)){ // Array.isArray() determines if the passed value is an Array (images)
        imagesTable = images // let imagesTable = images
    } else{
        imagesTable.push(images) // if not then push value into empty imagesTable array
    }
    if (imagesTable.length > 3){
        return {error : "Send only 3 images at once"}
    }
    for (let image of imagesTable){
        if (image.size > 1048576) return {error: "Size too large (above 1 MB)"}

        const filetypes = /jpg|jpeg|png/ //regEx 
        const mimetype = filetypes.test(image.mimetype) //
        if(!mimetype) return {error: "Incorrect mime type (should be jpg, jpeg, or png)"}
    }
    return {error: false}
}

module.exports = imageValidate