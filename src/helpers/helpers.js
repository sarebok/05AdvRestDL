const prepareHateoas = async (entity, data) => {
    const results = data
      .map((v) => {
        return {
          name: v.nombre,
          href: `/${entity}/${v.id}`,
        };
      })
      .slice(0, 10);
    const total = data.length;
    const HATEOAS = {
      total,
      results,
    };
    return HATEOAS;
  };

  const logRoute = (req, res, next) => {
    console.log(`Route accessed: ${req.method} ${req.originalUrl}`);
    next();
};

  
  
  
  export {prepareHateoas, logRoute};