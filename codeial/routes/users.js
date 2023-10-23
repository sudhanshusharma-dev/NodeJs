import express from 'express';
import userController from '../controller/users.controller.js';
import accountController from '../controller/account.controller.js';
import PostRouter from './posts.js';
import passport from 'passport';
import passportLocal from '../config/passport-local.js';

const router = express.Router();

router.get('/profile',passport.checkAuthentication, userController.profile);
router.get('/login',accountController.RenderLogin);
router.get('/signup',accountController.RenderSignup);

router.post('/create',accountController.create);

router.use('/profile', PostRouter);

//? use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/login'}
), accountController.createSession)

router.get('/sign-out',accountController.destroySession);
export default router;

            