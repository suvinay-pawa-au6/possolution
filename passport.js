var passport = require("passport");
var FacebookTokenStrategy = require("passport-facebook-token");
const User = require("./model/user");

passport.use(
  "facebookToken",
  new FacebookTokenStrategy(
    {
      clientID: 222077032194415,
      clientSecret: "3c1d9973458216be7df82e26e0f434da",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        User.find({ email: profile.emails[0].value })
          .exec()
          .then((user) => {
            if (user.length >= 1) {
              done(null, user);
            } else {
              console.log;
              const user = new User({
                email: profile.emails[0].value,
                name: profile.displayName,
                password: accessToken,
              });
              console.log(user);
              user
                .save()
                .then((data) => {
                  done(null, user);
                })
                .catch((err) => {
                  done(err);
                });
            }
          });
      } catch (error) {
        return res.json({ error });
      }
    }
  )
);

/*passport.use(
  "facebookToken",
  new FacebookTokenStrategy(
    {
      clientID: 222077032194415,
      clientSecret: "3c1d9973458216be7df82e26e0f434da",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log("hi");
        console.log("profile", profile);
        console.log("accessToken", accessToken);
        console.log("refreshToken", refreshToken);
        User.find({})
          .exec()
          .then((user) => {
            if (user.length >= 1) {
              return res.status(409).json({
                message: "Email Id exists",
              });
            }
          });
        done(null);
      } catch (error) {
        console.log("why");
       // done(error, false, error.message);
      }
    }
  )
);
*/
