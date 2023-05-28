const func = (tempFunc) => (req, res, next) => {
    Promise.resolve(tempFunc(req, res, next)).catch(next);
};

export default func;