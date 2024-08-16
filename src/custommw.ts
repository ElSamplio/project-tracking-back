const alwaysDoIt = (req: any, res: any, next: any) => {
  console.log("this is my middleware");
  if (!req.query.rows) {
    res.authError = true;
  }
  next();
};

export default alwaysDoIt;
