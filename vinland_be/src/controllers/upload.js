const { uploadMultiple, uploadSingle } = require('../services/upload');

const uploadSingleController = async (req, res) => {
    try {
        const file = req.file;
        const str = file.path;
        const result = await uploadSingle(str);
        return res.status(200).json({ url: result });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const uploadMultipleController = async (req, res) => {
    try {
        const files = req.files;
        const strs = files.map(file => file.path);
        const result = await uploadMultiple(strs);
        return res.status(200).json({ urls: result });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    uploadSingleController,
    uploadMultipleController
}