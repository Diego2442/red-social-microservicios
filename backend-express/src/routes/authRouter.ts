import { Router } from "express";
import { body } from "express-validator";
import { handleInputErrors } from "../middleware/validation";
import { AuthController } from "../controllers/AuthController";
import { authenticate, validateUserExists, validateUserId } from "../middleware/auth";


const router = Router()


router.post('/login', 
    body('user_name').notEmpty().withMessage('El nombre de usuario no debe estar vacio'),
    body('password').notEmpty().withMessage('el password no debe ir vacio'),
    handleInputErrors,
    AuthController.login
)

router.get('/user',
    authenticate,
    handleInputErrors,
    AuthController.getUser
)

router.get('/:userId', 
    authenticate,
    validateUserId,
    validateUserExists,
    handleInputErrors,
    AuthController.profileUser
)




export default router