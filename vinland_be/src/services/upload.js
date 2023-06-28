var cloudinary = require('cloudinary').v2;

const uploadSingle = async (str) => {
    const result = await cloudinary.uploader.upload(str, { folder: "vinland" })
    return result.url;
}

const uploadMultiple = async (strs = []) => {
    const result = []
    for (let i = 0; i < strs.length; i++) {
        const str = strs[i];
        const url = await uploadSingle(str);
        result.push(url);
    }
    
    return result;
}

module.exports = {
    uploadSingle,
    uploadMultiple
}