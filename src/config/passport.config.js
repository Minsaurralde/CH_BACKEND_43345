import passport from "passport";
import GithubStrategy from "passport-github2";
import { userModel } from "../daos/mongo/models/users.model.js";
import {
  GITHUB_CALLBACK,
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
} from "../constants/enviorments.js";

export const intializePassport = () => {
  passport.use(
    "github",
    new GithubStrategy(
      {
        clientID: GITHUB_CLIENT_ID,
        clientSecret: GITHUB_CLIENT_SECRET,
        callbackURL: GITHUB_CALLBACK,
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log(profile);
        let user = await userModel.findOne({ email: profile._json.email });
        if (!user) {
          let newUser = {
            first_name: profile.username,
            last_name: "test lastname",
            email: profile.profileUrl,
            age: 25,
            password: "1234",
          };
          const result = await userModel.create(newUser);
          done(null, result);
        } else {
          done(null, false);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    let user = await userModel.findById(id);
    done(null, user);
  });
};
