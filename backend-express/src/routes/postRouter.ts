import { Router } from "express"
import { body } from "express-validator"
import { handleInputErrors } from "../middleware/validation"
import { PostController } from "../controllers/PostController"
import { authenticate } from "../middleware/auth"

const router = Router()


router.post('/', 
    authenticate,
    body('content').notEmpty().withMessage('Debes escribir contenido para el post'),
    handleInputErrors,
    PostController.create
)

router.get('/',
    authenticate,
    handleInputErrors,
    PostController.getAll
)

router.post('/like', 
    authenticate,
    body('post_id')
        .isInt().withMessage('Id de post no válido')
        .bail()
        .custom(value => value > 0).withMessage('Id de post no válido'),
    handleInputErrors,
    PostController.giveLike

)


export default router