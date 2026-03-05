import articleModel from '../Models/article.js';
import settingModel from '../Models/setting.js';
import categoryModel from '../Models/category.js';

const LoadComonData = async (req, res, next) =>{
    try{
       
    const settings = await settingModel.findOne()                                

    const latestArticle = await articleModel.find()
                                        .populate('category', {'name':1, 'slug':1})
                                        .populate('author', {'fullname':1})
                                        .sort({createdAt:-1}).limit(5)                                

    const categoriesInUse = await articleModel.distinct('category');
    const categories = await categoryModel.find({_id: {$in: categoriesInUse}})

                        res.locals.settings = settings
                        res.locals.latestArticle = latestArticle
                        res.locals.categories = categories
                        next()
                }catch(err){
                next(err)
                }
}


export default LoadComonData