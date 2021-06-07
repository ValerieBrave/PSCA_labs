exports.createDirectory = (req, res)  =>{
    const dirname = req.params.dirname;
    client
        .exists(dirname)
        .then((result) => {
        if (result)
            res
            .status(408)
            .json({ message: `Directory ${dirname} already exists!` });
        else {
            client.createDirectory(dirname);
            res.json({ message: `Directory ${dirname} is created!` });
        }
        })
        .catch((err) => {
        res.status(500).json({ message: err.message });
        });
}

exports.deleteDirectory = (req, res) => {
    const dirname = req.params.dirname;
    client
        .exists(dirname)
        .then((result) => {
        if (!result)
            res.status(408).json({ message: `Directory ${dirname} not found!` });
        else {
            client.deleteFile(dirname);
            res.json({ message: `Directory ${dirname} is deleted!` });
        }
        })
        .catch((err) => {
        res.status(500).json({ message: err.message });
        });
}

exports.uploadFile = (req, res) => {
    try {
        const filename = req.params.filename;
        const file = req.files.file;
        let ws = client.createWriteStream(filename);
        ws.end(file.data);
        res.json({ message: `File ${filename} is uploaded!` });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.downloadFile = (req, res) => {
    const filename = req.params.filename;
    const file = req.files;
    client
        .exists(filename)
        .then((result) => {
        if (!result)
            res.status(404).json({ message: `File ${filename} not found!` });
        else {
            client.createReadStream(filename).pipe(res);
        }
        })
        .catch((err) => {
        res.status(500).json({ message: err.message });
        });
}

exports.deleteFile = (req, res) => {
    const filename = req.params.filename;
    client
        .exists(filename)
        .then((result) => {
        if (!result)
            res.status(408).json({ message: `File ${filename} not found!` });
        else {
            client.deleteFile(filename);
            res.json({ message: `File ${filename} is deleted!` });
        }
        })
        .catch((err) => {
        res.status(500).json({ message: err.message });
        });
}

exports.copyFile = (req, res) => {
    const sourcefile = req.params.sourcefile;
    const destfile = req.params.destfile;
    client
        .exists(sourcefile)
        .then((result) => {
        if (!result)
            res.status(404).json({ message: `File ${sourcefile} not found!` });
        else {
            client.copyFile(sourcefile, destfile);
            res.json({
            message: `File ${sourcefile} is copyied into file ${destfile}!`,
            });
        }
        })
        .catch((err) => {
        res.status(500).json({ message: err.message });
        });
}

exports.moveFile = (req, res) => {
    const sourcefile = req.params.sourcefile;
    const destfile = req.params.destfile;
    client
        .exists(sourcefile)
        .then((result) => {
        if (!result)
            res.status(404).json({ message: `File ${sourcefile} not found!` });
        else {
            client.moveFile(sourcefile, destfile);
            res.json({
            message: `File ${sourcefile} is moved into file ${destfile}!`,
            });
        }
        })
        .catch((err) => {
        res.status(500).json({ message: err.message });
        });
}