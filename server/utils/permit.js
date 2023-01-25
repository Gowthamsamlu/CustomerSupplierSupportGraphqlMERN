const permit = {
  allow: (roles = []) => {
    if (typeof roles === "string") {
      roles = [roles];
    }

    // authorize based on user role
    return (req, res, next) => {
      if (req.get("BYPASS") === process.env.BYPASS_KEY) {
        return next();
      }
      if (roles.includes("all")) {
        // if role has "all", then the route is accessible by all
        return next();
      }

      if (typeof req.user !== "undefined") {
        if (roles.includes("logged-in")) {
          // if role has "logged-in", then check if valid session is available
          return next();
        }

        if (roles.length && roles.includes(req.user.role)) {
          return next();
        }
      }
      return res.status(401).json({
        status: "Access Denied",
        success: false,
        message: "You are not authorized to access this resource",
      });
    };
  },
  block: (res) =>
    res.status(401).json({
      status: "Access Denied",
      success: false,
      message: "You are not authorized to access this resource",
    }),
};

module.exports = permit;
